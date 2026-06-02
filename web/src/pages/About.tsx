import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, Star, Globe, Zap, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="font-sans min-h-screen bg-brand-bg">

      {/* Hero Section — 2-col Editorial */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-current" /> Our Story
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight tracking-tight">
              Built for India.<br />
              <span className="bg-gradient-to-r from-brand-teal to-teal-600 bg-clip-text text-transparent">Powered by Speed.</span>
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Zoptavi was founded in 2023 with a mission: to build an online shopping experience that truly works for Indian consumers — fast, reliable, honest, and built with care.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              From premium electronics to everyday groceries, Zoptavi is designed to serve every household across every tier of India. Our technology stack, logistics network, and customer-first philosophy are shaped around the unique needs of Indian shoppers.
            </p>
            <div className="flex gap-4 pt-2">
              <Link 
                to="/category" 
                className="h-11 px-6 rounded-lg bg-brand-teal hover:bg-brand-teal-hover text-white font-bold text-xs shadow-md transition-colors"
              >
                Shop Now
              </Link>
              <Link 
                to="/contact" 
                className="h-11 px-6 rounded-lg border border-slate-200 bg-white text-brand-navy hover:bg-slate-50 font-bold text-xs transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" 
                alt="Zoptavi Team Working"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-white border border-slate-100 rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-brand-teal">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Customer Rating</p>
                <p className="text-base font-extrabold text-brand-navy">4.8 / 5 ⭐</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="bg-white border-t border-b border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, stat: '10M+', label: 'Happy Customers', color: 'text-brand-teal' },
              { icon: Package, stat: '5M+', label: 'Orders Delivered', color: 'text-brand-orange' },
              { icon: Globe, stat: '28+', label: 'States Covered', color: 'text-indigo-500' },
              { icon: Star, stat: '50K+', label: 'Premium Products', color: 'text-amber-500' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className={`w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className={`font-display font-extrabold text-3xl sm:text-4xl ${item.color}`}>{item.stat}</p>
                  <p className="text-xs font-semibold text-slate-500 mt-1">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy">Why Millions Trust Zoptavi</h2>
          <p className="text-slate-500 text-sm mt-3">Our commitments aren't just marketing slogans — they are operational promises backed by real systems.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Zap, title: 'Lightning Fast', desc: 'Same-day delivery in major cities. 2-day reach across 500+ pincodes.', color: 'bg-amber-50 border-amber-100 text-amber-600' },
            { icon: ShieldCheck, title: 'Secure & Trusted', desc: '100% genuine products with verified seller ratings and buyer protection.', color: 'bg-teal-50 border-teal-100 text-brand-teal' },
            { icon: Truck, title: 'Real-time Tracking', desc: 'Live GPS-tracked deliveries from warehouse to your doorstep.', color: 'bg-indigo-50 border-indigo-100 text-indigo-500' },
            { icon: RotateCcw, title: 'Hassle-free Returns', desc: '7-day no-questions-asked returns with instant bank refunds.', color: 'bg-rose-50 border-rose-100 text-rose-500' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 shadow-sm hover:shadow-md rounded-xl p-6 flex flex-col gap-4 transition-shadow">
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-brand-navy">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-brand-navy to-slate-700 rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{backgroundImage:'radial-gradient(circle, #00A2A5 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight relative z-10">
            Ready to Experience the Zoptavi Difference?
          </h2>
          <p className="text-slate-300 text-sm mt-4 max-w-lg mx-auto relative z-10">
            Join over 10 million Indians who trust Zoptavi for a smarter shopping experience.
          </p>
          <div className="flex justify-center gap-4 mt-8 flex-wrap relative z-10">
            <Link 
              to="/category" 
              className="h-12 px-8 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm shadow-lg transition-colors"
            >
              Start Shopping
            </Link>
            <Link 
              to="/auth" 
              className="h-12 px-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
export default About;
