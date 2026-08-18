import { Link } from 'react-router-dom';
import { marketFacts, coreServices } from '../data/business';

export default function About() {
  return (
    <div style={{ background: '#fff' }}>
      {/* Hero */}
      <section className="sec">
        <div className="wrap">
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 40, alignItems: 'center' }}>
            <div>
              <span className="badge-teal">THE BUSINESS</span>
              <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', margin: '14px 0 16px' }}>What Zoptavi is</h1>
              <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 14 }}>
                Zoptavi takes a small business fully online and keeps it running. Competitors sell one piece — a website, or software, or reels.
                Zoptavi sells the whole chain: one relationship, one invoice, and recurring revenue from every client.
              </p>
              <div className="flash-head" style={{ background: 'linear-gradient(120deg,#FFF1E6,#FFFCF7)', border: '1px solid #FFE0C2', marginTop: 20 }}>
                <div className="lt">
                  <div className="ic" style={{ background: 'var(--grad-orange)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M8 12h8M12 8v8" /></svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 15, color: 'var(--navy)', margin: 0 }}>The pitch, in one line</p>
                    <p style={{ fontSize: 13.5, color: 'var(--text-2)', margin: '2px 0 0' }}>"You run the business. We handle the website, the billing, the content, the ads and the shipping. One team, one bill, one WhatsApp number."</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {coreServices.map(s => (
                <div key={s.key} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '13px 4px', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 13.5, color: 'var(--navy)' }}>{s.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-2)', textAlign: 'right' }}>{s.revenueType}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Market data */}
      <section className="sec tight" style={{ background: 'var(--gray-light)' }}>
        <div className="wrap">
          <div className="sec-head"><div><span className="badge-orange">THE MARKET</span><h2 style={{ marginTop: 10 }}>Verified market data</h2></div></div>
          <div className="table-scroll">
            <table className="data-table">
              <thead><tr><th>Fact</th><th>Figure</th><th>Source</th></tr></thead>
              <tbody>
                {marketFacts.map(m => (
                  <tr key={m.fact}><td style={{ fontWeight: 600 }}>{m.fact}</td><td className="num">{m.figure}</td><td>{m.source}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Gap */}
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
          <span className="badge-teal">THE GAP NOBODY FILLS</span>
          <h2 style={{ marginTop: 12 }}>Shiprocket and WareIQ need 200+ orders a month to onboard a seller</h2>
          <p style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.7, marginTop: 12 }}>
            Brands doing 10–80 orders a month — roughly 80% of Instagram sellers — have no professional option at all.
            Zoptavi starts at 10 orders. That segment has effectively zero competition.
          </p>
          <div style={{ marginTop: 26 }}>
            <Link to="/work" className="pines-btn pines-btn-primary">See our live stores →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
