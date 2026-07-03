import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

export default function FavoriteButton({ carSlug, brandSlug, size = 18, className = "" }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    api
      .listFavorites()
      .then((favs) => {
        if (mounted) setSaved(favs.some((f) => f.car_slug === carSlug));
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [carSlug]);

  const toggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      if (saved) {
        await api.removeFavorite(carSlug);
        setSaved(false);
        toast("Removed from garage");
      } else {
        await api.addFavorite(carSlug, brandSlug);
        setSaved(true);
        toast("Saved to your garage");
      }
    } catch (err) {
      toast.error("Could not update garage");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      data-testid={`favorite-btn-${carSlug}`}
      onClick={toggle}
      className={`glass w-10 h-10 flex items-center justify-center border transition ${
        saved
          ? "border-[#D4AF37] text-[#D4AF37]"
          : "border-white/15 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
      } ${className}`}
      aria-label={saved ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart size={size} fill={saved ? "#D4AF37" : "none"} />
    </button>
  );
}
