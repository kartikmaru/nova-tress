"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── 6 women-focused expertise entries ─────────────────────────── */
const EXPERTISE = [
  {
    id: 1,
    emoji: "✂️",
    title: "Haircut Styles",
    desc:  "From modern-day cuts to timeless classics, our experienced stylists develop looks that celebrate your unique character and lifestyle.",
  },
  {
    id: 2,
    emoji: "🌿",
    title: "Hair & Care",
    desc:  "Healthy, stunning hair is our passion. Nourishing treatments, shade refreshes, or a fashionable blowout — we handle it all.",
  },
  {
    id: 3,
    emoji: "👰",
    title: "Bridal Makeup",
    desc:  "Your wedding day is the most special event of your life. We ensure every bride looks truly radiant and unforgettable.",
  },
  {
    id: 4,
    emoji: "💅",
    title: "Manicure Pedicure",
    desc:  "Treat your hands and feet to the ultimate pampering. Precision nail shaping, cuticle care, and polished perfection.",
  },
  {
    id: 5,
    emoji: "✨",
    title: "Facial Treatment",
    desc:  "Skin-reviving facials tailored to your skin type — from deep cleansing and brightening to anti-ageing and hydration.",
  },
  {
    id: 6,
    emoji: "🪡",
    title: "Waxing & Threading",
    desc:  "Smooth, flawless skin every time. Our experts use gentle yet effective techniques for long-lasting results.",
  },
];

/* ─── Individual card ───────────────────────────────────────────── */
function ExpertCard({ emoji, title, desc }) {
  return (
    <div
      className="
        group flex flex-col items-center text-center gap-5
        bg-white px-7 py-10
        rounded-xl border border-border-light
        hover:border-accent/40 hover:shadow-xl hover:-translate-y-1
        transition-all duration-300
      "
    >
      {/* Dark icon box with emoji */}
      <div
        className="
          w-16 h-16 rounded-[18px] bg-primary-dark
          flex items-center justify-center flex-shrink-0
          shadow-[0_4px_20px_rgba(34,34,34,0.18)]
          group-hover:bg-accent/10 group-hover:ring-1 group-hover:ring-accent/30
          transition-all duration-300
        "
      >
        <span className="text-2xl" role="img" aria-label={title}>
          {emoji}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-playfair font-semibold text-lg text-text-dark
        group-hover:text-accent transition-colors duration-300 leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="font-poppins text-sm text-text-light leading-relaxed max-w-[260px]">
        {desc}
      </p>
    </div>
  );
}

/* ─── Mobile Carousel for ExpertSection ────────────────────────── */
function MobileExpertCarousel({ items }) {
  const [current, setCurrent] = useState(0);
  const total = items.length;
  const autoRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  /* Auto-advance every 3s */
  useEffect(() => {
    autoRef.current = setInterval(next, 3000);
    return () => clearInterval(autoRef.current);
  }, [next]);

  const resetTimer = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 3000);
  }, [next]);

  /* Touch handlers */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (dx > dy && dx > 8) isDragging.current = true;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (isDragging.current && Math.abs(diff) > 40) {
      diff < 0 ? next() : prev();
      resetTimer();
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
  };

  return (
    <div className="relative w-full select-none">
      <div
        className="overflow-hidden w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map(({ id, emoji, title, desc }) => (
            <div key={id} className="w-full flex-shrink-0 px-2">
              <ExpertCard emoji={emoji} title={title} desc={desc} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); resetTimer(); }}
            aria-label={`Go to slide ${i + 1}`}
            className={`
              btn-base btn-press rounded-full transition-all duration-300
              hover:scale-110
              ${i === current
                ? "w-6 h-2 bg-accent shadow-[0_0_8px_rgba(200,169,110,0.5)]"
                : "w-2 h-2 bg-border-light hover:bg-accent/50"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── ExpertSection ─────────────────────────────────────────────── */
export default function ExpertSection() {
  return (
    <section className="bg-light-gray py-24 px-6 lg:px-20">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-poppins text-[11px] font-semibold tracking-[0.35em] uppercase text-text-light mb-4">
            Professional Services
          </p>
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-text-dark leading-tight">
            We are{" "}
            <span className="text-accent">Expert</span> in
          </h2>
          <div className="w-14 h-[2px] bg-accent mx-auto mt-6" />
        </div>

        {/* Mobile: auto carousel — Desktop: 3×2 grid */}
        <div className="sm:hidden">
          <MobileExpertCarousel items={EXPERTISE} />
        </div>
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPERTISE.map(({ id, emoji, title, desc }) => (
            <ExpertCard key={id} emoji={emoji} title={title} desc={desc} />
          ))}
        </div>
      </div>
    </section>
  );
}
