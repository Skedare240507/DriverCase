import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home", testid: "nav-home" },
  { to: "/about", label: "About", testid: "nav-about" },
  { to: "/contact", label: "Contact", testid: "nav-contact" },
  { to: "/favorites", label: "Garage", testid: "nav-favorites" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
      style={{ borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none" }}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 md:px-10 py-5">
        <Link to="/" data-testid="brand-logo" className="flex items-center gap-3">
          <span
            className="inline-block w-7 h-7 border border-white/30 rotate-45"
            style={{ borderColor: "rgba(212,175,55,0.6)" }}
          />
          <span className="font-display text-xl tracking-wider">
            VELOCITY <span style={{ color: "#D4AF37" }}>ATLAS</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={l.testid}
              className={({ isActive }) =>
                `font-mono text-[11px] uppercase tracking-[0.28em] transition-colors ${
                  isActive ? "text-[#D4AF37]" : "text-white/70 hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/favorites"
            data-testid="header-favorites-btn"
            className="hidden md:inline-flex items-center gap-2 border border-white/15 px-4 py-2 hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
          >
            <Heart size={14} />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em]">Garage</span>
          </Link>
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="md:hidden glass-strong border-t border-white/10 px-6 py-6 flex flex-col gap-5"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`${l.testid}-mobile`}
              className={({ isActive }) =>
                `font-mono text-[12px] uppercase tracking-[0.24em] ${
                  isActive ? "text-[#D4AF37]" : "text-white/80"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
