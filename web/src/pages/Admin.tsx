import { useEffect, useState } from 'react';
import {
  WORKER_URL, getToken, clearToken, login, saveServices, fetchAnalytics,
  type ServicesData, type Analytics,
} from '../lib/adminApi';
import { coreServices as staticCoreServices, websiteTiers as staticWebsiteTiers, carePlans as staticCarePlans } from '../data/business';

const wrap: React.CSSProperties = {
  minHeight: '100vh', background: '#0b0b10', color: '#fff',
  fontFamily: "'Inter', system-ui, sans-serif", padding: '40px 24px',
};
const card: React.CSSProperties = {
  background: '#15151d', border: '1px solid rgba(255,255,255,.08)',
  borderRadius: 14, padding: 24, marginBottom: 20, maxWidth: 900, margin: '0 auto 20px',
};
const input: React.CSSProperties = {
  background: '#0b0b10', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8,
  color: '#fff', padding: '8px 10px', fontSize: 13, width: '100%',
};
const btn: React.CSSProperties = {
  background: '#a163d6', color: '#fff', border: 'none', borderRadius: 8,
  padding: '10px 20px', fontWeight: 600, cursor: 'pointer', fontSize: 13,
};

export default function Admin() {
  const [authed, setAuthed] = useState(!!getToken());

  if (!WORKER_URL) {
    return (
      <div style={wrap}>
        <div style={card}>
          <h2>Admin not connected yet</h2>
          <p style={{ color: '#aaa', lineHeight: 1.6 }}>
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
    <div style={wrap}>
      <form onSubmit={submit} style={{ ...card, maxWidth: 360 }}>
        <h2 style={{ marginBottom: 16 }}>Zoptavi Admin</h2>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ ...input, marginBottom: 12 }}
          autoFocus
        />
        {error && <p style={{ color: '#e46', fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button type="submit" style={btn} disabled={busy}>{busy ? 'Checking…' : 'Log in'}</button>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [data, setData] = useState<ServicesData>({
    coreServices: staticCoreServices,
    websiteTiers: staticWebsiteTiers,
    carePlans: staticCarePlans,
  });
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`${WORKER_URL}/api/services`).then(r => r.json()).then(setData).catch(() => {});
    fetchAnalytics().then(setAnalytics).catch(() => {});
  }, []);

  async function save() {
    setStatus('Saving…');
    try {
      await saveServices(data);
      setStatus('Saved ✓');
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Save failed');
    }
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
    <div style={wrap}>
      <div style={{ ...card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Zoptavi Admin</h2>
        <button onClick={onLogout} style={{ ...btn, background: 'transparent', border: '1px solid rgba(255,255,255,.2)' }}>Log out</button>
      </div>

      <div style={card}>
        <h3>Core services</h3>
        {data.coreServices.map((s, i) => (
          <div key={s.key} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1.4fr', gap: 8, marginBottom: 8 }}>
            <input style={input} value={s.name} onChange={e => updateService(i, 'name', e.target.value)} />
            <input style={input} value={s.what} onChange={e => updateService(i, 'what', e.target.value)} />
            <input style={input} value={s.revenueType} onChange={e => updateService(i, 'revenueType', e.target.value)} />
          </div>
        ))}
      </div>

      <div style={card}>
        <h3>Website tiers (internal pricing reference)</h3>
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
        <h3>Care plans (internal pricing reference)</h3>
        {data.carePlans.map((c, i) => (
          <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr .7fr', gap: 8, marginBottom: 8 }}>
            <input style={input} value={c.name} onChange={e => updatePlan(i, 'name', e.target.value)} />
            <input style={input} value={c.includes} onChange={e => updatePlan(i, 'includes', e.target.value)} />
            <input style={input} type="number" value={c.perYear} onChange={e => updatePlan(i, 'perYear', e.target.value)} />
          </div>
        ))}
      </div>

      <div style={{ ...card, textAlign: 'center' }}>
        <button onClick={save} style={btn}>Save changes</button>
        {status && <p style={{ marginTop: 10, color: '#aaa', fontSize: 13 }}>{status}</p>}
      </div>

      {analytics && (
        <div style={card}>
          <h3>Analytics (last 30 days)</h3>
          <p style={{ color: '#aaa', fontSize: 13 }}>
            {analytics.totals.map(t => `${t.count} ${t.type}s`).join(' · ') || 'No data yet'}
          </p>
          <h4 style={{ marginTop: 16 }}>Top pages</h4>
          {analytics.topPages.map(p => (
            <div key={p.path} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
              <span>{p.path}</span><span>{p.count}</span>
            </div>
          ))}
          <h4 style={{ marginTop: 16 }}>Top CTA clicks</h4>
          {analytics.topClicks.map(c => (
            <div key={c.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
              <span>{c.label}</span><span>{c.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
