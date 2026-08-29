import { motion } from 'motion/react';
import Reveal, { RevealStagger, revealItem } from '../components/Reveal';
import { bundles, websiteTiers, carePlans, studioPlans, adsPlans } from '../data/business';

export default function Services() {
  return (
    <div style={{ background: '#fff' }}>
      {/* Header */}
      <section style={{ background: 'var(--navy)', padding: '56px 0 44px' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="badge-orange">SERVICES & PRICING</span>
            <h1 style={{ color: '#fff', fontSize: 'clamp(28px,4vw,42px)', margin: '14px 0 12px' }}>The Zoptavi Bundle — one price, everything</h1>
            <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 15, maxWidth: 620, margin: '0 auto' }}>
              Three packages, one price each, nothing else to explain. Website, billing software, content, ads and support — all included.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bundle table */}
      <section className="sec">
        <div className="wrap">
          <RevealStagger className="biz-grid-3" gap={0.1}>
            {bundles.map(b => (
              <motion.div key={b.key} variants={revealItem} whileHover={{ y: -5 }} className="surface" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid var(--border)', background: b.key === 'growth' ? 'linear-gradient(135deg,#E6FAFA,#fff)' : '#fff' }}>
                  <p style={{ fontSize: 11, fontFamily: 'Poppins', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.06em', margin: '0 0 4px' }}>{b.tagline}</p>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 24, color: 'var(--navy)', margin: '0 0 14px' }}>{b.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 30, color: 'var(--navy)' }}>₹{b.monthlyFee.toLocaleString('en-IN')}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-2)' }}>/month</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: 'var(--text-2)', margin: '4px 0 0' }}>₹{b.setupFee.toLocaleString('en-IN')} setup, one-time</p>
                </div>
                <div style={{ padding: 22 }}>
                  {[
                    ['Website', b.website],
                    ['Payments online', b.payments],
                    ['Billing software', b.billing],
                    ['Reels / content', b.content],
                    ['Meta ads', b.ads],
                    ['Order fulfilment', b.fulfilment],
                    ['Updates & support', b.support],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '9px 0', borderBottom: '1px solid #f1f5f9', fontSize: 12.5 }}>
                      <span style={{ color: 'var(--text-2)', fontWeight: 600 }}>{label}</span>
                      <span style={{ color: val === '—' ? 'var(--text-3)' : 'var(--navy)', fontWeight: 700, textAlign: 'right', maxWidth: '58%' }}>{val}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--gray-light)', borderRadius: 10, fontSize: 12 }}>
                    <span style={{ color: 'var(--text-2)' }}>Bought separately: </span>
                    <span style={{ textDecoration: 'line-through', color: 'var(--text-3)' }}>₹{b.separateYear1.toLocaleString('en-IN')}</span>
                    <span style={{ color: '#16a34a', fontWeight: 700 }}> · You save ₹{b.savings.toLocaleString('en-IN')}/yr</span>
                  </div>
                  <a href="https://wa.me/918978605027" target="_blank" rel="noreferrer" className={b.key === 'growth' ? 'pines-btn pines-btn-primary' : 'pines-btn pines-btn-orange'} style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
                    Choose {b.name}
                  </a>
                </div>
              </motion.div>
            ))}
          </RevealStagger>
          <p style={{ textAlign: 'center', color: 'var(--text-2)', fontSize: 13, marginTop: 22 }}>
            Two-year offer: pay year two upfront and take 15% off it.
          </p>
        </div>
      </section>

      {/* Individual pricing (for reference / à la carte) */}
      <section className="sec tight" style={{ background: 'var(--gray-light)' }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="badge-teal">À LA CARTE</span>
              <h2 style={{ marginTop: 10 }}>Buying individually? Here's every rate.</h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <h3 style={{ fontSize: 16, marginBottom: 10 }}>Websites — build fee</h3>
              <div className="table-scroll">
                <table className="data-table">
                  <thead><tr><th>Package</th><th>Built on</th><th>What you get</th><th>Price</th></tr></thead>
                  <tbody>
                    {websiteTiers.map(t => (
                      <tr key={t.name}><td style={{ fontWeight: 700 }}>{t.name}</td><td>{t.builtOn}</td><td>{t.gets}</td><td className="num">₹{t.price.toLocaleString('en-IN')}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 16, marginBottom: 10 }}>Yearly care plan</h3>
              <div className="table-scroll">
                <table className="data-table">
                  <thead><tr><th>Plan</th><th>Includes</th><th>Per year</th></tr></thead>
                  <tbody>
                    {carePlans.map(c => (
                      <tr key={c.name}><td style={{ fontWeight: 700 }}>{c.name}</td><td>{c.includes}</td><td className="num">₹{c.perYear.toLocaleString('en-IN')}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="biz-grid-2">
              <div>
                <h3 style={{ fontSize: 16, marginBottom: 10 }}>Content — Zoptavi Studio</h3>
                <div className="table-scroll">
                  <table className="data-table">
                    <thead><tr><th>Package</th><th>Monthly</th></tr></thead>
                    <tbody>
                      {studioPlans.map(s => (
                        <tr key={s.name}><td><span style={{ fontWeight: 700 }}>{s.name}</span><br /><span style={{ fontSize: 11.5, color: 'var(--text-2)' }}>{s.gets}</span></td><td className="num">₹{s.monthly.toLocaleString('en-IN')}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 16, marginBottom: 10 }}>Meta Ads — Zoptavi Reach</h3>
                <div className="table-scroll">
                  <table className="data-table">
                    <thead><tr><th>Package</th><th>Their budget</th><th>Our fee</th></tr></thead>
                    <tbody>
                      {adsPlans.map(a => (
                        <tr key={a.name}><td style={{ fontWeight: 700 }}>{a.name}</td><td>{a.budget}</td><td className="num">{typeof a.fee === 'number' ? `₹${a.fee.toLocaleString('en-IN')}` : a.fee}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 11.5, color: 'var(--text-2)', marginTop: 8 }}>Ad spend is always your own money, paid directly to Meta. Our fee is separate.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objections */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><h2>Questions you're probably asking</h2></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { q: '"Someone quoted ₹3,999 for a website."', a: "That's a template with a contact form. Zoptavi Store Pro takes payments, manages your stock, sends GST invoices, and we're here all year. Different product." },
              { q: '"Why not just use Shopify?"', a: 'Shopify is ₹2,000–7,000 every month, forever, plus fees on each sale. Over three years that\'s roughly ₹1.5 lakh and you own nothing. Zoptavi is one payment plus a small yearly care fee.' },
              { q: "\"Can I pay only for the website, not the whole bundle?\"", a: 'Yes — every service on this page is available à la carte. The bundle just works out cheaper if you need more than one piece.' },
            ].map((o, i) => (
              <div key={i} className="surface" style={{ padding: 20 }}>
                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 14.5, color: 'var(--navy)', margin: '0 0 6px' }}>{o.q}</p>
                <p style={{ fontSize: 13.5, color: 'var(--text-2)', margin: 0, lineHeight: 1.6 }}>{o.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
