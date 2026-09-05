import { motion } from 'motion/react';
import Reveal, { RevealStagger, revealItem } from '../components/Reveal';
import ShinyText from '../components/reactbits/ShinyText';
import { SpotlightDiv } from '../components/reactbits/SpotlightCard';
import { useLiveContent } from '../lib/adminApi';
import '../styles/messold-home.css';

const defaultHeadline = 'Build the stack that puts Hyderabad’s shops online.';

const WHATSAPP = 'https://wa.me/918978605027';
const MAIL = 'mailto:hello@zoptavi.com?subject=Careers%20at%20Zoptavi';

const roles = [
  {
    title: 'Full-Stack Developer',
    type: 'Full-time',
    place: 'Hyderabad · Hybrid',
    blurb: 'React + Supabase. You’ll ship client storefronts, the billing PWA and the branded-checkout layer — real products with real users, not tickets.',
  },
  {
    title: 'Content Creator / Videographer',
    type: 'Full-time',
    place: 'Hyderabad · On-site',
    blurb: 'Shoot and edit reels, product photography and the occasional drone shoot for client brands. Made to sell, on a schedule that actually runs.',
  },
  {
    title: 'Performance Marketing Associate',
    type: 'Full-time',
    place: 'Hyderabad · Hybrid',
    blurb: 'Own Meta ad accounts end to end — setup, creative testing, weekly ROI reporting. You’ll see spend turn into orders across every client.',
  },
  {
    title: 'Operations & Fulfilment',
    type: 'Full-time',
    place: 'Hyderabad · On-site',
    blurb: 'Pick, pack and dispatch from our floor for brands under 200 orders a month. Keep tracking flowing and customers updated automatically.',
  },
  {
    title: 'Design Intern',
    type: 'Internship',
    place: 'Hyderabad · Hybrid',
    blurb: 'Work on storefront UI, brand kits and social creative alongside the build team. Six months, paid, with a full-time path.',
  },
];

const perks = [
  { t: 'Real ownership', d: 'You run an account or a product area, not a checklist someone hands you.' },
  { t: 'Ship every week', d: 'Small team, short feedback loops. What you build is live in days, not quarters.' },
  { t: 'Learn every service', d: 'Sit next to build, billing, content, ads and fulfilment — see the whole business.' },
  { t: 'Hyderabad-first', d: 'Local team, hybrid where the role allows, no pretending we’re a remote-only startup.' },
];

const hiring = [
  { n: '01', t: 'Send your work', d: 'Email hello@zoptavi.com with a portfolio, a repo, an ad account — whatever proves the craft.' },
  { n: '02', t: 'One real conversation', d: 'A call about how you think and a small paid task close to the actual job.' },
  { n: '03', t: 'Decision in a week', d: 'No five-round gauntlet. You’ll know quickly either way.' },
];

export default function Careers() {
  const content = useLiveContent('careers');
  return (
    <div className="ms-home ms-light">
      {/* ===================== HERO ===================== */}
      <section className="ms-page-hero">
        <div className="ms-wrap">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="ms-badge"><ShinyText text={content.hero_eyebrow || 'Careers'} speed={7} /></span>
            <h1>
              {content.hero_headline && content.hero_headline !== defaultHeadline
                ? content.hero_headline
                : <>Build the stack that puts<br />Hyderabad’s shops <span className="ms-accent">online</span>.</>}
            </h1>
            <p>
              {content.hero_subtext || 'Zoptavi runs the whole chain for small businesses — website, billing, checkout, content, ads and shipping. Small team, real products, paying customers from day one. If you want to own something, this is the place.'}
            </p>
            <div className="ms-hero-btns">
              <a href={MAIL} className="ms-btn ms-btn-accent">Send us your work <span className="ms-arrow">→</span></a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== WHY JOIN ===================== */}
      <section className="ms-section tight">
        <div className="ms-wrap">
          <div className="ms-split">
            <Reveal>
              <span className="ms-eyebrow">Why join</span>
              <h2 style={{ margin: '12px 0 16px', fontSize: 'clamp(1.6rem,3.2vw,2.3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                We’d rather be small and own it than big and blurry.
              </h2>
              <p style={{ color: 'var(--ms-grey-63)', fontSize: 14.5, lineHeight: 1.8 }}>
                Every person here touches a live business — a storefront taking orders, an ad account spending
                real money, a shelf being packed. The work is visible, the loop is short, and the customer is a
                real shop owner on the other end of a WhatsApp thread.
              </p>
            </Reveal>
            <RevealStagger className="ms-grid-2" gap={0.09}>
              {perks.map(p => (
                <SpotlightDiv key={p.t} variants={revealItem} className="ms-card lift">
                  <h3 style={{ marginBottom: 6, fontSize: 15.5 }}>{p.t}</h3>
                  <p style={{ color: 'var(--ms-grey-63)', fontSize: 13, lineHeight: 1.6 }}>{p.d}</p>
                </SpotlightDiv>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* ===================== OPEN ROLES ===================== */}
      <section className="ms-section tight alt">
        <div className="ms-wrap">
          <Reveal className="ms-sec-head">
            <span className="ms-eyebrow">Open roles</span>
            <h2 style={{ marginTop: 12 }}>Where we need people</h2>
            <p>All roles are Hyderabad-based. Apply by emailing your work to hello@zoptavi.com.</p>
          </Reveal>
          <RevealStagger style={{ display: 'flex', flexDirection: 'column', gap: 12 }} gap={0.07}>
            {roles.map(r => (
              <motion.div key={r.title} variants={revealItem} className="ms-card">
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <h3 style={{ fontSize: 17, margin: 0 }}>{r.title}</h3>
                  <span className="ms-badge">{r.type}</span>
                  <span style={{ fontSize: 12, color: 'var(--ms-grey-50)', fontFamily: 'var(--ms-f-head)', fontWeight: 600 }}>{r.place}</span>
                </div>
                <p style={{ color: 'var(--ms-grey-63)', fontSize: 13.5, lineHeight: 1.7, marginBottom: 14 }}>{r.blurb}</p>
                <a href={MAIL} className="ms-btn ms-btn-ghost sm">Apply for this role <span className="ms-arrow">→</span></a>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===================== HOW WE HIRE ===================== */}
      <section className="ms-section tight">
        <div className="ms-wrap">
          <Reveal className="ms-sec-head">
            <span className="ms-eyebrow">How we hire</span>
            <h2 style={{ marginTop: 12 }}>Three steps, one week</h2>
          </Reveal>
          <RevealStagger className="ms-grid-3 two-up-md" gap={0.09}>
            {hiring.map(s => (
              <SpotlightDiv key={s.n} variants={revealItem} className="ms-card">
                <span className="ms-num">{s.n}</span>
                <h3 style={{ margin: '14px 0 6px', fontSize: 16 }}>{s.t}</h3>
                <p style={{ color: 'var(--ms-grey-63)', fontSize: 13, lineHeight: 1.6 }}>{s.d}</p>
              </SpotlightDiv>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="ms-cta">
        <div className="ms-wrap">
          <Reveal className="ms-cta-card">
            <h2>Don’t see your role? Tell us what you’d own.</h2>
            <p>If you can point at a part of the business and say “I’d run that better,” we want to hear from you.</p>
            <div className="ms-hero-btns" style={{ justifyContent: 'center' }}>
              <a href={MAIL} className="ms-btn ms-btn-solid">Email hello@zoptavi.com <span className="ms-arrow">→</span></a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="ms-btn ms-btn-ghost">Message on WhatsApp <span className="ms-arrow">→</span></a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
