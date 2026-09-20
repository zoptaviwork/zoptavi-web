// Core data model for Zoptavi Bill — core billing MVP (single store, offline-first)

export interface Item {
  id: string;
  name: string;
  hsn: string; // HSN/SAC code
  price: number; // unit price, GST-exclusive, in rupees
  gstRate: number; // total GST %, e.g. 5, 12, 18
  unit: string; // pc, kg, box, etc
  stock: number; // current stock on hand
  category?: string;
  barcode?: string; // EAN-13 or in-house barcode, for scan lookup
}

export interface BillLine {
  itemId: string;
  name: string;
  hsn: string;
  qty: number;
  unit: string;
  price: number; // unit price at time of billing, GST-exclusive
  gstRate: number;
  lineTotal: number; // qty * price, before GST
  cgst: number;
  sgst: number;
  lineGrandTotal: number; // lineTotal + cgst + sgst
}

export interface Bill {
  id: string; // local UUID
  billNo: string; // human-readable sequential number, e.g. ZB-0001
  createdAt: string; // ISO timestamp
  lines: BillLine[];
  subtotal: number; // sum of lineTotal
  totalCgst: number;
  totalSgst: number;
  grandTotal: number;
  paymentMode: 'cash' | 'upi' | 'card' | 'credit';
  customerName?: string;
  customerPhone?: string;
  customerGstin?: string;
  synced: boolean; // whether pushed to backend (phase 2 — always false for now)
}

export interface StoreSettings {
  storeName: string;
  address: string;
  gstin: string;
  phone: string;
  invoicePrefix: string; // e.g. "ZB"
  nextBillSeq: number;
  thermalWidth: '58mm' | '80mm' | 'a4';
}
