import Reveal, { RevealStagger, revealItem } from '../components/Reveal';
import ShinyText from '../components/reactbits/ShinyText';
import { SpotlightDiv } from '../components/reactbits/SpotlightCard';
import { motion } from 'motion/react';
import { billPillars, billPricing, billPhases, zoptaviPay } from '../data/business';
import { useLiveContent, useLiveBillPillars, useLiveBillPricing, useLiveBillPhases, useLiveSiteContact, whatsappUrl } from '../lib/adminApi';
import Seo from '../components/Seo';
import '../styles/messold-home.css';

const defaultHeadline = 'Billing software that never stops working.';

export default function ZoptaviBill() {
  const content = useLiveContent('zoptavi-bill');
  const contact = useLiveSiteContact();
  const WHATSAPP = whatsappUrl(contact.phoneDigits);
  const pillars = useLiveBillPillars(billPillars);
  const pricing = useLiveBillPricing(billPricing);
  const phases = useLiveBillPhases(billPhases);
  const payName = content.pay_name || zoptaviPay.name;
  const payStrapline = content.pay_strapline || zoptaviPay.strapline;
  const payHowItWorks = content.pay_how_it_works
    ? content.pay_how_it_works.split('\n').map(s => s.trim()).filter(Boolean)
    : zoptaviPay.howItWorks;
  const payWhyNotOwnGateway = content.pay_why_not_own_gateway || zoptaviPay.whyNotOwnGateway;
  return (
    <div className="ms-home ms-light">
      <Seo
        title="Zoptavi Bill — Offline Billing & Multi-Store Stock Software"
        description="Zoptavi Bill is billing and stock software built by Zoptavi for small business clients — works offline, prints on any thermal printer, and syncs live stock across branches. Included with every Zoptavi website."
        path="/zoptavi-bill"
      />
      {/* ===================== HERO ===================== */}
      <section className="ms-page-hero">
        <div className="ms-wrap">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="ms-badge"><ShinyText text={content.hero_eyebrow || 'Zoptavi Bill'} speed={7} /></span>
            <h1>
              {content.hero_headline && content.hero_headline !== defaultHeadline
                ? content.hero_headline
                : <>Billing software that <span className="ms-accent">never stops working</span>.</>}
            </h1>
            <p>
              {content.hero_subtext || "Works without internet. Prints on any ₹3,400 thermal printer. Shows live stock across every branch from the owner's phone. Free with every website, until you outgrow it."}
            </p>
            <div className="ms-hero-btns">
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="ms-btn ms-btn-accent">
                Get Zoptavi Bill Free <span className="ms-arrow">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== 3 PILLARS ===================== */}
      <section className="ms-section tight">
        <div className="ms-wrap">
          <RevealStagger className="ms-grid-3 two-up-md" gap={0.1}>
            {pillars.map((p, i) => (
              <SpotlightDiv key={p.title} variants={revealItem} whileHover={{ y: -5 }} className="ms-card lift">
                <span className="ms-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ margin: '16px 0 8px' }}>{p.title}</h3>
                <p>{p.detail}</p>
              </SpotlightDiv>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===================== SCENARIO ===================== */}
      <section className="ms-section tight">
        <div className="ms-wrap">
          <Reveal>
            <div className="ms-callout">
              <strong>"Size L is out here — but Kondapur has 8."</strong>
              <p>
                Instead of losing the sale, staff check the app and book it from another branch on the spot.
                One recovered sale pays for a year of subscription.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== PHASES ===================== */}
      <section className="ms-section tight">
        <div className="ms-wrap">
          <Reveal className="ms-sec-head"><h2>What it does, phase by phase</h2></Reveal>
          <RevealStagger className="ms-grid-3 two-up-md" gap={0.1}>
            {phases.map(ph => (
              <SpotlightDiv key={ph.phase} variants={revealItem} className="ms-card">
                <h3 style={{ fontSize: 15, color: 'var(--ms-accent)', marginBottom: 14 }}>{ph.phase}</h3>
                <ul className="ms-check-list">
                  {ph.items.map((it, i) => <li key={i}>{it}</li>)}
                </ul>
              </SpotlightDiv>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section className="ms-section tight alt">
        <div className="ms-wrap">
          <Reveal className="ms-sec-head">
            <span className="ms-badge">Pricing — per store, not per storage</span>
            <h2 style={{ marginTop: 14 }}>Free to start. Pay when you scale.</h2>
          </Reveal>
          <Reveal>
            <div className="ms-table-scroll">
              <table className="ms-table">
                <thead>
                  <tr><th>Plan</th><th>Stores</th><th>Users</th><th>Key features</th><th style={{ textAlign: 'right' }}>Per year</th></tr>
                </thead>
                <tbody>
                  {pricing.map(p => (
                    <tr key={p.name}>
                      <td className="name">{p.name}</td>
                      <td>{p.stores}</td>
                      <td>{p.users}</td>
                      <td>{p.features}</td>
                      <td className="num">{p.perYear === 0 ? 'Free' : `₹${p.perYear.toLocaleString('en-IN')}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== ZOPTAVI PAY ===================== */}
      <section className="ms-section tight">
        <div className="ms-wrap">
          <div className="ms-split">
            <Reveal>
              <span className="ms-badge">Checkout, branded</span>
              <h2 style={{ margin: '14px 0 18px', fontSize: 'clamp(1.5rem,2.8vw,2.1rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                {payName} — {payStrapline}
              </h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {payHowItWorks.map((h, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, fontSize: 13.5, color: 'var(--ms-grey-80)', lineHeight: 1.6 }}>
                    <span
                      style={{
                        flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
                        background: 'var(--ms-grad-purple)', color: '#fff', display: 'grid', placeItems: 'center',
                        fontFamily: 'var(--ms-f-head)', fontWeight: 700, fontSize: 11,
                      }}
                    >
                      {i + 1}
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="ms-card" style={{ background: 'var(--ms-grad-stats)', borderColor: 'var(--ms-line-strong)' }}>
                <p style={{ color: '#fff', fontFamily: 'var(--ms-f-head)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 12px' }}>
                  Why not our own gateway?
                </p>
                <p style={{ color: 'rgba(255,255,255,.82)', fontSize: 13.5, lineHeight: 1.7, margin: '0 0 16px' }}>{payWhyNotOwnGateway}</p>
                <div className="ms-chips">
                  {['UPI', 'Cards', 'Net Banking', 'Wallets', 'EMI'].map(m => <span key={m}>{m}</span>)}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="ms-cta">
        <div className="ms-wrap">
          <Reveal className="ms-cta-card">
            <h2>Every Zoptavi website comes with Zoptavi Bill, free.</h2>
            <p>{content.cta_note || 'Install in 20 minutes. Upgrade only once you have more than one store.'}</p>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="ms-btn ms-btn-solid">
              Start Free <span className="ms-arrow">→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
