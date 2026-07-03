import { useState } from "react";

// Image that falls back to a colored gradient with the car/brand color if the source fails.
export default function ImageWithFallback({
  src,
  alt = "",
  color = "#1a1a1a",
  className = "",
  fallbackLabel = "",
  ...rest
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center ${className}`}
        style={{
          background: `linear-gradient(135deg, ${color}22 0%, #050505 60%, ${color}44 100%)`,
        }}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 grain opacity-60" />
        <div
          className="relative font-display text-3xl md:text-5xl tracking-tight text-white/40 text-center px-6"
          style={{ textShadow: `0 0 40px ${color}` }}
        >
          {fallbackLabel || alt || "Image"}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      loading="lazy"
      {...rest}
    />
  );
}
