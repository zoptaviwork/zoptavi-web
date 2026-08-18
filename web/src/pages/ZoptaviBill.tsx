import { billPillars, billPricing, billPhases, zoptaviPay } from '../data/business';

export default function ZoptaviBill() {
  return (
    <div style={{ background: '#fff' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(160deg,#0F172A 0%,#132a44 60%,#0F172A 100%)', padding: '60px 0 50px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(650px 340px at 90% 0%,rgba(0,201,200,.16),transparent 60%)' }} />
        <div className="wrap" style={{ position: 'relative', textAlign: 'center' }}>
          <span className="badge-teal">ZOPTAVI BILL</span>
          <h1 style={{ color: '#fff', fontSize: 'clamp(28px,4vw,44px)', margin: '16px 0 12px' }}>Billing software that never stops working</h1>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 15.5, maxWidth: 620, margin: '0 auto 26px' }}>
            Works without internet. Prints on any ₹3,400 thermal printer. Shows live stock across every branch from the owner's phone. Free with every website, until you outgrow it.
          </p>
          <a href="https://wa.me/917842646888" target="_blank" rel="noreferrer" className="btn btn-cta shimmer">Get Zoptavi Bill Free →</a>
        </div>
      </section>

      {/* 3 pillars */}
      <section className="sec">
        <div className="wrap">
          <div className="biz-grid-3">
            {billPillars.map((p, i) => (
              <div key={p.title} className="pillar-card">
                <div className="pillar-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 17, color: 'var(--navy)', margin: '10px 0 8px' }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6, margin: 0 }}>{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenario */}
      <section className="sec tight">
        <div className="wrap">
          <div className="flash-head" style={{ background: 'linear-gradient(120deg,#E6FAFA,#FFFCF7)', border: '1px solid #B8E3E1' }}>
            <div className="lt">
              <div className="ic" style={{ background: 'var(--grad-teal)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 10 12 3l9 7" /><path d="M5 9v11h14V9" /></svg>
              </div>
              <div>
                <p style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 15.5, color: 'var(--navy)', margin: 0 }}>"Size L is out here — but Kondapur has 8."</p>
                <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '2px 0 0' }}>Instead of losing the sale, staff check the app and book it from another branch on the spot. One recovered sale pays for a year of subscription.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature phases */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><h2>What it does, phase by phase</h2></div>
          <div className="biz-grid-3">
            {billPhases.map(ph => (
              <div key={ph.phase} className="surface" style={{ padding: 22 }}>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 15, color: 'var(--teal-deep)', margin: '0 0 14px' }}>{ph.phase}</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {ph.items.map((it, i) => (
                    <li key={i} style={{ display: 'flex', gap: 8, fontSize: 12.5, color: '#334155', lineHeight: 1.5 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal-deep)" strokeWidth="3" style={{ flexShrink: 0, marginTop: 3 }}><path d="M20 6 9 17l-5-5" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="sec tight" style={{ background: 'var(--gray-light)' }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="badge-orange">PRICING — PER STORE, NOT PER STORAGE</span>
              <h2 style={{ marginTop: 10 }}>Free to start. Pay when you scale.</h2>
            </div>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <thead><tr><th>Plan</th><th>Stores</th><th>Users</th><th>Key features</th><th>Per year</th></tr></thead>
              <tbody>
                {billPricing.map(p => (
                  <tr key={p.name}>
                    <td style={{ fontWeight: 700 }}>{p.name}</td>
                    <td>{p.stores}</td>
                    <td>{p.users}</td>
                    <td>{p.features}</td>
                    <td className="num">{p.perYear === 0 ? 'Free' : `₹${p.perYear.toLocaleString('en-IN')}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Zoptavi Pay */}
      <section className="sec">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }} className="biz-grid-2">
            <div>
              <span className="badge-teal">CHECKOUT, BRANDED</span>
              <h2 style={{ marginTop: 10, marginBottom: 14 }}>{zoptaviPay.name} — {zoptaviPay.strapline}</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {zoptaviPay.howItWorks.map((h, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#334155', lineHeight: 1.6 }}>
                    <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: 'var(--grad-teal)', color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'Poppins', fontWeight: 700, fontSize: 11 }}>{i + 1}</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card" style={{ padding: 24, background: 'linear-gradient(135deg,#0F172A,#1e3a5f)', border: 'none' }}>
              <p style={{ color: '#00C9C8', fontFamily: 'Poppins', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em', margin: '0 0 10px' }}>Why not our own gateway?</p>
              <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>{zoptaviPay.whyNotOwnGateway}</p>
              <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['UPI', 'Cards', 'Net Banking', 'Wallets', 'EMI'].map(m => (
                  <span key={m} style={{ background: 'rgba(255,255,255,.1)', color: '#fff', fontSize: 11, fontFamily: 'Poppins', fontWeight: 600, padding: '5px 10px', borderRadius: 8 }}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec tight">
        <div className="wrap">
          <div style={{ background: 'var(--grad-orange)', borderRadius: 20, padding: '36px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ color: '#fff', fontSize: 22 }}>Every Zoptavi website comes with Zoptavi Bill, free.</h2>
              <p style={{ color: 'rgba(255,255,255,.9)', fontSize: 13.5, margin: '6px 0 0' }}>Install in 20 minutes. Upgrade only once you have more than one store.</p>
            </div>
            <a href="https://wa.me/917842646888" target="_blank" rel="noreferrer" className="pines-btn" style={{ background: '#fff', color: 'var(--orange)', flexShrink: 0 }}>Start Free →</a>
          </div>
        </div>
      </section>
    </div>
  );
}
