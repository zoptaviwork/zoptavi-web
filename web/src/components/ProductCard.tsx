import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

interface Props { product: Product; tint?: string; }

export default function ProductCard({ product: p, tint = 'teal' }: Props) {
  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(p.id);
  const [added, setAdded] = useState(false); // cart animation
  const [toast, setToast] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(p, 1);
    setAdded(true);
    setToast(true);
    // Ripple effect
    const btn = btnRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    }
    setTimeout(() => setAdded(false), 2000);
    setTimeout(() => setToast(false), 2500);
  };

  const discount = Math.round((1 - p.price / p.originalPrice) * 100);

  return (
    <>
      <Link to={`/product/${p.id}`} style={{ textDecoration:'none', display:'block' }}>
        <div className="zcard shimmer">
          {/* Media */}
          <div className="zcard-media">
            <div className={`zcard-media-inner ph ${tint}`}>
              <span className="lbl">{p.name}</span>
            </div>
            {/* Discount badge */}
            {discount > 0 && <span className="disc-badge">{discount}% OFF</span>}
            {/* Wishlist */}
            <button className={`heart-btn ${wishlisted ? 'active' : ''}`}
              onClick={e => { e.preventDefault(); toggleItem(p); }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={wishlisted ? '#ef4444' : '#999'} strokeWidth="2">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" fill={wishlisted ? '#ef4444' : 'none'}/>
              </svg>
            </button>
            {/* Quick badge */}
            {p.rating >= 4.5 && (
              <span style={{ position:'absolute', bottom:10, left:10, background:'linear-gradient(120deg,rgba(0,122,118,.92),rgba(0,201,200,.88))', color:'#fff', fontSize:10, fontFamily:'Poppins', fontWeight:700, padding:'4px 9px', borderRadius:7, backdropFilter:'blur(4px)', boxShadow:'0 3px 10px rgba(0,122,118,.3)', letterSpacing:'.03em' }}>
                ✦ TOP RATED
              </span>
            )}
          </div>

          {/* Body */}
          <div style={{ padding:'14px 14px 16px', display:'flex', flexDirection:'column', gap:8 }}>
            <span style={{ fontSize:11, fontFamily:'Poppins', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--text-3)' }}>{p.brand}</span>
            <h3 style={{ fontFamily:'Poppins', fontWeight:600, fontSize:14, color:'var(--navy)', lineHeight:1.35, margin:0, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
              {p.name}
            </h3>

            {/* Stars */}
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ display:'flex', alignItems:'center', gap:2, background:'#16a34a', color:'#fff', padding:'2px 7px', borderRadius:5, fontSize:12, fontWeight:700, fontFamily:'Poppins' }}>
                {p.rating.toFixed(1)} ★
              </div>
              <span style={{ fontSize:12, color:'var(--text-3)' }}>({p.ratingCount.toLocaleString('en-IN')})</span>
            </div>

            {/* Price */}
            <div style={{ display:'flex', alignItems:'baseline', gap:8, flexWrap:'wrap' }}>
              <span style={{ fontFamily:'Poppins', fontWeight:800, fontSize:18, color:'var(--navy)' }}>₹{p.price.toLocaleString('en-IN')}</span>
              <span style={{ fontSize:12, color:'var(--text-3)', textDecoration:'line-through' }}>₹{p.originalPrice.toLocaleString('en-IN')}</span>
              <span style={{ fontSize:12, color:'#16a34a', fontWeight:700 }}>{discount}% off</span>
            </div>

            {/* Bank offer */}
            <p style={{ fontSize:11, color:'var(--teal-deep)', fontWeight:600, margin:0 }}>
              ₹{Math.round(p.price * 0.92).toLocaleString('en-IN')} with Bank offer
            </p>

            {/* Buttons */}
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:4 }}>
              <button ref={btnRef} className="cart-btn ripple-btn" onClick={handleAddToCart}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
                <span>{added ? '✓ Added!' : 'Add to Cart'}</span>
              </button>
              <button className="buynow-btn" onClick={e => e.preventDefault()}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Toast notification */}
      {toast && (
        <div className="toast" style={{ zIndex:9999 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00C9C8" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
          Added to cart!
        </div>
      )}
    </>
  );
}
