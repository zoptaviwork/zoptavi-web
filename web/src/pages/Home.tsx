import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCartStore } from '../store/cartStore';

const tints = ['teal','orange','teal','orange','teal','orange','teal','orange'];

const banners = [
  { bg:'linear-gradient(135deg,#00C9C8 0%,#007A76 100%)', badge:'SEASON SALE', title:'Fashion that moves with you', sub:'Starting from ₹499', btn:'Explore Fashion', link:'/category/fashion', accent:'#FFA31A' },
  { bg:'linear-gradient(135deg,#FF6A00 0%,#FFA31A 100%)', badge:'FLASH SALE LIVE', title:'Big Tech Days Up to 60% Off', sub:'Smartphones · Laptops · Audio', btn:'Shop Now', link:'/category/electronics', accent:'#fff' },
  { bg:'linear-gradient(135deg,#0F172A 0%,#1e3a5f 100%)', badge:'NEW ARRIVALS', title:'Premium Brands At Best Prices', sub:'Exclusive collections', btn:'Browse All', link:'/category', accent:'#00C9C8' },
];

const dealSections = [
  { title:'Suggested For You', color:'#00A2A5', products: products.slice(0,8) },
  { title:'Top Deals on Electronics', color:'#FF5E00', products: products.slice(2,10) },
  { title:'Fashion Picks', color:'#007A76', products: products.slice(1,9) },
];

const quickLinks = [
  { label:'Min. 70% Off', sub:'Best Deals', color:'#00A2A5', slug:'deals' },
  { label:'Just ₹799', sub:'Payday Sale', color:'#FF5E00', slug:'payday' },
  { label:'Just ₹499', sub:'Deal of Day', color:'#007A76', slug:'dotd' },
  { label:'Up to 80% Off', sub:'Price Drop', color:'#0F172A', slug:'pricedrop' },
];


function HScroll({ title, color, prods }: { title:string, color:string, prods:any[] }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',overflow:'hidden',marginBottom:12}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 16px',borderBottom:'1px solid var(--border)'}}>
        <h2 style={{fontSize:18,fontFamily:'Poppins',fontWeight:800,color:'var(--navy)',margin:0}}>{title}</h2>
        <Link to="/category" style={{display:'flex',alignItems:'center',gap:5,background:color,color:'#fff',padding:'7px 14px',borderRadius:20,fontSize:12,fontFamily:'Poppins',fontWeight:600,textDecoration:'none'}}>
          See All <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </Link>
      </div>
      <div style={{position:'relative'}}>
        <button className="hscroll-arrows" onClick={()=>ref.current?.scrollBy({left:-700,behavior:'smooth'})}
          style={{position:'absolute',left:0,top:'50%',transform:'translateY(-50%)',zIndex:2,width:34,height:34,borderRadius:'50%',background:'#fff',border:'1px solid var(--border)',boxShadow:'0 4px 12px rgba(0,0,0,.15)',placeItems:'center',cursor:'pointer'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div ref={ref} style={{display:'flex',gap:10,padding:'14px 16px',overflowX:'auto',scrollbarWidth:'none',WebkitOverflowScrolling:'touch' as any}}>
          {prods.map((p,i)=>(
            <div key={p.id+i} className="hscroll-item" style={{minWidth:200,maxWidth:200,flexShrink:0}}>
              <ProductCard product={p} tint={tints[i%2]}/>
            </div>
          ))}
        </div>
        <button className="hscroll-arrows" onClick={()=>ref.current?.scrollBy({left:700,behavior:'smooth'})}
          style={{position:'absolute',right:0,top:'50%',transform:'translateY(-50%)',zIndex:2,width:34,height:34,borderRadius:'50%',background:'#fff',border:'1px solid var(--border)',boxShadow:'0 4px 12px rgba(0,0,0,.15)',placeItems:'center',cursor:'pointer'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [cd, setCd] = useState({h:5,m:23,s:47});
  const pad = (n:number)=>String(n).padStart(2,'0');

  useEffect(()=>{
    const t=setInterval(()=>setSlide(s=>(s+1)%banners.length),4500);
    return()=>clearInterval(t);
  },[]);

  useEffect(()=>{
    const t=setInterval(()=>setCd(c=>{
      if(c.s>0)return{...c,s:c.s-1};
      if(c.m>0)return{...c,m:c.m-1,s:59};
      if(c.h>0)return{h:c.h-1,m:59,s:59};
      return{h:5,m:59,s:59};
    }),1000);
    return()=>clearInterval(t);
  },[]);

  return (
    <div style={{background:'#f1f3f6',minHeight:'100vh'}}>
      <div style={{maxWidth:'1300px',margin:'0 auto',padding:'10px 12px',boxSizing:'border-box'}}>

        {/* 3-Banner Hero Grid */}
        <div className="home-banner-grid" style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:8,marginBottom:10,borderRadius:8,overflow:'hidden'}}>
          {/* Main banner */}
          <div className="home-main-banner" style={{position:'relative',borderRadius:8,overflow:'hidden',minHeight:260,background:banners[slide].bg,transition:'background .6s',cursor:'pointer'}}>
            <div className="home-main-banner-content" style={{position:'absolute',inset:0,padding:'36px 40px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <span style={{display:'inline-block',background:'rgba(255,255,255,.2)',color:'#fff',fontSize:10,fontWeight:700,fontFamily:'Poppins',padding:'4px 10px',borderRadius:20,marginBottom:10,width:'fit-content',letterSpacing:'.1em'}}>{banners[slide].badge}</span>
              <h2 className="home-main-banner-title" style={{color:'#fff',fontSize:'clamp(20px,3vw,36px)',fontWeight:900,fontFamily:'Poppins',margin:'0 0 8px',lineHeight:1.15,maxWidth:400}}>{banners[slide].title}</h2>
              <p style={{color:'rgba(255,255,255,.85)',fontSize:14,margin:'0 0 20px'}}>{banners[slide].sub}</p>
              <Link to={banners[slide].link}>
                <button style={{background:banners[slide].accent,color:banners[slide].accent==='#fff'?'var(--navy)':'#fff',border:'none',padding:'10px 24px',borderRadius:8,fontFamily:'Poppins',fontWeight:700,fontSize:13,cursor:'pointer'}}>
                  {banners[slide].btn} →
                </button>
              </Link>
            </div>
            <div style={{position:'absolute',bottom:12,left:'50%',transform:'translateX(-50%)',display:'flex',gap:5}}>
              {banners.map((_,i)=>(
                <button key={i} onClick={()=>setSlide(i)} style={{width:i===slide?18:5,height:5,borderRadius:3,background:i===slide?'#fff':'rgba(255,255,255,.5)',border:'none',cursor:'pointer',transition:'width .3s',padding:0}}/>
              ))}
            </div>
          </div>
          {/* Right promo cards — hidden on mobile */}
          <div className="home-banner-right" style={{display:'flex',flexDirection:'column',gap:8}}>
            <Link to="/category/beauty" style={{flex:1,borderRadius:8,overflow:'hidden',background:'linear-gradient(135deg,#FF6A00,#FFA31A)',padding:'18px 20px',display:'flex',flexDirection:'column',justifyContent:'space-between',textDecoration:'none',minHeight:120}}>
              <div>
                <p style={{color:'rgba(255,255,255,.8)',fontSize:11,fontFamily:'Poppins',margin:'0 0 4px'}}>TRENDING NOW</p>
                <h3 style={{color:'#fff',fontSize:18,fontWeight:800,fontFamily:'Poppins',margin:0,lineHeight:1.2}}>Grooming Essentials</h3>
              </div>
              <span style={{color:'#fff',fontSize:12,fontWeight:700,fontFamily:'Poppins'}}>Shop now →</span>
            </Link>
            <Link to="/category/fashion" style={{flex:1,borderRadius:8,overflow:'hidden',background:'linear-gradient(135deg,#0F172A,#1e3a5f)',padding:'18px 20px',display:'flex',flexDirection:'column',justifyContent:'space-between',textDecoration:'none',minHeight:120}}>
              <div>
                <p style={{color:'rgba(255,255,255,.6)',fontSize:11,fontFamily:'Poppins',margin:'0 0 4px'}}>PREMIUM PICKS</p>
                <h3 style={{color:'#fff',fontSize:18,fontWeight:800,fontFamily:'Poppins',margin:0,lineHeight:1.2}}>Travel in Style</h3>
              </div>
              <span style={{color:'var(--teal)',fontSize:12,fontWeight:700,fontFamily:'Poppins'}}>Shop now →</span>
            </Link>
          </div>
        </div>

        {/* Flash Sale strip */}
        <div className="flash-strip" style={{background:'var(--navy)',borderRadius:12,padding:'14px 18px',display:'flex',alignItems:'center',gap:16,marginBottom:10,flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
            <div style={{width:34,height:34,borderRadius:10,background:'var(--grad-orange)',display:'grid',placeItems:'center',color:'#fff',flexShrink:0}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7z"/></svg>
            </div>
            <div>
              <p style={{color:'#fff',fontFamily:'Poppins',fontWeight:800,fontSize:16,margin:0}}>Flash Sale</p>
              <p style={{color:'rgba(255,255,255,.6)',fontSize:11,margin:0}}>Hurry, ends soon!</p>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:5,flexShrink:0}}>
            {[pad(cd.h),pad(cd.m),pad(cd.s)].map((t,i)=>(
              <span key={i} style={{display:'flex',alignItems:'center',gap:5}}>
                <span style={{background:'rgba(255,255,255,.1)',color:'#fff',fontFamily:'Poppins',fontWeight:800,fontSize:15,width:38,height:38,borderRadius:9,display:'grid',placeItems:'center'}}>{t}</span>
                {i<2&&<span style={{color:'var(--orange-bright)',fontWeight:800,fontSize:16}}>:</span>}
              </span>
            ))}
          </div>
          <div className="flash-quicklinks" style={{display:'flex',gap:8,marginLeft:'auto',flexWrap:'wrap'}}>
            {quickLinks.map(q=>(
              <Link key={q.label} to={`/category/${q.slug}`} style={{background:q.color,color:'#fff',padding:'7px 12px',borderRadius:10,textDecoration:'none',textAlign:'center',minWidth:92,flexShrink:0}}>
                <p style={{fontFamily:'Poppins',fontWeight:800,fontSize:13,margin:0}}>{q.label}</p>
                <p style={{fontSize:10,opacity:.8,margin:0}}>{q.sub}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Interesting Finds */}
        <div style={{background:'#fff',borderRadius:16,border:'1px solid var(--border)',overflow:'hidden',marginBottom:12}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 16px',borderBottom:'1px solid var(--border)'}}>
            <h2 style={{fontSize:18,fontFamily:'Poppins',fontWeight:800,color:'var(--navy)',margin:0}}>Interesting Finds</h2>
            <Link to="/category" style={{display:'flex',alignItems:'center',gap:5,background:'var(--grad-teal)',color:'#fff',padding:'7px 14px',borderRadius:20,fontSize:12,fontFamily:'Poppins',fontWeight:600,textDecoration:'none'}}>
              See All <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
          <div className="finds-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:2}}>
            {[
              {label:'Widest Range',sub:'10K+ products',color:'#e8f9f9'},
              {label:'In Focus Now',sub:'Trending today',color:'#fff0eb'},
              {label:'Hand-picked',sub:"Editor's choice",color:'#e8f9f9'},
              {label:'Best Picks',sub:'Top rated',color:'#fff0eb'},
            ].map((f,i)=>(
              <Link key={i} to="/category" style={{padding:'16px 14px',background:f.color,textDecoration:'none',display:'flex',flexDirection:'column',gap:8}}>
                <div className={`ph ${i%2===0?'teal':'orange'}`} style={{height:130,borderRadius:10}}><span className="lbl">{f.label}</span></div>
                <div>
                  <p style={{fontFamily:'Poppins',fontWeight:700,fontSize:14,color:'var(--navy)',margin:'0 0 2px'}}>{f.label}</p>
                  <p style={{fontSize:12,color:'var(--text-2)',margin:0}}>{f.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Product horizontal scroll sections */}
        {dealSections.map(s=>(
          <HScroll key={s.title} title={s.title} color={s.color} prods={s.products}/>
        ))}

        {/* Category Deal Banners */}
        <div className="home-deal-banners" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
          {[
            {title:'Shop for a Cool Summer',color:'#FF5E00',slug:'fashion'},
            {title:'Top Electronics Deals',color:'#00A2A5',slug:'electronics'},
          ].map(b=>(
            <Link key={b.title} to={`/category/${b.slug}`} style={{background:b.color,borderRadius:14,padding:'18px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',textDecoration:'none'}}>
              <h3 style={{color:'#fff',fontFamily:'Poppins',fontWeight:800,fontSize:17,margin:0,maxWidth:180,lineHeight:1.2}}>{b.title}</h3>
              <div style={{width:36,height:36,borderRadius:'50%',background:'rgba(255,255,255,.2)',display:'grid',placeItems:'center',color:'#fff',flexShrink:0}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{background:'var(--grad-teal)',borderRadius:16,padding:'32px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24,flexWrap:'wrap',marginBottom:16,position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,background:'radial-gradient(600px 300px at 80% 120%,rgba(255,163,26,.3),transparent 60%)'}}/>
          <div style={{position:'relative'}}>
            <div style={{background:'#fff',display:'inline-block',padding:'8px 14px',borderRadius:12,marginBottom:12}}>
              <img src="/zoptavi-logo-clean.png" style={{height:36}} alt="Zoptavi"/>
            </div>
            <h2 style={{color:'#fff',fontSize:'clamp(20px,3vw,26px)',fontFamily:'Poppins',margin:'0 0 4px'}}>Get Exclusive Deals</h2>
            <p style={{color:'rgba(255,255,255,.85)',fontSize:14,margin:0}}>Subscribe and save up to 40% on your next order</p>
          </div>
          <form style={{display:'flex',gap:8,position:'relative',flexWrap:'wrap'}} onSubmit={e=>e.preventDefault()}>
            <input type="email" placeholder="Enter your email…" style={{padding:'12px 18px',borderRadius:10,border:'none',fontSize:14,fontFamily:'Inter',outline:'none',minWidth:220,flex:1}}/>
            <button type="submit" className="btn btn-cta" style={{flexShrink:0}}>Subscribe</button>
          </form>
        </div>

      </div>
    </div>
  );
}
