import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Gauge, Zap, Wind, DollarSign, Cog, Car as CarIcon } from "lucide-react";
import { getCar } from "@/data/brands";
import FavoriteButton from "@/components/FavoriteButton";
import ImageWithFallback from "@/components/ImageWithFallback";

export default function CarDetailPage() {
  const { slug } = useParams();
  const result = getCar(slug);
  const [selectedColor, setSelectedColor] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const imgRef = useRef(null);
  const dragState = useRef({ x: 0, dragging: false });

  if (!result) {
    return (
      <div className="pt-40 min-h-screen text-white text-center">
        <h1 className="font-display text-5xl">Car not found</h1>
        <Link to="/" className="btn-outline mt-8 inline-flex">Back Home</Link>
      </div>
    );
  }

  const { brand, car } = result;
  const gallery = car.gallery && car.gallery.length ? car.gallery : [car.image];

  const onDragStart = (e) => {
    dragState.current = { x: e.clientX || e.touches?.[0]?.clientX || 0, dragging: true };
  };
  const onDrag = (e) => {
    if (!dragState.current.dragging) return;
    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    const dx = x - dragState.current.x;
    setRotation((r) => r + dx * 0.5);
    dragState.current.x = x;
  };
  const onDragEnd = () => {
    dragState.current.dragging = false;
  };

  const specs = [
    { icon: <Cog size={16} />, label: "Engine", value: car.engine },
    { icon: <Zap size={16} />, label: "Power", value: car.power },
    { icon: <Gauge size={16} />, label: "0–60 mph", value: car.zeroSixty },
    { icon: <Wind size={16} />, label: "Top Speed", value: car.topSpeed },
    { icon: <CarIcon size={16} />, label: "Drivetrain", value: car.drivetrain },
    { icon: <Cog size={16} />, label: "Transmission", value: car.transmission },
    { icon: <DollarSign size={16} />, label: "MSRP", value: car.price },
    { icon: <Zap size={16} />, label: "Torque", value: car.torque },
  ];

  return (
    <div data-testid="car-detail-page" className="bg-[#050505] text-white">
      {/* Header */}
      <section className="relative pt-32 pb-8">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 70% 20%, ${brand.color}44 0%, transparent 55%)`,
          }}
        />
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-10">
          <Link
            to={`/brand/${brand.slug}`}
            data-testid="car-back-brand"
            className="inline-flex items-center gap-2 overline hover:text-[#D4AF37] transition"
          >
            <ArrowLeft size={12} /> {brand.name}
          </Link>

          <div className="grid grid-cols-12 gap-8 mt-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="overline" style={{ color: brand.color }}>
                {car.type} · {car.year}
              </div>
              <h1 className="font-display text-[14vw] md:text-[7.5vw] leading-[0.85] tracking-tighter mt-3">
                {car.name}
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 md:justify-self-end flex items-center gap-3">
              <FavoriteButton carSlug={car.slug} brandSlug={brand.slug} />
              <Link
                to="/contact"
                data-testid="inquire-btn"
                className="btn-solid"
              >
                Inquire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3D rotating image + gallery */}
      <section className="relative py-16">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <div
              className="relative aspect-[16/10] overflow-hidden border border-white/10 group select-none"
              onMouseDown={onDragStart}
              onMouseMove={onDrag}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              onTouchStart={onDragStart}
              onTouchMove={onDrag}
              onTouchEnd={onDragEnd}
              data-testid="car-3d-viewer"
            >
              <motion.div
                ref={imgRef}
                key={galleryIndex}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transform: `perspective(1400px) rotateY(${rotation * 0.15}deg) scale(1.02)`,
                }}
                transition={{ duration: 0.6 }}
                className="w-full h-full"
              >
                <ImageWithFallback
                  src={gallery[galleryIndex]}
                  alt={car.name}
                  color={brand.color}
                  fallbackLabel={car.name}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </motion.div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                  Drag to rotate
                </span>
                <button
                  data-testid="reset-rotation"
                  onClick={() => setRotation(0)}
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] hover:underline"
                >
                  Reset
                </button>
              </div>
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {gallery.map((g, i) => (
                  <button
                    key={g + i}
                    data-testid={`gallery-thumb-${i}`}
                    onClick={() => setGalleryIndex(i)}
                    className={`aspect-video overflow-hidden border transition ${
                      galleryIndex === i
                        ? "border-[#D4AF37]"
                        : "border-white/10 hover:border-white/40"
                    }`}
                  >
                    <ImageWithFallback
                      src={g}
                      alt={car.name}
                      color={brand.color}
                      fallbackLabel={car.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-4 space-y-6">
            <div className="glass p-6">
              <span className="overline">Starting At</span>
              <div className="font-display text-5xl tracking-tight mt-2 tabular">
                {car.price}
              </div>
              <div className="hairline my-5" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="overline">0–60</div>
                  <div className="font-mono text-xl mt-1 tabular">{car.zeroSixty}</div>
                </div>
                <div>
                  <div className="overline">Top Speed</div>
                  <div className="font-mono text-xl mt-1 tabular">{car.topSpeed}</div>
                </div>
                <div>
                  <div className="overline">Power</div>
                  <div className="font-mono text-xl mt-1 tabular">{car.power}</div>
                </div>
                <div>
                  <div className="overline">Drive</div>
                  <div className="font-mono text-xl mt-1">{car.drivetrain}</div>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="glass p-6" data-testid="color-selector">
              <span className="overline">Available Colours</span>
              <div className="mt-4 flex flex-wrap gap-3">
                {car.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(i)}
                    data-testid={`color-swatch-${i}`}
                    aria-label={c.name}
                    className={`relative w-11 h-11 border transition ${
                      selectedColor === i
                        ? "border-[#D4AF37] scale-110"
                        : "border-white/20 hover:border-white/60"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
              <div className="mt-4">
                <div className="overline">Selected</div>
                <div className="font-display text-2xl mt-1">
                  {car.colors[selectedColor].name}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mt-1">
                  {car.colors[selectedColor].hex}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Specifications */}
      <section
        data-testid="specifications"
        className="relative py-16 border-t border-white/10"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <span className="overline">Technical Ledger</span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 leading-none tracking-tight">
            Specifications
          </h2>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {specs.map((s) => (
              <div key={s.label} className="glass p-6" data-testid={`spec-${s.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                <div className="flex items-center gap-2 text-[#D4AF37]">
                  {s.icon}
                  <span className="overline text-[#D4AF37]">{s.label}</span>
                </div>
                <div className="mt-3 font-mono text-base tabular">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-14 grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <span className="overline">Signature Details</span>
              <h3 className="font-display text-3xl md:text-4xl mt-3 leading-tight">
                What sets it apart.
              </h3>
            </div>
            <div className="col-span-12 md:col-span-8">
              <ul className="divide-y divide-white/10">
                {car.features.map((f, i) => (
                  <li
                    key={f}
                    className="py-5 flex items-center justify-between"
                  >
                    <span className="font-display text-xl md:text-2xl">{f}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Brand story CTA */}
      <section className="relative py-24 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-6">
            <ImageWithFallback
              src={brand.founder.photo}
              alt={brand.founder.name}
              color={brand.color}
              fallbackLabel={brand.founder.name}
              className="w-full max-h-[420px] object-cover grayscale"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <span className="overline">Behind {brand.name}</span>
            <h3 className="font-display text-4xl md:text-6xl mt-4 leading-none tracking-tight">
              {brand.founder.name}
            </h3>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white/60">
              {brand.founder.role} · {brand.founder.born}
            </p>
            <p className="mt-6 font-display italic text-2xl md:text-3xl text-white/80">
              "{brand.founder.quote}"
            </p>
            <div className="mt-8 flex gap-3">
              <Link to={`/brand/${brand.slug}`} className="btn-outline">
                More {brand.name} Cars <ChevronRight size={14} />
              </Link>
              <Link to="/about" className="btn-outline">
                About the Marques
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
