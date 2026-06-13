import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

interface Props { product: Product; tint?: string; }

const GRADIENTS: Record<string, string> = {
  teal:   'linear-gradient(135deg,#E6FAFA 0%,#ccf5f5 100%)',
  orange: 'linear-gradient(135deg,#fff0e6 0%,#ffd9bc 100%)',
  purple: 'linear-gradient(135deg,#f3e8ff 0%,#ddd6fe 100%)',
  green:  'linear-gradient(135deg,#dcfce7 0%,#bbf7d0 100%)',
};
const ICON_COLOR: Record<string, string> = {
  teal:'#007A76', orange:'#c25400', purple:'#7c3aed', green:'#15803d',
};

function getCatEmoji(cat: string) {
  if (cat === 'fashion') return '\u{1F457}';
  if (cat === 'electronics') return '\u{1F4F1}';
  if (cat === 'beauty') return '\u{1F484}';
  if (cat === 'grocery') return '\u{1F966}';
  if (cat === 'pharma') return '\u{1F48A}';
  return '\u{1F4E6}';
}

export default function ProductCard({ product: p, tint = 'teal' }: Props) {
  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(p.id);
  const [added, setAdded] = useState(false);
  const [toast, setToast] = useState(false);
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const discount = Math.round((1 - p.price / p.originalPrice) * 100);
  const bg = GRADIENTS[tint] ?? GRADIENTS.teal;
  const ic = ICON_COLOR[tint] ?? ICON_COLOR.teal;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(p, 1);
    setAdded(true);
    setToast(true);
    const btn = btnRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    }
    setTimeout(() => setAdded(false), 2000);
    setTimeout(() => setToast(false), 2500);
  };

  const inrPrice = (n: number) => '₹' + n.toLocaleString('en-IN');

  return (
    <>
      <Link to={`/product/${p.id}`} style={{ textDecoration:'none', display:'block' }}>
        <div className="zcard shimmer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

          {/* Media */}
          <div className="zcard-media" style={{ background:bg }}>
            <div className="zcard-media-inner" style={{ display:'grid', placeItems:'center', width:'100%', height:'100%' }}>
              <div style={{
                width:88, height:88, borderRadius:'50%',
                background:'radial-gradient(circle,rgba(255,255,255,.9),rgba(255,255,255,.4))',
                border:'2px solid rgba(255,255,255,.7)',
                display:'grid', placeItems:'center',
                boxShadow:'0 8px 30px rgba(0,0,0,.1)',
                transition:'transform .4s cubic-bezier(.34,1.56,.64,1)',
                transform: hovered ? 'scale(1.12) rotate(-5deg)' : 'scale(1)',
              }}>
                <span style={{ fontSize:34, lineHeight:1 }}>{getCatEmoji(p.category ?? '')}</span>
              </div>
              <span style={{ position:'absolute', bottom:10, left:'50%', transform:'translateX(-50%)', fontFamily:'IBM Plex Mono, monospace', fontSize:10, color:ic, background:'rgba(255,255,255,.8)', padding:'3px 8px', borderRadius:6, border:'1px solid rgba(0,0,0,.08)', whiteSpace:'nowrap', maxWidth:'90%', overflow:'hidden', textOverflow:'ellipsis' }}>
                {p.brand}
              </span>
            </div>

            {discount > 0 && <span className="disc-badge">{discount}% OFF</span>}

            <button className={`heart-btn ${wishlisted ? 'active' : ''}`} onClick={e => { e.preventDefault(); toggleItem(p); }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={wishlisted ? '#ef4444' : '#999'} strokeWidth="2">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" fill={wishlisted ? '#ef4444' : 'none'}/>
              </svg>
            </button>

            {p.rating >= 4.5 && (
              <span style={{ position:'absolute', bottom:10, left:10, background:'linear-gradient(120deg,rgba(0,122,118,.92),rgba(0,201,200,.88))', color:'#fff', fontSize:10, fontFamily:'Poppins', fontWeight:700, padding:'4px 9px', borderRadius:7 }}>
                \u2736 TOP RATED
              </span>
            )}

            {/* Quick view overlay */}
            <div style={{
              position:'absolute', inset:0,
              background:'linear-gradient(to top,rgba(15,23,42,.85),rgba(15,23,42,.3) 50%,transparent)',
              opacity: hovered ? 1 : 0, transition:'opacity .3s',
              display:'flex', alignItems:'flex-end', padding:12,
              pointerEvents: hovered ? 'auto' : 'none',
            }}>
              <button onClick={e => { e.preventDefault(); window.location.href = `/product/${p.id}`; }}
                style={{ width:'100%', background:'rgba(255,255,255,.15)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.3)', color:'#fff', fontFamily:'Poppins', fontWeight:700, fontSize:12, padding:'8px 0', borderRadius:10, cursor:'pointer' }}>
                Quick View →
              </button>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding:'14px 14px 16px', display:'flex', flexDirection:'column', gap:8 }}>
            <h3 style={{ fontFamily:'Poppins', fontWeight:600, fontSize:14, color:'var(--navy)', lineHeight:1.35, margin:0, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as any }}>
              {p.name}
            </h3>

            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ display:'flex', alignItems:'center', gap:2, background:'#16a34a', color:'#fff', padding:'2px 7px', borderRadius:5, fontSize:12, fontWeight:700, fontFamily:'Poppins' }}>
                {p.rating.toFixed(1)} ★
              </div>
              <span style={{ fontSize:12, color:'var(--text-3)' }}>({p.ratingCount.toLocaleString('en-IN')})</span>
              {p.ratingCount > 1000 && (
                <span style={{ background:'rgba(255,106,0,.1)', color:'#c25400', fontSize:10, fontFamily:'Poppins', fontWeight:700, padding:'1px 6px', borderRadius:4 }}>HOT</span>
              )}
            </div>

            <div style={{ display:'flex', alignItems:'baseline', gap:8, flexWrap:'wrap' }}>
              <span style={{ fontFamily:'Poppins', fontWeight:800, fontSize:18, color:'var(--navy)' }}>{inrPrice(p.price)}</span>
              <span style={{ fontSize:12, color:'var(--text-3)', textDecoration:'line-through' }}>{inrPrice(p.originalPrice)}</span>
              <span style={{ fontSize:12, color:'#16a34a', fontWeight:700 }}>{discount}% off</span>
            </div>

            <p style={{ fontSize:11, color:'var(--teal-deep)', fontWeight:600, margin:0 }}>
              {inrPrice(Math.round(p.price * 0.92))} with Bank offer
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:4 }}>
              <button ref={btnRef} className="cart-btn ripple-btn" onClick={handleAddToCart}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
                <span>{added ? '\u2713 Added!' : 'Add to Cart'}</span>
              </button>
              <button className="buynow-btn" onClick={e => e.preventDefault()}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </Link>

      {toast && (
        <div className="toast" style={{ zIndex:9999 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00C9C8" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
          <span>{p.name.slice(0, 22)}… added to cart</span>
        </div>
      )}
    </>
  );
}
