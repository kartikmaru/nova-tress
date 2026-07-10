"use client";

/**
 * ServicesSlider.jsx
 * Infinite auto-scrolling marquee — no manual controls, no Learn More button.
 * Each card: grayscale default → colour on hover + mirror shine animation.
 */

import SafeImage from "@/components/shared/SafeImage";
import { SLIDER_SERVICES } from "@/data/servicesData";

const TRACK = [...SLIDER_SERVICES, ...SLIDER_SERVICES];

/* ─── Single marquee card ──────────────────────────────────────── */
function ServiceCard({ service }) {
  return (
    /*
      group: enables group-hover variants on all children.
      overflow-hidden: required so shine overlay is clipped to card edges.
    */
    <div
      className="
        group relative flex-shrink-0
        w-[220px] sm:w-[250px] h-[340px] sm:h-[390px]
        rounded-2xl overflow-hidden cursor-default select-none
      "
      aria-label={service.title}
    >
      {/* ── Image — grayscale → colour on hover ── */}
      <SafeImage
        src={service.img}
        alt={service.title}
        containerClassName="absolute inset-0 w-full h-full"
        imageClassName="
          w-full h-full object-cover
          grayscale group-hover:grayscale-0
          scale-100 group-hover:scale-105
          transition-all duration-700 ease-out
        "
        fallbackText={service.fallback}
      />

      {/* ── Mirror shine overlay ──
          Diagonal white gradient sweeps left→right once on hover.
          pointer-events-none so it never blocks interaction.
          z-10 sits above image but below title (z-20).              */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 z-10 pointer-events-none
          opacity-0 group-hover:opacity-100
          group-hover:animate-shine
        "
        style={{
          background:
            "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.50) 50%, transparent 75%)",
        }}
      />

      {/* ── Bottom dark gradient (text backdrop) ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-20"
        style={{ background: "linear-gradient(to top, rgba(34,34,34,0.88) 0%, transparent 100%)" }}
      />

      {/* ── Service title — bottom-left, above gradient ── */}
      <p className="absolute bottom-4 left-4 right-4 z-30
        font-playfair font-semibold text-base text-white leading-snug drop-shadow-md">
        {service.title}
      </p>
    </div>
  );
}

/* ─── ServicesSlider ───────────────────────────────────────────── */
export default function ServicesSlider() {
  return (
    <section className="bg-white py-20 overflow-hidden">

      {/* Section header */}
      <div className="px-6 lg:px-20 mb-10">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-poppins text-[11px] font-semibold tracking-[0.35em]
            uppercase text-text-light mb-3">
            Our Services
          </p>
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-text-dark leading-tight">
            Beauty Services{" "}
            <span className="text-accent">for Women</span>
          </h2>
        </div>
      </div>

      {/* Marquee viewport */}
      <div className="w-full overflow-hidden">
        <div className="flex gap-5 animate-marquee w-max will-change-transform">
          {TRACK.map((s, idx) => (
            <ServiceCard key={`${s.id}-${idx}`} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
