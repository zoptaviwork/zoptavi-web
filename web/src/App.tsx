import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ClickSpark sparkColor="#a163d6" sparkCount={8} sparkRadius={15} duration={430} />
      <div style={{ minHeight: "100vh", background: "#06070a", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/zoptavi-bill" element={<ZoptaviBill />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}
