import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../context/AuthContext';

const cats = [
  { label:'For You',     slug:'for-you',     icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg> },
  { label:'Fashion',     slug:'fashion',     icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2 4 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6l-2-4z"/><path d="M4 6h16M9 10a3 3 0 0 0 6 0"/></svg> },
  { label:'Mobiles',     slug:'mobiles',     icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M12 18h.01"/></svg> },
  { label:'Beauty',      slug:'beauty',      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 2v6l-3 8a3 3 0 0 0 3 4h6a3 3 0 0 0 3-4l-3-8V2"/><path d="M8 2h8"/></svg> },
  { label:'Electronics', slug:'electronics', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
  { label:'Home',        slug:'home',        icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 10 12 3l9 7"/><path d="M5 9v11h14V9"/></svg> },
  { label:'Appliances',  slug:'appliances',  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/></svg> },
  { label:'Toys',        slug:'toys',        icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg> },
  { label:'Food & H.',   slug:'grocery',     icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h9.2a2 2 0 0 0 2-1.6L23 6H6"/><circle cx="10" cy="21" r="1"/><circle cx="19" cy="21" r="1"/></svg> },
  { label:'Auto Acc.',   slug:'auto',        icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M15 6h-5l-3 8h10z"/></svg> },
  { label:'Sports',      slug:'sports',      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18"/></svg> },
  { label:'Books',       slug:'books',       icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h11a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2z"/><path d="M17 6h3v14H6"/></svg> },
  { label:'Furniture',   slug:'furniture',   icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="8" width="18" height="10" rx="2"/><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M5 18v2M19 18v2"/></svg> },
];

const MODES = [
  { key:'ecommerce',  label:'E-Commerce', sub:'Online Shopping', link:'/category', bg:'linear-gradient(135deg,#0F172A,#1e3a5f)', accent:'#00C9C8' },
  { key:'quick',      label:'Quick',      sub:'10-Min Delivery', link:'/',         bg:'linear-gradient(135deg,#00C9C8,#007A76)', accent:'#FFA31A' },
  { key:'hyperlocal', label:'Hyperlocal', sub:'Local Shops',     link:'/category', bg:'linear-gradient(135deg,#FF6A00,#FFA31A)', accent:'#fff'    },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCartStore();
  const { user, signOut } = useAuth();
  const [search, setSearch] = useState('');
  const [active, setActive] = useState('For You');
  const [activeMode, setActiveMode] = useState('ecommerce');
  const [focused, setFocused] = useState(false);
  const [compact, setCompact] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setCompact(y > 80);
      lastY.current = y;
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/category?search=${encodeURIComponent(search)}`);
  };

  const handleModeClick = (m: typeof MODES[0]) => {
    setActiveMode(m.key);
    if (m.key === 'quick') {
      navigate('/');
      setTimeout(() => document.getElementById('hyperlocal-section')?.scrollIntoView({ behavior: 'smooth' }), 200);
    } else {
      navigate(m.link);
    }
  };

  const modeEmoji: Record<string, string> = { ecommerce: '\u{1F6CD}', quick: '⚡', hyperlocal: '\u{1F3EA}' };

  const path = location.pathname;

  return (
    <>
    <header style={{ position:'sticky', top:0, zIndex:100, background:'#fff', boxShadow: compact ? '0 4px 20px rgba(15,23,42,.1)' : '0 1px 4px rgba(15,23,42,.06)', transition:'box-shadow .25s' }}>

      {/* Announcement strip */}
      <div className="mob-hide" style={{ background:'linear-gradient(90deg,#0F172A,#1E3A5F 55%,#0F172A)', color:'#cbd5e1', fontSize:12, fontFamily:'Poppins', fontWeight:500 }}>
        <div style={{ maxWidth:1300, margin:'0 auto', padding:'6px 12px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
          <span style={{ display:'flex', alignItems:'center', gap:6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00C9C8" strokeWidth="2"><path d="M5 12h13M3 6h18M7 18h13"/></svg>
            Free delivery on orders above &#8377;499
          </span>
          <span style={{ display:'flex', gap:18 }}>
            <Link to="/order/track" style={{ color:'#cbd5e1' }} onMouseEnter={e=>(e.currentTarget.style.color='#00C9C8')} onMouseLeave={e=>(e.currentTarget.style.color='#cbd5e1')}>Track Order</Link>
            <Link to="/contact" style={{ color:'#cbd5e1' }} onMouseEnter={e=>(e.currentTarget.style.color='#00C9C8')} onMouseLeave={e=>(e.currentTarget.style.color='#cbd5e1')}>Help Center</Link>
            <Link to="/about" style={{ color:'#FFA31A', fontWeight:600 }}>Become a Seller</Link>
          </span>
        </div>
      </div>

      {/* MODE SWITCHER */}
      <div style={{ background:'#fff', borderBottom:'1px solid #eef0f4', overflowX:'auto' }}>
        <div style={{ maxWidth:1300, margin:'0 auto', padding:'0 12px', display:'flex', alignItems:'center', gap:6, height:62 }}>
          {MODES.map(m => {
            const isActive = activeMode === m.key;
            return (
              <button
                key={m.key}
                onClick={() => handleModeClick(m)}
                style={{
                  display:'flex', alignItems:'center', gap:10,
                  padding:'8px 18px', borderRadius:12, cursor:'pointer',
                  background: isActive ? m.bg : '#f8fafc',
                  border: isActive ? 'none' : '1.5px solid #e2e8f0',
                  transition:'all .2s',
                  boxShadow: isActive ? '0 4px 14px rgba(0,0,0,.18)' : 'none',
                  transform: isActive ? 'translateY(-1px)' : 'none',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize:22, lineHeight:1 }}>{modeEmoji[m.key]}</span>
                <div style={{ textAlign:'left' }}>
                  <p style={{ fontFamily:'Poppins', fontWeight:800, fontSize:13, margin:0, lineHeight:1.2, color: isActive ? '#fff' : '#0F172A' }}>{m.label}</p>
                  <p style={{ fontFamily:'Inter', fontSize:10, margin:0, lineHeight:1.1, color: isActive ? 'rgba(255,255,255,.75)' : '#9ca3af' }}>{m.sub}</p>
                </div>
              </button>
            );
          })}
          <div style={{ width:1, height:32, background:'#e2e8f0', flexShrink:0, margin:'0 6px' }}/>
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:10, background:'#f0fdfa', border:'1px solid rgba(0,122,118,.18)', flexShrink:0, cursor:'pointer' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#007A76" strokeWidth="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            <span style={{ fontFamily:'Poppins', fontWeight:600, fontSize:12, color:'#007A76' }}>Hyderabad</span>
          </div>
        </div>
      </div>

      {/* Top bar */}
      <div style={{ borderBottom:'1px solid #f0f0f0' }}>
        <div style={{ maxWidth:1300, margin:'0 auto', padding:'0 12px', display:'grid', gridTemplateColumns:'auto 1fr auto', alignItems:'center', gap:12, minHeight:60 }}>
          <Link to="/" className="nav-logo" style={{ flexShrink:0, textDecoration:'none' }}>
            <img className="nav-logo-img" src="/zoptavi-logo-clean.png" alt="Zoptavi" style={{ height:54, width:'auto' }} />
          </Link>
          <form onSubmit={handleSearch} style={{ width:'100%', minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', height:46, border:`1.6px solid ${focused?'var(--teal)':'#e2e8f0'}`, borderRadius:12, overflow:'hidden', background: focused?'#fff':'#f5f7fa', transition:'border-color .2s, box-shadow .2s, background .2s', boxShadow: focused?'0 0 0 4px rgba(0,201,200,.13), 0 6px 20px rgba(0,201,200,.1)':'none' }}>
              <span style={{ padding:'0 10px', color:'#999', display:'flex', alignItems:'center', flexShrink:0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              </span>
              <input type="text" value={search} onChange={e=>setSearch(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} placeholder="Search for Products, Brands and More" style={{ flex:1, border:'none', background:'transparent', outline:'none', fontSize:14, fontFamily:'Inter', color:'#212121', minWidth:0 }}/>
              <button type="submit" className="zhead-search-btn search-btn-pines" style={{ height:'100%', padding:'0 22px', fontSize:14, flexShrink:0 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>
          <div className="znav-actions" style={{ alignItems:'center', gap:2, flexShrink:0, minWidth:0 }}>
            {user ? (
              <button onClick={()=>signOut()} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2, padding:'6px 10px', border:'none', background:'transparent', cursor:'pointer', borderRadius:4 }} onMouseEnter={e=>(e.currentTarget.style.background='#f5f5f5')} onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
                <span className="nav-act-label" style={{ fontSize:11, fontFamily:'Poppins', fontWeight:600, color:'#212121' }}>Account</span>
              </button>
            ) : (
              <Link to="/login" style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2, padding:'6px 10px', textDecoration:'none', borderRadius:4 }} onMouseEnter={e=>(e.currentTarget.style.background='#f5f5f5')} onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
                <span className="nav-act-label" style={{ fontSize:11, fontFamily:'Poppins', fontWeight:600, color:'#212121' }}>Login</span>
              </Link>
            )}
            <Link to="/wishlist" style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2, padding:'6px 10px', textDecoration:'none', borderRadius:4 }} onMouseEnter={e=>(e.currentTarget.style.background='#f5f5f5')} onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
              <span className="nav-act-label" style={{ fontSize:11, fontFamily:'Poppins', fontWeight:600, color:'#212121' }}>Wishlist</span>
            </Link>
            <Link to="/cart" style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2, padding:'6px 10px', textDecoration:'none', position:'relative', borderRadius:4 }} onMouseEnter={e=>(e.currentTarget.style.background='#f5f5f5')} onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
              {totalItems>0 && <span style={{ position:'absolute', top:0, right:4, background:'var(--orange)', color:'#fff', fontSize:10, fontWeight:700, minWidth:18, height:18, borderRadius:9, display:'grid', placeItems:'center', fontFamily:'Poppins' }}>{totalItems}</span>}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
              <span className="nav-act-label" style={{ fontSize:11, fontFamily:'Poppins', fontWeight:600, color:'#212121' }}>Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category strip */}
      <div style={{ background:'#fff', borderTop:'1px solid #f0f0f0', overflow:'hidden', transition:'height .25s ease', height: compact ? 40 : 76 }}>
        <div style={{ maxWidth:1300, margin:'0 auto', padding:'0 6px', overflowX:'auto', scrollbarWidth:'none', height:'100%' }}>
          <div style={{ display:'flex', alignItems:'center', height:'100%' }}>
            {cats.map(c => {
              const on = active === c.label;
              return (
                <button key={c.label} onClick={()=>{ setActive(c.label); navigate(`/category/${c.slug}`); }}
                  style={{ display:'flex', flexDirection: compact?'row':'column', alignItems:'center', gap: compact?5:3, padding: compact?'0 10px':'5px 12px', border:'none', background:'transparent', cursor:'pointer', position:'relative', flexShrink:0, height:'100%', borderBottom:`3px solid ${on?'var(--teal)':'transparent'}`, transition:'border-color .15s', whiteSpace:'nowrap' }}>
                  {!compact && (
                    <div style={{ width:38, height:38, borderRadius:'50%', display:'grid', placeItems:'center', background: on?'rgba(0,201,200,.1)':'#f5f5f5', flexShrink:0 }}>
                      <div style={{ width:20, height:20, color: on?'var(--teal-deep)':'#555' }}>{c.icon}</div>
                    </div>
                  )}
                  <span style={{ fontSize: compact?13:11, fontFamily:'Poppins', fontWeight: on?700:500, color: on?'var(--teal-deep)':'#555' }}>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>

    {/* Mobile bottom nav */}
    <nav className="z-bottom-nav" style={{ display:'none', position:'fixed', bottom:0, left:0, right:0, zIndex:200, background:'#fff', borderTop:'1px solid #eee', gridTemplateColumns:'repeat(5,1fr)', paddingBottom:'env(safe-area-inset-bottom)' }}>
      {[
        { label:'Home',     icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 10 12 3l9 7"/><path d="M5 9v11h14V9"/></svg>,     to:'/' },
        { label:'Category', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>, to:'/category' },
        { label:'Search',   icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>,  to:'/category' },
        { label:'Wishlist', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>, to:'/wishlist' },
        { label:'Cart',     icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>, to:'/cart' },
      ].map(item => {
        const on = path === item.to;
        return (
          <Link key={item.label} to={item.to} style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:3, textDecoration:'none', padding:'8px 0', position:'relative' }}>
            {item.label === 'Cart' && totalItems > 0 && (
              <span style={{ position:'absolute', top:6, right:'calc(50% - 18px)', background:'var(--orange)', color:'#fff', fontSize:9, fontWeight:700, minWidth:16, height:16, borderRadius:8, display:'grid', placeItems:'center', fontFamily:'Poppins' }}>{totalItems}</span>
            )}
            <div style={{ width:22, height:22, color: on ? 'var(--teal)' : '#666' }}>{item.icon}</div>
            <span style={{ fontSize:10, fontFamily:'Poppins', fontWeight:600, color: on ? 'var(--teal)' : '#666' }}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
    </>
  );
}
