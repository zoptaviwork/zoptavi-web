import { Link } from 'react-router-dom';
import { coreServices, portfolio } from '../data/business';

export default function Footer() {
  return (
    <footer style={{ background: '#070b12', color: '#cbd5e1', padding: '0 0 24px' }}>
      {/* Proof of scale strip */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.02)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '30px 24px' }}>
          <p style={{ color: '#94a3b8', fontSize: 12, fontFamily: 'Poppins', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 16 }}>
            Not our first store — the Zoptavi Network, live today
          </p>
          <div className="trust-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18 }}>
            {portfolio.map(p => (
              <a key={p.key} href={p.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 13, textDecoration: 'none', padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', transition: '.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,201,200,.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.04)')}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--r-sm)', background: 'linear-gradient(135deg,rgba(0,201,200,.2),rgba(0,122,118,.12))', display: 'grid', placeItems: 'center', color: 'var(--teal)', flexShrink: 0, fontFamily: 'Poppins', fontWeight: 800 }}>
                  {p.name[0]}
                </div>
                <div>
                  <p style={{ color: '#fff', fontFamily: 'Poppins', fontWeight: 700, fontSize: 13.5, margin: 0 }}>{p.name}</p>
                  <p style={{ color: '#94a3b8', fontSize: 11.5, margin: 0 }}>{p.category} · live on Zoptavi Store Pro</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 24px 0' }}>
        <div className="zfoot-cols" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ marginBottom: 18 }}>
              <img src="/zoptavi-logo-v5.png" alt="Zoptavi" style={{ height: 46, width: 'auto', display: 'block' }} />
            </div>
            <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7, maxWidth: 300 }}>
              We take a small business fully online and keep it running — website, billing software, content, ads and fulfilment. One team, one bill, one WhatsApp number.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {['Instagram', 'WhatsApp', 'LinkedIn'].map(s => (
                <a key={s} href="#" aria-label={s} title={s}
                  style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,.08)', display: 'grid', placeItems: 'center', color: '#cbd5e1', textDecoration: 'none', transition: 'all .2s', fontSize: 11, fontFamily: 'Poppins', fontWeight: 700 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--teal)'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,.08)'; (e.currentTarget as HTMLAnchorElement).style.color = '#cbd5e1'; }}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 style={{ color: '#fff', fontSize: 15, fontFamily: 'Poppins', fontWeight: 700, marginBottom: 18 }}>Services</h5>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {coreServices.map(s => (
                <li key={s.key} style={{ marginBottom: 10 }}>
                  <Link to={s.key === 'bill' ? '/zoptavi-bill' : '/services'} style={{ fontSize: 14, color: '#cbd5e1', textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 style={{ color: '#fff', fontSize: 15, fontFamily: 'Poppins', fontWeight: 700, marginBottom: 18 }}>Company</h5>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {[
                { l: 'About Zoptavi', to: '/about' },
                { l: 'Our Work', to: '/work' },
                { l: 'Pricing', to: '/services' },
                { l: 'Zoptavi Pay', to: '/zoptavi-bill' },
                { l: 'Contact', to: '/contact' },
              ].map(item => (
                <li key={item.l} style={{ marginBottom: 10 }}>
                  <Link to={item.to} style={{ fontSize: 14, color: '#cbd5e1', textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}>
                    {item.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="zfoot-bottom" style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>© 2026–2027 Zoptavi. Hyderabad. Payments secured by Zoptavi Pay, powered by Razorpay Route / Cashfree.</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['UPI', 'Cards', 'Net Banking', 'Wallets'].map(p => (
              <span key={p} style={{ background: '#fff', color: 'var(--navy)', fontWeight: 700, fontFamily: 'Poppins', fontSize: 10, padding: '4px 8px', borderRadius: 6 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
