import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Reveal, { RevealStagger, revealItem } from '../components/Reveal';
import ShinyText from '../components/reactbits/ShinyText';
import { SpotlightDiv } from '../components/reactbits/SpotlightCard';
import { coreServices } from '../data/business';
import '../styles/messold-home.css';

const WHATSAPP = 'https://wa.me/918978605027';

const values = [
  {
    t: 'We own the whole chain',
    d: 'Website, billing, checkout, content, ads and shipping — one team, one bill. No hand-offs, no "that’s not our part".',
  },
  {
    t: 'We stay after the launch',
    d: 'No freelancer who disappears once the invoice clears. We’re on the same WhatsApp thread a year later.',
  },
  {
    t: 'We price it honestly',
    d: 'Ad spend goes straight to Meta. Payments settle on RBI-licensed aggregators. Our fee is separate and quoted up front.',
  },
  {
    t: 'We build for the small shop',
    d: 'The brand doing 10–80 orders a month that no agency or 3PL will touch. That’s who Zoptavi is for.',
  },
];

const steps = [
  { n: '01', t: 'Talk', d: 'Tell us your business on WhatsApp. Fifteen minutes, no deck.' },
  { n: '02', t: 'Sample', d: 'We send a real homepage built for you — free, usually within a day.' },
  { n: '03', t: 'Build', d: 'Store, billing and branded checkout go live, wired together from day one.' },
  { n: '04', t: 'Launch', d: 'Content and Meta ads switch on. First orders usually land within 48 hours.' },
  { n: '05', t: 'Run', d: 'One monthly bill. We keep it online, updated, promoted and shipping.' },
];

export default function About() {
  return (
    <div className="ms-home ms-light">
      {/* ===================== HERO ===================== */}
      <section className="ms-page-hero">
        <div className="ms-wrap">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="ms-badge"><ShinyText text="Who We Are" speed={7} /></span>
            <h1>The team that keeps<br />you <span className="ms-accent">online</span>.</h1>
            <p>
              Zoptavi is a Hyderabad company that takes a small business fully online and keeps it running.
              Most vendors sell one piece — a website, or software, or reels. We run the whole chain on one
              relationship and one invoice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===================== STORY ===================== */}
      <section className="ms-section tight">
        <div className="ms-wrap">
          <div className="ms-split">
            <Reveal>
              <span className="ms-eyebrow">The story</span>
              <h2 style={{ margin: '12px 0 16px', fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Started in 2026, for the businesses everyone else skips.
              </h2>
              <p style={{ color: 'var(--ms-grey-63)', fontSize: 14.5, lineHeight: 1.8, marginBottom: 14 }}>
                Around 80% of Instagram sellers in India run on DMs, screenshots and a personal UPI ID. Agencies
                want a retainer they can’t afford. Shipping partners won’t onboard them below 200 orders a
                month. Software makes them a project manager for five different vendors.
              </p>
              <p style={{ color: 'var(--ms-grey-63)', fontSize: 14.5, lineHeight: 1.8 }}>
                Zoptavi was built to be the one team that does all of it — build the store, bill the sales,
                brand the checkout, make the content, run the ads, pack the orders — and stays on WhatsApp
                after you’ve paid.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <SpotlightDiv className="ms-card">
                <h3 style={{ marginBottom: 6 }}>Five services, one relationship</h3>
                <p style={{ margin: '0 0 8px', color: 'var(--ms-grey-63)', fontSize: 13.5 }}>
                  Each one earns on its own. Together they’re the whole chain.
                </p>
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

      {/* ===================== VALUES ===================== */}
      <section className="ms-section tight alt">
        <div className="ms-wrap">
          <Reveal className="ms-sec-head">
            <span className="ms-eyebrow">What we stand for</span>
            <h2 style={{ marginTop: 12 }}>Our values</h2>
          </Reveal>
          <RevealStagger className="ms-grid-2" gap={0.1}>
            {values.map(v => (
              <SpotlightDiv key={v.t} variants={revealItem} className="ms-card lift">
                <h3 style={{ marginBottom: 8 }}>{v.t}</h3>
                <p style={{ color: 'var(--ms-grey-63)', fontSize: 13.5, lineHeight: 1.7 }}>{v.d}</p>
              </SpotlightDiv>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===================== MISSION ===================== */}
      <section className="ms-section tight center">
        <div className="ms-wrap">
          <Reveal>
            <span className="ms-eyebrow">Our mission</span>
            <h2 style={{ margin: '14px 0 16px', fontSize: 'clamp(1.6rem,3.4vw,2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Put every small Indian business online — properly, and keep it there.
            </h2>
            <p style={{ color: 'var(--ms-grey-63)', fontSize: 15, lineHeight: 1.75, maxWidth: '62ch', margin: '0 auto' }}>
              Not a template dumped on the customer. A real storefront, real billing, a branded checkout and a
              team that answers on WhatsApp — for the price of the freelancer they were about to hire.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== HOW WE WORK ===================== */}
      <section className="ms-section tight">
        <div className="ms-wrap">
          <Reveal className="ms-sec-head">
            <span className="ms-eyebrow">How we work</span>
            <h2 style={{ marginTop: 12 }}>Five steps, one team</h2>
          </Reveal>
          <RevealStagger style={{ display: 'flex', flexDirection: 'column', gap: 12 }} gap={0.08}>
            {steps.map(s => (
              <motion.div
                key={s.n}
                variants={revealItem}
                className="ms-card"
                style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}
              >
                <span className="ms-num" style={{ flexShrink: 0 }}>{s.n}</span>
                <div>
                  <h3 style={{ fontSize: 16, marginBottom: 4 }}>{s.t}</h3>
                  <p style={{ color: 'var(--ms-grey-63)', fontSize: 13.5, lineHeight: 1.6 }}>{s.d}</p>
                </div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="ms-cta">
        <div className="ms-wrap">
          <Reveal className="ms-cta-card">
            <h2>One paying client this week beats a perfect plan this month.</h2>
            <p>Send us your business type and we’ll reply with a sample built for you — free, no obligation.</p>
            <div className="ms-hero-btns" style={{ justifyContent: 'center' }}>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="ms-btn ms-btn-solid">
                Message Us on WhatsApp <span className="ms-arrow">→</span>
              </a>
              <Link to="/work" className="ms-btn ms-btn-ghost">See our live stores <span className="ms-arrow">→</span></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
