import { motion } from 'motion/react';
import Reveal, { RevealStagger, revealItem } from '../components/Reveal';
import { portfolio, competitorComparison } from '../data/business';

export default function Work() {
  return (
    <div style={{ background: '#fff' }}>
      <section className="section-black" style={{ padding: 'var(--s-8) 0 var(--s-7)' }}>
        <div className="orb orb-1" style={{ width: 360, height: 360, background: 'rgba(0,201,200,.12)', top: -130, left: -90 }} />
        <div className="wrap" style={{ textAlign: 'center', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="live-badge"><span className="dot" /> LIVE STORES</span>
            <h1 className="giant-h1" style={{ fontSize: 'clamp(28px,4vw,42px)', margin: '16px auto 12px', maxWidth: 640 }}>Not our first store, not our last</h1>
            <p style={{ color: 'var(--on-dark-2)', fontSize: 15, maxWidth: 600, margin: '0 auto' }}>
              One team, one technology backbone, many platforms. Here's what's already running on Zoptavi.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <RevealStagger className="biz-grid-2" gap={0.12}>
            {portfolio.map(p => (
              <motion.a key={p.key} variants={revealItem} whileHover={{ y: -5 }} href={p.url} target="_blank" rel="noreferrer" className="surface" style={{ padding: 'var(--s-3)', textDecoration: 'none', display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-2)' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 'var(--r-sm)', background: 'var(--grad-teal)', display: 'grid', placeItems: 'center', color: '#fff', fontFamily: 'Poppins', fontWeight: 800, fontSize: 22, flexShrink: 0 }}>{p.name[0]}</div>
                  <div>
                    <h3 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 20, color: 'var(--navy)', margin: 0 }}>{p.name}</h3>
                    <p style={{ fontSize: 12.5, color: 'var(--text-2)', margin: '2px 0 0' }}>{p.category}</p>
                  </div>
                </div>
                <p style={{ fontSize: 13.5, color: '#334155', lineHeight: 1.65, margin: '0 0 16px' }}>{p.blurb}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="badge-teal">{p.tier}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--teal-deep)', fontFamily: 'Poppins', fontWeight: 700, fontSize: 13 }}>
                    Visit site <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M7 7h10v10" /></svg>
                  </span>
                </div>
              </motion.a>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Multi-platform positioning */}
      <section className="sec tight" style={{ background: 'var(--gray-light)' }}>
        <div className="wrap" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <Reveal>
            <span className="badge-orange">ONE PLATFORM, MANY PLATFORMS</span>
            <h2 style={{ marginTop: 'var(--s-1)' }}>The Zoptavi Network</h2>
            <p style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.7, marginTop: 'var(--s-2)' }}>
              Every store above runs on the same backbone — Zoptavi Build for the storefront, Zoptavi Bill for stock and billing,
              and Zoptavi Pay for a single branded checkout across every one of them. Onboard with us and your store joins a
              network that's already live, not a first attempt.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Comparison table */}
      <section className="sec">
        <div className="wrap">
          <Reveal><div className="sec-head"><h2>Where Zoptavi wins</h2></div></Reveal>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr><th>Capability</th><th>Freelancer</th><th>Agency</th><th>Vyapar</th><th>Shopify</th><th>Zoptavi</th></tr>
              </thead>
              <tbody>
                {competitorComparison.map(row => (
                  <tr key={row.capability}>
                    <td style={{ fontWeight: 700 }}>{row.capability}</td>
                    <td>{row.freelancer ? <span className="check-yes">Yes</span> : <span className="check-no">No</span>}</td>
                    <td>{row.agency ? <span className="check-yes">Yes</span> : <span className="check-no">No</span>}</td>
                    <td>{row.vyapar ? <span className="check-yes">Yes</span> : <span className="check-no">No</span>}</td>
                    <td>{row.shopify ? <span className="check-yes">Yes</span> : <span className="check-no">No</span>}</td>
                    <td><span className="check-yes">Yes</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
