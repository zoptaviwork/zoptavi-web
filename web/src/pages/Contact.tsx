import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="font-sans min-h-screen bg-brand-bg py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5" /> Get in Touch
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-navy tracking-tight">We're Here to Help</h1>
          <p className="text-slate-500 text-sm mt-4 leading-relaxed">
            Whether you have questions about your order, need product support, or just want to say hello — our team is always ready to assist you.
          </p>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column — Support Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {[
              {
                icon: Phone,
                title: 'Call Us',
                primary: '+91 80 4976 2110',
                secondary: 'Mon–Sat, 9 AM to 9 PM IST',
                color: 'bg-teal-50 border-teal-100 text-brand-teal',
              },
              {
                icon: Mail,
                title: 'Email Support',
                primary: 'support@zoptavi.com',
                secondary: 'We reply within 4 business hours',
                color: 'bg-indigo-50 border-indigo-100 text-indigo-500',
              },
              {
                icon: MapPin,
                title: 'Corporate Office',
                primary: 'Zoptavi Technologies Pvt. Ltd.',
                secondary: 'Outer Ring Road, Bengaluru, Karnataka — 560103',
                color: 'bg-rose-50 border-rose-100 text-rose-500',
              },
              {
                icon: Clock,
                title: 'Support Hours',
                primary: 'Monday — Saturday',
                secondary: '9:00 AM to 9:00 PM IST',
                color: 'bg-amber-50 border-amber-100 text-amber-600',
              },
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

            {/* Map Visual Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-52 relative">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                alt="Bengaluru Map Area"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-navy/20 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-xl px-5 py-3 text-center">
                  <MapPin className="w-5 h-5 text-brand-orange mx-auto mb-1" />
                  <p className="text-xs font-extrabold text-brand-navy">Zoptavi HQ</p>
                  <p className="text-[10px] text-slate-500">Bengaluru, Karnataka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-brand-navy">Message Sent!</h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    Thank you for reaching out, {formData.name}! Our support team will get back to you at <strong>{formData.email}</strong> within 4 business hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                    className="h-10 px-6 rounded-lg bg-brand-teal hover:bg-brand-teal-hover text-white text-xs font-bold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-50 pb-4 mb-2">
                    <h2 className="font-display font-extrabold text-xl text-brand-navy">Send a Message</h2>
                    <p className="text-xs text-slate-400 mt-1">All fields marked * are required.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Full Name *</label>
                      <input
                        type="text" placeholder="Priya Sharma" required
                        value={formData.name}
                        onChange={e => setFormData(f => ({...f, name: e.target.value}))}
                        className="w-full h-11 px-3 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address *</label>
                      <input
                        type="email" placeholder="priya@email.com" required
                        value={formData.email}
                        onChange={e => setFormData(f => ({...f, email: e.target.value}))}
                        className="w-full h-11 px-3 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData(f => ({...f, subject: e.target.value}))}
                      className="w-full h-11 px-3 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal text-slate-700 cursor-pointer"
                    >
                      <option value="">Select a subject</option>
                      <option>Order Tracking & Status</option>
                      <option>Returns & Refunds</option>
                      <option>Product Enquiry</option>
                      <option>Payment Issue</option>
                      <option>Delivery Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Message *</label>
                    <textarea
                      rows={6} placeholder="Please describe your query in as much detail as possible. Include your order number if relevant..." required
                      value={formData.message}
                      onChange={e => setFormData(f => ({...f, message: e.target.value}))}
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
                        <Send className="w-4 h-4" /> Send Message
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
