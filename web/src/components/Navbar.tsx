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
  { label:'Toys, ba...',  slug:'toys',       icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg> },
  { label:'Food & H.',   slug:'grocery',     icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h9.2a2 2 0 0 0 2-1.6L23 6H6"/><circle cx="10" cy="21" r="1"/><circle cx="19" cy="21" r="1"/></svg> },
  { label:'Auto Acc.',   slug:'auto',        icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M15 6h-5l-3 8h10z"/></svg> },
  { label:'2 Wheele...',  slug:'two-wheelers',icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M6 18 10 6h4l2 7M14 10h4"/></svg> },
  { label:'Sports & ...',  slug:'sports',    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18"/></svg> },
  { label:'Books & ...',   slug:'books',     icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h11a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2z"/><path d="M17 6h3v14H6"/></svg> },
  { label:'Furniture',   slug:'furniture',   icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="8" width="18" height="10" rx="2"/><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M5 18v2M19 18v2"/></svg> },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCartStore();
  const { user, signOut } = useAuth();
  const [search, setSearch] = useState('');
  const [active, setActive] = useState('For You');
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

  const path = location.pathname;

  return (
    <>
    <header style={{ position:'sticky', top:0, zIndex:100, background:'#fff', boxShadow:'0 1px 6px rgba(0,0,0,.1)' }}>

      {/* Top bar */}
      <div style={{ borderBottom:'1px solid #f0f0f0' }}>
        <div style={{ maxWidth:1300, margin:'0 auto', padding:'0 12px', display:'grid', gridTemplateColumns:'auto 1fr auto', alignItems:'center', gap:12, minHeight:60 }}>
          {/* Logo */}
          <Link to="/" style={{ flexShrink:0, textDecoration:'none' }}>
            <img src="/zoptavi-logo-clean.png" alt="Zoptavi" style={{ height:54, width:'auto' }} />
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} style={{ width:'100%', minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', height:44, border:`2px solid ${focused?'var(--teal)':'#e0e0e0'}`, borderRadius:8, overflow:'hidden', background: focused?'#fff':'#f5f5f5', transition:'border-color .15s, box-shadow .15s', boxShadow: focused?'0 0 0 3px rgba(0,201,200,.15)':'none' }}>
              <span style={{ padding:'0 10px', color:'#999', display:'flex', alignItems:'center', flexShrink:0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              </span>
              <input type="text" value={search} onChange={e=>setSearch(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} placeholder="Search for Products, Brands and More" style={{ flex:1, border:'none', background:'transparent', outline:'none', fontSize:14, fontFamily:'Inter', color:'#212121', minWidth:0 }}/>
              <button type="submit" className="zhead-search-btn" style={{ height:'100%', padding:'0 20px', background:'var(--grad-teal)', color:'#fff', border:'none', cursor:'pointer', fontFamily:'Poppins', fontWeight:700, fontSize:14, display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Actions — hidden on mobile (shown in bottom nav instead) */}
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

      {/* Category strip — compact on scroll */}
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
                  {compact && (
                    <div style={{ width:18, height:18, color: on?'var(--teal-deep)':'#555', flexShrink:0 }}>{c.icon}</div>
                  )}
                  <span style={{ fontSize: compact?12:11, fontFamily:'Poppins', fontWeight: on?700:500, color: on?'var(--teal-deep)':'#212121' }}>
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Bottom Navigation Bar */}
    <nav className="z-bottom-nav">
      <Link to="/" className={`z-bnav-item${path==='/'?' active':''}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10 12 3l9 7"/><path d="M5 9v11h5v-5h4v5h5V9"/></svg>
        Home
      </Link>
      <Link to="/category" className={`z-bnav-item${path.startsWith('/category')?' active':''}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
        Categories
      </Link>
      <Link to="/cart" className={`z-bnav-item${path==='/cart'?' active':''}`} style={{ position:'relative' }}>
        {totalItems>0 && <span style={{ position:'absolute', top:6, right:'calc(50% - 18px)', background:'var(--orange)', color:'#fff', fontSize:9, fontWeight:700, minWidth:16, height:16, borderRadius:8, display:'grid', placeItems:'center', fontFamily:'Poppins' }}>{totalItems}</span>}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
        Cart
      </Link>
      <Link to={user?'/dashboard':'/login'} className={`z-bnav-item${(path==='/dashboard'||path==='/login')?' active':''}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
        {user?'Account':'Login'}
      </Link>
    </nav>
    </>
  );
}
