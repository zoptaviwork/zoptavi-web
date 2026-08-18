import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', business: '', category: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.business || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="font-sans min-h-screen bg-brand-bg py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5" /> Let's Talk
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-navy tracking-tight">Get a Free Sample Built</h1>
          <p className="text-slate-500 text-sm mt-4 leading-relaxed">
            Tell us your business type and we'll show you a sample built for you — free, no obligation, usually within a day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-5 space-y-4">
            {[
              { icon: Phone, title: 'Call or WhatsApp', primary: '+91 78426 46888', secondary: 'Mon–Sat, 9 AM to 8 PM IST', color: 'bg-teal-50 border-teal-100 text-brand-teal' },
              { icon: Mail, title: 'Email', primary: 'hello@zoptavi.com', secondary: 'We reply within 4 business hours', color: 'bg-indigo-50 border-indigo-100 text-indigo-500' },
              { icon: MapPin, title: 'Based In', primary: 'Zoptavi', secondary: 'Hyderabad, Telangana', color: 'bg-rose-50 border-rose-100 text-rose-500' },
              { icon: Clock, title: 'Response Time', primary: 'Usually same day', secondary: 'A homepage sample often within 24 hours', color: 'bg-amber-50 border-amber-100 text-amber-600' },
            ].map((info, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${info.color}`}>
                  <info.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{info.title}</p>
                  <p className="text-sm font-bold text-brand-navy mt-0.5">{info.primary}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{info.secondary}</p>
                </div>
              </div>
            ))}

            <a href="https://wa.me/917842646888" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-brand-teal hover:bg-brand-teal-hover text-white font-bold text-sm shadow-md transition-colors">
              <MessageSquare className="w-4 h-4" /> Message us on WhatsApp directly
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-brand-navy">Got it, {formData.name}!</h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    We'll take a look at <strong>{formData.business}</strong> and get back to you with a sample and a quote — usually within a day.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', business: '', category: '', message: '' }); }}
                    className="h-10 px-6 rounded-lg bg-brand-teal hover:bg-brand-teal-hover text-white text-xs font-bold transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-50 pb-4 mb-2">
                    <h2 className="font-display font-extrabold text-xl text-brand-navy">Tell us about your business</h2>
                    <p className="text-xs text-slate-400 mt-1">All fields marked * are required.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Name *</label>
                      <input
                        type="text" placeholder="Priya Sharma" required
                        value={formData.name}
                        onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                        className="w-full h-11 px-3 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Business Name *</label>
                      <input
                        type="text" placeholder="e.g. Priya's Boutique" required
                        value={formData.business}
                        onChange={e => setFormData(f => ({ ...f, business: e.target.value }))}
                        className="w-full h-11 px-3 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">What kind of business?</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData(f => ({ ...f, category: e.target.value }))}
                      className="w-full h-11 px-3 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal text-slate-700 cursor-pointer"
                    >
                      <option value="">Select a category</option>
                      <option>Dental clinic or healthcare</option>
                      <option>Gym or fitness studio</option>
                      <option>Boutique or clothing brand</option>
                      <option>Restaurant or café</option>
                      <option>D2C Instagram brand</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">What do you need? *</label>
                    <textarea
                      rows={6} placeholder="e.g. I run a boutique taking orders over Instagram DM and want a proper website with billing..." required
                      value={formData.message}
                      onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-3 py-3 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-brand-teal hover:bg-brand-teal-hover text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send &amp; Get a Free Sample
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
