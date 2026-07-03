import { Link } from "react-router-dom";
import { brands } from "@/data/brands";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative mt-32 border-t border-white/10 bg-[#050505]"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <span className="overline">Est. 2025 · Maranello × Molsheim × Palo Alto</span>
          <h3 className="font-display text-5xl md:text-6xl mt-6 leading-[0.95] tracking-tighter">
            The atlas of<br />
            <span className="italic" style={{ color: "#D4AF37" }}>every road worth</span>
            <br />
            driving.
          </h3>
          <p className="mt-8 text-white/60 max-w-md leading-relaxed">
            Velocity Atlas is a digital showroom bringing together ten legendary
            marques and their most iconic cars — sculpted in cinematic 3D.
          </p>
        </div>

        <div className="md:col-span-3">
          <span className="overline">Navigate</span>
          <ul className="mt-6 space-y-3">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/contact", "Contact"],
              ["/favorites", "My Garage"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  data-testid={`footer-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-white/70 hover:text-[#D4AF37] transition-colors font-mono text-[12px] uppercase tracking-[0.2em]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <span className="overline">Marques</span>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {brands.map((b) => (
              <Link
                key={b.slug}
                to={`/brand/${b.slug}`}
                data-testid={`footer-brand-${b.slug}`}
                className="text-white/60 hover:text-white transition font-display text-lg"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="hairline" />
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
          © 2025 Velocity Atlas · A digital showcase
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
          Crafted with obsession · 24.9152° N, 10.9160° E
        </p>
      </div>
    </footer>
  );
}
