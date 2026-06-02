import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background:'var(--navy)', color:'#cbd5e1', padding:'60px 0 24px' }}>
      <div style={{ maxWidth:'1400px', margin:'0 auto', padding:'0 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr 1fr', gap:40, marginBottom:48 }}>
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
        <div style={{ borderTop:'1px solid rgba(255,255,255,.1)', paddingTop:22, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:14 }}>
          <p style={{ fontSize:13, color:'#64748b' }}>© 2026 Zoptavi Technologies Pvt. Ltd. All rights reserved.</p>
          <div style={{ display:'flex', gap:8 }}>
            {['Visa','MC','UPI','RuPay','GPay','BHIM'].map(p => (
              <span key={p} style={{ background:'#fff', color:'var(--navy)', fontWeight:700, fontFamily:'Poppins', fontSize:11, padding:'5px 10px', borderRadius:6 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
