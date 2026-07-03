import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { getCar } from "@/data/brands";
import ImageWithFallback from "@/components/ImageWithFallback";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.listFavorites();
      setFavorites(data);
    } catch {
      toast.error("Could not load your garage");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (carSlug) => {
    try {
      await api.removeFavorite(carSlug);
      setFavorites((f) => f.filter((x) => x.car_slug !== carSlug));
      toast("Removed from garage");
    } catch {
      toast.error("Could not remove");
    }
  };

  const decorated = favorites
    .map((f) => {
      const res = getCar(f.car_slug);
      return res ? { fav: f, brand: res.brand, car: res.car } : null;
    })
    .filter(Boolean);

  return (
    <div data-testid="favorites-page" className="bg-[#050505] text-white min-h-screen">
      <section className="relative pt-40 pb-16">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="overline flex items-center gap-3">
            <Heart size={12} className="text-[#D4AF37]" /> My Garage
          </div>
          <h1 className="mt-6 font-display text-[13vw] md:text-[8vw] leading-[0.85] tracking-tighter">
            The ones<br />
            <span className="italic text-[#D4AF37]">you'd steal.</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Cars you've saved live here. Your session is bound to this browser —
            add or remove anytime.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          {loading ? (
            <div className="py-24 text-center text-white/60 font-mono text-sm">
              Loading your garage…
            </div>
          ) : decorated.length === 0 ? (
            <div className="glass p-16 text-center" data-testid="favorites-empty">
              <div className="overline">Empty garage</div>
              <h3 className="font-display text-4xl mt-3">Nothing here yet.</h3>
              <p className="mt-3 text-white/60">
                Start exploring marques — press the heart on any car you love.
              </p>
              <Link to="/" className="btn-solid mt-8 inline-flex">
                Explore Marques <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {decorated.map(({ car, brand }, i) => (
                <motion.div
                  key={car.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass overflow-hidden group border-white/10 hover:border-[#D4AF37]/50 transition"
                  data-testid={`garage-card-${car.slug}`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={car.image}
                      alt={car.name}
                      color={brand.color}
                      fallbackLabel={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                    />
                    <button
                      onClick={() => remove(car.slug)}
                      data-testid={`garage-remove-${car.slug}`}
                      className="absolute top-4 right-4 glass w-10 h-10 flex items-center justify-center border-white/15 hover:text-[#EF4444] hover:border-[#EF4444] transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="overline" style={{ color: brand.color }}>
                      {brand.name}
                    </div>
                    <h4 className="font-display text-3xl mt-2 leading-tight">{car.name}</h4>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                        {car.power}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                        {car.price}
                      </span>
                    </div>
                    <Link
                      to={`/car/${car.slug}`}
                      className="mt-5 inline-flex items-center gap-2 overline text-white hover:text-[#D4AF37] transition"
                    >
                      See Details <ArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
