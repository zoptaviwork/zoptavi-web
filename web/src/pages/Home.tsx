import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Reveal, { RevealStagger, revealItem } from '../components/Reveal';
import { coreServices, portfolio, marketFacts } from '../data/business';
import '../styles/messold-home.css';

const marketIcons: ReactElement[] = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-6" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v20M2 12h20" /><circle cx="12" cy="12" r="9" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 20h5v-2a4 4 0 0 0-3-3.87" /><path d="M9 20H4v-2a4 4 0 0 1 3-3.87" /><circle cx="9" cy="7" r="4" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-6.4-7-11a7 7 0 0 1 14 0c0 4.6-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 21V9l8-6 8 6v12" /><path d="M9 21v-6h6v6" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9h18M3 9l2-5h14l2 5M3 9v10a1 1 0 0 0 1 1h4v-6h8v6h4a1 1 0 0 0 1-1V9" /></svg>,
];

const toolCluster = [
  { label: 'Meta', x: 0, y: 0 },
  { label: 'Google', x: 1, y: 1 },
  { label: 'Instagram', x: 2, y: 0 },
  { label: 'WhatsApp', x: 3, y: 1 },
  { label: 'Razorpay', x: 0, y: 3 },
  { label: 'Cashfree', x: 1, y: 2 },
  { label: 'UPI', x: 2, y: 3 },
  { label: 'GST', x: 3, y: 2 },
];

const faqs = [
  { q: 'What exactly is in the Zoptavi Bundle?', a: 'Website, billing software (Zoptavi Bill), branded checkout (Zoptavi Pay), content, Meta ads and order fulfilment — one monthly bill for whichever pieces you need.' },
  { q: 'Do I have to buy the whole bundle?', a: "No. Every service — website, billing, content, ads, fulfilment — is available à la carte. See full pricing on the Services page." },
  { q: 'How fast can I get online?', a: "Most stores go live within days of signing up, and our clients' stores typically get their first order within 48 hours of launch." },
  { q: "What if I'm doing very few orders a month?", a: "That's exactly who we built this for. Zoptavi starts at 10 orders/month — most shipping partners won't even onboard you below 200." },
];

export default function Home() {
  return (
    <div className="ms-home">
      {/* ===================== HERO ===================== */}
      <section className="ms-hero">
        <div className="ms-hero-bg" />
        <div className="ms-hero-overlay" />
        <div className="ms-wrap ms-hero-content">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="ms-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c9c8', display: 'inline-block' }} /> HYDERABAD · SINCE 2026
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
            You Run The Business.<br />We Handle Everything Online.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}>
            Website, billing software, content, ads and shipping — one team, one bill, one WhatsApp number.
            Zoptavi takes a small business fully online and keeps it running.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }} className="ms-hero-btns">
            <a href="https://wa.me/918978605027" target="_blank" rel="noreferrer" className="ms-btn ms-btn-solid">
              Book Your Free Growth Audit <span className="ms-arrow">→</span>
            </a>
            <Link to="/work" className="ms-btn ms-btn-ghost">See Our Work <span className="ms-arrow">→</span></Link>
          </motion.div>
        </div>
      </section>

      {/* ===================== TRUSTED STACK ===================== */}
      <section className="ms-brands">
        <div className="ms-wrap ms-brands-grid">
          <Reveal className="ms-brands-text">
            <h2>Built On Tools You Already Trust</h2>
            <p>No experimental stack — Zoptavi runs on the same payment, ads and messaging platforms serious brands already use.</p>
            <Link to="/work" className="ms-btn ms-btn-ghost dark">See Our Live Stores <span className="ms-arrow">→</span></Link>
          </Reveal>
          <div className="ms-brands-sliders">
            <div className="ms-slider-row"><div className="ms-slider-track">
              {[...['Razorpay', 'Cashfree', 'Meta Ads', 'Google Ads', 'WhatsApp Business', 'Instagram', 'GST'], ...['Razorpay', 'Cashfree', 'Meta Ads', 'Google Ads', 'WhatsApp Business', 'Instagram', 'GST']].map((t, i) => (
                <span key={i} className="ms-logo-chip">{t}</span>
              ))}
            </div></div>
            <div className="ms-slider-row"><div className="ms-slider-track rev">
              {[...['Live Stock Sync', 'GST Invoicing', 'Thermal Printing', 'Branded Checkout', 'Offline Billing', 'Multi-Store', 'WhatsApp Alerts'], ...['Live Stock Sync', 'GST Invoicing', 'Thermal Printing', 'Branded Checkout', 'Offline Billing', 'Multi-Store', 'WhatsApp Alerts']].map((t, i) => (
                <span key={i} className="ms-logo-chip">{t}</span>
              ))}
            </div></div>
          </div>
        </div>
      </section>

      {/* ===================== CONSULTATION ===================== */}
      <section className="ms-consult">
        <div className="ms-wrap ms-consult-grid">
          <Reveal className="ms-consult-card">
            <h2>You've Cracked The Business.<br />Let's Crack Going Online.</h2>
            <ul className="ms-consult-list">
              <li>Website, Billing &amp; Checkout — Live In Days</li>
              <li>Content &amp; Meta Ads That Actually Convert</li>
              <li>One Bill For Every Service You Use</li>
              <li>WhatsApp Support, Not Ticket Queues</li>
            </ul>
            <div className="ms-partner-chips">
              {['UPI', 'Cards', 'Net Banking', 'Wallets', 'GST', 'Razorpay'].map(p => <span key={p}>{p}</span>)}
            </div>
            <a href="https://wa.me/918978605027" target="_blank" rel="noreferrer" className="ms-btn ms-btn-ghost" style={{ borderColor: 'rgba(255,255,255,.6)' }}>
              Book Your Free Consultation <span className="ms-arrow">→</span>
            </a>
          </Reveal>
          <Reveal delay={0.08} className="ms-consult-media">
            <div className="ms-media-card ms-media-back"><b>{portfolio[0].name}</b></div>
            <div className="ms-media-card ms-media-front"><b>{portfolio[1].name}</b></div>
          </Reveal>
        </div>
      </section>

      {/* ===================== WHY ZOPTAVI ===================== */}
      <section className="ms-why">
        <div className="ms-wrap ms-why-grid">
          <RevealStagger className="ms-why-cards">
            {marketFacts.map((m, i) => (
              <motion.article key={m.fact} variants={revealItem} className="ms-why-card">
                <span className="ms-why-ico">{marketIcons[i % marketIcons.length]}</span>
                <h3>{m.figure}</h3>
                <p>{m.fact} — {m.source}</p>
              </motion.article>
            ))}
          </RevealStagger>
          <Reveal delay={0.1}>
            <h2>Why <span>ZOPTAVI</span>?</h2>
            <p className="ms-why-lead">We're Not A Typical Agency. We're The Team That Keeps You Online.</p>
            <p className="ms-why-italic">
              No freelancer disappearing after launch. No juggling five vendors for a website, a biller, a designer and an ads guy.
              One team, on WhatsApp, that builds it, bills it, posts it, promotes it, and ships it — and sticks around after you pay.
            </p>
            <p className="ms-why-body">If you're ready to go online properly, we're ready to make it happen.</p>
            <a href="https://wa.me/918978605027" target="_blank" rel="noreferrer" className="ms-btn ms-btn-ghost dark">Talk to us, we won't oversell <span className="ms-arrow">→</span></a>
          </Reveal>
        </div>
      </section>

      {/* ===================== STATS BAND ===================== */}
      <section className="ms-stats">
        <div className="ms-stats-bg" />
        <div className="ms-stats-grid">
          {[
            { n: '5', l: 'Core Services, One Bill' },
            { n: '2', l: 'Live Client Stores' },
            { n: '10', l: 'Orders/Mo Minimum' },
            { n: '1', l: 'WhatsApp Number' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.08 }} className="ms-stat">
              <span className="ms-stat-num">{s.n}</span>
              <span className="ms-stat-label">{s.l}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== OUR WORK ===================== */}
      <section className="ms-work">
        <div className="ms-wrap">
          <div className="ms-work-head">
            <Reveal><h2 className="ms-work-title">OUR<br />WORK</h2></Reveal>
            <Reveal delay={0.08} className="ms-work-intro">
              <h3>Two real stores.<br />Not concepts.</h3>
              <p>Your website is often the first touchpoint with your audience. It should reflect the quality and ambition of your brand.</p>
              <p>Smart, intentional design doesn't just look good — it builds trust, captures attention, and sets you apart.</p>
            </Reveal>
          </div>

          <RevealStagger className="ms-work-grid" gap={0.1}>
            {portfolio.map((p, i) => (
              <motion.a key={p.key} variants={revealItem} whileHover={{ y: -4 }} href={p.url} target="_blank" rel="noreferrer" className="ms-work-card"
                style={{ background: i === 0 ? 'linear-gradient(135deg,#1a0f1f,#3a1530 60%,#5c1f2e)' : 'linear-gradient(135deg,#0f1a1f,#153035 60%,#1f5c4e)' }}>
                <span className="ms-work-tag">↘ {p.name.toUpperCase()}</span>
                <p className="ms-work-blurb">{p.blurb}</p>
              </motion.a>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===================== TOOLS ===================== */}
      <section className="ms-tools">
        <div className="ms-wrap ms-tools-grid">
          <Reveal className="ms-tools-text">
            <span className="ms-eyebrow">Trusted By Experts</span>
            <h2>Tools That<br />Drive Results</h2>
            <p>We rely on the most trusted platforms to deliver seamless experiences, powerful marketing, and measurable growth for your brand.</p>
          </Reveal>
          <div className="ms-tools-cluster" aria-hidden="true">
            {toolCluster.map(t => (
              <span key={t.label} className="ms-tool-ico" style={{ ['--x' as string]: t.x, ['--y' as string]: t.y }}>{t.label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PARTNERSHIP BENTO ===================== */}
      <section className="ms-parallels">
        <div className="ms-wrap">
          <Reveal className="ms-parallels-head">
            <span className="ms-eyebrow">Why Choose Us</span>
            <h2>Partnership,<br />Not Just Projects</h2>
            <p>Skip the hiring maze — get website, billing, content, ads and fulfilment from one team.</p>
          </Reveal>
          <div className="ms-bento">
            <div className="ms-bento-card ms-bento-bind">
              <h3>One Team, Across Every Service</h3>
              <p>No juggling five vendors. Zoptavi builds it, bills it, posts it, promotes it, and ships it — under one bill.</p>
              <Link to="/services" className="ms-btn sm">See Full Pricing</Link>
            </div>
            <div className="ms-bento-card ms-bento-wave">
              <div className="ms-wave" />
              <p>WE BUILD STORES<br />WE KEEP THEM RUNNING<br />WE HANDLE EVERYTHING ONLINE</p>
              <div className="ms-wave" />
            </div>
            <div className="ms-bento-card ms-bento-hands"><b>{portfolio[0].name} · {portfolio[0].category}</b></div>
            <div className="ms-bento-card ms-bento-tools">
              <h4>Tools &amp; Integrations</h4>
              <div className="ms-mini-icons"><span>Razorpay</span><span>Meta</span><span>GST</span><span>UPI</span></div>
            </div>
            <div className="ms-bento-card ms-bento-device"><b>{portfolio[1].name} · {portfolio[1].category}</b></div>
            <div className="ms-bento-card ms-bento-snapshot">
              <h4>Service Snapshot</h4>
              <ul>
                {coreServices.map(s => <li key={s.key}>{s.name} — {s.what}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="ms-faq">
        <div className="ms-wrap ms-faq-grid">
          <Reveal className="ms-faq-head">
            <span className="ms-eyebrow">Popular Queries</span>
            <h2>FAQs</h2>
            <p>Get the clarity you need about our process and services.</p>
          </Reveal>
          <div className="ms-faq-list">
            {faqs.map(f => (
              <details key={f.q} className="ms-faq-item">
                <summary>{f.q} <span className="ms-faq-ico">↘</span></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="ms-cta">
        <div className="ms-wrap">
          <Reveal className="ms-cta-card">
            <h2>One Paying Client This Week Beats A Perfect Plan This Month.</h2>
            <p>Send us your business type and we'll reply with a sample built for you — free, no obligation.</p>
            <a href="https://wa.me/918978605027" target="_blank" rel="noreferrer" className="ms-btn ms-btn-solid">
              Message Us on WhatsApp <span className="ms-arrow">→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
