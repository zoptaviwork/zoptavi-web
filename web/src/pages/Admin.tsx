import { useEffect, useState } from 'react';
import {
  WORKER_URL, getToken, clearToken, login, saveServices, fetchAnalytics,
  fetchContentFields, saveContent, fetchFaqs, saveFaqs, fetchPortfolio, savePortfolio,
  fetchNav, saveNav, uploadImage, mediaUrl,
  type ServicesData, type Analytics, type ContentField, type Faq, type PortfolioItem, type NavLink,
} from '../lib/adminApi';
import { coreServices as staticCoreServices, websiteTiers as staticWebsiteTiers, carePlans as staticCarePlans } from '../data/business';

// ---------------------------------------------------------------------------
// Shared style tokens (light theme, amber accents — matches the Helmet Hub
// admin panel's look so this feels like one consistent tool).
// ---------------------------------------------------------------------------
const colors = {
  bg: '#f9fafb', card: '#ffffff', border: '#e5e7eb', text: '#111827',
  muted: '#6b7280', amber: '#d97706', amberBg: '#fff7ed', amberBorder: '#fde68a',
};
const card: React.CSSProperties = { background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 12, padding: 20, marginBottom: 16 };
const input: React.CSSProperties = { background: '#fff', border: `1px solid ${colors.border}`, borderRadius: 8, color: colors.text, padding: '8px 10px', fontSize: 13, width: '100%' };
const label: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: colors.muted, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 4, display: 'block' };
const btnPrimary: React.CSSProperties = { background: colors.amber, color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontWeight: 600, cursor: 'pointer', fontSize: 13 };
const btnGhost: React.CSSProperties = { background: 'transparent', color: colors.text, border: `1px solid ${colors.border}`, borderRadius: 8, padding: '9px 18px', fontWeight: 600, cursor: 'pointer', fontSize: 13 };
const btnDanger: React.CSSProperties = { background: 'transparent', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 8, padding: '6px 10px', fontWeight: 600, cursor: 'pointer', fontSize: 12 };

const SECTIONS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'home', label: 'Home Content' },
  { key: 'about', label: 'About Content' },
  { key: 'careers', label: 'Careers Content' },
  { key: 'contact', label: 'Contact Content' },
  { key: 'faq', label: 'FAQ' },
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'nav', label: 'Navigation' },
  { key: 'services', label: 'Services & Pricing' },
  { key: 'analytics', label: 'Analytics' },
] as const;
type SectionKey = typeof SECTIONS[number]['key'];

export default function Admin() {
  const [authed, setAuthed] = useState(!!getToken());

  if (!WORKER_URL) {
    return (
      <div className="admin-theme" style={{ minHeight: '100vh', background: colors.bg, color: colors.text, fontFamily: "'Inter', system-ui, sans-serif", padding: 40 }}>
        <div style={{ ...card, maxWidth: 560, margin: '40px auto' }}>
          <h2 style={{ marginBottom: 8 }}>Admin not connected yet</h2>
          <p style={{ color: colors.muted, lineHeight: 1.6, fontSize: 14 }}>
            This page talks to a Cloudflare Worker that hasn't been deployed yet.
            Deploy it from <code>web/cf-worker</code> (see the README there),
            then set <code>WORKER_URL</code> in <code>web/src/lib/adminApi.ts</code>.
          </p>
        </div>
      </div>
    );
  }

  return authed ? <Dashboard onLogout={() => { clearToken(); setAuthed(false); }} /> : <Login onSuccess={() => setAuthed(true)} />;
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-theme" style={{ minHeight: '100vh', background: colors.bg, color: colors.text, fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={submit} style={{ ...card, width: 340 }}>
        <h2 style={{ marginBottom: 16 }}>Zoptavi Admin</h2>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ ...input, marginBottom: 12 }} autoFocus />
        {error && <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button type="submit" style={{ ...btnPrimary, width: '100%' }} disabled={busy}>{busy ? 'Checking…' : 'Log in'}</button>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<SectionKey>('dashboard');

  return (
    <div className="admin-theme" style={{ minHeight: '100vh', background: colors.bg, color: colors.text, fontFamily: "'Inter', system-ui, sans-serif", display: 'flex' }}>
      <aside style={{ width: 224, flexShrink: 0, background: '#fff', borderRight: `1px solid ${colors.border}`, padding: '20px 12px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px 20px' }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${colors.amber}, #f59e0b)` }} />
          <strong style={{ fontSize: 14 }}>Zoptavi Admin</strong>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {SECTIONS.map(s => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              style={{
                textAlign: 'left', padding: '9px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: section === s.key ? 700 : 500,
                background: section === s.key ? colors.amberBg : 'transparent',
                color: section === s.key ? colors.amber : colors.text,
                borderLeft: section === s.key ? `3px solid ${colors.amber}` : '3px solid transparent',
              }}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <button onClick={onLogout} style={{ ...btnGhost, marginTop: 12 }}>Log out</button>
      </aside>

      <main style={{ flex: 1, padding: '28px 32px', maxWidth: 900, overflowY: 'auto' }}>
        {section === 'dashboard' && <DashboardHome onNavigate={setSection} />}
        {section === 'home' && <PageContentEditor page="home" title="Home Content" />}
        {section === 'about' && <PageContentEditor page="about" title="About Content" />}
        {section === 'careers' && <PageContentEditor page="careers" title="Careers Content" />}
        {section === 'contact' && <PageContentEditor page="contact" title="Contact Content" />}
        {section === 'faq' && <FaqEditor />}
        {section === 'portfolio' && <PortfolioEditor />}
        {section === 'nav' && <NavEditor />}
        {section === 'services' && <ServicesEditor />}
        {section === 'analytics' && <AnalyticsView />}
      </main>
    </div>
  );
}

function DashboardHome({ onNavigate }: { onNavigate: (s: SectionKey) => void }) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  useEffect(() => { fetchAnalytics().then(setAnalytics).catch(() => {}); }, []);
  const pageviews = analytics?.totals.find(t => t.type === 'pageview')?.count || 0;
  const clicks = analytics?.totals.find(t => t.type === 'click')?.count || 0;

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 20 }}>
        <div style={card}><div style={label}>Pageviews (30d)</div><div style={{ fontSize: 26, fontWeight: 700 }}>{pageviews}</div></div>
        <div style={card}><div style={label}>CTA clicks (30d)</div><div style={{ fontSize: 26, fontWeight: 700 }}>{clicks}</div></div>
      </div>
      <div style={card}>
        <h3 style={{ marginBottom: 12, fontSize: 15 }}>Sections</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SECTIONS.filter(s => s.key !== 'dashboard').map(s => (
            <button key={s.key} onClick={() => onNavigate(s.key)} style={btnGhost}>{s.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page content editor (hero text etc.) — generic across home/about/careers/contact
// ---------------------------------------------------------------------------
function PageContentEditor({ page, title }: { page: string; title: string }) {
  const [fields, setFields] = useState<ContentField[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => { fetchContentFields(page).then(setFields).catch(() => {}); }, [page]);

  function update(key: string, value: string) {
    setFields(fs => fs.map(f => (f.key === key ? { ...f, value } : f)));
  }

  async function save() {
    setStatus('Saving…');
    try {
      const values: Record<string, string> = {};
      fields.forEach(f => { values[f.key] = f.value; });
      await saveContent(page, values);
      setStatus('Saved ✓');
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Save failed');
    }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>{title}</h2>
      <div style={card}>
        {fields.map(f => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <label style={label}>{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea style={{ ...input, minHeight: 70 }} value={f.value} onChange={e => update(f.key, e.target.value)} />
            ) : (
              <input style={input} value={f.value} onChange={e => update(f.key, e.target.value)} />
            )}
          </div>
        ))}
        {!fields.length && <p style={{ color: colors.muted, fontSize: 13 }}>Loading…</p>}
        <button onClick={save} style={btnPrimary}>Save changes</button>
        {status && <span style={{ marginLeft: 12, fontSize: 13, color: colors.muted }}>{status}</span>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FAQ editor
// ---------------------------------------------------------------------------
function FaqEditor() {
  const [items, setItems] = useState<Faq[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => { fetchFaqs().then(setItems).catch(() => {}); }, []);

  function update(i: number, field: keyof Faq, value: string) {
    setItems(list => list.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)));
  }
  function remove(i: number) { setItems(list => list.filter((_, idx) => idx !== i)); }
  function add() { setItems(list => [...list, { question: '', answer: '' }]); }

  async function save() {
    setStatus('Saving…');
    try { await saveFaqs(items); setStatus('Saved ✓'); }
    catch (err) { setStatus(err instanceof Error ? err.message : 'Save failed'); }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>FAQ</h2>
      {items.map((f, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={label}>Question {i + 1}</label>
            <button onClick={() => remove(i)} style={btnDanger}>Remove</button>
          </div>
          <input style={{ ...input, marginBottom: 10 }} value={f.question} onChange={e => update(i, 'question', e.target.value)} placeholder="Question" />
          <textarea style={{ ...input, minHeight: 60 }} value={f.answer} onChange={e => update(i, 'answer', e.target.value)} placeholder="Answer" />
        </div>
      ))}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={add} style={btnGhost}>+ Add question</button>
        <button onClick={save} style={btnPrimary}>Save changes</button>
        {status && <span style={{ fontSize: 13, color: colors.muted }}>{status}</span>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Portfolio editor (with image upload)
// ---------------------------------------------------------------------------
function PortfolioEditor() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState<number | null>(null);

  useEffect(() => { fetchPortfolio().then(setItems).catch(() => {}); }, []);

  function update(i: number, field: keyof PortfolioItem, value: string) {
    setItems(list => list.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)));
  }
  function remove(i: number) { setItems(list => list.filter((_, idx) => idx !== i)); }
  function add() { setItems(list => [...list, { key: `item-${Date.now()}`, name: '', category: '', blurb: '' }]); }

  async function onImagePick(i: number, file: File | undefined) {
    if (!file) return;
    setUploading(i);
    try {
      const key = await uploadImage(file);
      update(i, 'imageKey', key);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(null);
    }
  }

  async function save() {
    setStatus('Saving…');
    try { await savePortfolio(items); setStatus('Saved ✓'); }
    catch (err) { setStatus(err instanceof Error ? err.message : 'Save failed'); }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>Portfolio / client showcase</h2>
      {items.map((p, i) => (
        <div key={p.key} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={label}>Client {i + 1}</label>
            <button onClick={() => remove(i)} style={btnDanger}>Remove</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <input style={input} value={p.name} onChange={e => update(i, 'name', e.target.value)} placeholder="Name" />
            <input style={input} value={p.category} onChange={e => update(i, 'category', e.target.value)} placeholder="Category" />
            <input style={input} value={p.url || ''} onChange={e => update(i, 'url', e.target.value)} placeholder="Website URL" />
            <input style={input} value={p.tier || ''} onChange={e => update(i, 'tier', e.target.value)} placeholder="Tier (e.g. Store Pro)" />
          </div>
          <textarea style={{ ...input, minHeight: 60, marginBottom: 10 }} value={p.blurb} onChange={e => update(i, 'blurb', e.target.value)} placeholder="Description" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {p.imageKey && <img src={mediaUrl(p.imageKey)} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', border: `1px solid ${colors.border}` }} />}
            <input type="file" accept="image/*" onChange={e => onImagePick(i, e.target.files?.[0])} style={{ fontSize: 12 }} />
            {uploading === i && <span style={{ fontSize: 12, color: colors.muted }}>Uploading…</span>}
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={add} style={btnGhost}>+ Add client</button>
        <button onClick={save} style={btnPrimary}>Save changes</button>
        {status && <span style={{ fontSize: 13, color: colors.muted }}>{status}</span>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Nav links editor
// ---------------------------------------------------------------------------
function NavEditor() {
  const [items, setItems] = useState<NavLink[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => { fetchNav().then(setItems).catch(() => {}); }, []);

  function update(i: number, field: keyof NavLink, value: string) {
    setItems(list => list.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)));
  }
  function remove(i: number) { setItems(list => list.filter((_, idx) => idx !== i)); }
  function add() { setItems(list => [...list, { label: '', path: '/' }]); }
  function move(i: number, dir: -1 | 1) {
    setItems(list => {
      const next = [...list];
      const j = i + dir;
      if (j < 0 || j >= next.length) return list;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  async function save() {
    setStatus('Saving…');
    try { await saveNav(items); setStatus('Saved ✓ (also update the links array in Navbar.tsx to match)'); }
    catch (err) { setStatus(err instanceof Error ? err.message : 'Save failed'); }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>Navigation menu</h2>
      <div style={card}>
        {items.map((n, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto auto', gap: 8, marginBottom: 8, alignItems: 'center' }}>
            <input style={input} value={n.label} onChange={e => update(i, 'label', e.target.value)} placeholder="Label" />
            <input style={input} value={n.path} onChange={e => update(i, 'path', e.target.value)} placeholder="/path" />
            <button onClick={() => move(i, -1)} style={btnGhost}>↑</button>
            <button onClick={() => move(i, 1)} style={btnGhost}>↓</button>
            <button onClick={() => remove(i)} style={btnDanger}>✕</button>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 10 }}>
          <button onClick={add} style={btnGhost}>+ Add link</button>
          <button onClick={save} style={btnPrimary}>Save changes</button>
        </div>
        {status && <p style={{ marginTop: 10, fontSize: 13, color: colors.muted }}>{status}</p>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Services & pricing editor (existing functionality, restyled)
// ---------------------------------------------------------------------------
function ServicesEditor() {
  const [data, setData] = useState<ServicesData>({ coreServices: staticCoreServices, websiteTiers: staticWebsiteTiers, carePlans: staticCarePlans });
  const [status, setStatus] = useState('');

  useEffect(() => { fetch(`${WORKER_URL}/api/services`).then(r => r.json()).then(setData).catch(() => {}); }, []);

  async function save() {
    setStatus('Saving…');
    try { await saveServices(data); setStatus('Saved ✓'); }
    catch (err) { setStatus(err instanceof Error ? err.message : 'Save failed'); }
  }

  function updateService(i: number, field: string, value: string) {
    const next = [...data.coreServices];
    next[i] = { ...next[i], [field]: value };
    setData({ ...data, coreServices: next });
  }
  function updateTier(i: number, field: string, value: string) {
    const next = [...data.websiteTiers];
    next[i] = { ...next[i], [field]: field === 'price' ? Number(value) : value } as typeof next[number];
    setData({ ...data, websiteTiers: next });
  }
  function updatePlan(i: number, field: string, value: string) {
    const next = [...data.carePlans];
    next[i] = { ...next[i], [field]: field === 'perYear' ? Number(value) : value } as typeof next[number];
    setData({ ...data, carePlans: next });
  }

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>Services & Pricing</h2>

      <div style={card}>
        <h3 style={{ marginBottom: 12, fontSize: 15 }}>Core services</h3>
        {data.coreServices.map((s, i) => (
          <div key={s.key} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1.4fr', gap: 8, marginBottom: 8 }}>
            <input style={input} value={s.name} onChange={e => updateService(i, 'name', e.target.value)} />
            <input style={input} value={s.what} onChange={e => updateService(i, 'what', e.target.value)} />
            <input style={input} value={s.revenueType} onChange={e => updateService(i, 'revenueType', e.target.value)} />
          </div>
        ))}
      </div>

      <div style={card}>
        <h3 style={{ marginBottom: 12, fontSize: 15 }}>Website tiers (internal pricing reference)</h3>
        {data.websiteTiers.map((t, i) => (
          <div key={t.name} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr .7fr', gap: 8, marginBottom: 8 }}>
            <input style={input} value={t.name} onChange={e => updateTier(i, 'name', e.target.value)} />
            <input style={input} value={t.builtOn} onChange={e => updateTier(i, 'builtOn', e.target.value)} />
            <input style={input} value={t.gets} onChange={e => updateTier(i, 'gets', e.target.value)} />
            <input style={input} type="number" value={t.price} onChange={e => updateTier(i, 'price', e.target.value)} />
          </div>
        ))}
      </div>

      <div style={card}>
        <h3 style={{ marginBottom: 12, fontSize: 15 }}>Care plans (internal pricing reference)</h3>
        {data.carePlans.map((c, i) => (
          <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr .7fr', gap: 8, marginBottom: 8 }}>
            <input style={input} value={c.name} onChange={e => updatePlan(i, 'name', e.target.value)} />
            <input style={input} value={c.includes} onChange={e => updatePlan(i, 'includes', e.target.value)} />
            <input style={input} type="number" value={c.perYear} onChange={e => updatePlan(i, 'perYear', e.target.value)} />
          </div>
        ))}
      </div>

      <div style={{ ...card, textAlign: 'center' }}>
        <button onClick={save} style={btnPrimary}>Save changes</button>
        {status && <p style={{ marginTop: 10, color: colors.muted, fontSize: 13 }}>{status}</p>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------
function AnalyticsView() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  useEffect(() => { fetchAnalytics().then(setAnalytics).catch(() => {}); }, []);

  if (!analytics) return <div><h2 style={{ marginBottom: 18 }}>Analytics</h2><p style={{ color: colors.muted }}>Loading…</p></div>;

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>Analytics (last 30 days)</h2>
      <div style={card}>
        <p style={{ color: colors.muted, fontSize: 13 }}>
          {analytics.totals.map(t => `${t.count} ${t.type}s`).join(' · ') || 'No data yet'}
        </p>
      </div>
      <div style={card}>
        <h3 style={{ marginBottom: 10, fontSize: 15 }}>Top pages</h3>
        {analytics.topPages.map(p => (
          <div key={p.path} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: `1px solid ${colors.border}` }}>
            <span>{p.path}</span><span>{p.count}</span>
          </div>
        ))}
        {!analytics.topPages.length && <p style={{ fontSize: 13, color: colors.muted }}>No pageviews yet.</p>}
      </div>
      <div style={card}>
        <h3 style={{ marginBottom: 10, fontSize: 15 }}>Top CTA clicks</h3>
        {analytics.topClicks.map(c => (
          <div key={c.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: `1px solid ${colors.border}` }}>
            <span>{c.label}</span><span>{c.count}</span>
          </div>
        ))}
        {!analytics.topClicks.length && <p style={{ fontSize: 13, color: colors.muted }}>No clicks tracked yet.</p>}
      </div>
    </div>
  );
}
