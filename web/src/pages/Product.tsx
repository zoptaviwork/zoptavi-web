import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, Plus, Minus, ArrowLeft, Heart, Check } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCartStore } from '../store/cartStore';

// Simple in-page toast
function useToast() {
  const [toast, setToast] = useState<string | null>(null);
  const show = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };
  return { toast, show };
}

export const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { toast, show: showToast } = useToast();

  const product = id ? getProductById(id) : undefined;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [pincodeDeliverable, setPincodeDeliverable] = useState(false);

  useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="font-sans min-h-screen bg-brand-bg max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-display font-extrabold text-2xl text-brand-navy">Product Not Found</h2>
        <p className="text-sm text-slate-500">The product you are trying to view does not exist in our catalog.</p>
        <Link to="/category" className="inline-flex items-center gap-1 text-sm font-bold text-brand-teal hover:underline">
          <ArrowLeft className="w-4 h-4" /> Go back to catalog
        </Link>
      </div>
    );
  }

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeChecked(true);
      // Mock check: deliverable to any PIN starting with 1, 2, 4, 5, 6, 7
      setPincodeDeliverable(parseInt(pincode.charAt(0)) !== 9 && parseInt(pincode.charAt(0)) !== 3);
    } else {
      showToast('Please enter a valid 6-digit PIN code.');
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor || undefined);
    showToast('✓ Added to cart!');
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedColor || undefined);
    navigate('/cart');
  };

  return (
    <div className="font-sans min-h-screen bg-brand-bg py-8">
      {/* Toast */}
      {toast && (
        <div className="toast" style={{position:'fixed',bottom:80,right:20,background:'#0f172a',color:'#fff',padding:'12px 20px',borderRadius:12,fontSize:13,fontWeight:700,zIndex:9999,boxShadow:'0 8px 32px rgba(0,0,0,.18)'}}>
          {toast}
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs font-semibold text-slate-400 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-brand-teal">Home</Link>
          <span>/</span>
          <Link to="/category" className="hover:text-brand-teal">Catalog</Link>
          <span>/</span>
          <Link to={`/category?cat=${product.category}`} className="hover:text-brand-teal">{product.category}</Link>
          <span>/</span>
          <span className="text-slate-600 truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product Workspace Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
          
          {/* Left Column (Image Gallery) - Span 5 */}
          <div className="lg:col-span-6 space-y-4">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 relative group">
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-brand-orange text-white text-[10px] font-extrabold px-2.5 py-1 rounded shadow-md z-10">
                  {product.discount}% OFF
                </span>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>
            
            {/* Multiple Mock Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[product.image, product.image, product.image, product.image].map((img, idx) => (
                <div 
                  key={idx} 
                  className={`aspect-square rounded-xl overflow-hidden bg-slate-50 border-2 cursor-pointer transition-all ${
                    idx === 0 ? 'border-brand-teal shadow-md' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <img src={img} alt="Thumbnail preview" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Product Details Card) - Span 7 */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[10px] text-brand-teal font-extrabold uppercase tracking-wider">{product.brand}</span>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy leading-tight mt-1">
                {product.name}
              </h1>
              
              {/* Rating stars summary */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'fill-slate-100 text-slate-200'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">{product.rating} / 5.0</span>
                <span className="text-xs text-slate-400">({product.ratingCount} Customer reviews)</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl font-extrabold text-brand-navy">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-slate-400 line-through">MRP: ₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 font-semibold">Inclusive of all local taxes</p>
              </div>
              {product.discount > 0 && (
                <div className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-extrabold px-3 py-1 rounded-lg">
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discount}%)
                </div>
              )}
            </div>

            {/* Colors Selection Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Select Color:</span>
                <div className="flex gap-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      className={`h-10 px-4 rounded-lg border text-xs font-bold transition-all ${
                        selectedColor === color 
                          ? 'border-brand-teal bg-teal-50/50 text-brand-teal ring-2 ring-brand-teal/10' 
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-350'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector Spinner */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Quantity:</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-250 rounded-lg overflow-hidden bg-white shadow-sm">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-brand-navy">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                <span className="text-xs text-slate-400 font-semibold">
                  {product.inStock ? (
                    <span className="text-emerald-500">● In Stock (Available)</span>
                  ) : (
                    <span className="text-rose-500">● Out of Stock</span>
                  )}
                </span>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="h-12 rounded-xl bg-brand-teal hover:bg-brand-teal-hover text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-teal/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-[1px]"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="h-12 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-[1px] shadow-lg shadow-brand-orange/5"
              >
                Buy Now
              </button>
            </div>

            {/* Delivery pincode checker */}
            <div className="border-t border-slate-100 pt-6">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Delivery Availability:</span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2 mt-2 max-w-sm">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Delivery Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-grow h-11 px-3 border border-slate-200 bg-slate-50 text-xs font-semibold rounded-lg focus:outline-none focus:border-brand-teal"
                />
                <button
                  type="submit"
                  className="h-11 px-5 bg-brand-navy hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeChecked && (
                <div className="mt-2 text-xs font-bold">
                  {pincodeDeliverable ? (
                    <p className="text-emerald-500">✓ Deliverable to PIN {pincode} | Delivery in 2 days.</p>
                  ) : (
                    <p className="text-rose-500">✗ Currently not deliverable to PIN {pincode}.</p>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Info tab panel */}
        <section className="mt-12 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 font-sans">
          <div className="flex border-b border-slate-100 gap-6">
            {(['desc', 'specs', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider relative transition-colors ${
                  activeTab === tab ? 'text-brand-teal' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab === 'desc' ? 'Description' : tab === 'specs' ? 'Specifications' : 'Reviews'}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-teal rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-6 text-sm text-slate-500 leading-relaxed">
            {activeTab === 'desc' && (
              <p>{product.description}</p>
            )}
            
            {activeTab === 'specs' && (
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {[
                  { user: "Aravind K.", rating: 5, date: "May 15, 2026", comment: "Absolutely worth the price! The battery backup is extraordinary. Strongly recommended." },
                  { user: "Priya S.", rating: 4, date: "April 28, 2026", comment: "Very comfortable design for extended study calls. Clear audio quality." }
                ].map((rev, idx) => (
                  <div key={idx} className="border-b border-slate-50 pb-5 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center gap-4">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-brand-navy">{rev.user}</h4>
                        <div className="flex gap-0.5 mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-100'}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">{rev.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};
export default Product;
