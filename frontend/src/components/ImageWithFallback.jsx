import { useState } from "react";

// Enhanced fallback: brand-color gradient + car silhouette SVG + geometric ring
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
        className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden ${className}`}
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}44 0%, transparent 50%), radial-gradient(circle at 70% 70%, ${color}22 0%, transparent 55%), linear-gradient(135deg, #0b0b10 0%, #050505 55%, #101014 100%)`,
        }}
        role="img"
        aria-label={alt}
      >
        {/* Diagonal chevrons pattern */}
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${color} 0, ${color} 1px, transparent 1px, transparent 22px)`,
          }}
        />
        {/* Concentric rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[110%] h-[110%] rounded-full border spin-slow"
            style={{ borderColor: `${color}22` }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[70%] h-[70%] rounded-full border spin-reverse"
            style={{ borderColor: `${color}30` }}
          />
        </div>
        <div className="absolute inset-0 grain opacity-60" />

        {/* Car silhouette */}
        <svg
          viewBox="0 0 200 80"
          className="relative w-2/3 max-w-[280px] opacity-90 float-slow"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`carShine-${color}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path
            d="M14 58 Q14 44 40 40 L60 30 Q78 22 108 22 L128 22 Q150 22 168 34 L186 40 Q194 42 194 52 L194 60 Q194 66 188 66 L172 66 A10 10 0 0 1 152 66 L60 66 A10 10 0 0 1 40 66 L18 66 Q14 66 14 60 Z"
            fill={`url(#carShine-${color})`}
            stroke={color}
            strokeWidth="1.2"
            strokeOpacity="0.7"
          />
          <circle cx="52" cy="66" r="8" fill="#000" stroke={color} strokeOpacity="0.9" strokeWidth="1.6" />
          <circle cx="162" cy="66" r="8" fill="#000" stroke={color} strokeOpacity="0.9" strokeWidth="1.6" />
          <path d="M74 32 L114 32 L146 42 L74 42 Z" fill="#000" fillOpacity="0.35" stroke={color} strokeOpacity="0.4" strokeWidth="0.8" />
        </svg>

        <div className="relative mt-3 text-center px-6">
          <div
            className="font-mono text-[9px] uppercase tracking-[0.36em]"
            style={{ color: `${color}` }}
          >
            Coming into frame
          </div>
          <div
            className="font-display italic text-2xl md:text-3xl mt-1 text-white/85 tracking-tight"
            style={{ textShadow: `0 0 30px ${color}66` }}
          >
            {fallbackLabel || alt || "In transit"}
          </div>
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
