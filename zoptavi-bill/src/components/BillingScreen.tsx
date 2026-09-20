import { useEffect, useMemo, useRef, useState } from 'react';
import type { Bill, BillLine, Item, StoreSettings } from '../types';
import { makeBillLine, totalsForLines, formatINR } from '../lib/gst';
import { getItems, updateItemStock, nextBillNumber, saveBill, getSettings, saveSettings } from '../lib/db';
import { buildBillPdf, billPdfFileName } from '../lib/pdf';
import Receipt from './Receipt';
import BarcodeScanner from './BarcodeScanner';
import './BillingScreen.css';

export default function BillingScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState<BillLine[]>([]);
  const [search, setSearch] = useState('');
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [paymentMode, setPaymentMode] = useState<Bill['paymentMode']>('cash');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerGstin, setCustomerGstin] = useState('');
  const [lastBill, setLastBill] = useState<Bill | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getItems().then(setItems);
    getSettings().then(setSettings);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) => i.name.toLowerCase().includes(q) || i.hsn.includes(q) || (i.barcode ?? '').includes(q),
    );
  }, [items, search]);

  const totals = useMemo(() => totalsForLines(cart), [cart]);

  function addToCart(item: Item) {
    if (item.stock <= 0) return;
    setCart((prev) => {
      const existing = prev.find((l) => l.itemId === item.id);
      const currentQty = existing ? existing.qty : 0;
      if (currentQty + 1 > item.stock) return prev;
      const newLine = makeBillLine(item, currentQty + 1);
      if (existing) {
        return prev.map((l) => (l.itemId === item.id ? newLine : l));
      }
      return [...prev, newLine];
    });
  }

  function changeQty(itemId: string, qty: number) {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;
    if (qty <= 0) {
      setCart((prev) => prev.filter((l) => l.itemId !== itemId));
      return;
    }
    if (qty > item.stock) qty = item.stock;
    setCart((prev) => prev.map((l) => (l.itemId === itemId ? makeBillLine(item, qty) : l)));
  }

  function tryAddByBarcode(code: string) {
    const trimmed = code.trim();
    if (!trimmed) return false;
    const match = items.find((i) => i.barcode === trimmed);
    if (match) {
      addToCart(match);
      setSearch('');
      return true;
    }
    return false;
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      // Covers USB/Bluetooth scanners, which "type" the code then send Enter.
      tryAddByBarcode(search);
    }
  }

  function handleScanned(code: string) {
    setShowScanner(false);
    if (!tryAddByBarcode(code)) {
      setSearch(code);
    }
  }

  function removeLine(itemId: string) {
    setCart((prev) => prev.filter((l) => l.itemId !== itemId));
  }

  function clearCart() {
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerGstin('');
    setPaymentMode('cash');
  }

  async function completeBill() {
    if (cart.length === 0 || !settings) return;
    const billNo = await nextBillNumber();
    const { subtotal, totalCgst, totalSgst, grandTotal } = totalsForLines(cart);
    const bill: Bill = {
      id: crypto.randomUUID(),
      billNo,
      createdAt: new Date().toISOString(),
      lines: cart,
      subtotal,
      totalCgst,
      totalSgst,
      grandTotal,
      paymentMode,
      customerName: customerName || undefined,
      customerPhone: customerPhone || undefined,
      customerGstin: customerGstin || undefined,
      synced: false,
    };
    await saveBill(bill);
    for (const line of cart) {
      await updateItemStock(line.itemId, -line.qty);
    }
    const refreshed = await getItems();
    setItems(refreshed);
    setLastBill(bill);
    clearCart();
  }

  function printReceipt() {
    window.print();
  }

  async function downloadPdf() {
    if (!lastBill || !settings) return;
    const blob = buildBillPdf(lastBill, settings);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = billPdfFileName(lastBill);
    a.click();
    URL.revokeObjectURL(url);
  }

  async function shareBill() {
    if (!lastBill || !settings) return;
    const blob = buildBillPdf(lastBill, settings);
    const fileName = billPdfFileName(lastBill);
    const file = new File([blob], fileName, { type: 'application/pdf' });

    // Web Share API with files works on most Android/mobile browsers and can hand the PDF
    // straight to WhatsApp (or any installed app) via the native share sheet.
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `Invoice ${lastBill.billNo}`,
          text: `Invoice ${lastBill.billNo} from ${settings.storeName} — ${formatINR(lastBill.grandTotal)}`,
        });
        return;
      } catch {
        // user cancelled the share sheet — fall through to the WhatsApp link fallback below
      }
    }

    // Fallback: no file-sharing support (e.g. desktop browsers) — open WhatsApp with a text
    // summary, and also trigger a PDF download so the user can attach it manually.
    const phone = lastBill.customerPhone?.replace(/\D/g, '');
    const text = encodeURIComponent(
      `Invoice ${lastBill.billNo} from ${settings.storeName}\nTotal: ${formatINR(lastBill.grandTotal)}\nThank you for your purchase!`,
    );
    const waUrl = phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`;
    window.open(waUrl, '_blank');
    downloadPdf();
  }

  async function saveSettingsForm(next: StoreSettings) {
    await saveSettings(next);
    setSettings(next);
    setShowSettings(false);
  }

  if (!settings) return <div className="billing-loading">Loading…</div>;

  return (
    <div className="billing-screen">
      <header className="billing-header">
        <h1>{settings.storeName}</h1>
        <button className="btn-ghost" onClick={() => setShowSettings(true)}>Settings</button>
      </header>

      <div className="billing-main">
        <div className="billing-items-pane">
          <div className="search-row">
            <input
              className="billing-search"
              placeholder="Search items, HSN, or scan a barcode…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button className="btn-scan" onClick={() => setShowScanner(true)} title="Scan with camera">
              📷 Scan
            </button>
          </div>
          <div className="item-grid">
            {filtered.map((item) => (
              <button
                key={item.id}
                className="item-card"
                onClick={() => addToCart(item)}
                disabled={item.stock <= 0}
              >
                <span className="item-name">{item.name}</span>
                <span className="item-price">{formatINR(item.price)}</span>
                <span className="item-stock">{item.stock > 0 ? `${item.stock} ${item.unit} left` : 'Out of stock'}</span>
              </button>
            ))}
            {filtered.length === 0 && <p className="empty-hint">No items match.</p>}
          </div>
        </div>

        <div className="billing-cart-pane">
          <h2>Bill</h2>
          <div className="cart-lines">
            {cart.length === 0 && <p className="empty-hint">Tap items to add them here.</p>}
            {cart.map((line) => (
              <div className="cart-line" key={line.itemId}>
                <div className="cart-line-name">
                  <strong>{line.name}</strong>
                  <span>HSN {line.hsn} · {line.gstRate}% GST</span>
                </div>
                <div className="cart-line-qty">
                  <button onClick={() => changeQty(line.itemId, line.qty - 1)}>−</button>
                  <input
                    type="number"
                    value={line.qty}
                    min={0}
                    onChange={(e) => changeQty(line.itemId, Number(e.target.value))}
                  />
                  <button onClick={() => changeQty(line.itemId, line.qty + 1)}>+</button>
                </div>
                <div className="cart-line-amt">{formatINR(line.lineGrandTotal)}</div>
                <button className="cart-line-remove" onClick={() => removeLine(line.itemId)}>×</button>
              </div>
            ))}
          </div>

          <div className="customer-fields">
            <input placeholder="Customer name (optional)" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            <input placeholder="Phone (optional)" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
            <input placeholder="Customer GSTIN (optional)" value={customerGstin} onChange={(e) => setCustomerGstin(e.target.value)} />
          </div>

          <div className="payment-modes">
            {(['cash', 'upi', 'card', 'credit'] as const).map((m) => (
              <button
                key={m}
                className={`payment-mode-btn ${paymentMode === m ? 'active' : ''}`}
                onClick={() => setPaymentMode(m)}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="cart-totals">
            <div className="cart-row"><span>Subtotal</span><span>{formatINR(totals.subtotal)}</span></div>
            <div className="cart-row"><span>CGST</span><span>{formatINR(totals.totalCgst)}</span></div>
            <div className="cart-row"><span>SGST</span><span>{formatINR(totals.totalSgst)}</span></div>
            <div className="cart-row cart-grand"><span>Total</span><span>{formatINR(totals.grandTotal)}</span></div>
          </div>

          <div className="cart-actions">
            <button className="btn-ghost" onClick={clearCart} disabled={cart.length === 0}>Clear</button>
            <button className="btn-solid" onClick={completeBill} disabled={cart.length === 0}>Complete Bill</button>
          </div>
        </div>
      </div>

      {lastBill && (
        <div className="receipt-modal">
          <div className="receipt-modal-inner">
            <div ref={printRef}>
              <Receipt bill={lastBill} settings={settings} />
            </div>
            <div className="receipt-modal-actions">
              <button className="btn-ghost" onClick={() => setLastBill(null)}>Close</button>
              <button className="btn-ghost" onClick={downloadPdf}>Download PDF</button>
              <button className="btn-ghost" onClick={shareBill}>Share / WhatsApp</button>
              <button className="btn-solid" onClick={printReceipt}>Print</button>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <SettingsModal settings={settings} onCancel={() => setShowSettings(false)} onSave={saveSettingsForm} />
      )}

      {showScanner && (
        <BarcodeScanner onDetected={handleScanned} onClose={() => setShowScanner(false)} />
      )}
    </div>
  );
}

function SettingsModal({
  settings,
  onSave,
  onCancel,
}: {
  settings: StoreSettings;
  onSave: (s: StoreSettings) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<StoreSettings>(settings);
  return (
    <div className="receipt-modal">
      <div className="receipt-modal-inner settings-form">
        <h2>Store Settings</h2>
        <label>Store name<input value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} /></label>
        <label>Address<input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></label>
        <label>GSTIN<input value={form.gstin} onChange={(e) => setForm({ ...form, gstin: e.target.value })} /></label>
        <label>Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
        <label>Invoice prefix<input value={form.invoicePrefix} onChange={(e) => setForm({ ...form, invoicePrefix: e.target.value })} /></label>
        <label>
          Printer width
          <select value={form.thermalWidth} onChange={(e) => setForm({ ...form, thermalWidth: e.target.value as StoreSettings['thermalWidth'] })}>
            <option value="58mm">58mm thermal</option>
            <option value="80mm">80mm thermal</option>
            <option value="a4">A4 / browser print</option>
          </select>
        </label>
        <div className="receipt-modal-actions">
          <button className="btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn-solid" onClick={() => onSave(form)}>Save</button>
        </div>
      </div>
    </div>
  );
}
