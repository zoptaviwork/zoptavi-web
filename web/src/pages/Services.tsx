import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Reveal, { RevealStagger, revealItem } from '../components/Reveal';
import StatNumber from '../components/StatNumber';
import ShinyText from '../components/reactbits/ShinyText';
import { SpotlightArticle, SpotlightDiv } from '../components/reactbits/SpotlightCard';
import { bundles, coreServices, portfolio } from '../data/business';
import '../styles/messold-home.css';

const WHATSAPP = 'https://wa.me/918978605027';

const serviceIcons: ReactElement[] = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 21h8" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M4 8h16M4 13h10" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m15 8-6 4 6 4V8z" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-6" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9h18l-2 10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L3 9z" /><path d="M8 9V6a4 4 0 0 1 8 0v3" /></svg>,
];

const marqueeRowA = ['Zoptavi Build', 'Zoptavi Bill', 'Zoptavi Studio', 'Zoptavi Reach', 'Zoptavi Fulfill', 'Zoptavi Pay', 'One Bill'];
const marqueeRowB = ['WordPress', 'WooCommerce', 'React + Supabase', 'Meta Ads', 'Razorpay', 'Cashfree', 'GST Invoicing'];

const toolCluster = [
  { label: 'Meta', src: '/logos/meta.png', x: 0, y: 0 },
  { label: 'Google', src: '/logos/google.png', x: 1, y: 1 },
  { label: 'Instagram', src: '/logos/instagram.png', x: 2, y: 0 },
  { label: 'WhatsApp', src: '/logos/whatsapp.png', x: 3, y: 1 },
  { label: 'Razorpay', src: '/logos/razorpay.png', x: 0, y: 3 },
  { label: 'Cashfree', src: '/logos/cashfree.png', x: 1, y: 2 },
  { label: 'UPI', src: '/logos/upi.png', x: 2, y: 3 },
];

// À la carte — what's available individually, no numbers on the page.
// Ask on WhatsApp for a quote sized to your business.
const alaCarte = [
  { title: 'Websites — Zoptavi Build', desc: 'From a simple business site to a fully custom store with an admin panel, unlimited products and GST-ready invoicing.' },
  { title: 'Yearly care plan', desc: 'Hosting, domain, SSL, backups and uptime monitoring — with content-update and priority-support tiers on top.' },
  { title: 'Content — Zoptavi Studio', desc: 'Reels, drone shoots, photography and editing, from a light monthly package up to full cinematography.' },
  { title: 'Meta Ads — Zoptavi Reach', desc: 'Managed ad campaigns at whatever monthly budget you’re comfortable with — your spend always goes straight to Meta.' },
];

const objections: { q: string; a: string }[] = [
  {
    q: 'Someone quoted me a much cheaper website — why go with Zoptavi?',
    a: "A cheap quote is usually a template with a contact form. Zoptavi Store Pro takes payments, manages your stock, sends GST invoices, and we're here all year. Different product — message us and we'll walk you through the difference for your business.",
  },
  {
    q: 'Why not just use Shopify?',
    a: "Shopify charges every month, forever, plus a fee on each sale, and you don't own the storefront. Zoptavi is a one-time build plus a small yearly care fee — ask us for the specifics.",
  },
  {
    q: 'Can I pay only for the website, not the whole bundle?',
    a: 'Yes — every service on this page is available à la carte. The bundle just works out cheaper if you need more than one piece. Send us a message and we’ll quote whichever combination fits.',
  },
  {
    q: 'What if I only do a few orders a month?',
    a: "That's exactly who we built this for. Zoptavi starts at 10 orders a month — most shipping partners won't even onboard you below 200.",
  },
  {
    q: 'How do I find out what it actually costs?',
    a: 'Message us on WhatsApp with your business type and what you need — we’ll reply with a plain-English quote, no retainer lock-in and no obligation.',
  },
];

export default function Services() {
  return (
    <div className="ms-home">
      {/* ===================== HERO ===================== */}
      <section className="ms-hero">
        <div className="ms-hero-bg" />
        <div className="ms-hero-overlay" />
        <div className="ms-wrap ms-hero-content">
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="ms-eyebrow" style={{ display: 'inline-block', marginBottom: 18 }}
          >
            <ShinyText text="Services & Pricing" speed={7} />
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Everything Your Store Needs.<br />One Team, One Bill.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}>
            Website, billing software, content, ads and fulfilment — three bundles, or buy any single piece
            à la carte. Whichever you pick, one team runs it and one WhatsApp number reaches us. Message us
            with your business type and we'll reply with a plain-English quote.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}
            className="ms-hero-btns"
          >
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="ms-btn ms-btn-solid">
              Book Your Free Growth Audit <span className="ms-arrow">→</span>
            </a>
            <a href="#bundle" className="ms-btn ms-btn-ghost">See What's Included <span className="ms-arrow">→</span></a>
          </motion.div>
        </div>
      </section>

      {/* ===================== SERVICE MARQUEE ===================== */}
      <section className="ms-brands">
        <div className="ms-wrap ms-brands-grid">
          <Reveal className="ms-brands-text">
            <h2>Five Services. One Relationship.</h2>
            <p>No juggling a web guy, a biller, a designer and an ads agency. Zoptavi runs the whole chain under a single monthly bill.</p>
            <a href="#bundle" className="ms-btn ms-btn-ghost dark">Jump to the Bundle <span className="ms-arrow">→</span></a>
          </Reveal>
          <div className="ms-brands-sliders">
            <div className="ms-slider-row"><div className="ms-slider-track">
              {[...marqueeRowA, ...marqueeRowA].map((t, i) => <span key={i} className="ms-logo-chip">{t}</span>)}
            </div></div>
            <div className="ms-slider-row"><div className="ms-slider-track rev">
              {[...marqueeRowB, ...marqueeRowB].map((t, i) => <span key={i} className="ms-logo-chip">{t}</span>)}
            </div></div>
          </div>
        </div>
      </section>

      {/* ===================== CONSULTATION / AUDIT ===================== */}
      <section className="ms-consult">
        <div className="ms-wrap ms-consult-grid">
          <Reveal className="ms-consult-card">
            <h2>Not Sure Which Package Fits?<br />Let's Work It Out Together.</h2>
            <ul className="ms-consult-list">
              <li>A Look At Your Current Setup — Site, Billing, Ads</li>
              <li>Which Bundle (Or Single Service) Actually Fits</li>
              <li>A Sample Built For Your Business Type — Free</li>
              <li>A Plain-English Quote, No Retainer Lock-In</li>
            </ul>
            <div className="ms-partner-chips">
              {['UPI', 'Cards', 'Net Banking', 'Wallets', 'GST', 'Razorpay'].map(p => <span key={p}>{p}</span>)}
            </div>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="ms-btn ms-btn-ghost" style={{ borderColor: 'rgba(255,255,255,.6)' }}>
              Book Your Free Consultation <span className="ms-arrow">→</span>
            </a>
          </Reveal>
          <Reveal delay={0.08} className="ms-consult-media">
            <div className="ms-media-card ms-media-back"><b>{portfolio[0].name} · {portfolio[0].tier}</b></div>
            <div className="ms-media-card ms-media-front"><b>{portfolio[1].name} · {portfolio[1].category}</b></div>
          </Reveal>
        </div>
      </section>

      {/* ===================== CORE SERVICES GRID ===================== */}
      <section className="ms-why">
        <div className="ms-wrap ms-why-grid">
          <RevealStagger className="ms-why-cards">
            {coreServices.map((s, i) => (
              <SpotlightArticle key={s.key} variants={revealItem} className="ms-why-card">
                <span className="ms-why-ico">{serviceIcons[i % serviceIcons.length]}</span>
                <h3>{s.name}</h3>
                <p>{s.what} — <em>{s.revenueType.toLowerCase()}</em>.</p>
              </SpotlightArticle>
            ))}
          </RevealStagger>
          <Reveal delay={0.1} className="ms-why-text">
            <h2>Why Bundle<br />It All?</h2>
            <p className="ms-why-lead">One vendor, one invoice, one number to call when something breaks.</p>
            <p className="ms-why-italic">
              Bought separately, these five services mean five contracts, five renewal dates and five people
              blaming each other when a sale doesn't land. Bundled, it's our problem to solve — and it's cheaper.
            </p>
            <p className="ms-why-body">Every service still works on its own. The bundle just removes the friction.</p>
            <a href="#bundle" className="ms-btn ms-btn-ghost dark">Compare the three bundles <span className="ms-arrow">→</span></a>
          </Reveal>
        </div>
      </section>

      {/* ===================== HIGHLIGHTS BAND ===================== */}
      <section className="ms-stats">
        <div className="ms-stats-bg" />
        <div className="ms-stats-grid">
          {[
            { n: '3', l: 'Bundles — Or À La Carte' },
            { n: '5', l: 'Services, One Bill' },
            { n: '48H', l: 'Typical First Order' },
            { n: '1', l: 'WhatsApp Number' },
          ].map((s, i) => (
            <motion.div
              key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="ms-stat"
            >
              <StatNumber value={s.n} className="ms-stat-num" />
              <span className="ms-stat-label">{s.l}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== THE BUNDLE ===================== */}
      <section className="ms-price" id="bundle">
        <div className="ms-wrap">
          <Reveal className="ms-price-head">
            <span className="ms-eyebrow"><ShinyText text="The Zoptavi Bundle" speed={7} /></span>
            <h2>Three ways to go online</h2>
            <p>Website, billing, content, ads and support — pick the bundle that fits, or mix and match à la carte. Message us for a plan sized to your business.</p>
          </Reveal>

          <RevealStagger className="ms-price-grid" gap={0.1}>
            {bundles.map(b => {
              const feat = b.key === 'growth';
              const rows: [string, string][] = [
                ['Website', b.website],
                ['Payments online', b.payments],
                ['Billing software', b.billing],
                ['Reels / content', b.content],
                ['Meta ads', b.ads],
                ['Order fulfilment', b.fulfilment],
                ['Updates & support', b.support],
              ];
              return (
                <SpotlightDiv key={b.key} variants={revealItem} whileHover={{ y: -5 }} className={feat ? 'ms-price-card feat' : 'ms-price-card'}>
                  <div className="ms-price-cap">
                    <p className="ms-price-tag">{b.tagline}</p>
                    <p className="ms-price-name">{b.name}</p>
                  </div>
                  <div className="ms-price-rows">
                    {rows.map(([k, v]) => (
                      <div key={k} className="ms-price-row">
                        <span className="k">{k}</span>
                        <span className={v === '—' ? 'v off' : 'v'}>{v}</span>
                      </div>
                    ))}
                    <a href={WHATSAPP} target="_blank" rel="noreferrer" className={feat ? 'ms-btn ms-btn-solid' : 'ms-btn ms-btn-ghost dark'}>
                      Ask About {b.name} <span className="ms-arrow">→</span>
                    </a>
                  </div>
                </SpotlightDiv>
              );
            })}
          </RevealStagger>
          <p className="ms-price-note">Want the numbers? Message us on WhatsApp and we'll send a plain-English quote for your business.</p>
        </div>
      </section>

      {/* ===================== À LA CARTE ===================== */}
      <section className="ms-alacarte">
        <div className="ms-wrap">
          <Reveal className="ms-alacarte-head">
            <span className="ms-eyebrow"><ShinyText text="À La Carte" speed={7} /></span>
            <h2>Buying individually? Here's what's on offer.</h2>
            <p>No bundle, no problem — every piece below is available on its own. Tell us what you need on WhatsApp and we'll send a quote.</p>
          </Reveal>

          <RevealStagger className="ms-grid-2" gap={0.1}>
            {alaCarte.map(item => (
              <motion.div key={item.title} variants={revealItem} className="ms-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </RevealStagger>
          <p className="ms-rate-foot" style={{ marginTop: 20, textAlign: 'center' }}>Ad spend for Zoptavi Reach is always your own money, paid directly to Meta — our fee is separate and quoted upfront.</p>
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
              <Link to="/work" className="ms-btn sm">See Live Stores</Link>
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

      {/* ===================== TOOLS ===================== */}
      <section className="ms-tools">
        <div className="ms-wrap ms-tools-grid">
          <Reveal className="ms-tools-text">
            <span className="ms-eyebrow"><ShinyText text="Trusted By Experts" speed={7} /></span>
            <h2>Tools That<br />Drive Results</h2>
            <p>We rely on the most trusted payment, ads and messaging platforms — the same stack serious brands already use.</p>
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

      {/* ===================== FAQ / OBJECTIONS ===================== */}
      <section className="ms-faq">
        <div className="ms-wrap ms-faq-grid">
          <Reveal className="ms-faq-head">
            <span className="ms-eyebrow"><ShinyText text="Popular Queries" speed={7} /></span>
            <h2>Questions you're<br />probably asking</h2>
            <p>Straight answers on price, lock-in and what's actually included.</p>
          </Reveal>
          <div className="ms-faq-list">
            {objections.map(o => (
              <details key={o.q} className="ms-faq-item">
                <summary>{o.q} <span className="ms-faq-ico">+</span></summary>
                <p>{o.a}</p>
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
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="ms-btn ms-btn-solid">
              Message Us on WhatsApp <span className="ms-arrow">→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
