import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Check } from 'lucide-react';
import Reveal from '../components/Reveal';
import ShinyText from '../components/reactbits/ShinyText';
import { useLiveContent } from '../lib/adminApi';
import '../styles/messold-home.css';

const WHATSAPP = 'https://wa.me/918978605027';
const defaultHeadline = "Let's build your website.";

const info = [
  { icon: Phone, title: 'Call or WhatsApp', primary: '+91 89786 05027', secondary: 'Mon–Sat, 9 AM to 8 PM IST' },
  { icon: Mail, title: 'Email', primary: 'hello@zoptavi.com', secondary: 'We reply within 4 business hours' },
  { icon: MapPin, title: 'Based in', primary: 'Zoptavi', secondary: 'Hyderabad, Telangana' },
  { icon: Clock, title: 'Response time', primary: 'Usually same day', secondary: 'A plan and quote often within 24 hours' },
];

export const Contact: React.FC = () => {
  const content = useLiveContent('contact');
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
    <div className="ms-home ms-light">
      {/* ===================== HERO ===================== */}
      <section className="ms-page-hero">
        <div className="ms-wrap">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="ms-badge"><ShinyText text={content.hero_eyebrow || "Let's Talk"} speed={7} /></span>
            <h1>
              {content.hero_headline && content.hero_headline !== defaultHeadline
                ? content.hero_headline
                : <>Let's build <span className="ms-accent">your website</span>.</>}
            </h1>
            <p>
              {content.hero_subtext || "Tell us your business type and we'll show you similar work we've built, with a clear quote — usually within a day."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===================== INFO + FORM ===================== */}
      <section className="ms-section tight" style={{ paddingTop: 0 }}>
        <div className="ms-wrap">
          <div className="ms-split">
            {/* left — contact info */}
            <Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {info.map(i => (
                  <div key={i.title} className="ms-info-card">
                    <span className="ms-info-ico"><i.icon size={19} /></span>
                    <div>
                      <p className="lbl">{i.title}</p>
                      <p className="val">{i.primary}</p>
                      <p className="sub">{i.secondary}</p>
                    </div>
                  </div>
                ))}
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="ms-btn ms-btn-accent"
                  style={{ justifyContent: 'center', marginTop: 6 }}
                >
                  <MessageSquare size={16} /> Message us on WhatsApp
                </a>
              </div>
            </Reveal>

            {/* right — form */}
            <Reveal delay={0.08}>
              <div className="ms-form-card">
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
                    <span
                      style={{
                        width: 60, height: 60, borderRadius: '50%', display: 'grid', placeItems: 'center',
                        background: 'rgba(var(--ms-accent-rgb), .16)', color: 'var(--ms-accent)',
                      }}
                    >
                      <Check size={30} />
                    </span>
                    <h3 style={{ fontSize: 20 }}>Got it, {formData.name}!</h3>
                    <p style={{ fontSize: 13.5, color: 'var(--ms-grey-63)', maxWidth: 340, lineHeight: 1.65 }}>
                      We'll take a look at <strong style={{ color: 'var(--ms-white)' }}>{formData.business}</strong> and get
                      back to you with a plan and a quote — usually within a day.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: '', business: '', category: '', message: '' }); }}
                      className="ms-btn ms-btn-ghost sm"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ borderBottom: '1px solid var(--ms-line)', paddingBottom: 16, marginBottom: 20 }}>
                      <h3 style={{ fontSize: 19 }}>Tell us about your business</h3>
                      <p style={{ fontSize: 12, color: 'var(--ms-grey-50)', marginTop: 4 }}>Fields marked * are required.</p>
                    </div>

                    <div className="ms-row-2">
                      <div className="ms-field">
                        <label className="ms-label">Your name *</label>
                        <input
                          className="ms-input" type="text" placeholder="Priya Sharma" required
                          value={formData.name}
                          onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                        />
                      </div>
                      <div className="ms-field">
                        <label className="ms-label">Business name *</label>
                        <input
                          className="ms-input" type="text" placeholder="e.g. Priya's Boutique" required
                          value={formData.business}
                          onChange={e => setFormData(f => ({ ...f, business: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="ms-field">
                      <label className="ms-label">What kind of business?</label>
                      <select
                        className="ms-select"
                        value={formData.category}
                        onChange={e => setFormData(f => ({ ...f, category: e.target.value }))}
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

                    <div className="ms-field">
                      <label className="ms-label">What do you need? *</label>
                      <textarea
                        className="ms-textarea" rows={5} required
                        placeholder="e.g. I run a boutique taking orders over Instagram DM and want a proper website with billing..."
                        value={formData.message}
                        onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="ms-btn ms-btn-accent"
                      style={{ width: '100%', justifyContent: 'center', marginTop: 4, opacity: loading ? 0.7 : 1 }}
                    >
                      {loading ? (
                        <>
                          <span
                            style={{
                              width: 15, height: 15, borderRadius: '50%',
                              border: '2px solid rgba(255,255,255,.35)', borderTopColor: '#fff',
                              display: 'inline-block', animation: 'ms-spin .8s linear infinite',
                            }}
                          />
                          Sending…
                        </>
                      ) : (
                        <><Send size={16} /> Send &amp; get a quote</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
