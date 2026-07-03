import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { brands } from "@/data/brands";
import { ArrowRight } from "lucide-react";

const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function AboutPage() {
  return (
    <div data-testid="about-page" className="bg-[#050505] text-white">
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 radial-glow" />
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="overline">About · Vol. 01</div>
          <h1 className="mt-6 font-display text-[13vw] md:text-[8vw] leading-[0.85] tracking-tighter">
            A love letter,<br />
            <span className="italic text-[#D4AF37]">not a spec sheet.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-white/70 text-lg leading-relaxed">
            Velocity Atlas began with a garage question: what happens if we
            treat automobiles the way we treat great architecture? Study the
            architect. Trace the sketch. Sit inside the geometry. Ten marques,
            thirty-plus icons, one obsessive index.
          </p>
        </div>
      </section>

      {/* Founders — Tetris Grid */}
      <section className="relative py-24 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-8 mb-14">
            <div className="col-span-12 md:col-span-5">
              <span className="overline">The Founders</span>
              <h2 className="font-display text-5xl md:text-7xl mt-4 tracking-tight leading-[0.9]">
                Ten different<br />
                <span className="italic text-[#D4AF37]">obsessions.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <p className="text-white/70 leading-relaxed">
                Behind every prancing horse, raging bull, four-ring emblem or
                three-pointed star, there is a person who refused to sign off on
                "good enough". These are the ten who reshaped how we move.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {brands.map((b, i) => {
              const spans = [
                "col-span-12 md:col-span-6 h-[480px]",
                "col-span-6 md:col-span-3 h-[480px]",
                "col-span-6 md:col-span-3 h-[480px]",
                "col-span-6 md:col-span-4 h-[380px]",
                "col-span-6 md:col-span-4 h-[380px]",
                "col-span-12 md:col-span-4 h-[380px]",
                "col-span-6 md:col-span-3 h-[340px]",
                "col-span-6 md:col-span-3 h-[340px]",
                "col-span-6 md:col-span-3 h-[340px]",
                "col-span-6 md:col-span-3 h-[340px]",
              ];
              return (
                <motion.div
                  key={b.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: (i % 5) * 0.05 }}
                  className={spans[i]}
                >
                  <div
                    className="group relative w-full h-full overflow-hidden border border-white/10 hover:border-[#D4AF37]/60 transition"
                    data-testid={`founder-card-${b.slug}`}
                  >
                    <img
                      src={b.founder.photo}
                      alt={b.founder.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                      <div className="flex items-start justify-between">
                        <span
                          className="overline"
                          style={{ color: b.color }}
                        >
                          {b.name}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/60">
                          {b.country}
                        </span>
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/60">
                          {b.founder.role}
                        </div>
                        <h3 className="mt-2 font-display text-3xl md:text-4xl leading-none tracking-tight">
                          {b.founder.name}
                        </h3>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
                          {b.founder.born}
                        </p>
                        <p className="mt-4 font-display italic text-lg text-white/80 max-w-lg">
                          "{b.founder.quote}"
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All brands & cars index */}
      <section className="relative py-24 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-8 mb-12">
            <div className="col-span-12 md:col-span-6">
              <span className="overline">The Index</span>
              <h2 className="font-display text-5xl md:text-7xl mt-4 leading-[0.9] tracking-tight">
                Every marque.<br />
                <span className="italic text-[#D4AF37]">Every icon.</span>
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {brands.map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.04}>
                <div
                  className="glass border-white/10 hover:border-[#D4AF37]/50 transition grid grid-cols-12 gap-4 items-center p-6"
                  data-testid={`index-brand-${b.slug}`}
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <Link
                    to={`/brand/${b.slug}`}
                    data-testid={`index-brand-link-${b.slug}`}
                    className="col-span-10 md:col-span-3 group/brand"
                  >
                    <h3 className="font-display text-3xl md:text-4xl leading-none tracking-tight group-hover/brand:text-[#D4AF37] transition">
                      {b.name}
                    </h3>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
                      {b.country}
                    </div>
                  </Link>
                  <div className="col-span-12 md:col-span-7">
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {b.cars.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/car/${c.slug}`}
                          data-testid={`index-car-${c.slug}`}
                          className="text-white/70 hover:text-[#D4AF37] transition text-sm"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link
                    to={`/brand/${b.slug}`}
                    className="col-span-12 md:col-span-1 md:justify-self-end text-white/60 hover:text-[#D4AF37] transition"
                    aria-label={`Open ${b.name}`}
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative py-32 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <span className="overline">Manifesto</span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h3 className="font-display text-4xl md:text-6xl leading-[1] tracking-tight">
              We don't sell cars.<br />
              We <span className="italic text-[#D4AF37]">catalogue</span> the
              people who refused to accept the previous version of them.
            </h3>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  t: "Curation over completeness",
                  d: "Ten marques. Three icons per marque. Every entry earns its space by influencing the ones that came after.",
                },
                {
                  t: "Craft over content",
                  d: "Cinematic frames. Editorial typography. Interaction as choreography — motion that tells the reader they're somewhere.",
                },
                {
                  t: "Legacy over launch",
                  d: "The archive grows quietly. New brands added by nomination, never by trend.",
                },
              ].map((c) => (
                <div key={c.t} className="glass p-8">
                  <h4 className="font-display text-2xl leading-tight">{c.t}</h4>
                  <p className="mt-3 text-white/60 text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
