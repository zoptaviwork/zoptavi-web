import { motion } from 'motion/react';
import Reveal, { RevealStagger, revealItem } from '../components/Reveal';
import { portfolio, competitorComparison } from '../data/business';
import '../styles/messold-home.css';

const cols = ['Freelancer', 'Agency', 'Vyapar', 'Shopify', 'Zoptavi'] as const;
const cell = (v: boolean) => (v ? <span className="yes">✓</span> : <span className="no">—</span>);

export default function Work() {
  return (
    <div className="ms-home">
      {/* ===================== HERO ===================== */}
      <section className="ms-page-hero">
        <div className="ms-wrap">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="ms-badge">Live Stores</span>
            <h1>Not our first store,<br />not our <span className="ms-accent">last</span>.</h1>
            <p>One team, one technology backbone, many platforms. Here's what's already running on Zoptavi today.</p>
          </motion.div>
        </div>
      </section>

      {/* ===================== PORTFOLIO ===================== */}
      <section className="ms-section tight">
        <div className="ms-wrap">
          <RevealStagger className="ms-grid-2" gap={0.12}>
            {portfolio.map(p => (
              <motion.a
                key={p.key}
                variants={revealItem}
                whileHover={{ y: -5 }}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="ms-card lift"
                style={{ display: 'block' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                  <div
                    style={{
                      width: 54, height: 54, borderRadius: 14, flexShrink: 0,
                      background: 'var(--ms-grad-purple)', display: 'grid', placeItems: 'center',
                      color: '#fff', fontFamily: 'var(--ms-f-head)', fontWeight: 700, fontSize: 22,
                    }}
                  >
                    {p.name[0]}
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>{p.name}</h3>
                    <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'var(--ms-grey-50)' }}>{p.category}</p>
                  </div>
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--ms-grey-63)', lineHeight: 1.65, margin: '0 0 18px' }}>{p.blurb}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="ms-badge">{p.tier}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ms-accent)', fontFamily: 'var(--ms-f-head)', fontWeight: 700, fontSize: 13 }}>
                    Visit site
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M7 7h10v10" /></svg>
                  </span>
                </div>
              </motion.a>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===================== THE NETWORK ===================== */}
      <section className="ms-section tight alt center">
        <div className="ms-wrap">
          <Reveal>
            <span className="ms-badge">One platform, many platforms</span>
            <h2 style={{ margin: '16px 0 14px', fontSize: 'clamp(1.7rem,3.3vw,2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              The Zoptavi Network
            </h2>
            <p style={{ color: 'var(--ms-grey-63)', fontSize: 15, lineHeight: 1.75 }}>
              Every store above runs on the same backbone — Zoptavi Build for the storefront, Zoptavi Bill for
              stock and billing, and Zoptavi Pay for a single branded checkout across every one of them. Onboard
              with us and your store joins a network that's already live, not a first attempt.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== COMPARISON ===================== */}
      <section className="ms-section tight">
        <div className="ms-wrap">
          <Reveal className="ms-sec-head">
            <h2>Where Zoptavi wins</h2>
            <p>The whole chain from one team — not five vendors, and not a monthly rent you never stop paying.</p>
          </Reveal>
          <Reveal>
            <div className="ms-table-scroll">
              <table className="ms-table">
                <thead>
                  <tr>
                    <th>Capability</th>
                    {cols.map(c => <th key={c} style={{ textAlign: 'center' }}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {competitorComparison.map(row => (
                    <tr key={row.capability}>
                      <td className="name">{row.capability}</td>
                      <td style={{ textAlign: 'center' }}>{cell(row.freelancer)}</td>
                      <td style={{ textAlign: 'center' }}>{cell(row.agency)}</td>
                      <td style={{ textAlign: 'center' }}>{cell(row.vyapar)}</td>
                      <td style={{ textAlign: 'center' }}>{cell(row.shopify)}</td>
                      <td style={{ textAlign: 'center' }}>{cell(row.zoptavi)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
