import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SiteFooter from './components/SiteFooter';
import ScrollToTop from './components/ScrollToTop';
import ClickSpark from './components/reactbits/ClickSpark';
import Home from './pages/Home';
import Services from './pages/Services';
import ZoptaviBill from './pages/ZoptaviBill';
import Work from './pages/Work';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { track } from './lib/adminApi';

function PageviewTracker() {
  const location = useLocation();
  useEffect(() => {
    track('pageview', location.pathname);
  }, [location.pathname]);
  return null;
}

function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#06070a", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageviewTracker />
      <ClickSpark sparkColor="#a163d6" sparkCount={8} sparkRadius={15} duration={430} />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
        <Route path="/services" element={<SiteLayout><Services /></SiteLayout>} />
        <Route path="/zoptavi-bill" element={<SiteLayout><ZoptaviBill /></SiteLayout>} />
        <Route path="/work" element={<SiteLayout><Work /></SiteLayout>} />
        <Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
        <Route path="/careers" element={<SiteLayout><Careers /></SiteLayout>} />
        <Route path="/contact" element={<SiteLayout><Contact /></SiteLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
