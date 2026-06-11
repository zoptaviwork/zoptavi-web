import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background:'var(--navy)', color:'#cbd5e1', padding:'0 0 24px' }}>
      {/* Trust strip */}
      <div style={{ borderBottom:'1px solid rgba(255,255,255,.08)', background:'rgba(255,255,255,.02)' }}>
        <div className="trust-strip" style={{ maxWidth:'1400px', margin:'0 auto', padding:'26px 24px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18 }}>
          {[
            { t:'Free & Fast Delivery', s:'On orders above ₹499', icon:<path d="M5 18H3V6h13v12H8m13 0h-3v-7h-4M5.5 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/> },
            { t:'100% Secure Payments', s:'UPI · Cards · Netbanking', icon:<path d="M12 2 4 5v6c0 5.5 3.8 10 8 11 4.2-1 8-5.5 8-11V5l-8-3zM9 12l2 2 4-4"/> },
            { t:'Easy 7-Day Returns', s:'No questions asked', icon:<path d="M3 12a9 9 0 1 0 3-6.7L3 8m0-5v5h5"/> },
            { t:'24×7 Support', s:'We are always here', icon:<path d="M3 18v-6a9 9 0 0 1 18 0v6M3 18a2 2 0 0 0 2 2h2v-7H5a2 2 0 0 0-2 2zm18 0a2 2 0 0 1-2 2h-2v-7h2a2 2 0 0 1 2 2z"/> },
          ].map(f => (
            <div key={f.t} style={{ display:'flex', alignItems:'center', gap:13 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:'linear-gradient(135deg,rgba(0,201,200,.16),rgba(0,122,118,.1))', display:'grid', placeItems:'center', color:'#00C9C8', flexShrink:0 }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{f.icon}</svg>
              </div>
              <div>
                <p style={{ color:'#fff', fontFamily:'Poppins', fontWeight:700, fontSize:13.5, margin:0 }}>{f.t}</p>
                <p style={{ color:'#94a3b8', fontSize:12, margin:0 }}>{f.s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth:'1400px', margin:'0 auto', padding:'52px 24px 0' }}>
        <div className="zfoot-cols" style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr 1fr', gap:40, marginBottom:40 }}>
          <div>
            <div style={{ background:'#fff', borderRadius:14, padding:'12px 16px', display:'inline-block', boxShadow:'0 6px 24px rgba(0,0,0,.2)', marginBottom:18 }}>
              <img src="/zoptavi-logo-clean.png" alt="Zoptavi" style={{ height:56, width:'auto' }}/>
            </div>
            <p style={{ fontSize:14, color:'#94a3b8', lineHeight:1.7, maxWidth:260 }}>
              Fast. Alive. Yours. — India's premium marketplace delivering joy at lightning speed.
            </p>
            <div style={{ display:'flex', gap:10, marginTop:20 }}>
              {['Instagram','Twitter','Facebook','YouTube'].map(s => (
                <a key={s} href="#" aria-label={s} title={s}
                  style={{ width:38, height:38, borderRadius:10, background:'rgba(255,255,255,.08)', display:'grid', placeItems:'center', color:'#cbd5e1', textDecoration:'none', transition:'all .2s', fontSize:11, fontFamily:'Poppins', fontWeight:700 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background='var(--teal)'; (e.currentTarget as HTMLAnchorElement).style.color='#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background='rgba(255,255,255,.08)'; (e.currentTarget as HTMLAnchorElement).style.color='#cbd5e1'; }}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>
          {[
            { title:'Company', links:['About Us','Careers','Press','Blog','Investors'] },
            { title:'Support', links:['Help Center','Track Order','Returns','Shipping Policy','Contact Us'] },
            { title:'Sell on Zoptavi', links:['Become a Seller','Seller Hub','Advertising','Affiliate','Bulk Orders'] },
          ].map(col => (
            <div key={col.title}>
              <h5 style={{ color:'#fff', fontSize:15, fontFamily:'Poppins', fontWeight:700, marginBottom:18 }}>{col.title}</h5>
              <ul style={{ listStyle:'none', margin:0, padding:0 }}>
                {col.links.map(l => (
                  <li key={l} style={{ marginBottom:10 }}>
                    <Link to="/about" style={{ fontSize:14, color:'#cbd5e1', textDecoration:'none', transition:'color .2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color='var(--teal)')}
                      onMouseLeave={e => (e.currentTarget.style.color='#cbd5e1')}>
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="zfoot-bottom" style={{ borderTop:'1px solid rgba(255,255,255,.1)', paddingTop:20, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <p style={{ fontSize:12, color:'#64748b', margin:0 }}>© 2026 Zoptavi Technologies Pvt. Ltd. All rights reserved.</p>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {['Visa','MC','UPI','RuPay','GPay','BHIM'].map(p => (
              <span key={p} style={{ background:'#fff', color:'var(--navy)', fontWeight:700, fontFamily:'Poppins', fontSize:10, padding:'4px 8px', borderRadius:6 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
