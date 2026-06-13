import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  const clearAll = () => items.forEach(p => removeItem(p.id));

  const moveAllToCart = () => {
    items.forEach(p => { addItem(p, 1); removeItem(p.id); });
    
  };

  if (items.length === 0) {
    return (
      <div style={{ minHeight:'60vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, padding:'40px 20px' }}>
        <div style={{ fontSize:64 }}>🤍</div>
        <h2 style={{ fontFamily:'Poppins', fontWeight:800, fontSize:22, color:'var(--navy)', margin:0 }}>Your Wishlist is Empty</h2>
        <p style={{ color:'var(--text-2)', fontSize:15, margin:0, textAlign:'center' }}>Save items you love here. Shop and add to your wishlist.</p>
        <Link to="/category">
          <button className="btn btn-teal" style={{ marginTop:8 }}>Start Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background:'#f1f3f6', minHeight:'100vh', padding:'24px 0' }}>
      <div style={{ maxWidth:1300, margin:'0 auto', padding:'0 16px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:12 }}>
          <h1 style={{ fontFamily:'Poppins', fontWeight:800, fontSize:24, color:'var(--navy)', margin:0 }}>
            My Wishlist <span style={{ fontFamily:'Inter', fontWeight:500, fontSize:16, color:'var(--text-2)', marginLeft:8 }}>({items.length} items)</span>
          </h1>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={moveAllToCart} className="btn btn-teal btn-sm">
              Move All to Cart
            </button>
            <button onClick={clearAll} className="btn btn-outline btn-sm" style={{ color:'#ef4444', borderColor:'#ef4444' }}>
              Clear All
            </button>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16 }}>
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} tint={i % 2 === 0 ? 'teal' : 'orange'}/>
          ))}
        </div>
      </div>
    </div>
  );
}
