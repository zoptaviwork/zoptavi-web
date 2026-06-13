import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const LIVE_STORES = [
  { emoji:'⚡', label:'10 Min\nDelivery',    color:'#00C9C8', desc:'Grocery & daily needs at real store price', tag:'2km grid',  stat:'1,247 today' },
  { emoji:'\u{1F6D2}', label:'Grocery\nEssentials', color:'#16a34a', desc:'Fresh veggies, milk, eggs from local shops', tag:'Open now', stat:'312 shops live' },
  { emoji:'\u{1F48A}', label:'Pharma\n& Health',  color:'#7c3aed', desc:'OTC medicines, vitamins, baby essentials',  tag:'24/7',     stat:'98 shops' },
  { emoji:'\u{1F957}', label:'Fresh\nFood',        color:'#FF6A00', desc:'Farm-fresh produce delivered in 10 min',   tag:'Daily',    stat:'42 farms' },
  { emoji:'\u{1F3EA}', label:'Local\nShops',       color:'#0ea5e9', desc:'Your neighbourhood kirana, live on Zoptavi', tag:'LIVE',   stat:'389 stores' },
  { emoji:'\u{1F457}', label:'Fashion\n& More',    color:'#ec4899', desc:'Trending looks from boutiques near you',   tag:'New drops', stat:'215 sellers' },
];

const CATEGORIES = [
  { label:'Fashion',     slug:'fashion',     grad:'linear-gradient(135deg,#ec4899,#be185d)', emoji:'\u{1F457}' },
  { label:'Mobiles',     slug:'mobiles',     grad:'linear-gradient(135deg,#3b82f6,#1d4ed8)', emoji:'\u{1F4F1}' },
  { label:'Grocery',     slug:'grocery',     grad:'linear-gradient(135deg,#16a34a,#15803d)', emoji:'\u{1F966}' },
  { label:'Electronics', slug:'electronics', grad:'linear-gradient(135deg,#f59e0b,#b45309)', emoji:'\u{1F4BB}' },
  { label:'Beauty',      slug:'beauty',      grad:'linear-gradient(135deg,#a855f7,#7c3aed)', emoji:'\u{1F484}' },
  { label:'Pharma',      slug:'pharma',      grad:'linear-gradient(135deg,#06b6d4,#0e7490)', emoji:'\u{1F48A}' },
  { label:'Home',        slug:'home',        grad:'linear-gradient(135deg,#ef4444,#b91c1c)', emoji:'\u{1F3E0}' },
  { label:'Sports',      slug:'sports',      grad:'linear-gradient(135deg,#14b8a6,#0f766e)', emoji:'⚽' },
];

const DEAL_SECTIONS = [
  { title:'Suggested For You',        color:'#00A2A5', prods: products.slice(0,8) },
  { title:'Top Deals on Electronics', color:'#FF5E00', prods: products.slice(2,10) },
  { title:'Fashion Picks',            color:'#007A76', prods: products.slice(1,9) },
];

const MARQUEE_ITEMS = [
  { icon:'⚡', text:'1,247 orders delivered today in Hyderabad' },
  { icon:'\u{1F3EA}', text:'389 local shops live right now' },
  { icon:'⏱', text:'Average delivery: 9 minutes' },
  { icon:'\u{1F4B0}', text:'Save ₹15–30 per order vs Swiggy' },
  { icon:'\u{1F6B2}', text:'100% electric delivery fleet' },
  { icon:'\u{1F193}', text:'Zero commission for local shops' },
  { icon:'⭐', text:'4.8 rating — 12,000+ happy customers' },
  { icon:'\u{1F33F}', text:'Farm-fresh vegetables in 10 min' },
];

const BANNERS = [
  { bg:'linear-gradient(135deg,#00C9C8 0%,#007A76 100%)', badge:'SEASON SALE',    title:'Fashion that moves with you',   sub:'Starting from ₹499',           btn:'Explore Fashion', link:'/category/fashion',     accent:'#FFA31A' },
  { bg:'linear-gradient(135deg,#FF6A00 0%,#FFA31A 100%)', badge:'FLASH SALE LIVE',title:'Big Tech Days Up to 60% Off',   sub:'Smartphones · Laptops · Audio', btn:'Shop Now', link:'/category/electronics', accent:'#fff' },
  { bg:'linear-gradient(135deg,#0F172A 0%,#1e3a5f 100%)', badge:'NEW ARRIVALS',   title:'Premium Brands At Best Prices', sub:'Exclusive collections',              btn:'Browse All',      link:'/category',             accent:'#00C9C8' },
];

function LiveDot() {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
      <span style={{ width:8, height:8, borderRadius:'50%', background:'#ef4444', display:'inline-block', animation:'live-ring 1.4s ease infinite' }}/>
      <span style={{ fontFamily:'Poppins', fontWeight:700, fontSize:11, color:'#ef4444', letterSpacing:'.04em' }}>LIVE</span>
    </span>
  );
}

function LiveCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const done = useRef(false);
  const elRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let cur = 0;
        const step = target / 60;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { setVal(target); clearInterval(t); }
          else setVal(Math.floor(cur));
        }, 16);
      }
    }, { threshold: 0.3 });
    if (elRef.current) observer.observe(elRef.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={elRef}>{val.toLocaleString('en-IN')}{suffix}</span>;
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function HScroll({ title, color, prods }: { title:string; color:string; prods:any[] }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="surface reveal" style={{ marginBottom:12 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 18px', borderBottom:'1px solid #f1f5f9' }}>
        <h2 style={{ fontSize:18, fontFamily:'Poppins', fontWeight:800, color:'var(--navy)', margin:0, display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ display:'inline-block', width:4, height:20, borderRadius:2, background:color }}/>
          {title}
        </h2>
        <Link to="/category" style={{ display:'flex', alignItems:'center', gap:5, background:color, color:'#fff', padding:'7px 15px', borderRadius:20, fontSize:12, fontFamily:'Poppins', fontWeight:600, textDecoration:'none' }}>
          See All <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </Link>
      </div>
      <div style={{ position:'relative' }}>
        <button className="hscroll-arrows" onClick={() => ref.current?.scrollBy({ left:-700, behavior:'smooth' })}
          style={{ position:'absolute', left:0, top:'50%', transform:'translateY(-50%)', zIndex:2, width:34, height:34, borderRadius:'50%', background:'#fff', border:'1px solid var(--border)', boxShadow:'0 4px 12px rgba(0,0,0,.15)', display:'grid', placeItems:'center', cursor:'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div ref={ref} style={{ display:'flex', gap:10, padding:'14px 16px', overflowX:'auto', scrollbarWidth:'none' }}>
          {prods.map((p, i) => (
            <div key={p.id + i} style={{ minWidth:200, maxWidth:200, flexShrink:0 }}>
              <ProductCard product={p} tint={i % 2 === 0 ? 'teal' : 'orange'}/>
            </div>
          ))}
        </div>
        <button className="hscroll-arrows" onClick={() => ref.current?.scrollBy({ left:700, behavior:'smooth' })}
          style={{ position:'absolute', right:0, top:'50%', transform:'translateY(-50%)', zIndex:2, width:34, height:34, borderRadius:'50%', background:'#fff', border:'1px solid var(--border)', boxShadow:'0 4px 12px rgba(0,0,0,.15)', display:'grid', placeItems:'center', cursor:'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [cd, setCd] = useState({ h:5, m:23, s:47 });
  const [search, setSearch] = useState('');
  const pad = (n: number) => String(n).padStart(2, '0');
  useReveal();

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % BANNERS.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCd(c => {
      if (c.s > 0) return { ...c, s:c.s - 1 };
      if (c.m > 0) return { ...c, m:c.m - 1, s:59 };
      if (c.h > 0) return { h:c.h - 1, m:59, s:59 };
      return { h:5, m:59, s:59 };
    }), 1000);
    return () => clearInterval(t);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate('/category?search=' + encodeURIComponent(search));
  };

  const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

  return (
    <div style={{ background:'#f1f3f6', minHeight:'100vh' }}>

      {/* 1. ANIMATED GRADIENT HERO */}
      <section className="hero-mesh" style={{ position:'relative', overflow:'hidden', padding:'60px 0 52px' }}>
        <div className="orb orb-1" style={{ width:500, height:500, background:'rgba(0,201,200,.18)', top:-140, right:-100 }}/>
        <div className="orb orb-2" style={{ width:380, height:380, background:'rgba(255,106,0,.13)', bottom:-100, left:-70 }}/>
        <div className="orb orb-3" style={{ width:280, height:280, background:'rgba(255,163,26,.09)', top:'40%', left:'32%' }}/>

        <div style={{ maxWidth:1300, margin:'0 auto', padding:'0 20px', position:'relative', zIndex:2 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:40, alignItems:'center' }}>

            <div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16, flexWrap:'wrap' }}>
                <LiveDot/>
                <span style={{ background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.18)', color:'rgba(255,255,255,.8)', fontSize:12, fontFamily:'Poppins', fontWeight:600, padding:'4px 12px', borderRadius:20 }}>
                  Hyderabad&apos;s Hyperlocal Quick Commerce
                </span>
              </div>

              <h1 style={{ fontFamily:'Poppins', fontWeight:900, fontSize:'clamp(28px,4.5vw,58px)', lineHeight:1.08, margin:'0 0 16px', letterSpacing:'-.02em' }}>
                <span className="gradient-text">Your Neighbourhood,</span><br/>
                <span style={{ color:'#fff' }}>Live &amp; Delivered</span><br/>
                <span style={{ color:'rgba(255,255,255,.65)' }}>in </span>
                <span style={{ color:'#FFA31A' }}>10 Minutes</span>
              </h1>

              <p style={{ color:'rgba(255,255,255,.6)', fontSize:16, fontFamily:'Inter', margin:'0 0 28px', maxWidth:520, lineHeight:1.65 }}>
                Real prices from local shops. Zero commission. 100% electric delivery.
                Save {inr(15)}&ndash;{inr(30)} on every order.
              </p>

              <form onSubmit={handleSearch} style={{ display:'flex', gap:0, maxWidth:540, marginBottom:28 }}>
                <div style={{ flex:1, display:'flex', alignItems:'center', background:'rgba(255,255,255,.12)', border:'1.5px solid rgba(255,255,255,.25)', borderRight:'none', borderRadius:'14px 0 0 14px', backdropFilter:'blur(10px)', padding:'0 16px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
                  <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search groceries, medicines, fashion…"
                    style={{ flex:1, border:'none', background:'transparent', outline:'none', color:'#fff', fontFamily:'Inter', fontSize:14, padding:'14px 12px' }}/>
                </div>
                <button type="submit" className="glow-btn" style={{ padding:'0 24px', borderRadius:'0 14px 14px 0', fontSize:14, whiteSpace:'nowrap' }}>
                  Search →
                </button>
              </form>

              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {['Milk','Bread','Eggs','Paracetamol','Onions'].map(q => (
                  <button key={q} onClick={() => navigate('/category?search=' + q)}
                    style={{ background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.18)', color:'rgba(255,255,255,.8)', fontFamily:'Poppins', fontWeight:600, fontSize:12, padding:'6px 14px', borderRadius:20, cursor:'pointer', backdropFilter:'blur(6px)' }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="mob-hide" style={{ display:'flex', flexDirection:'column', gap:10, flexShrink:0 }}>
              {[
                { val:1247, lbl:'Orders today',     sfx:'',    icon:'\u{1F4E6}' },
                { val:389,  lbl:'Shops live',       sfx:'',    icon:'\u{1F3EA}' },
                { val:9,    lbl:'Min avg delivery', sfx:' min', icon:'⚡' },
                { val:100,  lbl:'EV fleet',         sfx:'%',   icon:'\u{1F33F}' },
              ].map(s => (
                <div key={s.lbl} className="stat-chip" style={{ flexDirection:'row', gap:14 }}>
                  <span style={{ fontSize:26 }}>{s.icon}</span>
                  <div>
                    <div className="val"><LiveCounter target={s.val} suffix={s.sfx}/></div>
                    <div className="lbl">{s.lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TICKER */}
      <div className="ticker-wrap" style={{ padding:'10px 0' }}>
        <div className="ticker-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="marquee-item" style={{ color:'rgba(255,255,255,.7)', borderRight:'1px solid rgba(255,255,255,.08)' }}>
              <span style={{ fontSize:14 }}>{item.icon}</span>
              <span style={{ fontFamily:'Poppins', fontWeight:600 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MAIN BODY */}
      <div style={{ maxWidth:1300, margin:'0 auto', padding:'12px 12px', boxSizing:'border-box' }}>

        {/* Banner grid */}
        <div className="home-banner-grid reveal" style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:8, marginBottom:10, borderRadius:8, overflow:'hidden' }}>
          <div className="home-main-banner" style={{ position:'relative', borderRadius:14, overflow:'hidden', minHeight:280, background:BANNERS[slide].bg, transition:'background .6s', boxShadow:'0 8px 28px rgba(15,23,42,.12)' }}>
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(680px 340px at 85% -20%,rgba(255,255,255,.16),transparent 60%)', pointerEvents:'none' }}/>
            <div className="home-main-banner-content" style={{ position:'absolute', inset:0, padding:'36px 40px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <span style={{ display:'inline-block', background:'rgba(255,255,255,.2)', color:'#fff', fontSize:10, fontWeight:700, fontFamily:'Poppins', padding:'4px 10px', borderRadius:20, marginBottom:10, width:'fit-content', letterSpacing:'.1em' }}>{BANNERS[slide].badge}</span>
              <h2 className="home-main-banner-title" style={{ color:'#fff', fontSize:'clamp(20px,3vw,36px)', fontWeight:900, fontFamily:'Poppins', margin:'0 0 8px', lineHeight:1.15, maxWidth:400 }}>{BANNERS[slide].title}</h2>
              <p style={{ color:'rgba(255,255,255,.85)', fontSize:14, margin:'0 0 20px' }}>{BANNERS[slide].sub}</p>
              <Link to={BANNERS[slide].link}>
                <button className="shimmer" style={{ background:BANNERS[slide].accent, color:BANNERS[slide].accent === '#fff' ? 'var(--navy)' : '#fff', border:'none', padding:'11px 26px', borderRadius:10, fontFamily:'Poppins', fontWeight:700, fontSize:13, cursor:'pointer', position:'relative', overflow:'hidden' }}>
                  {BANNERS[slide].btn} →
                </button>
              </Link>
            </div>
            <div style={{ position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', display:'flex', gap:5 }}>
              {BANNERS.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)} style={{ width:i === slide ? 22 : 6, height:6, borderRadius:3, background:i === slide ? '#fff' : 'rgba(255,255,255,.5)', border:'none', cursor:'pointer', padding:0, transition:'width .3s' }}/>
              ))}
            </div>
          </div>
          <div className="home-banner-right" style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <Link to="/category/beauty" style={{ flex:1, borderRadius:14, background:'linear-gradient(135deg,#FF6A00,#FFA31A)', padding:'18px 20px', display:'flex', flexDirection:'column', justifyContent:'space-between', textDecoration:'none', minHeight:120 }}>
              <div>
                <p style={{ color:'rgba(255,255,255,.8)', fontSize:11, fontFamily:'Poppins', margin:'0 0 4px' }}>TRENDING NOW</p>
                <h3 style={{ color:'#fff', fontSize:18, fontWeight:800, fontFamily:'Poppins', margin:0, lineHeight:1.2 }}>Grooming Essentials</h3>
              </div>
              <span style={{ color:'#fff', fontSize:12, fontWeight:700, fontFamily:'Poppins' }}>Shop now →</span>
            </Link>
            <Link to="/category/fashion" style={{ flex:1, borderRadius:14, background:'linear-gradient(135deg,#0F172A,#1e3a5f)', padding:'18px 20px', display:'flex', flexDirection:'column', justifyContent:'space-between', textDecoration:'none', minHeight:120 }}>
              <div>
                <p style={{ color:'rgba(255,255,255,.6)', fontSize:11, fontFamily:'Poppins', margin:'0 0 4px' }}>PREMIUM PICKS</p>
                <h3 style={{ color:'#fff', fontSize:18, fontWeight:800, fontFamily:'Poppins', margin:0, lineHeight:1.2 }}>Travel in Style</h3>
              </div>
              <span style={{ color:'var(--teal)', fontSize:12, fontWeight:700, fontFamily:'Poppins' }}>Shop now →</span>
            </Link>
          </div>
        </div>

        {/* Flash sale strip */}
        <div className="flash-strip reveal" style={{ background:'linear-gradient(100deg,#0F172A 30%,#13283f 70%,#0F172A)', borderRadius:14, padding:'14px 18px', display:'flex', alignItems:'center', gap:16, marginBottom:10, flexWrap:'wrap', boxShadow:'0 6px 22px rgba(15,23,42,.18)', border:'1px solid rgba(255,255,255,.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
            <div style={{ width:34, height:34, borderRadius:10, background:'var(--grad-orange)', display:'grid', placeItems:'center', color:'#fff' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7z"/></svg>
            </div>
            <div>
              <p style={{ color:'#fff', fontFamily:'Poppins', fontWeight:800, fontSize:16, margin:0 }}>Flash Sale</p>
              <p style={{ color:'rgba(255,255,255,.6)', fontSize:11, margin:0 }}>Hurry, ends soon!</p>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:5, flexShrink:0 }}>
            {[pad(cd.h), pad(cd.m), pad(cd.s)].map((t, i) => (
              <span key={i} style={{ display:'flex', alignItems:'center', gap:5 }}>
                <span className="flip-unit">{t}</span>
                {i < 2 && <span style={{ color:'var(--orange-bright)', fontWeight:800, fontSize:16 }}>:</span>}
              </span>
            ))}
          </div>
          <div className="flash-quicklinks" style={{ display:'flex', gap:8, marginLeft:'auto', flexWrap:'wrap' }}>
            {[
              { label:'Min. 70% Off', sub:'Best Deals',  color:'#00A2A5', slug:'deals' },
              { label:'Just ₹799', sub:'Payday Sale', color:'#FF5E00', slug:'payday' },
              { label:'Just ₹499', sub:'Deal of Day', color:'#007A76', slug:'dotd' },
              { label:'Up to 80%',   sub:'Price Drop',  color:'#0F172A', slug:'pricedrop' },
            ].map(q => (
              <Link key={q.label} to={'/category/' + q.slug} style={{ background:q.color, color:'#fff', padding:'8px 12px', borderRadius:10, textDecoration:'none', textAlign:'center', minWidth:92, flexShrink:0 }}>
                <p style={{ fontFamily:'Poppins', fontWeight:800, fontSize:13, margin:0 }}>{q.label}</p>
                <p style={{ fontSize:10, opacity:.8, margin:0 }}>{q.sub}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Category grid */}
        <div className="surface reveal" style={{ marginBottom:12 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 18px 12px' }}>
            <h2 style={{ fontFamily:'Poppins', fontWeight:800, fontSize:18, color:'var(--navy)', margin:0, display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ width:4, height:20, borderRadius:2, background:'var(--grad-orange)', display:'inline-block' }}/>
              Shop by Category
            </h2>
            <Link to="/category" style={{ fontSize:13, fontFamily:'Poppins', fontWeight:600, color:'var(--teal-deep)', textDecoration:'none' }}>View all →</Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:8, padding:'0 12px 16px' }}>
            {CATEGORIES.map(c => (
              <Link key={c.slug} to={'/category/' + c.slug} className="cat-icon-card">
                <div className="icon-ring" style={{ background:c.grad }}>
                  <span style={{ fontSize:26 }}>{c.emoji}</span>
                </div>
                <span className="cat-name">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Horizontal product sections */}
        {DEAL_SECTIONS.map(s => (
          <HScroll key={s.title} title={s.title} color={s.color} prods={s.prods}/>
        ))}

        {/* Deal banners */}
        <div className="home-deal-banners reveal" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
          {[
            { title:'Shop for a Cool Summer', color:'#FF5E00', slug:'fashion' },
            { title:'Top Electronics Deals',  color:'#00A2A5', slug:'electronics' },
          ].map(b => (
            <Link key={b.title} to={'/category/' + b.slug} className="shimmer" style={{ background:b.color, borderRadius:14, padding:'20px 22px', display:'flex', alignItems:'center', justifyContent:'space-between', textDecoration:'none', position:'relative', overflow:'hidden' }}>
              <h3 style={{ color:'#fff', fontFamily:'Poppins', fontWeight:800, fontSize:17, margin:0, maxWidth:180, lineHeight:1.2 }}>{b.title}</h3>
              <div style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,.2)', display:'grid', placeItems:'center', color:'#fff' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="reveal" style={{ background:'var(--grad-teal)', borderRadius:16, padding:'32px 28px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:24, flexWrap:'wrap', marginBottom:16, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(600px 300px at 80% 120%,rgba(255,163,26,.3),transparent 60%)', pointerEvents:'none' }}/>
          <div style={{ position:'relative' }}>
            <h2 style={{ color:'#fff', fontSize:'clamp(18px,3vw,24px)', fontFamily:'Poppins', margin:'0 0 4px' }}>Get Exclusive Deals</h2>
            <p style={{ color:'rgba(255,255,255,.85)', fontSize:14, margin:0 }}>Subscribe and save up to 40% on your next order</p>
          </div>
          <form style={{ display:'flex', gap:8, position:'relative', flexWrap:'wrap' }} onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email…" style={{ padding:'12px 18px', borderRadius:10, border:'none', fontSize:14, fontFamily:'Inter', outline:'none', minWidth:220, flex:1 }}/>
            <button type="submit" className="btn btn-cta" style={{ flexShrink:0 }}>Subscribe</button>
          </form>
        </div>
      </div>

      {/* 4. LIVE STORE SECTION */}
      <section className="live-store-section">
        <div className="orb orb-1" style={{ width:500, height:500, background:'rgba(0,201,200,.12)', top:-100, right:-120 }}/>
        <div className="orb orb-2" style={{ width:350, height:350, background:'rgba(255,106,0,.1)', bottom:-80, left:-80 }}/>

        <div style={{ maxWidth:1300, margin:'0 auto', padding:'0 20px', position:'relative', zIndex:2 }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:40 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(0,201,200,.15)', border:'1px solid rgba(0,201,200,.3)', borderRadius:999, padding:'6px 18px', marginBottom:16 }}>
              <LiveDot/>
              <span style={{ fontFamily:'Poppins', fontWeight:700, fontSize:13, color:'rgba(255,255,255,.85)' }}>389 shops live right now in Hyderabad</span>
            </div>
            <h2 style={{ fontFamily:'Poppins', fontWeight:900, fontSize:'clamp(26px,4vw,44px)', color:'#fff', margin:'0 0 12px', lineHeight:1.1 }}>
              Zoptavi <span style={{ color:'#00C9C8' }}>Live Store</span>
            </h2>
            <p style={{ color:'rgba(255,255,255,.55)', fontSize:16, fontFamily:'Inter', maxWidth:540, margin:'0 auto' }}>
              Your neighbourhood shops, live. Real prices. No markup. Delivered in 10 minutes.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:40 }}>
            {LIVE_STORES.map(s => (
              <Link key={s.label} to="/category" style={{ textDecoration:'none' }}>
                <div className="live-card reveal">
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                    <span style={{ fontSize:36 }}>{s.emoji}</span>
                    <span style={{ background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.18)', color:'rgba(255,255,255,.8)', fontSize:11, fontFamily:'Poppins', fontWeight:700, padding:'3px 10px', borderRadius:20 }}>{s.tag}</span>
                  </div>
                  <h3 style={{ fontFamily:'Poppins', fontWeight:800, fontSize:18, color:'#fff', margin:'0 0 6px', whiteSpace:'pre-line', lineHeight:1.2 }}>{s.label}</h3>
                  <p style={{ color:'rgba(255,255,255,.5)', fontSize:13, fontFamily:'Inter', margin:'0 0 14px', lineHeight:1.55 }}>{s.desc}</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontFamily:'Poppins', fontWeight:700, fontSize:12, color:s.color }}>{s.stat}</span>
                    <span style={{ background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.18)', color:'#fff', fontFamily:'Poppins', fontWeight:600, fontSize:12, padding:'5px 14px', borderRadius:20 }}>Order →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Price compare */}
          <div className="reveal" style={{ background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', borderRadius:20, padding:'28px 32px' }}>
            <div style={{ textAlign:'center', marginBottom:24 }}>
              <h3 style={{ fontFamily:'Poppins', fontWeight:800, fontSize:22, color:'#fff', margin:'0 0 6px' }}>
                💰 Why Zoptavi Saves You Money
              </h3>
              <p style={{ color:'rgba(255,255,255,.5)', fontSize:14, fontFamily:'Inter' }}>
                Swiggy adds 18–30% commission. We don&apos;t. Your shop keeps all the profit.
              </p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
              {[
                { item:'Tata Salt 1kg',   us:24, them:34 },
                { item:'Amul Milk 500ml', us:28, them:41 },
                { item:'Bread loaf',      us:35, them:52 },
                { item:'Paracetamol 10s', us:18, them:28 },
              ].map(p => (
                <div key={p.item} style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.08)', borderRadius:14, padding:'16px 14px', textAlign:'center' }}>
                  <p style={{ color:'rgba(255,255,255,.6)', fontSize:12, fontFamily:'Poppins', fontWeight:600, margin:'0 0 10px' }}>{p.item}</p>
                  <div style={{ display:'flex', gap:6, justifyContent:'center', marginBottom:8 }}>
                    <span style={{ background:'rgba(0,201,200,.2)', color:'#00C9C8', fontFamily:'Poppins', fontWeight:800, fontSize:15, padding:'4px 10px', borderRadius:8 }}>{inr(p.us)}</span>
                    <span style={{ background:'rgba(255,106,0,.15)', color:'#ff8040', fontFamily:'Poppins', fontWeight:700, fontSize:13, padding:'4px 10px', borderRadius:8, textDecoration:'line-through', opacity:.8 }}>{inr(p.them)}</span>
                  </div>
                  <p style={{ color:'#4ade80', fontFamily:'Poppins', fontWeight:700, fontSize:12, margin:0 }}>You save {inr(p.them - p.us)}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign:'center', marginTop:24 }}>
              <Link to="/category">
                <button className="glow-btn" style={{ padding:'13px 32px', fontSize:15 }}>Start Saving Now →</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section style={{ background:'#fff', padding:'56px 0' }}>
        <div style={{ maxWidth:1300, margin:'0 auto', padding:'0 20px' }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:36 }}>
            <h2 style={{ fontFamily:'Poppins', fontWeight:900, fontSize:'clamp(22px,3.5vw,36px)', color:'var(--navy)', margin:'0 0 8px' }}>How Zoptavi Works</h2>
            <p style={{ color:'var(--text-2)', fontSize:15, fontFamily:'Inter' }}>Three steps. Ten minutes. Real shop prices.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {[
              { step:'1', icon:'\u{1F4CD}', title:'Enter your area',  desc:'Type your pincode. See all live shops within 2km of you.' },
              { step:'2', icon:'\u{1F6D2}', title:'Pick your items',  desc:'Browse real-time stock. No fake "Out of Stock".' },
              { step:'3', icon:'⚡',    title:'Order in seconds', desc:'Place order via app or WhatsApp. Pay on delivery or UPI.' },
              { step:'4', icon:'\u{1F6B2}', title:'10-min delivery',  desc:'Our EV rider picks up from the shop and brings it to your door.' },
            ].map((s, i) => (
              <div key={s.step} className="reveal" style={{ textAlign:'center', padding:'24px 16px', transitionDelay: (i * 0.1) + 's' }}>
                <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg,#E6FAFA,#f0f8ff)', border:'2px solid rgba(0,201,200,.25)', display:'grid', placeItems:'center', margin:'0 auto 6px', fontSize:32 }}>
                  {s.icon}
                </div>
                <div style={{ width:22, height:22, borderRadius:'50%', background:'var(--grad-teal)', color:'#fff', fontFamily:'Poppins', fontWeight:800, fontSize:11, display:'grid', placeItems:'center', margin:'-8px auto 14px' }}>{s.step}</div>
                <h3 style={{ fontFamily:'Poppins', fontWeight:700, fontSize:16, color:'var(--navy)', margin:'0 0 8px' }}>{s.title}</h3>
                <p style={{ color:'var(--text-2)', fontSize:13, fontFamily:'Inter', lineHeight:1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TRUST STRIP */}
      <div style={{ background:'#f8fafc', borderTop:'1px solid #eef0f4', borderBottom:'1px solid #eef0f4', padding:'20px 0' }}>
        <div style={{ maxWidth:1300, margin:'0 auto', padding:'0 20px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {[
              { icon:'⚡',    title:'10-Minute Delivery', sub:'2km grid guarantee' },
              { icon:'\u{1F4B0}', title:'Real Shop Prices',   sub:'Zero Swiggy markup' },
              { icon:'\u{1F33F}', title:'100% EV Fleet',      sub:'Green last-mile delivery' },
              { icon:'\u{1F3EA}', title:'389 Local Shops',    sub:'Support your neighbourhood' },
            ].map(t => (
              <div key={t.title} className="reveal" style={{ display:'flex', alignItems:'center', gap:12 }}>
                <span style={{ fontSize:28, flexShrink:0 }}>{t.icon}</span>
                <div>
                  <p style={{ fontFamily:'Poppins', fontWeight:700, fontSize:14, color:'var(--navy)', margin:0 }}>{t.title}</p>
                  <p style={{ fontSize:12, color:'var(--text-2)', margin:0 }}>{t.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
