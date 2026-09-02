import { Link } from "react-router-dom";

const SiteFooter = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/40 font-body font-light text-xs">
          &copy; 2026 Zoptavi. All rights reserved.
        </p>
        <nav className="flex items-center gap-6">
          <a
            href="#"
            className="text-white/40 hover:text-white/70 font-body font-light text-xs transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-white/40 hover:text-white/70 font-body font-light text-xs transition-colors"
          >
            Terms
          </a>
          <Link
            to="/contact"
            className="text-white/40 hover:text-white/70 font-body font-light text-xs transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
