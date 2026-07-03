import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getBrand, brands } from "@/data/brands";
import FavoriteButton from "@/components/FavoriteButton";

export default function BrandPage() {
  const { slug } = useParams();
  const brand = getBrand(slug);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setIndex(0);
    setDirection(1);
  }, [slug]);

  const cars = brand?.cars || [];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cars.length]);

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % cars.length);
  };
  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + cars.length) % cars.length);
  };

  const otherBrands = useMemo(
    () => brands.filter((b) => b.slug !== slug),
    [slug]
  );

  if (!brand) {
    return (
      <div className="pt-40 min-h-screen text-white text-center">
        <h1 className="font-display text-5xl">Marque not found.</h1>
        <Link to="/" className="btn-outline mt-8 inline-flex">Back Home</Link>
      </div>
    );
  }

  const car = cars[index];
  const positions = cars.map((_, i) => {
    const offset = i - index;
    return { offset, i };
  });

  return (
    <div data-testid="brand-page" className="bg-[#050505] text-white">
      {/* Brand Hero */}
      <section className="relative min-h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={brand.hero}
            alt={brand.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505]" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10 pt-40 pb-16">
          <Link
            to="/"
            data-testid="brand-back-home"
            className="inline-flex items-center gap-2 overline hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft size={12} /> All Marques
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid grid-cols-12 gap-8 items-end"
          >
            <div className="col-span-12 md:col-span-8">
              <div className="overline mb-4" style={{ color: brand.color }}>
                {brand.country}
              </div>
              <h1 className="font-display text-[16vw] md:text-[10vw] leading-[0.85] tracking-tighter">
                {brand.name}
              </h1>
              <p className="mt-4 font-display italic text-2xl md:text-3xl text-white/70">
                {brand.tagline}
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:justify-self-end max-w-md">
              <p className="text-white/70 leading-relaxed">{brand.story}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAROUSEL / SHOWROOM */}
      <section
        data-testid="car-showroom"
        className="relative py-24 md:py-32 overflow-hidden"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="overline">The Showroom</span>
              <h2 className="font-display text-4xl md:text-6xl mt-4 leading-none tracking-tight">
                Cars arrive<br />
                <span className="italic text-[#D4AF37]">one by one.</span>
              </h2>
            </div>
            <div className="font-mono text-white/60 text-sm">
              <span className="text-white tabular text-4xl md:text-5xl font-display">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mx-3 text-white/30">/</span>
              <span className="tabular">{String(cars.length).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Coverflow stage */}
          <div className="relative coverflow-perspective h-[420px] md:h-[560px] mb-10">
            {positions.map(({ i, offset }) => {
              const abs = Math.abs(offset);
              if (abs > 2) return null;
              const c = cars[i];
              const isCenter = offset === 0;
              return (
                <motion.div
                  key={c.slug}
                  initial={false}
                  animate={{
                    x: `${offset * 55}%`,
                    scale: isCenter ? 1 : 0.72 - abs * 0.05,
                    rotateY: offset * -22,
                    z: isCenter ? 0 : -200 * abs,
                    opacity: abs > 1.5 ? 0 : 1 - abs * 0.35,
                    filter: isCenter ? "blur(0px)" : `blur(${abs * 2}px)`,
                  }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[86%] md:w-[62%] h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    pointerEvents: isCenter ? "auto" : "none",
                    zIndex: 10 - abs,
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden border border-white/10">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 grain" />
                    {isCenter && (
                      <>
                        <div className="absolute top-6 right-6">
                          <FavoriteButton carSlug={c.slug} brandSlug={brand.slug} />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                          <div>
                            <div className="overline" style={{ color: brand.color }}>
                              {c.type} · {c.year}
                            </div>
                            <h3 className="font-display text-4xl md:text-6xl leading-none mt-2 tracking-tight">
                              {c.name}
                            </h3>
                            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
                              <span>{c.power}</span>
                              <span>·</span>
                              <span>{c.zeroSixty} · 0–60</span>
                              <span>·</span>
                              <span>{c.topSpeed}</span>
                            </div>
                          </div>
                          <Link
                            to={`/car/${c.slug}`}
                            data-testid={`see-details-${c.slug}`}
                            className="btn-solid whitespace-nowrap"
                          >
                            See Details <ArrowUpRight size={14} />
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <button
                data-testid="carousel-prev"
                onClick={prev}
                className="glass w-14 h-14 flex items-center justify-center border-white/15 hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
                aria-label="Previous car"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                data-testid="carousel-next"
                onClick={next}
                className="glass w-14 h-14 flex items-center justify-center border-white/15 hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
                aria-label="Next car"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex-1 mx-8 h-px bg-white/10 relative">
              <motion.div
                className="absolute top-0 left-0 h-px bg-[#D4AF37]"
                animate={{ width: `${((index + 1) / cars.length) * 100}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>

            <div className="hidden md:flex gap-2">
              {cars.map((c, i) => (
                <button
                  key={c.slug}
                  data-testid={`car-dot-${i}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] border transition ${
                    i === index
                      ? "border-[#D4AF37] text-[#D4AF37]"
                      : "border-white/15 text-white/60 hover:border-white/40"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full lineup grid */}
      <section className="relative py-24 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-12 gap-8 items-end mb-12">
            <div className="col-span-12 md:col-span-6">
              <span className="overline">The Line-up</span>
              <h2 className="font-display text-4xl md:text-6xl mt-4 leading-none tracking-tight">
                Every icon.<br />
                <span className="italic text-[#D4AF37]">In one wing.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cars.map((c) => (
              <motion.div
                key={c.slug}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="glass border-white/10 overflow-hidden group"
                data-testid={`lineup-card-${c.slug}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                  />
                  <div className="absolute top-4 right-4">
                    <FavoriteButton carSlug={c.slug} brandSlug={brand.slug} />
                  </div>
                </div>
                <div className="p-6">
                  <div className="overline" style={{ color: brand.color }}>
                    {c.year} · {c.type}
                  </div>
                  <h4 className="font-display text-3xl mt-2 leading-tight">{c.name}</h4>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                      {c.power}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                      {c.price}
                    </span>
                  </div>
                  <Link
                    to={`/car/${c.slug}`}
                    data-testid={`lineup-details-${c.slug}`}
                    className="mt-5 inline-flex items-center gap-2 overline text-white hover:text-[#D4AF37] transition"
                  >
                    See Details <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Marques */}
      <section className="relative py-24 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <span className="overline">Continue exploring</span>
          <h3 className="font-display text-3xl md:text-5xl mt-3 mb-8 tracking-tight">
            Other marques
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
            {otherBrands.map((b) => (
              <Link
                key={b.slug}
                to={`/brand/${b.slug}`}
                data-testid={`other-brand-${b.slug}`}
                className="glass p-4 hover:border-[#D4AF37] transition group flex flex-col items-center gap-2 text-center"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: b.color }}
                />
                <span className="font-display text-sm md:text-base">{b.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
