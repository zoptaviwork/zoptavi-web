import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { bundles, coreServices, portfolio, marketFacts } from '../data/business';

const serviceIcons: Record<string, ReactElement> = {
  build: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-6 9 6-9 6-9-6z" /><path d="M3 9v6l9 6 9-6V9" /></svg>,
  bill: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>,
  studio: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="6" width="14" height="12" rx="2" /><path d="M16 10l6-4v12l-6-4" /></svg>,
  reach: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 11l18-7-7 18-2.5-7.5L3 11z" /></svg>,
  fulfill: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></svg>,
};

export default function Home() {
  return (
    <div style={{ background: '#fff' }}>
      {/* Hero — black, giant type */}
      <section className="section-black" style={{ padding: '84px 0 60px' }}>
        <div className="orb orb-1" style={{ width: 460, height: 460, background: 'rgba(0,201,200,.14)', top: -160, right: -120 }} />
        <div className="orb orb-3" style={{ width: 320, height: 320, background: 'rgba(255,106,0,.1)', bottom: -100, left: -80 }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span className="live-dot" /> HYDERABAD · SINCE 2026
          </span>
          <h1 className="giant-h1 fade-up" style={{ margin: '22px 0 26px', maxWidth: 920 }}>
            You run the business.<br />We handle <span className="gradient-text">everything online.</span>
          </h1>
          <p className="fade-up-1" style={{ color: 'rgba(255,255,255,.65)', fontSize: 17, lineHeight: 1.7, maxWidth: 560, margin: '0 0 36px' }}>
            Website, billing software, content, ads and shipping — one team, one bill, one WhatsApp number. Zoptavi takes a small business fully online and keeps it running.
          </p>
          <div className="fade-up-2" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="https://wa.me/917842646888" target="_blank" rel="noreferrer" className="btn btn-cta shimmer">
              Get a Free Quote →
            </a>
            <Link to="/services" className="pill-outline">See Pricing</Link>
          </div>
        </div>
      </section>

      {/* Stat band — continuous black */}
      <section className="section-black" style={{ padding: '10px 0 64px' }}>
        <div className="wrap">
          <div className="msh-stat-grid">
            {[
              { val: '5', lbl: 'Core Services, One Bill' },
              { val: '2', lbl: 'Live Client Stores' },
              { val: '10', lbl: 'Orders/Mo Minimum' },
              { val: '1', lbl: 'WhatsApp Number' },
            ].map((s, i) => (
              <div key={i} className="msh-stat">
                <span className="num">{s.val}</span>
                <span className="lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof of scale — portfolio cards */}
      <section className="section-black" style={{ padding: '0 0 90px' }}>
        <div className="wrap">
          <span className="eyebrow">NOT OUR FIRST STORE</span>
          <h2 className="giant-h2" style={{ margin: '14px 0 30px' }}>Already live on the Zoptavi stack</h2>
          <div className="biz-grid-2">
            {portfolio.map((p, i) => (
              <a key={p.key} href={p.url} target="_blank" rel="noreferrer" className="msh-portfolio-card">
                <div className="bg" style={{ background: i === 0 ? 'linear-gradient(135deg,#1a0f1f,#3a1530 60%,#5c1f2e)' : 'linear-gradient(135deg,#0f1a1f,#153035 60%,#1f5c4e)' }} />
                <div className="cap">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00C9C8', flexShrink: 0 }} />
                  {p.name} <span style={{ color: 'rgba(255,255,255,.5)', fontWeight: 500 }}>· {p.category}</span>
                </div>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: 22 }}>
                  <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 13, lineHeight: 1.6, maxWidth: '80%', margin: 0 }}>{p.blurb}</p>
                </div>
                <span className="visit">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M7 7h10v10" /></svg>
                </span>
              </a>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 12.5, marginTop: 18 }}>Two live platforms already run on the Zoptavi stack — you're not client number one, you're client number three.</p>
        </div>
      </section>

      {/* 5 services */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="badge-teal">WHAT WE DO</span>
              <h2 style={{ marginTop: 10 }}>Five services. One relationship.</h2>
            </div>
            <p className="muted" style={{ maxWidth: 380, fontSize: 14.5 }}>Competitors sell one piece — a website, or software, or reels. Zoptavi sells the whole chain.</p>
          </div>
          <div className="grid-5">
            {coreServices.map((s, i) => (
              <div key={s.key} className={`pines-card fade-up-${(i % 3) + 1}`} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="titlebar tl" style={{ gap: 0 }}>
                  <div className="ic" style={{ width: 42, height: 42 }}>
                    <div style={{ width: 22, height: 22 }}>{serviceIcons[s.icon]}</div>
                  </div>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: 'var(--navy)', margin: '0 0 6px' }}>{s.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55, margin: 0 }}>{s.what}</p>
                </div>
                <span className="badge-green" style={{ width: 'fit-content' }}>{s.revenueType}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle teaser */}
      <section className="sec tight" style={{ background: 'var(--gray-light)' }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="badge-orange">THE ZOPTAVI BUNDLE</span>
              <h2 style={{ marginTop: 10 }}>One price. Everything included.</h2>
            </div>
            <Link to="/services" className="vall">Full pricing breakdown →</Link>
          </div>
          <div className="biz-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {bundles.map(b => (
              <div key={b.key} className="surface" style={{ padding: 26, position: 'relative', border: b.key === 'growth' ? '2px solid var(--teal)' : undefined }}>
                {b.key === 'growth' && <span style={{ position: 'absolute', top: -12, left: 24, background: 'var(--grad-teal)', color: '#fff', fontSize: 11, fontFamily: 'Poppins', fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>MOST POPULAR</span>}
                <p style={{ fontSize: 11, fontFamily: 'Poppins', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.06em', margin: '0 0 4px' }}>{b.tagline}</p>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 22, color: 'var(--navy)', margin: '0 0 16px' }}>{b.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 28, color: 'var(--navy)' }}>₹{b.monthlyFee.toLocaleString('en-IN')}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>/month</span>
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--text-2)', margin: '0 0 20px' }}>+ ₹{b.setupFee.toLocaleString('en-IN')} one-time setup</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 22 }}>
                  {[b.website, b.billing, b.content !== '—' ? b.content : null, b.ads !== '—' ? b.ads : null].filter(Boolean).map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#334155' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--teal-deep)" strokeWidth="3" style={{ flexShrink: 0, marginTop: 2 }}><path d="M20 6 9 17l-5-5" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/917842646888" target="_blank" rel="noreferrer" className={b.key === 'growth' ? 'pines-btn pines-btn-primary' : 'pines-btn pines-btn-orange'} style={{ width: '100%', justifyContent: 'center' }}>
                  Choose {b.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market stats */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="badge-teal">THE OPPORTUNITY</span>
              <h2 style={{ marginTop: 10 }}>The gap nobody fills</h2>
            </div>
          </div>
          <div className="trust" style={{ marginBottom: 26 }}>
            {marketFacts.slice(0, 4).map((m, i) => (
              <div key={i} className="t float-anim">
                <div className="ic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-6" /></svg>
                </div>
                <div>
                  <b>{m.figure}</b>
                  <small>{m.fact}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="flash-head" style={{ background: 'linear-gradient(120deg,#E6FAFA,#FFFCF7)', border: '1px solid #B8E3E1' }}>
            <div className="lt">
              <div className="ic" style={{ background: 'var(--grad-teal)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 3" /></svg>
              </div>
              <div>
                <p style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 16, color: 'var(--navy)', margin: 0 }}>Shiprocket & WareIQ need 200+ orders/month to onboard a seller</p>
                <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '2px 0 0' }}>Zoptavi starts at 10 orders. That segment — roughly 80% of Instagram sellers — has effectively zero competition.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="section-black" style={{ padding: '80px 0' }}>
        <div className="orb orb-1" style={{ width: 320, height: 320, background: 'rgba(0,201,200,.16)', top: -80, left: -80 }} />
        <div className="orb orb-2" style={{ width: 260, height: 260, background: 'rgba(255,106,0,.12)', bottom: -60, right: -60 }} />
        <div className="wrap" style={{ position: 'relative', maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow">WHY ZOPTAVI</span>
          <h2 className="giant-h2" style={{ margin: '18px 0 20px' }}>
            We're not a website vendor. <span className="gradient-text">We're the team that keeps you online.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 15.5, lineHeight: 1.8, margin: '0 auto 30px', maxWidth: 620 }}>
            No freelancer disappearing after launch. No juggling five vendors for a website, a biller, a designer and an ads guy.
            One team, on WhatsApp, that builds it, bills it, posts it, promotes it, and ships it — and sticks around after you pay.
          </p>
          <a href="https://wa.me/917842646888" target="_blank" rel="noreferrer" className="pill-outline">Talk to us, we won't oversell →</a>
        </div>
      </section>

      {/* CTA */}
      <section className="section-black" style={{ padding: '0 0 90px' }}>
        <div className="wrap">
          <div style={{ background: 'var(--grad-teal)', borderRadius: 28, padding: '48px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(600px 300px at 85% 120%,rgba(255,163,26,.3),transparent 60%)' }} />
            <div style={{ position: 'relative', maxWidth: 480 }}>
              <h2 style={{ color: '#fff', fontSize: 'clamp(22px,3vw,28px)' }}>One paying client this week beats a perfect plan this month.</h2>
              <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 14.5, margin: '10px 0 0' }}>Send us your business type and we'll reply with a sample built for you — free, no obligation.</p>
            </div>
            <a href="https://wa.me/917842646888" target="_blank" rel="noreferrer" className="btn btn-cta shimmer" style={{ position: 'relative', flexShrink: 0, background: '#fff', color: 'var(--teal-deep)' }}>
              Message Us on WhatsApp →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
