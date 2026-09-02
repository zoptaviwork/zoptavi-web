import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Our Work', to: '/work' },
  { label: 'Our Services', to: '/services' },
  { label: 'Zoptavi Bill', to: '/zoptavi-bill' },
  { label: 'About', to: '/about' },
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

  return (
    <header className={`mnav ${scrolled && !open ? 'mnav--scrolled' : 'mnav--top'}`} data-open={open}>
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
          {open ? 'Close' : 'Menu'}
          <span className="mnav__bars" aria-hidden="true"><span /><span /><span /></span>
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
              WhatsApp Us — 89786 05027 <span aria-hidden="true">→</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
