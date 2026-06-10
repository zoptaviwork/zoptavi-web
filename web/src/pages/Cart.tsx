import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, Tag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    subtotal,
    discount,
    deliveryCharges,
    totalAmount,
    updateQuantity,
    removeItem
  } = useCartStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (couponCode.toUpperCase() === 'ZOPTAVI10') {
      setCouponApplied(true);
      const actualSubtotal = subtotal - discount;
      setCouponDiscount(Math.round(actualSubtotal * 0.1));
    } else {
      setCouponError("Invalid code. Try 'ZOPTAVI10' for 10% off.");
    }
  };

  const finalCheckoutAmount = totalAmount - couponDiscount;

  if (cartItems.length === 0) {
    return (
      <div className="font-sans min-h-screen bg-brand-bg max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-display font-extrabold text-2xl text-brand-navy">Your Cart is Empty</h2>
        <p className="text-sm text-slate-500 max-w-xs mx-auto">Looks like you haven't added anything to your cart yet. Explore our premium catalog to get started!</p>
        <Link 
          to="/category" 
          className="inline-flex h-11 px-6 rounded-lg bg-brand-teal text-white hover:bg-brand-teal-hover items-center font-bold text-xs shadow-md transition-colors"
        >
          Explore Catalog <ArrowRight className="w-4 h-4 ml-1.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen bg-brand-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy tracking-tight mb-8">Shopping Cart</h1>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Cart Items List (Span 8) */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                {/* Product details */}
                <div className="flex gap-4 items-center flex-grow">
                  <div 
                    className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100 cursor-pointer"
                    onClick={() => navigate(`/product/${item.product.id}`)}
                  >
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 
                      className="text-xs sm:text-sm font-bold text-brand-navy leading-tight hover:text-brand-teal cursor-pointer"
                      onClick={() => navigate(`/product/${item.product.id}`)}
                    >
                      {item.product.name}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">{item.product.brand}</span>
                    {item.selectedColor && (
                      <span className="inline-block bg-slate-50 text-slate-500 border border-slate-100 text-[10px] font-semibold px-2 py-0.5 rounded mt-1.5">
                        Color: {item.selectedColor}
                      </span>
                    )}
                  </div>
                </div>

                {/* Controls (quantity spinner + pricing) */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-50 pt-3 sm:pt-0">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm scale-90">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                      className="w-9 h-9 flex items-center justify-center text-slate-400 hover:bg-slate-50"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-9 text-center font-bold text-xs text-brand-navy">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                      className="w-9 h-9 flex items-center justify-center text-slate-400 hover:bg-slate-50"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Pricing row */}
                  <div className="text-right shrink-0">
                    <p className="text-sm font-extrabold text-brand-navy">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                    {item.product.originalPrice > item.product.price && (
                      <p className="text-[10px] text-slate-400 line-through">₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}</p>
                    )}
                  </div>

                  {/* Remove CTA */}
                  <button 
                    onClick={() => removeItem(item.product.id, item.selectedColor)}
                    className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors self-center shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Right Column - Billing & Promo details (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Promo Code Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
              <h3 className="text-xs font-bold text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-brand-teal" /> Apply Promo Code
              </h3>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Promo (e.g. ZOPTAVI10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow h-11 px-3 border border-slate-200 bg-slate-50 text-xs font-semibold rounded-lg focus:outline-none focus:border-brand-teal"
                />
                <button
                  type="submit"
                  className="h-11 px-4 bg-brand-navy hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>
              {couponApplied && (
                <p className="text-[10px] text-emerald-500 font-bold">✓ Coupon 'ZOPTAVI10' active! Saved additional ₹{couponDiscount.toLocaleString('en-IN')}.</p>
              )}
              {couponError && (
                <p className="text-[10px] text-rose-500 font-bold">{couponError}</p>
              )}
            </div>

            {/* Price Details Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
              <h3 className="text-xs font-bold text-brand-navy uppercase tracking-wider border-b border-slate-50 pb-3">Price Details</h3>
              
              <div className="space-y-2.5 text-xs text-slate-500 font-medium">
                <div className="flex justify-between">
                  <span>Price ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span className="text-brand-navy font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Catalog Discount</span>
                  <span className="text-emerald-500 font-bold">- ₹{discount.toLocaleString('en-IN')}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between">
                    <span>Coupon Discount</span>
                    <span className="text-emerald-500 font-bold">- ₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  {deliveryCharges === 0 ? (
                    <span className="text-emerald-500 font-bold">FREE</span>
                  ) : (
                    <span className="text-brand-navy font-bold">₹{deliveryCharges}</span>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-50 pt-4 flex justify-between items-center text-sm font-extrabold text-brand-navy">
                <span>Total Amount</span>
                <span className="text-lg">₹{finalCheckoutAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg p-3 text-[10px] font-bold text-center">
                🎉 You will save ₹{(discount + couponDiscount).toLocaleString('en-IN')} on this order!
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full h-12 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-brand-orange/10 transition-colors"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
export default Cart;
