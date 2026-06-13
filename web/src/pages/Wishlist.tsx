import { Link, useNavigate } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="font-sans min-h-screen bg-brand-bg flex flex-col items-center justify-center gap-4 px-4">
        <div style={{ width:80, height:80, borderRadius:'50%', background:'#fef2f2', display:'grid', placeItems:'center' }}>
          <Heart size={36} color="#f87171" />
        </div>
        <h2 style={{ fontFamily:'Poppins', fontWeight:800, fontSize:22, color:'var(--navy)', margin:0 }}>Your Wishlist is Empty</h2>
        <p style={{ fontSize:14, color:'#64748b', textAlign:'center', maxWidth:300 }}>Save items you love and come back to them anytime.</p>
        <Link to="/category" style={{ height:44, padding:'0 28px', borderRadius:10, background:'var(--teal-deep)', color:'#fff', fontFamily:'Poppins', fontWeight:700, fontSize:13, display:'flex', alignItems:'center', gap:6, textDecoration:'none' }}>
          Explore Products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen bg-brand-bg py-8">
      <div style={{ maxWidth:1300, margin:'0 auto', padding:'0 16px' }}>
        <h1 style={{ fontFamily:'Poppins', fontWeight:800, fontSize:24, color:'var(--navy)', marginBottom:24 }}>
          My Wishlist <span style={{ fontSize:15, fontWeight:500, color:'#64748b' }}>({items.length} items)</span>
        </h1>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:16 }}>
          {items.map(product => (
            <div key={product.id} style={{ background:'#fff', borderRadius:16, border:'1px solid #ecf0f4', overflow:'hidden', boxShadow:'0 1px 4px rgba(15,23,42,.05)', display:'flex', flexDirection:'column' }}>
              {/* Image */}
              <div style={{ position:'relative', aspectRatio:'4/3', background:'#f8fafc', cursor:'pointer', overflow:'hidden' }} onClick={() => navigate(`/product/${product.id}`)}>
                <img src={product.image} alt={product.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                {product.discount > 0 && (
                  <span style={{ position:'absolute', top:8, left:8, background:'var(--orange)', color:'#fff', fontSize:10, fontWeight:700, fontFamily:'Poppins', padding:'2px 7px', borderRadius:5 }}>
                    {product.discount}% OFF
                  </span>
                )}
                <button onClick={e => { e.stopPropagation(); removeItem(product.id); }} style={{ position:'absolute', top:8, right:8, width:32, height:32, borderRadius:8, background:'rgba(255,255,255,.9)', border:'none', cursor:'pointer', display:'grid', placeItems:'center', color:'#ef4444' }}>
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Info */}
              <div style={{ padding:'12px 12px 14px', display:'flex', flexDirection:'column', gap:6, flex:1 }}>
                <span style={{ fontSize:10, fontWeight:700, color:'var(--teal-deep)', fontFamily:'Poppins', textTransform:'uppercase', letterSpacing:'.04em' }}>{product.brand}</span>
                <p style={{ fontSize:13, fontWeight:600, color:'var(--navy)', margin:0, lineHeight:1.3, cursor:'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
                  {product.name.length > 45 ? product.name.slice(0, 45) + '…' : product.name}
                </p>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:'auto', paddingTop:8 }}>
                  <span style={{ fontSize:15, fontWeight:800, color:'var(--navy)', fontFamily:'Poppins' }}>₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice > product.price && (
                    <span style={{ fontSize:11, color:'#94a3b8', textDecoration:'line-through' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
                <button
                  onClick={() => { addItem(product, 1, product.colors?.[0]); navigate('/cart'); }}
                  style={{ height:36, borderRadius:8, background:'var(--grad-teal)', color:'#fff', fontFamily:'Poppins', fontWeight:700, fontSize:12, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:5, marginTop:4 }}
                >
                  <ShoppingBag size={13} /> Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
