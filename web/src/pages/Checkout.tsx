import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, CreditCard, Smartphone, Building2, Banknote, 
  ChevronRight, ShieldCheck, Check, ArrowLeft, Truck
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';

type CheckoutStep = 'address' | 'payment';
type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'emi' | 'cod';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, discount, deliveryCharges, totalAmount, clearCart } = useCartStore();

  const [step, setStep] = useState<CheckoutStep>('address');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Address form state
  const [address, setAddress] = useState({
    fullName: '', phone: '', pincode: '', addressLine1: '', 
    addressLine2: '', city: '', state: '', addressType: 'HOME'
  });

  // Payment form state
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.pincode || !address.addressLine1 || !address.city || !address.state) {
      alert('Please fill in all required fields.');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'upi' && !upiId) {
      alert('Please enter your UPI ID.');
      return;
    }
    if (paymentMethod === 'card' && (!cardNumber || !cardName || !cardExpiry || !cardCvv)) {
      alert('Please fill in all card details.');
      return;
    }
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="font-sans min-h-screen bg-brand-bg flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-12 text-center max-w-md w-full space-y-5">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-brand-navy">Order Placed Successfully!</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Your order has been confirmed and is being processed. You'll receive an email confirmation at your registered address.
          </p>
          <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 text-xs font-semibold text-brand-navy">
            <p>Estimated Delivery: <span className="text-brand-teal">2–3 Business Days</span></p>
            <p className="mt-1 text-slate-400">Order ID: <span className="text-slate-600 font-mono">#ZOP{Date.now().toString().slice(-6)}</span></p>
          </div>
          <div className="flex gap-3 pt-2">
            <Link 
              to="/" 
              className="flex-grow h-11 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center"
            >
              Back to Home
            </Link>
            <Link 
              to="/category" 
              className="flex-grow h-11 rounded-lg bg-brand-teal hover:bg-brand-teal-hover text-white text-xs font-bold flex items-center justify-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="font-sans min-h-screen bg-brand-bg max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-display font-extrabold text-2xl text-brand-navy">Nothing to Checkout</h2>
        <p className="text-sm text-slate-500">Your cart is empty. Add items before proceeding to checkout.</p>
        <Link to="/category" className="inline-flex h-11 px-6 rounded-lg bg-brand-teal text-white text-xs font-bold items-center gap-1.5 hover:bg-brand-teal-hover">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen bg-brand-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/cart" className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-brand-navy transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2 flex-grow">
            {/* Step 1: Address */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors ${step === 'address' || step === 'payment' ? 'bg-brand-teal text-white' : 'bg-slate-100 text-slate-400'}`}>
              {step === 'payment' ? <Check className="w-3.5 h-3.5" /> : <span>1</span>}
              Shipping Address
            </div>
            <div className="flex-grow h-px bg-slate-200" />
            {/* Step 2: Payment */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors ${step === 'payment' ? 'bg-brand-teal text-white' : 'bg-slate-100 text-slate-400'}`}>
              <span>2</span> Payment
            </div>
          </div>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column */}
          <div className="lg:col-span-7">

            {/* ===== STEP 1: ADDRESS ===== */}
            {step === 'address' && (
              <form onSubmit={handleAddressSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                  <MapPin className="w-5 h-5 text-brand-teal" />
                  <h2 className="font-display font-extrabold text-lg text-brand-navy">Shipping Address</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Full Name *</label>
                    <input 
                      type="text" placeholder="Mohit Sharma" required
                      value={address.fullName}
                      onChange={e => setAddress(a => ({...a, fullName: e.target.value}))}
                      className="w-full h-11 px-3 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Phone Number *</label>
                    <input 
                      type="tel" placeholder="+91 98765 43210" required maxLength={13}
                      value={address.phone}
                      onChange={e => setAddress(a => ({...a, phone: e.target.value}))}
                      className="w-full h-11 px-3 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Address Line 1 *</label>
                  <input 
                    type="text" placeholder="House/Flat No., Street, Area" required
                    value={address.addressLine1}
                    onChange={e => setAddress(a => ({...a, addressLine1: e.target.value}))}
                    className="w-full h-11 px-3 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Address Line 2 (Optional)</label>
                  <input 
                    type="text" placeholder="Landmark, Colony"
                    value={address.addressLine2}
                    onChange={e => setAddress(a => ({...a, addressLine2: e.target.value}))}
                    className="w-full h-11 px-3 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">City *</label>
                    <input 
                      type="text" placeholder="Mumbai" required
                      value={address.city}
                      onChange={e => setAddress(a => ({...a, city: e.target.value}))}
                      className="w-full h-11 px-3 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">State *</label>
                    <select
                      required
                      value={address.state}
                      onChange={e => setAddress(a => ({...a, state: e.target.value}))}
                      className="w-full h-11 px-3 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal text-slate-700 cursor-pointer"
                    >
                      <option value="">Select State</option>
                      {['Andhra Pradesh','Delhi','Gujarat','Karnataka','Kerala','Maharashtra','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','West Bengal'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pincode *</label>
                    <input 
                      type="text" placeholder="560001" required maxLength={6}
                      value={address.pincode}
                      onChange={e => setAddress(a => ({...a, pincode: e.target.value}))}
                      className="w-full h-11 px-3 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal transition-colors"
                    />
                  </div>
                </div>

                {/* Address Type Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Address Type</label>
                  <div className="flex gap-3">
                    {['HOME', 'WORK', 'OTHER'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setAddress(a => ({...a, addressType: type}))}
                        className={`h-9 px-4 rounded-lg border text-xs font-bold transition-all ${
                          address.addressType === type 
                            ? 'border-brand-teal bg-teal-50 text-brand-teal' 
                            : 'border-slate-200 text-slate-500 hover:border-slate-350'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-brand-teal hover:bg-brand-teal-hover text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  Continue to Payment <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* ===== STEP 2: PAYMENT ===== */}
            {step === 'payment' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                  <CreditCard className="w-5 h-5 text-brand-teal" />
                  <h2 className="font-display font-extrabold text-lg text-brand-navy">Payment Method</h2>
                </div>

                {/* Payment Option Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { key: 'upi', label: 'UPI', icon: Smartphone },
                    { key: 'card', label: 'Card', icon: CreditCard },
                    { key: 'netbanking', label: 'Net Banking', icon: Building2 },
                    { key: 'emi', label: 'EMI', icon: CreditCard },
                    { key: 'cod', label: 'Cash on Delivery', icon: Banknote },
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setPaymentMethod(key as PaymentMethod)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                        paymentMethod === key 
                          ? 'border-brand-teal bg-teal-50 text-brand-teal shadow-sm' 
                          : 'border-slate-200 text-slate-500 hover:border-slate-350 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-center leading-tight">{label}</span>
                    </button>
                  ))}
                </div>

                {/* UPI Form */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-600">Enter your UPI ID</p>
                    <input 
                      type="text" placeholder="yourname@upi (e.g. 9876543210@paytm)"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className="w-full h-11 px-3 border border-slate-200 bg-white text-sm rounded-lg focus:outline-none focus:border-brand-teal"
                    />
                    <div className="flex gap-3 flex-wrap">
                      {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                        <button key={app} onClick={() => setUpiId(`user@${app.toLowerCase()}`)} className="h-8 px-3 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:border-brand-teal hover:text-brand-teal transition-colors">
                          {app}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Card Number</label>
                      <input 
                        type="text" placeholder="1234 5678 9012 3456" maxLength={19}
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full h-11 px-3 border border-slate-200 bg-white text-sm rounded-lg focus:outline-none focus:border-brand-teal font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Name on Card</label>
                      <input 
                        type="text" placeholder="MOHIT SHARMA"
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                        className="w-full h-11 px-3 border border-slate-200 bg-white text-sm rounded-lg focus:outline-none focus:border-brand-teal"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Expiry Date</label>
                        <input 
                          type="text" placeholder="MM / YY" maxLength={7}
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          className="w-full h-11 px-3 border border-slate-200 bg-white text-sm rounded-lg focus:outline-none focus:border-brand-teal font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">CVV</label>
                        <input 
                          type="password" placeholder="•••" maxLength={4}
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          className="w-full h-11 px-3 border border-slate-200 bg-white text-sm rounded-lg focus:outline-none focus:border-brand-teal font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Banking */}
                {paymentMethod === 'netbanking' && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                    <p className="text-xs font-bold text-slate-600">Select your bank</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(bank => (
                        <label key={bank} className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-white hover:border-brand-teal cursor-pointer text-xs font-semibold text-slate-600">
                          <input type="radio" name="bank" className="accent-brand-teal" />
                          {bank}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* EMI */}
                {paymentMethod === 'emi' && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                    <p className="text-xs font-bold text-slate-600">Choose EMI Plan (No Cost EMI Available)</p>
                    <div className="space-y-2">
                      {[
                        { months: 3, amount: Math.round(totalAmount / 3), interest: 0 },
                        { months: 6, amount: Math.round(totalAmount / 6 * 1.01), interest: 1 },
                        { months: 12, amount: Math.round(totalAmount / 12 * 1.015), interest: 1.5 },
                      ].map(plan => (
                        <label key={plan.months} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white hover:border-brand-teal cursor-pointer">
                          <div className="flex items-center gap-2">
                            <input type="radio" name="emi" className="accent-brand-teal" />
                            <span className="text-xs font-bold text-slate-700">{plan.months} Months</span>
                            {plan.interest === 0 && <span className="text-[10px] bg-teal-50 text-brand-teal border border-teal-100 px-1.5 py-0.5 rounded font-extrabold">No Cost</span>}
                          </div>
                          <span className="text-xs font-extrabold text-brand-navy">₹{plan.amount.toLocaleString('en-IN')}/mo</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* COD */}
                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                    <Banknote className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-amber-800">Cash on Delivery Selected</p>
                      <p className="text-[10px] text-amber-600 mt-1">Pay ₹{totalAmount.toLocaleString('en-IN')} in cash when your order is delivered. COD charges of ₹49 may apply for orders under ₹499.</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold pt-2">
                  <ShieldCheck className="w-4 h-4 text-brand-teal shrink-0" />
                  256-bit SSL Encrypted Secure Payment. We do not store any card details.
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => setStep('address')}
                    className="h-12 px-6 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-grow h-12 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-brand-orange/10 transition-colors"
                  >
                    Place Order — ₹{totalAmount.toLocaleString('en-IN')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column — Sticky Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4 lg:sticky lg:top-28">
              <h3 className="text-xs font-extrabold text-brand-navy uppercase tracking-wider border-b border-slate-50 pb-4 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-brand-teal" /> Order Summary
              </h3>

              {/* Items */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-700 truncate">{item.product.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-extrabold text-brand-navy shrink-0">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-500 font-medium">
                <div className="flex justify-between">
                  <span>Price ({cartItems.reduce((a, i) => a + i.quantity, 0)} items)</span>
                  <span className="text-brand-navy font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-emerald-500 font-bold">- ₹{discount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className={deliveryCharges === 0 ? 'text-emerald-500 font-bold' : 'text-brand-navy font-bold'}>
                    {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex justify-between font-extrabold text-brand-navy">
                <span>Total Amount</span>
                <span className="text-lg">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-[10px] text-emerald-600 font-bold text-center">
                🎉 You save ₹{discount.toLocaleString('en-IN')} on this order!
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default Checkout;
