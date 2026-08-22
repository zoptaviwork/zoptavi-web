import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services & Pricing', to: '/services' },
  { label: 'Zoptavi Bill', to: '/zoptavi-bill' },
  { label: 'Our Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const path = location.pathname;

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#050505', boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,.4)' : 'none', transition: 'box-shadow .25s', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
      {/* Top strip */}
      <div className="mob-hide" style={{ color: 'rgba(255,255,255,.55)', fontSize: 11.5, fontFamily: 'Poppins', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '7px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '.02em' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00C9C8" strokeWidth="2"><path d="M9 12l2 2 4-4M12 2 4 5v6c0 5.5 3.8 10 8 11 4.2-1 8-5.5 8-11V5l-8-3z" /></svg>
            One team, one bill — website, billing, content, ads &amp; shipping
          </span>
          <span style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <a href="tel:+917842646888" style={{ color: 'rgba(255,255,255,.55)' }}>78426 46888</a>
            <Link to="/contact" style={{ color: '#FFA31A', fontWeight: 600 }}>Get a Quote</Link>
          </span>
        </div>
      </div>

      <div>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, minHeight: 72 }}>
          <Link to="/" className="nav-logo" style={{ flexShrink: 0, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img className="nav-logo-img" src="/zoptavi-logo-final.png" alt="Zoptavi" style={{ height: 34, width: 'auto' }} />
          </Link>

          {/* Desktop nav */}
          <nav className="mob-hide" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {links.map(l => {
              const active = l.to === '/' ? path === '/' : path.startsWith(l.to);
              return (
                <Link key={l.to} to={l.to} style={{
                  fontFamily: 'Poppins', fontWeight: 600, fontSize: 12.5, padding: '10px 15px', borderRadius: 999,
                  textTransform: 'uppercase', letterSpacing: '.04em',
                  color: active ? '#fff' : 'rgba(255,255,255,.55)', background: active ? 'rgba(255,255,255,.1)' : 'transparent',
                  textDecoration: 'none', transition: '.2s', whiteSpace: 'nowrap',
                }}>
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="mob-hide" style={{ flexShrink: 0 }}>
            <a href="https://wa.me/917842646888" target="_blank" rel="noreferrer" className="pill-outline" style={{ padding: '10px 20px', fontSize: 13, textDecoration: 'none' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.4 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.2-.7-2.7-1.1-4.4-3.9-4.6-4.1-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.3-.5.5-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.5.3.1.2.1.6-.1 1.2z"/></svg>
              WhatsApp Us
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="mob-only" onClick={() => setOpen(o => !o)} style={{ border: 'none', background: 'transparent', padding: 8, cursor: 'pointer' }} aria-label="Menu">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="mob-only" style={{ flexDirection: 'column', padding: '8px 16px 18px', borderTop: '1px solid rgba(255,255,255,.08)', gap: 4 }}>
            {links.map(l => {
              const active = l.to === '/' ? path === '/' : path.startsWith(l.to);
              return (
                <Link key={l.to} to={l.to} style={{
                  fontFamily: 'Poppins', fontWeight: 600, fontSize: 14.5, padding: '12px 10px', borderRadius: 10,
                  color: active ? '#fff' : 'rgba(255,255,255,.6)', background: active ? 'rgba(255,255,255,.08)' : 'transparent',
                  textDecoration: 'none', display: 'block',
                }}>
                  {l.label}
                </Link>
              );
            })}
            <a href="https://wa.me/917842646888" target="_blank" rel="noreferrer" className="pill-outline" style={{ marginTop: 8, padding: '13px 0', fontSize: 14, textDecoration: 'none', justifyContent: 'center', width: '100%' }}>
              WhatsApp Us — 78426 46888
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
