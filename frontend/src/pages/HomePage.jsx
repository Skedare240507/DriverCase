import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Play, Gauge, Sparkles, ArrowUpRight } from "lucide-react";
import { brands } from "@/data/brands";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/5309381/5309381-uhd_2560_1440_25fps.mp4";

const stats = [
  { label: "Marques", value: "10" },
  { label: "Iconic Cars", value: "30+" },
  { label: "Continents", value: "3" },
  { label: "Combined HP", value: "22K" },
];

const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [hoveredBrand, setHoveredBrand] = useState(null);

  return (
    <div data-testid="home-page" className="bg-[#050505] text-white">
      {/* HERO */}
      <section
        ref={heroRef}
        data-testid="hero-section"
        className="relative min-h-screen w-full overflow-hidden"
      >
        <motion.div style={{ y }} className="absolute inset-0">
          <video
            data-testid="hero-video"
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=85&w=1920&auto=format&fit=crop"
          />
          <div className="absolute inset-0 hero-fade" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Rotating ring */}
        <div className="absolute right-[-12vw] top-[10vh] pointer-events-none hidden md:block">
          <div className="relative w-[60vw] h-[60vw] max-w-[900px] max-h-[900px]">
            <div className="absolute inset-0 border border-white/10 rounded-full spin-slow" />
            <div className="absolute inset-8 border border-white/5 rounded-full spin-reverse" />
            <div className="absolute inset-24 border border-[#D4AF37]/20 rounded-full spin-slow" />
          </div>
        </div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10 pt-40 md:pt-56 pb-24"
        >
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="overline mb-8 flex items-center gap-3"
            >
              <span className="inline-block w-8 h-px bg-[#D4AF37]" />
              A Digital Showroom · Vol. 01
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[15vw] md:text-[9vw] leading-[0.85] tracking-tighter"
            >
              Cars aren't
              <br />
              <span className="italic" style={{ color: "#D4AF37" }}>
                built —
              </span>{" "}
              they're
              <br />
              composed.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 max-w-xl text-white/70 text-lg leading-relaxed"
            >
              Velocity Atlas is a cinematic archive of the ten most obsessive
              car houses on Earth. Rotate them. Study their pedigree. Save the
              ones you'd steal a kingdom for.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <a
                href="#marques"
                data-testid="hero-explore-btn"
                className="btn-solid"
              >
                Explore Marques <ArrowRight size={14} />
              </a>
              <Link to="/about" data-testid="hero-story-btn" className="btn-outline">
                <Play size={12} /> The Story
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.div>

        {/* Floating stat card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="hidden lg:flex absolute right-10 bottom-16 z-10 glass p-6 items-center gap-5 float-slow"
        >
          <Gauge size={28} className="text-[#D4AF37]" />
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
              Combined Power
            </div>
            <div className="font-display text-4xl leading-none mt-1 tabular">21,984 HP</div>
          </div>
        </motion.div>
      </section>

      {/* WEBSITE INFO */}
      <section data-testid="intro-section" className="relative py-32 md:py-48">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <span className="overline">01 · What is this</span>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-6xl leading-[1] tracking-tight">
                A curated <span className="italic text-[#D4AF37]">3D atlas</span> of
                ten marques whose engineers refuse to accept the previous version.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl text-white/70 leading-relaxed">
                Pick a manufacturer. Watch their most storied vehicles arrive on
                stage, one after another. Rotate them. Compare specs. Pull the
                thread on the founders who put them there. It's not a
                configurator — it's a love letter.
              </p>
            </Reveal>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <Reveal delay={0.25 + i * 0.08} key={s.label}>
                  <div className="glass p-6 border-white/10">
                    <div className="font-display text-4xl md:text-5xl tabular tracking-tight">
                      {s.value}
                    </div>
                    <div className="mt-2 overline">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee band */}
      <section className="relative py-10 border-y border-white/10 overflow-hidden">
        <div className="marquee-track font-display text-6xl md:text-8xl text-white/8">
          {[...Array(2)].flatMap((_, i) =>
            brands.map((b) => (
              <span key={`${b.slug}-${i}`} className="px-10 whitespace-nowrap">
                <span className="text-white/20">{b.name}</span>
                <span className="text-[#D4AF37] px-6">·</span>
              </span>
            ))
          )}
        </div>
      </section>

      {/* MARQUES GRID */}
      <section
        id="marques"
        data-testid="marques-section"
        className="relative py-32 md:py-48"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-8 items-end mb-16">
            <div className="col-span-12 md:col-span-6">
              <span className="overline">02 · The Marques</span>
              <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[1] tracking-tight">
                Ten houses.<br />
                <span className="italic text-[#D4AF37]">Each with a religion.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <p className="text-white/60 leading-relaxed">
                Click a marque — its most famous cars will roll in one by one on
                the next screen. Use the prev/next controls to advance the
                showroom.
              </p>
            </div>
          </div>

          {/* Asymmetric brand tetris grid */}
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {brands.map((b, i) => {
              const spans = [
                "col-span-12 md:col-span-8 md:row-span-2 h-[420px] md:h-[600px]", // Ferrari
                "col-span-6 md:col-span-4 h-[280px]", // Lamborghini
                "col-span-6 md:col-span-4 h-[280px]", // Porsche
                "col-span-12 md:col-span-6 h-[340px]", // Bugatti
                "col-span-12 md:col-span-6 h-[340px]", // Rolls
                "col-span-6 md:col-span-3 h-[260px]", // BMW
                "col-span-6 md:col-span-3 h-[260px]", // Mercedes
                "col-span-6 md:col-span-3 h-[260px]", // Audi
                "col-span-6 md:col-span-3 h-[260px]", // Tesla
                "col-span-12 md:col-span-12 h-[300px]", // Toyota wide
              ];
              return (
                <motion.div
                  key={b.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: (i % 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className={spans[i]}
                  onMouseEnter={() => setHoveredBrand(b.slug)}
                  onMouseLeave={() => setHoveredBrand(null)}
                >
                  <Link
                    to={`/brand/${b.slug}`}
                    data-testid={`brand-card-${b.slug}`}
                    className="group block relative w-full h-full overflow-hidden border border-white/10 hover:border-[#D4AF37]/60 transition-all duration-500"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url(${b.hero})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
                          {String(i + 1).padStart(2, "0")} / {brands.length}
                        </span>
                        <span
                          className="font-mono text-[10px] uppercase tracking-[0.28em]"
                          style={{ color: b.color }}
                        >
                          {b.country}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display text-4xl md:text-6xl leading-none tracking-tight">
                          {b.name}
                        </h3>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-white/60 text-sm">{b.tagline}</span>
                          <ArrowUpRight
                            size={20}
                            className={`transition-all duration-500 ${
                              hoveredBrand === b.slug
                                ? "translate-x-1 -translate-y-1 text-[#D4AF37]"
                                : "text-white/70"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="relative py-32 md:py-40 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <span className="overline">03 · How it works</span>
              <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[1] tracking-tight">
                A showroom<br />
                that <span className="italic text-[#D4AF37]">breathes.</span>
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                n: "I",
                t: "Cinematic Hero",
                d: "Every marque opens with its own full-screen title reel — video, motion, weight.",
              },
              {
                n: "II",
                t: "Arrival Carousel",
                d: "Famous models slide in from stage right, one by one. Backward. Forward. Your call.",
              },
              {
                n: "III",
                t: "Rotating Details",
                d: "Full spec sheet, engine, colour swatches with live previews, and 3D image rotation.",
              },
              {
                n: "IV",
                t: "Personal Garage",
                d: "Save the cars you'd steal. Retrieve them from any device tied to your session.",
              },
            ].map((f, i) => (
              <Reveal key={f.n} delay={0.1 + i * 0.08}>
                <div className="glass p-8 h-full flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">
                      {f.n}
                    </span>
                    <Sparkles size={14} className="text-[#D4AF37]" />
                  </div>
                  <h4 className="font-display text-3xl leading-tight">{f.t}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founders teaser */}
      <section className="relative py-32 md:py-40 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-8 items-end mb-14">
            <div className="col-span-12 md:col-span-6">
              <span className="overline">04 · Behind the wheel</span>
              <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[1] tracking-tight">
                The people who<br />
                <span className="italic text-[#D4AF37]">refused to compromise.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <Link to="/about" data-testid="home-about-cta" className="btn-outline">
                Read About <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {brands.slice(0, 5).map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.05}>
                <div className="relative h-72 overflow-hidden border border-white/10 group">
                  <img
                    src={b.founder.photo}
                    alt={b.founder.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4AF37]">
                      {b.name}
                    </div>
                    <div className="font-display text-xl mt-1">{b.founder.name}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
