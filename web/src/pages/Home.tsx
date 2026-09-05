import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Reveal, { RevealStagger, revealItem } from '../components/Reveal';
import HlsVideoBg from '../components/HlsVideoBg';
import StatNumber from '../components/StatNumber';
import ShinyText from '../components/reactbits/ShinyText';
import { SpotlightArticle } from '../components/reactbits/SpotlightCard';
import { portfolio, marketFacts } from '../data/business';
import { useLiveServices, useLiveContent, useLiveFaqs, useLivePortfolio, track } from '../lib/adminApi';

const defaultHeroHeadline = 'You Run The Business. We Handle Everything Online.';
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
  { label: 'Meta', src: '/logos/meta.png', x: 0, y: 0 },
  { label: 'Google', src: '/logos/google.png', x: 1, y: 1 },
  { label: 'Instagram', src: '/logos/instagram.png', x: 2, y: 0 },
  { label: 'WhatsApp', src: '/logos/whatsapp.png', x: 3, y: 1 },
  { label: 'Razorpay', src: '/logos/razorpay.png', x: 0, y: 3 },
  { label: 'Cashfree', src: '/logos/cashfree.png', x: 1, y: 2 },
  { label: 'UPI', src: '/logos/upi.png', x: 2, y: 3 },
];

const faqs = [
  { question: 'What exactly is in the Zoptavi Bundle?', answer: 'Website, billing software (Zoptavi Bill), branded checkout (Zoptavi Pay), content, Meta ads and order fulfilment — one monthly bill for whichever pieces you need.' },
  { question: 'Do I have to buy the whole bundle?', answer: "No. Every service — website, billing, content, ads, fulfilment — is available à la carte. See full pricing on the Services page." },
  { question: 'How fast can I get online?', answer: "Most stores go live within days of signing up, and our clients' stores typically get their first order within 48 hours of launch." },
  { question: "What if I'm doing very few orders a month?", answer: "That's exactly who we built this for. Zoptavi starts at 10 orders/month — most shipping partners won't even onboard you below 200." },
];

export default function Home() {
  const { coreServices } = useLiveServices();
  const content = useLiveContent('home');
  const liveFaqs = useLiveFaqs(faqs);
  const livePortfolio = useLivePortfolio(portfolio);
  return (
    <div className="ms-home">
      {/* ===================== HERO ===================== */}
      <section className="ms-hero ms-hero--video">
        <HlsVideoBg className="ms-hero-video" />
        <div className="ms-hero-overlay" />
        <div className="ms-hero-fade" aria-hidden="true" />
        <div className="ms-wrap ms-hero-content">
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}>
            {content.hero_headline && content.hero_headline !== defaultHeroHeadline
              ? content.hero_headline
              : <>You Run The Business.<br />We Handle <span className="ms-accent">Everything Online</span>.</>}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            {content.hero_subtext || 'Website, billing software, content, ads and shipping — one team, one bill, one WhatsApp number. Zoptavi takes a small business fully online and keeps it running.'}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="ms-hero-btns">
            <a href="https://wa.me/918978605027" target="_blank" rel="noreferrer" className="ms-btn ms-hero-pill">
              Book Your Free Growth Audit <span className="ms-arrow">→</span>
            </a>
            <Link to="/work" className="ms-btn ms-hero-pill">See Our Work <span className="ms-arrow">→</span></Link>
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
            <div className="ms-consult-card__body">
              <span className="ms-consult-eyebrow">Ready When You Are</span>
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
              <a href="https://wa.me/918978605027" target="_blank" rel="noreferrer" className="ms-btn ms-btn-teal" onClick={() => track('click', '/', 'Book Your Free Consultation')}>
                Book Your Free Consultation <span className="ms-arrow">→</span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="ms-consult-photos">
            <div className="ms-consult-photo ms-consult-photo--back" style={{ backgroundImage: "url('/portfolio-meena-rajwada.jpg')" }} />
            <div className="ms-consult-photo ms-consult-photo--front" style={{ backgroundImage: "url('/portfolio-helmet-hub.jpg')" }} />
          </Reveal>
        </div>
      </section>

      {/* ===================== WHY ZOPTAVI ===================== */}
      <section className="ms-why">
        <div className="ms-wrap ms-why-grid">
          <RevealStagger className="ms-why-cards">
            {marketFacts.map((m, i) => (
              <SpotlightArticle key={m.fact} variants={revealItem} className="ms-why-card">
                <span className="ms-why-ico">{marketIcons[i % marketIcons.length]}</span>
                <h3>{m.figure}</h3>
                <p>{m.fact} — {m.source}</p>
              </SpotlightArticle>
            ))}
          </RevealStagger>
          <Reveal delay={0.1} className="ms-why-text">
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
              <StatNumber value={s.n} className="ms-stat-num" />
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
              <h3>Making stores a<br />damn sight better.</h3>
              <p>Your website is often the first touchpoint with your audience. It should reflect the quality and ambition of your brand.</p>
              <p>Smart, intentional design doesn't just look good — it builds trust, captures attention, and sets you apart.</p>
            </Reveal>
          </div>

          <RevealStagger className="ms-work-grid" gap={0.1}>
            {portfolio.map((p, i) => (
              <motion.a key={p.key} variants={revealItem} whileHover={{ y: -4 }} href={p.url} target="_blank" rel="noreferrer" className="ms-work-card"
                style={{ backgroundImage: `url(${i === 0 ? '/portfolio-meena-rajwada.jpg' : '/portfolio-helmet-hub.jpg'})` }}>
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
            <span className="ms-eyebrow"><ShinyText text="Trusted By Experts" speed={7} /></span>
            <h2>Tools That<br />Drive Results</h2>
            <p>We rely on the most trusted platforms to deliver seamless experiences, powerful marketing, and measurable growth for your brand.</p>
          </Reveal>
          <div className="ms-tools-cluster" aria-hidden="true">
            {toolCluster.map(t => (
              <span key={t.label} className="ms-tool-ico" style={{ ['--x' as string]: t.x, ['--y' as string]: t.y }}>
                <img src={t.src} alt={t.label} loading="lazy" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PARTNERSHIP BENTO ===================== */}
      <section className="ms-parallels">
        <div className="ms-wrap">
          <Reveal className="ms-parallels-head">
            <span className="ms-eyebrow"><ShinyText text="Why Choose Us" speed={7} /></span>
            <h2>Partnership,<br />Not Just Projects</h2>
            <p>Skip the hiring maze — get website, billing, content, ads and fulfilment from one team.</p>
          </Reveal>
          <div className="ms-bento">
            <div className="ms-bento-card ms-bento-bind">
              <h3>One Team, Across Every Service</h3>
              <p>No juggling five vendors. Zoptavi builds it, bills it, posts it, promotes it, and ships it — under one bill.</p>
              <Link to="/services" className="ms-btn sm" onClick={() => track('click', '/', 'See Our Services')}>See Our Services</Link>
            </div>
            <div className="ms-bento-card ms-bento-wave">
              <div className="ms-wave" />
              <p>WE BUILD STORES<br />WE KEEP THEM RUNNING<br />WE HANDLE EVERYTHING ONLINE</p>
              <div className="ms-wave" />
            </div>
            <div className="ms-bento-card ms-bento-hands"><b>{livePortfolio[0].name} · {livePortfolio[0].category}</b></div>
            <div className="ms-bento-card ms-bento-tools">
              <h4>Tools &amp; Integrations</h4>
              <div className="ms-mini-icons"><span>Razorpay</span><span>Meta</span><span>GST</span><span>UPI</span></div>
            </div>
            <div className="ms-bento-card ms-bento-device"><b>{livePortfolio[1].name} · {livePortfolio[1].category}</b></div>
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
            <span className="ms-eyebrow"><ShinyText text="Popular Queries" speed={7} /></span>
            <h2>FAQs</h2>
            <p>Get the clarity you need about our process and services.</p>
          </Reveal>
          <div className="ms-faq-list">
            {liveFaqs.map(f => (
              <details key={f.question} className="ms-faq-item">
                <summary>{f.question} <span className="ms-faq-ico">↘</span></summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CLOSING CTA ===================== */}
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
