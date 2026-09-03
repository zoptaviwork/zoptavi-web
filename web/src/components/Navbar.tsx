import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Our Work', to: '/work' },
  { label: 'Our Services', to: '/services' },
  { label: 'Zoptavi Bill', to: '/zoptavi-bill' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

const WHATSAPP = 'https://wa.me/918978605027';

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const path = location.pathname;
  const isActive = (to: string) => (to === '/' ? path === '/' : path.startsWith(to));

  // Home has a dark full-bleed hero, so the bar can float transparent there
  // until scroll. Every other page is light — keep the bar solid + readable.
  const solid = (scrolled || path !== '/') && !open;

  return (
    <header className={`mnav ${solid ? 'mnav--scrolled' : 'mnav--top'}`} data-open={open}>
      <div className="mnav__bar">
        <Link to="/" className="mnav__logo" aria-label="Zoptavi — home">
          <img src="/zoptavi-logo-v5.png" alt="Zoptavi" />
        </Link>

        <button
          type="button"
          className="mnav__toggle"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-menu"
        >
          <span className="mnav__toggle-label">Menu</span>
          <span className="mnav__toggle-icon" aria-hidden="true">
            {open ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </span>
        </button>
      </div>

      {/* Full-screen overlay menu */}
      <div id="site-menu" className="mmenu" data-open={open} role="dialog" aria-modal="true" aria-hidden={!open}>
        <div className="mmenu__inner">
          <div className="mmenu__left">
            <h2>Looking for us?<br />Here&rsquo;s how to reach out.</h2>

            <div className="mmenu__ci">
              <span className="mmenu__emoji" aria-hidden="true">📍</span>
              <span>
                <span className="mmenu__k">Address</span>
                <span className="mmenu__t">Visit our base</span>
                <span className="mmenu__v">Hyderabad, Telangana, India</span>
              </span>
            </div>

            <div className="mmenu__ci">
              <span className="mmenu__emoji" aria-hidden="true">📞</span>
              <span>
                <span className="mmenu__k">Call us</span>
                <span className="mmenu__t">Speak to the team</span>
                <a className="mmenu__v" href="tel:+918978605027">+91 89786 05027</a>
              </span>
            </div>

            <div className="mmenu__ci">
              <span className="mmenu__emoji" aria-hidden="true">✉️</span>
              <span>
                <span className="mmenu__k">Email us</span>
                <span className="mmenu__t">Drop us a line</span>
                <a className="mmenu__v" href="mailto:hello@zoptavi.com">hello@zoptavi.com</a>
              </span>
            </div>
          </div>

          <div className="mmenu__divider" aria-hidden="true" />

          <nav className="mmenu__right" aria-label="Primary">
            <ul>
              {links.map((l, i) => (
                <li key={l.to} style={{ ['--i' as string]: i }}>
                  <Link to={l.to} className={isActive(l.to) ? 'is-active' : undefined}>
                    <span>{l.label}</span>
                    <span aria-hidden="true" className="mmenu__arrow">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="mmenu__cta">
              <span>WhatsApp Us</span>
              <span aria-hidden="true" className="mmenu__cta-arrow">→</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
