import { useEffect, useState } from 'react';
import {
  WORKER_URL, getToken, clearToken, login, saveServices, fetchAnalytics,
  fetchContentFields, saveContent, fetchFaqs, saveFaqs, fetchPortfolio, savePortfolio,
  fetchNav, saveNav, fetchCareerRoles, saveCareerRoles, uploadImage, mediaUrl,
  fetchBillPillars, saveBillPillars, fetchBillPricing, saveBillPricing, fetchBillPhases, saveBillPhases,
  fetchCareersPerks, saveCareersPerks, fetchCareersHiringSteps, saveCareersHiringSteps,
  fetchAboutValues, saveAboutValues, fetchAboutSteps, saveAboutSteps,
  type ServicesData, type Analytics, type ContentField, type Faq, type PortfolioItem, type NavLink, type CareerRole,
  type BillPillar, type BillPricingTier, type BillPhase, type CareersPerk, type CareersHiringStep,
  type AboutValue, type AboutStep,
} from '../lib/adminApi';
import { coreServices as staticCoreServices, websiteTiers as staticWebsiteTiers, carePlans as staticCarePlans } from '../data/business';
import Seo from '../components/Seo';

// ---------------------------------------------------------------------------
// Shared style tokens — modeled on a proven admin-panel pattern: a light,
// dense, functional workspace (white cards, gray-50 ground, amber accent)
// that's deliberately distinct from the storefront's own dark brand theme,
// so admins never mistake the panel for a public page. Headings still use
// the site's Raleway typeface so it doesn't feel like a foreign template.
// ---------------------------------------------------------------------------
const colors = {
  bg: '#fafafa', card: '#ffffff', border: '#ececec', text: '#2b2d33',
  muted: '#8a8f98', accent: '#b45309', accentBg: '#fffaf0', accentBorder: '#fbe4bd',
  gradient: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
  danger: '#c0392b', dangerBg: '#fdf3f2', dangerBorder: '#f4cfc9',
  blue: '#2563eb', green: '#16a34a',
  fHead: "'Raleway', 'Helvetica Neue', Arial, sans-serif",
  fBody: "'Inter', 'Helvetica Neue', Arial, sans-serif",
};
const card: React.CSSProperties = { background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 14, padding: 22, marginBottom: 14, boxShadow: '0 1px 2px rgba(20,20,30,.03)' };
const input: React.CSSProperties = { background: '#fff', border: `1px solid ${colors.border}`, borderRadius: 9, color: colors.text, padding: '9px 12px', fontSize: 13.5, width: '100%', fontFamily: 'inherit', fontWeight: 400 };
const label: React.CSSProperties = { fontSize: 11, fontWeight: 500, color: colors.muted, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 6, display: 'block' };
const btnPrimary: React.CSSProperties = { background: colors.gradient, color: '#fff', border: 'none', borderRadius: 9, padding: '9px 18px', fontWeight: 500, cursor: 'pointer', fontSize: 13, boxShadow: '0 1px 2px rgba(180,83,9,.18)' };
const btnGhost: React.CSSProperties = { background: '#fff', color: colors.text, border: `1px solid ${colors.border}`, borderRadius: 9, padding: '9px 18px', fontWeight: 500, cursor: 'pointer', fontSize: 13 };
const btnDanger: React.CSSProperties = { background: 'transparent', color: colors.danger, border: `1px solid ${colors.dangerBorder}`, borderRadius: 9, padding: '6px 11px', fontWeight: 500, cursor: 'pointer', fontSize: 12 };
const iconBtn: React.CSSProperties = { background: '#fff', color: colors.text, border: `1px solid ${colors.border}`, borderRadius: 7, width: 27, height: 27, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 12, lineHeight: 1, padding: 0 };

const SECTIONS = [
  { key: 'dashboard', label: 'Dashboard', group: 'Overview' },
  { key: 'home', label: 'Home Page', group: 'Pages' },
  { key: 'servicesPage', label: 'Our Services Page', group: 'Pages' },
  { key: 'billPage', label: 'Zoptavi Tab Page', group: 'Pages' },
  { key: 'billPillars', label: 'Zoptavi Tab — Pillars', group: 'Pages' },
  { key: 'billPricing', label: 'Zoptavi Tab — Pricing Table', group: 'Pages' },
  { key: 'billPhases', label: 'Zoptavi Tab — Rollout Phases', group: 'Pages' },
  { key: 'about', label: 'About Page', group: 'Pages' },
  { key: 'aboutValues', label: 'About Page — Our Values', group: 'Pages' },
  { key: 'aboutSteps', label: 'About Page — How We Work Steps', group: 'Pages' },
  { key: 'careers', label: 'Careers Page — Text', group: 'Pages' },
  { key: 'careersRoles', label: 'Careers Page — Open Roles', group: 'Pages' },
  { key: 'careersPerks', label: 'Careers Page — Why Join Perks', group: 'Pages' },
  { key: 'careersHiring', label: 'Careers Page — How We Hire Steps', group: 'Pages' },
  { key: 'contact', label: 'Contact Page', group: 'Pages' },
  { key: 'faq', label: 'FAQ', group: 'Site-wide' },
  { key: 'portfolio', label: 'Our Work — Store Cards & Images', group: 'Site-wide' },
  { key: 'nav', label: 'Navigation Menu', group: 'Site-wide' },
  { key: 'siteContact', label: 'Contact Info (Address, Phone, Email)', group: 'Site-wide' },
  { key: 'services', label: 'Pricing Tables', group: 'Site-wide' },
  { key: 'analytics', label: 'Analytics', group: 'Overview' },
] as const;
type SectionKey = typeof SECTIONS[number]['key'];

// One-line explanation shown at the top of each section so it's clear what
// it controls and where it shows up on the live site — no guessing required.
const SECTION_HINTS: Partial<Record<SectionKey, string>> = {
  dashboard: 'A live snapshot of your site — traffic, and how much content you have in each section.',
  home: "Controls the hero text and the intro text above the homepage's \"Our Work\" cards. To change the two Work card images/names/links themselves, use \"Portfolio / Our Work\" below.",
  servicesPage: 'Controls the title, description, bullet points and photo for each of the 5 service blocks on the /services page (Website, Marketing, Zoptavi Tab, Studio, Fulfilment).',
  billPage: 'Controls the hero text and bottom CTA note on the /zoptavi-tab page.',
  billPillars: 'Controls the 3 "Why it works" cards near the top of the /zoptavi-tab page (Works offline, Multi-store live stock, Runs on what they own).',
  billPricing: 'Controls the pricing table (Free / Shop / Multi-Store / Chain plans) on the /zoptavi-tab page.',
  billPhases: 'Controls the "What it does, phase by phase" cards on the /zoptavi-tab page. Each phase is a list of bullet items — one per line.',
  about: 'Controls the hero, "The story" text, "Our values" heading, mission heading/body, "How we work" heading, and the bottom CTA heading/subtext on the /about page.',
  aboutValues: 'Controls the 4 "Our values" cards on the /about page.',
  aboutSteps: 'Controls the 5 "How we work" step cards on the /about page.',
  careers: 'Controls the hero text, "Why join" heading/body, open-roles intro line, "How we hire" heading, and the bottom CTA heading/subtext on the /careers page.',
  careersRoles: 'Controls the list of open job roles shown on the /careers page.',
  careersPerks: 'Controls the 4 "Why join" cards (Real ownership, Ship every week, etc.) on the /careers page.',
  careersHiring: 'Controls the 3 "How we hire" step cards on the /careers page.',
  contact: 'Controls the hero text on the /contact page.',
  faq: 'Controls the FAQ list shown on the homepage and wherever FAQs are used site-wide.',
  portfolio: 'Controls every client shown in "Our Work" on the homepage and on the /work page — name, category, description, website link, and the background photo for each card. Add or edit entries here to change what appears in those cards.',
  nav: 'Controls the links shown in the top navigation menu.',
  siteContact: 'Controls the address, phone number and email shown in the "Looking for us?" side menu, the Contact page, and every WhatsApp / call / email button site-wide (Home, Services, Careers, Zoptavi Tab, About, Footer). One change here updates all of them.',
  services: 'Controls the core-services list and internal pricing reference tables (used on Home/About).',
  analytics: 'Read-only: pageviews and CTA clicks tracked on the live site over the last 30 days.',
};

export default function Admin() {
  const [authed, setAuthed] = useState(!!getToken());

  if (!WORKER_URL) {
    return (
      <div className="admin-theme" style={{ minHeight: '100vh', background: colors.bg, color: colors.text, fontFamily: colors.fBody, padding: 40 }}>
        <Seo title="Admin" description="Zoptavi admin panel." path="/admin" noindex />
        <div style={{ ...card, maxWidth: 560, margin: '40px auto' }}>
          <h2 style={{ marginBottom: 8, fontFamily: colors.fHead }}>Admin not connected yet</h2>
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(username.trim(), password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="admin-theme"
      style={{
        minHeight: '100vh', background: colors.bg, color: colors.text, fontFamily: colors.fBody,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
    >
      <Seo title="Admin" description="Zoptavi admin panel." path="/admin" noindex />
      <form onSubmit={submit} style={{ ...card, width: 360, maxWidth: '100%' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: colors.gradient, marginBottom: 14 }} />
        <h2 style={{ marginBottom: 4, fontFamily: colors.fHead, fontSize: 20 }}>Zoptavi Admin Panel</h2>
        <p style={{ color: colors.muted, fontSize: 12.5, marginBottom: 18 }}>Sign in with your admin ID and password.</p>
        <label style={label}>User ID</label>
        <input type="text" autoComplete="username" placeholder="Admin user ID" value={username} onChange={e => setUsername(e.target.value)} style={{ ...input, marginBottom: 12 }} autoFocus />
        <label style={label}>Password</label>
        <input type="password" autoComplete="current-password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ ...input, marginBottom: 12 }} />
        {error && <p style={{ color: colors.danger, fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button type="submit" style={{ ...btnPrimary, width: '100%' }} disabled={busy}>{busy ? 'Checking…' : 'Log in'}</button>
      </form>
    </div>
  );
}

const SITE_URL = 'https://zoptavi.com';

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<SectionKey>('dashboard');
  const [navOpen, setNavOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const currentLabel = SECTIONS.find(s => s.key === section)?.label || 'Dashboard';

  function go(s: SectionKey) {
    setSection(s);
    setNavOpen(false);
  }

  return (
    <div className="admin-theme admin-shell" style={{ minHeight: '100vh', background: colors.bg, color: colors.text, fontFamily: colors.fBody, display: 'flex' }}>
      <Seo title="Admin" description="Zoptavi admin panel." path="/admin" noindex />
      <div className={`admin-backdrop${navOpen ? ' is-open' : ''}`} onClick={() => setNavOpen(false)} />

      <aside
        className={`admin-sidebar${navOpen ? ' is-open' : ''}`}
        style={{ width: collapsed ? 64 : 224, flexShrink: 0, background: colors.card, borderRight: `1px solid ${colors.border}`, padding: collapsed ? '16px 8px' : '16px 12px', display: 'flex', flexDirection: 'column', transition: 'width .15s ease' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 6px 18px', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: colors.gradient, flexShrink: 0 }} />
          {!collapsed && <strong style={{ fontSize: 14, fontFamily: colors.fHead }}>Admin Panel</strong>}
          <button
            onClick={() => setCollapsed(c => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="admin-collapse-btn"
            style={{ ...iconBtn, marginLeft: collapsed ? 0 : 'auto' }}
          >
            {collapsed ? '»' : '«'}
          </button>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {(['Overview', 'Pages', 'Site-wide'] as const).map(group => (
            <div key={group} style={{ marginBottom: 10 }}>
              {!collapsed && (
                <div style={{ fontSize: 10, fontWeight: 600, color: colors.muted, textTransform: 'uppercase', letterSpacing: '.06em', padding: '8px 8px 4px' }}>
                  {group}
                </div>
              )}
              {SECTIONS.filter(s => s.group === group).map(s => (
                <button
                  key={s.key}
                  onClick={() => go(s.key)}
                  title={collapsed ? s.label : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left', padding: collapsed ? '9px 0' : '8px 10px', borderRadius: 8, cursor: 'pointer',
                    fontSize: 13, fontWeight: section === s.key ? 600 : 400,
                    background: section === s.key ? colors.accentBg : 'transparent',
                    color: section === s.key ? colors.accent : colors.text,
                    borderLeft: section === s.key ? `3px solid ${colors.accent}` : '3px solid transparent',
                    border: 'none', justifyContent: collapsed ? 'center' : 'flex-start',
                  }}
                >
                  {collapsed ? s.label.slice(0, 1) : s.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <a href={SITE_URL} target="_blank" rel="noreferrer" style={{ ...btnGhost, marginTop: 8, textAlign: 'center', textDecoration: 'none', display: 'block' }}>
          {collapsed ? '↗' : 'Back to Store ↗'}
        </a>
        <button onClick={onLogout} style={{ ...btnGhost, marginTop: 8 }}>{collapsed ? '⏻' : 'Log out'}</button>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div className="admin-topbar" style={{ background: colors.card, borderBottom: `1px solid ${colors.border}` }}>
          <button
            onClick={() => setNavOpen(o => !o)}
            aria-label="Open menu"
            style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 8, background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <span style={{ width: 20, height: 2, background: colors.text, borderRadius: 2 }} />
            <span style={{ width: 20, height: 2, background: colors.text, borderRadius: 2 }} />
            <span style={{ width: 20, height: 2, background: colors.text, borderRadius: 2 }} />
          </button>
          <strong style={{ fontFamily: colors.fHead, fontSize: 14 }}>{currentLabel}</strong>
          <div style={{ width: 24, height: 24, borderRadius: 8, background: colors.gradient }} />
        </div>

        <div
          className="admin-header-desktop"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', borderBottom: `1px solid ${colors.border}`, background: colors.card, position: 'sticky', top: 0, zIndex: 10 }}
        >
          <span style={{ fontSize: 13, color: colors.muted }}>
            Admin <span style={{ color: colors.border }}>/</span> <strong style={{ color: colors.text, fontFamily: colors.fHead }}>{currentLabel}</strong>
          </span>
          <a
            href={SITE_URL} target="_blank" rel="noreferrer"
            style={{ background: '#111827', color: '#fff', borderRadius: 999, padding: '7px 16px', fontSize: 12.5, fontWeight: 600, textDecoration: 'none' }}
          >
            View Site ↗
          </a>
        </div>

        <main className="admin-main" style={{ flex: 1, padding: '28px 32px', maxWidth: 900, overflowY: 'auto' }}>
          {SECTION_HINTS[section] && (
            <div style={{ background: colors.accentBg, border: `1px solid ${colors.accentBorder}`, borderRadius: 10, padding: '10px 14px', marginBottom: 18, fontSize: 12.5, color: '#92400e', lineHeight: 1.55 }}>
              {SECTION_HINTS[section]}
            </div>
          )}
          {section === 'dashboard' && <DashboardHome onNavigate={setSection} />}
        {section === 'home' && <PageContentEditor page="home" title="Home Content" />}
        {section === 'servicesPage' && <PageContentEditor page="services" title="Our Services Page" />}
        {section === 'billPage' && <PageContentEditor page="zoptavi-bill" title="Zoptavi Tab Page" />}
        {section === 'billPillars' && <BillPillarsEditor />}
        {section === 'billPricing' && <BillPricingEditor />}
        {section === 'billPhases' && <BillPhasesEditor />}
        {section === 'about' && <PageContentEditor page="about" title="About Content" />}
        {section === 'aboutValues' && <AboutValuesEditor />}
        {section === 'aboutSteps' && <AboutStepsEditor />}
        {section === 'careers' && <PageContentEditor page="careers" title="Careers Content" />}
        {section === 'careersRoles' && <CareerRolesEditor />}
        {section === 'careersPerks' && <CareersPerksEditor />}
        {section === 'careersHiring' && <CareersHiringEditor />}
        {section === 'contact' && <PageContentEditor page="contact" title="Contact Content" />}
        {section === 'faq' && <FaqEditor />}
        {section === 'portfolio' && <PortfolioEditor />}
        {section === 'nav' && <NavEditor />}
        {section === 'siteContact' && <PageContentEditor page="site" title="Contact Info" />}
        {section === 'services' && <ServicesEditor />}
        {section === 'analytics' && <AnalyticsView />}
        </main>
      </div>
    </div>
  );
}

function StatCard({ label: lbl, value, tint, onClick }: { label: string; value: number | string; tint: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      style={{
        ...card, marginBottom: 0, textAlign: 'left', cursor: onClick ? 'pointer' : 'default',
        display: 'flex', alignItems: 'center', gap: 12, width: '100%',
      }}
    >
      <div style={{ width: 40, height: 40, borderRadius: 10, background: tint, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 21, fontWeight: 600, fontFamily: colors.fHead, lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{lbl}</div>
      </div>
      {onClick && <span style={{ color: colors.border, fontSize: 18 }}>›</span>}
    </button>
  );
}

function DashboardHome({ onNavigate }: { onNavigate: (s: SectionKey) => void }) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [faqCount, setFaqCount] = useState<number | null>(null);
  const [portfolioCount, setPortfolioCount] = useState<number | null>(null);
  const [rolesCount, setRolesCount] = useState<number | null>(null);
  const [navCount, setNavCount] = useState<number | null>(null);

  useEffect(() => {
    fetchAnalytics().then(setAnalytics).catch(() => {});
    fetchFaqs().then(d => setFaqCount(d.length)).catch(() => {});
    fetchPortfolio().then(d => setPortfolioCount(d.length)).catch(() => {});
    fetchCareerRoles().then(d => setRolesCount(d.length)).catch(() => {});
    fetchNav().then(d => setNavCount(d.length)).catch(() => {});
  }, []);
  const pageviews = analytics?.totals.find(t => t.type === 'pageview')?.count || 0;
  const clicks = analytics?.totals.find(t => t.type === 'click')?.count || 0;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h2 style={{ fontSize: 20 }}>Dashboard</h2>
          <p style={{ color: colors.muted, fontSize: 13, marginTop: 2 }}>Everything on the live site, in one place.</p>
        </div>
        <button onClick={() => onNavigate('home')} style={btnPrimary}>Edit Home Page</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
        <StatCard label="Pageviews (30d)" value={pageviews} tint={colors.accentBg} />
        <StatCard label="CTA clicks (30d)" value={clicks} tint={colors.accentBg} />
        <StatCard label="FAQ entries" value={faqCount ?? '—'} tint="#eff6ff" onClick={() => onNavigate('faq')} />
        <StatCard label="Portfolio items" value={portfolioCount ?? '—'} tint="#eff6ff" onClick={() => onNavigate('portfolio')} />
        <StatCard label="Career open roles" value={rolesCount ?? '—'} tint="#f0fdf4" onClick={() => onNavigate('careersRoles')} />
        <StatCard label="Navigation links" value={navCount ?? '—'} tint="#f0fdf4" onClick={() => onNavigate('nav')} />
      </div>

      <div style={{ ...card, marginBottom: 20 }}>
        <h3 style={{ marginBottom: 12, fontSize: 14 }}>Quick actions</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <button onClick={() => onNavigate('home')} style={btnPrimary}>Edit Home Page</button>
          <button onClick={() => onNavigate('portfolio')} style={btnGhost}>Add Portfolio Item</button>
          <button onClick={() => onNavigate('careersRoles')} style={btnGhost}>Add Open Role</button>
          <button onClick={() => onNavigate('analytics')} style={btnGhost}>View Analytics</button>
        </div>
      </div>

      <div style={card}>
        <h3 style={{ marginBottom: 12, fontSize: 14 }}>All sections</h3>
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
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => { fetchContentFields(page).then(setFields).catch(() => {}); }, [page]);

  function update(key: string, value: string) {
    setFields(fs => fs.map(f => (f.key === key ? { ...f, value } : f)));
  }

  async function onImagePick(key: string, file: File | undefined) {
    if (!file) return;
    setUploading(key);
    try {
      const imgKey = await uploadImage(file);
      update(key, imgKey);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(null);
    }
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
            {f.type === 'textarea' && (
              <textarea style={{ ...input, minHeight: 70 }} value={f.value} onChange={e => update(f.key, e.target.value)} />
            )}
            {f.type === 'image' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {f.value && <img src={mediaUrl(f.value)} alt="" style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', border: `1px solid ${colors.border}` }} />}
                <input type="file" accept="image/*" onChange={e => onImagePick(f.key, e.target.files?.[0])} style={{ fontSize: 12 }} />
                {uploading === f.key && <span style={{ fontSize: 12, color: colors.muted }}>Uploading…</span>}
              </div>
            )}
            {f.type !== 'textarea' && f.type !== 'image' && (
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
    try { await saveFaqs(items); setStatus('Saved ✓'); }
    catch (err) { setStatus(err instanceof Error ? err.message : 'Save failed'); }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>FAQ</h2>
      {items.map((f, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={label}>Question {i + 1}</label>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => move(i, -1)} disabled={i === 0} style={iconBtn} aria-label="Move up">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === items.length - 1} style={iconBtn} aria-label="Move down">↓</button>
              <button onClick={() => remove(i)} style={btnDanger}>Remove</button>
            </div>
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
  function move(i: number, dir: -1 | 1) {
    setItems(list => {
      const next = [...list];
      const j = i + dir;
      if (j < 0 || j >= next.length) return list;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

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
      <h2 style={{ marginBottom: 18 }}>Portfolio / Our Work — store cards</h2>
      {items.map((p, i) => (
        <div key={p.key} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={label}>Store {i + 1}{p.name ? ` — ${p.name}` : ''}</label>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => move(i, -1)} disabled={i === 0} style={iconBtn} aria-label="Move up">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === items.length - 1} style={iconBtn} aria-label="Move down">↓</button>
              <button onClick={() => remove(i)} style={btnDanger}>Remove</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <input style={input} value={p.name} onChange={e => update(i, 'name', e.target.value)} placeholder="Name" />
            <input style={input} value={p.category} onChange={e => update(i, 'category', e.target.value)} placeholder="Category" />
            <input style={input} value={p.url || ''} onChange={e => update(i, 'url', e.target.value)} placeholder="Website URL" />
            <input style={input} value={p.tier || ''} onChange={e => update(i, 'tier', e.target.value)} placeholder="Tier (e.g. Store Pro)" />
          </div>
          <textarea style={{ ...input, minHeight: 60, marginBottom: 10 }} value={p.blurb} onChange={e => update(i, 'blurb', e.target.value)} placeholder="Description" />
          <label style={label}>Card background image (the photo shown behind this card on the homepage "Our Work" section and the /work page)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: colors.bg, border: `1px dashed ${colors.border}`, borderRadius: 8, padding: 10 }}>
            {p.imageKey
              ? <img src={mediaUrl(p.imageKey)} alt="" style={{ width: 72, height: 72, borderRadius: 8, objectFit: 'cover', border: `1px solid ${colors.border}`, flexShrink: 0 }} />
              : <div style={{ width: 72, height: 72, borderRadius: 8, background: colors.card, border: `1px solid ${colors.border}`, flexShrink: 0, display: 'grid', placeItems: 'center', fontSize: 10, color: colors.muted, textAlign: 'center' }}>No image yet</div>}
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
// Careers open roles editor
// ---------------------------------------------------------------------------
function CareerRolesEditor() {
  const [items, setItems] = useState<CareerRole[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => { fetchCareerRoles().then(setItems).catch(() => {}); }, []);

  function update(i: number, field: keyof CareerRole, value: string) {
    setItems(list => list.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)));
  }
  function remove(i: number) { setItems(list => list.filter((_, idx) => idx !== i)); }
  function add() { setItems(list => [...list, { title: '', type: 'Full-time', place: 'Hyderabad', blurb: '' }]); }
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
    try { await saveCareerRoles(items); setStatus('Saved ✓'); }
    catch (err) { setStatus(err instanceof Error ? err.message : 'Save failed'); }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>Careers — Open Roles</h2>
      {items.map((r, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={label}>Role {i + 1}</label>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => move(i, -1)} disabled={i === 0} style={iconBtn} aria-label="Move up">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === items.length - 1} style={iconBtn} aria-label="Move down">↓</button>
              <button onClick={() => remove(i)} style={btnDanger}>Remove</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <input style={input} value={r.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Title (e.g. Full-Stack Developer)" />
            <input style={input} value={r.type} onChange={e => update(i, 'type', e.target.value)} placeholder="Type (e.g. Full-time, Internship)" />
            <input style={{ ...input, gridColumn: '1 / -1' }} value={r.place} onChange={e => update(i, 'place', e.target.value)} placeholder="Location (e.g. Hyderabad · Hybrid)" />
          </div>
          <textarea style={{ ...input, minHeight: 60 }} value={r.blurb} onChange={e => update(i, 'blurb', e.target.value)} placeholder="Description" />
        </div>
      ))}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={add} style={btnGhost}>+ Add role</button>
        <button onClick={save} style={btnPrimary}>Save changes</button>
        {status && <span style={{ fontSize: 13, color: colors.muted }}>{status}</span>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Careers — "Why join" perks editor
// ---------------------------------------------------------------------------
function CareersPerksEditor() {
  const [items, setItems] = useState<CareersPerk[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => { fetchCareersPerks().then(setItems).catch(() => {}); }, []);

  function update(i: number, field: keyof CareersPerk, value: string) {
    setItems(list => list.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)));
  }
  function remove(i: number) { setItems(list => list.filter((_, idx) => idx !== i)); }
  function add() { setItems(list => [...list, { title: '', detail: '' }]); }
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
    try { await saveCareersPerks(items); setStatus('Saved ✓'); }
    catch (err) { setStatus(err instanceof Error ? err.message : 'Save failed'); }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>Careers — Why Join Perks</h2>
      {items.map((p, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={label}>Perk {i + 1}</label>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => move(i, -1)} disabled={i === 0} style={iconBtn} aria-label="Move up">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === items.length - 1} style={iconBtn} aria-label="Move down">↓</button>
              <button onClick={() => remove(i)} style={btnDanger}>Remove</button>
            </div>
          </div>
          <input style={{ ...input, marginBottom: 10 }} value={p.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Title (e.g. Real ownership)" />
          <textarea style={{ ...input, minHeight: 60 }} value={p.detail} onChange={e => update(i, 'detail', e.target.value)} placeholder="Detail" />
        </div>
      ))}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={add} style={btnGhost}>+ Add perk</button>
        <button onClick={save} style={btnPrimary}>Save changes</button>
        {status && <span style={{ fontSize: 13, color: colors.muted }}>{status}</span>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Careers — "How we hire" steps editor
// ---------------------------------------------------------------------------
function CareersHiringEditor() {
  const [items, setItems] = useState<CareersHiringStep[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => { fetchCareersHiringSteps().then(setItems).catch(() => {}); }, []);

  function update(i: number, field: keyof CareersHiringStep, value: string) {
    setItems(list => list.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)));
  }
  function remove(i: number) { setItems(list => list.filter((_, idx) => idx !== i)); }
  function add() { setItems(list => [...list, { title: '', detail: '' }]); }
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
    try { await saveCareersHiringSteps(items); setStatus('Saved ✓'); }
    catch (err) { setStatus(err instanceof Error ? err.message : 'Save failed'); }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>Careers — How We Hire Steps</h2>
      {items.map((s, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={label}>Step {i + 1}</label>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => move(i, -1)} disabled={i === 0} style={iconBtn} aria-label="Move up">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === items.length - 1} style={iconBtn} aria-label="Move down">↓</button>
              <button onClick={() => remove(i)} style={btnDanger}>Remove</button>
            </div>
          </div>
          <input style={{ ...input, marginBottom: 10 }} value={s.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Title (e.g. Send your work)" />
          <textarea style={{ ...input, minHeight: 60 }} value={s.detail} onChange={e => update(i, 'detail', e.target.value)} placeholder="Detail" />
        </div>
      ))}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={add} style={btnGhost}>+ Add step</button>
        <button onClick={save} style={btnPrimary}>Save changes</button>
        {status && <span style={{ fontSize: 13, color: colors.muted }}>{status}</span>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// About — "Our values" editor
// ---------------------------------------------------------------------------
function AboutValuesEditor() {
  const [items, setItems] = useState<AboutValue[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => { fetchAboutValues().then(setItems).catch(() => {}); }, []);

  function update(i: number, field: keyof AboutValue, value: string) {
    setItems(list => list.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)));
  }
  function remove(i: number) { setItems(list => list.filter((_, idx) => idx !== i)); }
  function add() { setItems(list => [...list, { title: '', detail: '' }]); }
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
    try { await saveAboutValues(items); setStatus('Saved ✓'); }
    catch (err) { setStatus(err instanceof Error ? err.message : 'Save failed'); }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>About — Our Values</h2>
      {items.map((v, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={label}>Value {i + 1}</label>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => move(i, -1)} disabled={i === 0} style={iconBtn} aria-label="Move up">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === items.length - 1} style={iconBtn} aria-label="Move down">↓</button>
              <button onClick={() => remove(i)} style={btnDanger}>Remove</button>
            </div>
          </div>
          <input style={{ ...input, marginBottom: 10 }} value={v.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Title (e.g. We own the whole chain)" />
          <textarea style={{ ...input, minHeight: 60 }} value={v.detail} onChange={e => update(i, 'detail', e.target.value)} placeholder="Detail" />
        </div>
      ))}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={add} style={btnGhost}>+ Add value</button>
        <button onClick={save} style={btnPrimary}>Save changes</button>
        {status && <span style={{ fontSize: 13, color: colors.muted }}>{status}</span>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// About — "How we work" steps editor
// ---------------------------------------------------------------------------
function AboutStepsEditor() {
  const [items, setItems] = useState<AboutStep[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => { fetchAboutSteps().then(setItems).catch(() => {}); }, []);

  function update(i: number, field: keyof AboutStep, value: string) {
    setItems(list => list.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)));
  }
  function remove(i: number) { setItems(list => list.filter((_, idx) => idx !== i)); }
  function add() { setItems(list => [...list, { title: '', detail: '' }]); }
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
    try { await saveAboutSteps(items); setStatus('Saved ✓'); }
    catch (err) { setStatus(err instanceof Error ? err.message : 'Save failed'); }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>About — How We Work Steps</h2>
      {items.map((s, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={label}>Step {i + 1}</label>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => move(i, -1)} disabled={i === 0} style={iconBtn} aria-label="Move up">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === items.length - 1} style={iconBtn} aria-label="Move down">↓</button>
              <button onClick={() => remove(i)} style={btnDanger}>Remove</button>
            </div>
          </div>
          <input style={{ ...input, marginBottom: 10 }} value={s.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Title (e.g. Talk)" />
          <textarea style={{ ...input, minHeight: 60 }} value={s.detail} onChange={e => update(i, 'detail', e.target.value)} placeholder="Detail" />
        </div>
      ))}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={add} style={btnGhost}>+ Add step</button>
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
// Zoptavi Tab — pillars editor
// ---------------------------------------------------------------------------
function BillPillarsEditor() {
  const [items, setItems] = useState<BillPillar[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => { fetchBillPillars().then(setItems).catch(() => {}); }, []);

  function update(i: number, field: keyof BillPillar, value: string) {
    setItems(list => list.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)));
  }
  function remove(i: number) { setItems(list => list.filter((_, idx) => idx !== i)); }
  function add() { setItems(list => [...list, { title: '', detail: '' }]); }
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
    try { await saveBillPillars(items); setStatus('Saved ✓'); }
    catch (err) { setStatus(err instanceof Error ? err.message : 'Save failed'); }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>Zoptavi Tab — Pillars</h2>
      {items.map((p, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={label}>Pillar {i + 1}</label>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => move(i, -1)} disabled={i === 0} style={iconBtn} aria-label="Move up">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === items.length - 1} style={iconBtn} aria-label="Move down">↓</button>
              <button onClick={() => remove(i)} style={btnDanger}>Remove</button>
            </div>
          </div>
          <input style={{ ...input, marginBottom: 10 }} value={p.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Title (e.g. Works offline)" />
          <textarea style={{ ...input, minHeight: 60 }} value={p.detail} onChange={e => update(i, 'detail', e.target.value)} placeholder="Detail" />
        </div>
      ))}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={add} style={btnGhost}>+ Add pillar</button>
        <button onClick={save} style={btnPrimary}>Save changes</button>
        {status && <span style={{ fontSize: 13, color: colors.muted }}>{status}</span>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Zoptavi Tab — pricing table editor
// ---------------------------------------------------------------------------
function BillPricingEditor() {
  const [items, setItems] = useState<BillPricingTier[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => { fetchBillPricing().then(setItems).catch(() => {}); }, []);

  function update(i: number, field: keyof BillPricingTier, value: string) {
    setItems(list => list.map((it, idx) => (idx === i ? { ...it, [field]: field === 'perYear' ? Number(value) || 0 : value } : it)));
  }
  function remove(i: number) { setItems(list => list.filter((_, idx) => idx !== i)); }
  function add() { setItems(list => [...list, { name: '', stores: '1', users: '1', features: '', perYear: 0 }]); }
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
    try { await saveBillPricing(items); setStatus('Saved ✓'); }
    catch (err) { setStatus(err instanceof Error ? err.message : 'Save failed'); }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>Zoptavi Tab — Pricing Table</h2>
      {items.map((p, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={label}>Plan {i + 1}</label>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => move(i, -1)} disabled={i === 0} style={iconBtn} aria-label="Move up">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === items.length - 1} style={iconBtn} aria-label="Move down">↓</button>
              <button onClick={() => remove(i)} style={btnDanger}>Remove</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
            <input style={input} value={p.name} onChange={e => update(i, 'name', e.target.value)} placeholder="Plan name (e.g. Shop)" />
            <input style={input} value={p.stores} onChange={e => update(i, 'stores', e.target.value)} placeholder="Stores (e.g. 1, up to 3)" />
            <input style={input} value={p.users} onChange={e => update(i, 'users', e.target.value)} placeholder="Users" />
          </div>
          <input style={{ ...input, marginBottom: 10 }} value={p.features} onChange={e => update(i, 'features', e.target.value)} placeholder="Key features" />
          <label style={label}>Price per year (₹, use 0 for Free)</label>
          <input style={input} type="number" value={p.perYear} onChange={e => update(i, 'perYear', e.target.value)} />
        </div>
      ))}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={add} style={btnGhost}>+ Add plan</button>
        <button onClick={save} style={btnPrimary}>Save changes</button>
        {status && <span style={{ fontSize: 13, color: colors.muted }}>{status}</span>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Zoptavi Tab — rollout phases editor
// ---------------------------------------------------------------------------
function BillPhasesEditor() {
  const [items, setItems] = useState<BillPhase[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => { fetchBillPhases().then(setItems).catch(() => {}); }, []);

  function updatePhase(i: number, value: string) {
    setItems(list => list.map((it, idx) => (idx === i ? { ...it, phase: value } : it)));
  }
  function updateItems(i: number, value: string) {
    setItems(list => list.map((it, idx) => (idx === i ? { ...it, items: value.split('\n') } : it)));
  }
  function remove(i: number) { setItems(list => list.filter((_, idx) => idx !== i)); }
  function add() { setItems(list => [...list, { phase: '', items: [] }]); }
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
    try {
      await saveBillPhases(items.map(p => ({ ...p, items: p.items.map(s => s.trim()).filter(Boolean) })));
      setStatus('Saved ✓');
    } catch (err) { setStatus(err instanceof Error ? err.message : 'Save failed'); }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 18 }}>Zoptavi Tab — Rollout Phases</h2>
      {items.map((p, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={label}>Phase {i + 1}</label>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => move(i, -1)} disabled={i === 0} style={iconBtn} aria-label="Move up">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === items.length - 1} style={iconBtn} aria-label="Move down">↓</button>
              <button onClick={() => remove(i)} style={btnDanger}>Remove</button>
            </div>
          </div>
          <input style={{ ...input, marginBottom: 10 }} value={p.phase} onChange={e => updatePhase(i, e.target.value)} placeholder="Phase name (e.g. Phase 1 — Core billing)" />
          <label style={label}>Items (one per line)</label>
          <textarea style={{ ...input, minHeight: 100 }} value={p.items.join('\n')} onChange={e => updateItems(i, e.target.value)} placeholder="One bullet item per line" />
        </div>
      ))}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={add} style={btnGhost}>+ Add phase</button>
        <button onClick={save} style={btnPrimary}>Save changes</button>
        {status && <span style={{ fontSize: 13, color: colors.muted }}>{status}</span>}
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

  useEffect(() => {
    fetch(`${WORKER_URL}/api/services`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: ServicesData) => { if (d && Array.isArray(d.coreServices)) setData(d); })
      .catch(() => { /* keep static fallback */ });
  }, []);

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
