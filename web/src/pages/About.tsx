import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Reveal from '../components/Reveal';
import ShinyText from '../components/reactbits/ShinyText';
import { SpotlightDiv } from '../components/reactbits/SpotlightCard';
import { marketFacts, coreServices } from '../data/business';
import '../styles/messold-home.css';

export default function About() {
  return (
    <div className="ms-home">
      {/* ===================== HERO ===================== */}
      <section className="ms-page-hero">
        <div className="ms-wrap">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="ms-badge"><ShinyText text="The Business" speed={7} /></span>
            <h1>What <span className="ms-accent">Zoptavi</span> is.</h1>
            <p>
              Zoptavi takes a small business fully online and keeps it running. Competitors sell one piece — a
              website, or software, or reels. Zoptavi sells the whole chain: one relationship, one invoice, and
              recurring revenue from every client.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===================== PITCH + SERVICES ===================== */}
      <section className="ms-section tight">
        <div className="ms-wrap">
          <div className="ms-split">
            <Reveal>
              <div className="ms-callout" style={{ marginBottom: 22 }}>
                <strong>The pitch, in one line</strong>
                <p>
                  "You run the business. We handle the website, the billing, the content, the ads and the
                  shipping. One team, one bill, one WhatsApp number."
                </p>
              </div>
              <p style={{ color: 'var(--ms-grey-63)', fontSize: 14.5, lineHeight: 1.75 }}>
                No freelancer disappearing after launch. No juggling five vendors. Zoptavi builds it, bills it,
                posts it, promotes it and ships it — and stays on the same WhatsApp thread after you've paid.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <SpotlightDiv className="ms-card">
                <h3 style={{ marginBottom: 6 }}>Five services, one relationship</h3>
                <p style={{ margin: '0 0 8px' }}>Each earns on its own; together they're the whole chain.</p>
                <ul>
                  {coreServices.map(s => (
                    <li
                      key={s.key}
                      style={{
                        display: 'flex', justifyContent: 'space-between', gap: 12,
                        padding: '13px 0', borderBottom: '1px solid var(--ms-line)',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--ms-f-head)', fontWeight: 600, fontSize: 13.5, color: 'var(--ms-white)' }}>{s.name}</span>
                      <span style={{ fontSize: 12, color: 'var(--ms-grey-50)', textAlign: 'right' }}>{s.revenueType}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightDiv>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== MARKET DATA ===================== */}
      <section className="ms-section tight alt">
        <div className="ms-wrap">
          <Reveal className="ms-sec-head">
            <span className="ms-badge">The Market</span>
            <h2 style={{ marginTop: 14 }}>Verified market data</h2>
          </Reveal>
          <Reveal>
            <div className="ms-table-scroll">
              <table className="ms-table">
                <thead><tr><th>Fact</th><th style={{ textAlign: 'right' }}>Figure</th><th>Source</th></tr></thead>
                <tbody>
                  {marketFacts.map(m => (
                    <tr key={m.fact}>
                      <td className="name">{m.fact}</td>
                      <td className="num">{m.figure}</td>
                      <td>{m.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== THE GAP ===================== */}
      <section className="ms-section tight center">
        <div className="ms-wrap">
          <Reveal>
            <span className="ms-badge">The gap nobody fills</span>
            <h2 style={{ margin: '16px 0 14px', fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Shiprocket and WareIQ need 200+ orders a month to onboard a seller.
            </h2>
            <p style={{ color: 'var(--ms-grey-63)', fontSize: 15, lineHeight: 1.75 }}>
              Brands doing 10–80 orders a month — roughly 80% of Instagram sellers — have no professional option
              at all. Zoptavi starts at 10 orders. That segment has effectively zero competition.
            </p>
            <div style={{ marginTop: 30 }}>
              <Link to="/work" className="ms-btn ms-btn-ghost">See our live stores <span className="ms-arrow">→</span></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
