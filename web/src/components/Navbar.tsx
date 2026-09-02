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
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const path = location.pathname;
  const isActive = (to: string) => (to === '/' ? path === '/' : path.startsWith(to));

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 120,
        background: scrolled ? 'rgba(7,9,13,.82)' : '#070b12',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,.45)' : 'none',
        borderBottom: '1px solid rgba(255,255,255,.08)',
        transition: 'background .25s, box-shadow .25s',
      }}
    >
      {/* Top strip — desktop only */}
      <div
        className="mob-hide"
        style={{
          color: 'rgba(255,255,255,.55)',
          fontSize: 12,
          fontFamily: 'Poppins',
          fontWeight: 500,
          borderBottom: '1px solid rgba(255,255,255,.06)',
        }}
      >
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '9px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '.02em' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="2"><path d="M9 12l2 2 4-4M12 2 4 5v6c0 5.5 3.8 10 8 11 4.2-1 8-5.5 8-11V5l-8-3z" /></svg>
            One team, one bill — website, billing, content, ads &amp; shipping
          </span>
          <span style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <a href="tel:+918978605027" style={{ color: 'rgba(255,255,255,.55)' }}>89786 05027</a>
            <Link to="/contact" style={{ color: '#fff', fontWeight: 600 }}>Get a Quote</Link>
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, minHeight: 68 }}>
        <Link to="/" className="nav-logo" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/zoptavi-logo-v5.png" alt="Zoptavi" style={{ height: 34, width: 'auto' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="mob-hide" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {links.map(l => {
            const active = isActive(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  fontFamily: 'Poppins', fontWeight: 600, fontSize: 12.5, padding: '10px 14px', minHeight: 40,
                  display: 'inline-flex', alignItems: 'center', borderRadius: 999,
                  textTransform: 'uppercase', letterSpacing: '.05em',
                  color: active ? '#fff' : 'rgba(255,255,255,.56)',
                  background: active ? 'rgba(255,255,255,.1)' : 'transparent',
                  transition: 'color .2s, background .2s', whiteSpace: 'nowrap',
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="mob-hide" style={{ flexShrink: 0 }}>
          <a href="https://wa.me/918978605027" target="_blank" rel="noreferrer" className="pill-outline" style={{ padding: '10px 20px', fontSize: 13 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.4 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.2-.7-2.7-1.1-4.4-3.9-4.6-4.1-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.3-.5.5-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.5.3.1.2.1.6-.1 1.2z" /></svg>
            WhatsApp Us
          </a>
        </div>

        {/* Mobile: MENU label + toggle */}
        <button
          className="mob-only"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{
            display: 'none', alignItems: 'center', gap: 10,
            border: 'none', background: 'transparent', padding: '8px 4px 8px 12px', cursor: 'pointer',
            fontFamily: 'Poppins', fontWeight: 700, fontSize: 12, letterSpacing: '.16em',
            textTransform: 'uppercase', color: '#fff',
          }}
        >
          {open ? 'Close' : 'Menu'}
          <span style={{ position: 'relative', width: 22, height: 14, display: 'inline-block' }}>
            <span style={{ position: 'absolute', left: 0, right: 0, height: 2, borderRadius: 2, background: '#fff', top: open ? 6 : 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .25s, top .25s' }} />
            <span style={{ position: 'absolute', left: 0, right: 0, height: 2, borderRadius: 2, background: '#fff', top: 6, opacity: open ? 0 : 1, transition: 'opacity .2s' }} />
            <span style={{ position: 'absolute', left: 0, right: 0, height: 2, borderRadius: 2, background: '#fff', top: open ? 6 : 12, transform: open ? 'rotate(-45deg)' : 'none', transition: 'transform .25s, top .25s' }} />
          </span>
        </button>
      </div>

      {/* Mobile full-screen overlay menu */}
      {open && (
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: 69,
          bottom: 0,
          background: 'linear-gradient(180deg,#070b12,#0a0f18)',
          padding: '18px 22px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          zIndex: 119,
          overflowY: 'auto',
        }}
      >
        <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', margin: '4px 4px 12px' }}>
          Navigate
        </p>
        {links.map(l => {
          const active = isActive(l.to);
          return (
            <Link
              key={l.to}
              to={l.to}
              style={{
                fontFamily: 'Poppins', fontWeight: 700, fontSize: 19, padding: '15px 6px', borderRadius: 12,
                color: active ? '#fff' : 'rgba(255,255,255,.66)',
                borderBottom: '1px solid rgba(255,255,255,.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}
            >
              {l.label}
              {active && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#a163d6' }} />}
            </Link>
          );
        })}
        <a
          href="https://wa.me/918978605027"
          target="_blank"
          rel="noreferrer"
          className="btn"
          style={{ marginTop: 22, width: '100%', background: '#fff', color: '#0b0b0d', boxShadow: '0 10px 30px rgba(255,255,255,.14)' }}
        >
          WhatsApp Us — 89786 05027
        </a>
        <a href="tel:+918978605027" style={{ textAlign: 'center', marginTop: 14, color: 'rgba(255,255,255,.5)', fontFamily: 'Poppins', fontWeight: 600, fontSize: 13 }}>
          Or call us directly
        </a>
      </div>
      )}
    </header>
  );
}
