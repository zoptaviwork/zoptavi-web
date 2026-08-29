import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Reveal from '../components/Reveal';
import { marketFacts, coreServices } from '../data/business';

export default function About() {
  return (
    <div style={{ background: '#fff' }}>
      {/* Hero */}
      <section className="section-black" style={{ background: 'linear-gradient(160deg,#070b12 0%,#101f33 55%,#070b12 100%)', padding: 'var(--s-8) 0 var(--s-7)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(700px 380px at 85% -10%,rgba(0,201,200,.18),transparent 60%),radial-gradient(600px 320px at 5% 110%,rgba(255,106,0,.14),transparent 60%)', pointerEvents: 'none' }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 'var(--s-5)', alignItems: 'center' }}>
            <div>
              <span className="badge-teal">THE BUSINESS</span>
              <h1 className="giant-h1" style={{ fontSize: 'clamp(28px,4vw,42px)', margin: '16px 0' }}>What <span className="gradient-text">Zoptavi</span> is</h1>
              <p style={{ fontSize: 15, color: 'var(--on-dark-2)', lineHeight: 1.75, marginBottom: 'var(--s-2)' }}>
                Zoptavi takes a small business fully online and keeps it running. Competitors sell one piece — a website, or software, or reels.
                Zoptavi sells the whole chain: one relationship, one invoice, and recurring revenue from every client.
              </p>
              <div className="glass-card" style={{ padding: 'var(--s-3)', background: 'rgba(255,255,255,.06)', border: '1px solid var(--hairline-strong)', marginTop: 'var(--s-3)', display: 'flex', gap: 'var(--s-2)', alignItems: 'center' }}>
                <div style={{ width: 46, height: 46, borderRadius: 'var(--r-sm)', background: 'var(--grad-orange)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M8 12h8M12 8v8" /></svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 15, color: '#fff', margin: 0 }}>The pitch, in one line</p>
                  <p style={{ fontSize: 13.5, color: 'var(--on-dark-2)', margin: '2px 0 0' }}>"You run the business. We handle the website, the billing, the content, the ads and the shipping. One team, one bill, one WhatsApp number."</p>
                </div>
              </div>
            </div>
            <div className="glass-card" style={{ padding: '8px 20px', background: 'rgba(255,255,255,.05)', border: '1px solid var(--hairline-strong)' }}>
              {coreServices.map(s => (
                <div key={s.key} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '13px 4px', borderBottom: '1px solid var(--hairline)' }}>
                  <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 13.5, color: '#fff' }}>{s.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--on-dark-3)', textAlign: 'right' }}>{s.revenueType}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market data */}
      <section className="sec tight" style={{ background: 'var(--gray-light)' }}>
        <div className="wrap">
          <Reveal><div className="sec-head"><div><span className="badge-orange">THE MARKET</span><h2 style={{ marginTop: 'var(--s-1)' }}>Verified market data</h2></div></div></Reveal>
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
          <h2 style={{ marginTop: 'var(--s-1)' }}>Shiprocket and WareIQ need 200+ orders a month to onboard a seller</h2>
          <p style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.7, marginTop: 'var(--s-2)' }}>
            Brands doing 10–80 orders a month — roughly 80% of Instagram sellers — have no professional option at all.
            Zoptavi starts at 10 orders. That segment has effectively zero competition.
          </p>
          <div style={{ marginTop: 'var(--s-4)' }}>
            <Link to="/work" className="pines-btn pines-btn-primary">See our live stores →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
