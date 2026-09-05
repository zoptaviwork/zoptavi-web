import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Reveal from '../components/Reveal';
import HlsVideoBg from '../components/HlsVideoBg';
import { useLiveContent, mediaUrl } from '../lib/adminApi';
import '../styles/our-services.css';

const WHATSAPP = 'https://wa.me/918978605027';

const Arrow = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
    <path d="M16.172 11 10.808 5.636l1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
  </svg>
);

type Block = {
  key: string;
  eyebrow: string;
  title: string[];          // one entry = single line, two = stacked
  lead?: string;
  bullets: string[];
  cta?: { label: string; to?: string; href?: string };
  cap: string;
  grad: string;
  icon: ReactElement;
};

const blocks: Block[] = [
  {
    key: 'build',
    eyebrow: '01 — Zoptavi Build',
    title: ['Web-', 'Development'],
    lead: 'Your storefront, done properly.',
    bullets: [
      'Custom sites matched to your brand — from a simple page to a full custom store.',
      'Payments, live stock and GST-ready invoicing built in, not bolted on.',
      'Fast, mobile, secure — and yours to keep, not rented forever.',
    ],
    cta: { label: 'Know More', to: '/work' },
    cap: 'Websites — one-time build + yearly care',
    grad: 'g-pink',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="4" width="19" height="14" rx="2" /><path d="M2.5 9h19M7 21h10M12 18v3" />
      </svg>
    ),
  },
  {
    key: 'reach',
    eyebrow: '02 — Zoptavi Reach',
    title: ['Performance', 'Marketing'],
    lead: 'From spend to sales.',
    bullets: [
      "Managed Meta campaigns at a monthly budget you're comfortable with.",
      'Your ad spend always goes straight to Meta — our fee is separate and quoted upfront.',
      'Weekly reporting against real ROI, not vanity metrics.',
    ],
    cta: { label: 'Know More', href: WHATSAPP },
    cap: 'Meta ads — leads and sales',
    grad: 'g-cream',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="m7 14 4-4 4 4 5-6" />
      </svg>
    ),
  },
  {
    key: 'bill',
    eyebrow: '03 — Zoptavi Bill',
    title: ['Billing &', 'Stock'],
    lead: 'Works offline. Prints anywhere.',
    bullets: [
      "Bills save on the device and sync the moment you're back online.",
      "Live stock across every branch, visible from the owner's phone.",
      'GST invoices, HSN codes and thermal printing on any ₹3,400 printer.',
    ],
    cta: { label: 'Know More', to: '/zoptavi-bill' },
    cap: 'Offline billing + multi-store stock',
    grad: 'g-mint',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2.5" width="16" height="19" rx="2" /><path d="M8 7h8M8 11h8M8 15h5" />
      </svg>
    ),
  },
  {
    key: 'studio',
    eyebrow: '04 — Zoptavi Studio',
    title: ['Content &', 'Creative'],
    bullets: [
      'Reels, drone shoots, photography and editing — a full content team, on retainer.',
      'A posting schedule that actually runs, not a folder of files dumped on you.',
      'Made to sell, not just to look nice.',
    ],
    cap: 'Content — monthly retainer',
    grad: 'g-peach',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="m10 9 5 3-5 3V9z" />
      </svg>
    ),
  },
  {
    key: 'pay',
    eyebrow: '05 — Zoptavi Pay',
    title: ['Branded Checkout'],
    bullets: [
      'UPI, cards, net banking and wallets under one branded badge.',
      'Settlement runs on RBI-licensed aggregators — Razorpay Route / Cashfree.',
      'No gateway licence, no held funds, no compliance risk on your side.',
    ],
    cta: { label: 'Know More', to: '/zoptavi-bill' },
    cap: 'Branded checkout — small platform fee',
    grad: 'g-lav',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M2.5 10h19M6 15h4" />
      </svg>
    ),
  },
  {
    key: 'fulfill',
    eyebrow: '06 — Zoptavi Fulfill',
    title: ['Pack &', 'Ship'],
    bullets: [
      'Pick, pack and dispatch from our floor.',
      "The segment big 3PLs won't onboard — brands under 200 orders a month.",
      'Tracking pushed to the customer automatically.',
    ],
    cta: { label: 'Know More', href: WHATSAPP },
    cap: 'Pack & ship — per order + monthly',
    grad: 'g-sky',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8.5 12 3l9 5.5v7L12 21l-9-5.5v-7z" /><path d="M3 8.5 12 14l9-5.5M12 14v7" />
      </svg>
    ),
  },
];

function CopyCol({ b }: { b: Block }) {
  return (
    <div className="ors-svc__copy">
      <span className="ors-svc__eyebrow">{b.eyebrow}</span>
      <h2 className="ors-svc__title">
        {b.title.map((t, i) => <span key={i}>{t}</span>)}
      </h2>
      {b.lead && <p className="ors-svc__lead">{b.lead}</p>}
      <ul className="ors-svc__bullets">
        {b.bullets.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
      {b.cta && (
        b.cta.to
          ? <Link to={b.cta.to} className="ors-btn"><span>{b.cta.label}</span><Arrow /></Link>
          : <a href={b.cta.href} target="_blank" rel="noreferrer" className="ors-btn"><span>{b.cta.label}</span><Arrow /></a>
      )}
    </div>
  );
}

export default function Services() {
  const content = useLiveContent('services');
  const buildPhoto = mediaUrl(content.build_photo);
  return (
    <div className="ors">
      {/* ===================== HERO ===================== */}
      <section className="ors-hero" role="banner" aria-label="Our Services">
        <div className="ors-hero__inner">
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Our</span><span>Services</span>
          </motion.h1>
          <motion.a
            href={WHATSAPP} target="_blank" rel="noreferrer" className="ors-btn ors-btn--solid"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          >
            <span>Work With Us</span><Arrow />
          </motion.a>
        </div>
      </section>

      {/* ===================== SERVICE BLOCKS ===================== */}
      {blocks.map((b, i) => (
        <section key={b.key} className={i % 2 === 1 ? 'ors-svc rev' : 'ors-svc'} aria-label={b.title.join(' ')}>
          <Reveal className="ors-svc__wrap">
            <CopyCol b={b} />
            {b.key === 'build' && buildPhoto ? (
              <div className={`ors-svc__media ${b.grad}`} style={{ backgroundImage: `url('${buildPhoto}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <span className="cap">{b.cap}</span>
              </div>
            ) : (
              <div className={`ors-svc__media ${b.grad}`} aria-hidden="true">
                {b.icon}
                <span className="cap">{b.cap}</span>
              </div>
            )}
          </Reveal>
        </section>
      ))}

      {/* ===================== STILL CONFUSED ===================== */}
      <section className="ors-confused" aria-label="Still confused">
        <div className="ors-confused__wrap">
          <Reveal>
            <div>
              <h2 className="ors-confused__title"><span>Still</span><span>Confused?</span></h2>
              <div className="ors-confused__card">
                <p>Book a 15-minute call with us — we'll tell you which pieces you actually need, and which you don't.</p>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="ors-btn ors-btn--fill">
                  <span>Book a Call Now</span><Arrow />
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="ors-confused__media" aria-hidden="true">
              <div className="kpi">
                <div><b>6.4×</b><span>ROAS</span></div>
                <div><b>₹0</b><span>Held funds</span></div>
                <div><b>1</b><span>Monthly bill</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== FOOTER CTA ===================== */}
      <section className="ors-footcta" aria-label="Work with Zoptavi">
        <HlsVideoBg className="ors-footcta__video" />
        <div className="ors-footcta__grid">
          <Reveal>
            <h2>Interested in<br />working with<br />Zoptavi?</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <p className="ors-footcta__copy" style={{ marginBottom: 10 }}>Drop a mail at</p>
              <a className="ors-footcta__link" href="mailto:hello@zoptavi.com">hello@zoptavi.com</a>
              <div style={{ marginTop: 26 }}>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="ors-btn ors-btn--solid">
                  <span>Message Us on WhatsApp</span><Arrow />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
