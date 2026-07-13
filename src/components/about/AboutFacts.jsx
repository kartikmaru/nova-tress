"use client";

import { useState, useEffect, useRef } from "react";
import MobileCarousel from "@/components/shared/MobileCarousel";

/* ── Animated counter hook ─────────────────────────────────────── */
function useCounter(target, duration = 2200) {
  const [count, setCount]         = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animated, setAnimated]   = useState(false);
  const ref                       = useRef(null);

  useEffect(() => {
    const el  = ref.current;
    if (!el)  return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setIsVisible(true);
          setAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animated]);

  useEffect(() => {
    if (!isVisible) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, target, duration]);

  return { count, ref };
}

/* ── StatCard — single reusable card ───────────────────────────── */
function StatCard({ target, suffix, label, icon, desc, accent = false }) {
  const { count, ref } = useCounter(target);

  return (
    <div
      ref={ref}
      className={`
        group relative bg-white rounded-2xl border text-center
        p-6 sm:p-8
        hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden
        ${accent ? "border-[#C8A96E]" : "border-[#E0E0E0] hover:border-[#C8A96E]"}
      `}
    >
      {/* Top colour bar on hover */}
      <div className="absolute top-0 inset-x-0 h-1 bg-[#C8A96E] scale-x-0
                      group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-t-2xl" />

      {/* Icon box */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#222222] rounded-xl flex items-center justify-center
                      text-xl sm:text-2xl mb-4 sm:mb-5 mx-auto
                      group-hover:bg-[#C8A96E] transition-colors duration-300">
        <span role="img" aria-label={label}>{icon}</span>
      </div>

      {/* Animated number */}
      <p className="font-playfair font-bold text-4xl sm:text-5xl text-[#C8A96E] mb-1 leading-none">
        {count}<span>{suffix}</span>
      </p>

      {/* Label */}
      <p className="font-poppins font-semibold text-xs sm:text-sm text-[#222222]
                    mt-2 mb-3 uppercase tracking-wide">
        {label}
      </p>

      {/* Description — visible on all sizes */}
      <p className="font-poppins text-xs text-[#888888] leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

/* ── AboutFacts section ─────────────────────────────────────────── */
export default function AboutFacts() {
  const stats = [
    {
      target: 10,
      suffix: "+",
      label:  "Years of Experience",
      icon:   "🏆",
      desc:   "A decade of delivering premium beauty services and training the best salon professionals in the industry.",
    },
    {
      target: 700,
      suffix: "+",
      label:  "Happy Clients",
      icon:   "😊",
      desc:   "Hundreds of women trust NovaTress for their most important beauty moments — from everyday styling to bridal transformations.",
    },
    {
      target: 20,
      suffix: "+",
      label:  "Staff Members",
      icon:   "👥",
      desc:   "A passionate team of certified stylists, makeup artists, and skin specialists — each dedicated to your best look.",
    },
    {
      target: 50,
      suffix: "+",
      label:  "Beauty Services",
      icon:   "✨",
      desc:   "From hair and skincare to nails and threading, we offer a comprehensive menu of luxury beauty treatments under one roof.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 px-6 lg:px-20" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-[1200px] mx-auto">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-10 sm:mb-14">
          <div>
            <p className="font-poppins text-[11px] font-semibold tracking-[0.35em] uppercase
                          text-[#888888] mb-4">
              Company Overview
            </p>
            <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-[#222222] leading-tight">
              Facts &amp; <span style={{ color: "#C8A96E" }}>Figures</span>
            </h2>
          </div>
          <p className="font-poppins text-sm text-[#888888] leading-relaxed max-w-md">
            At NovaTress, our numbers speak for themselves. Built over a decade of passion,
            precision and an unwavering commitment to every client who walks through our doors.
          </p>
        </div>

        {/* ── Mobile: single-card carousel with dots ── */}
        <div className="sm:hidden">
          <MobileCarousel
            items={stats}
            dotDark={true}
            renderItem={(s) => (
              <StatCard
                target={s.target}
                suffix={s.suffix}
                label={s.label}
                icon={s.icon}
                desc={s.desc}
              />
            )}
          />
        </div>

        {/* ── Desktop: 4-col grid (unchanged) ── */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <StatCard
              key={s.label}
              target={s.target}
              suffix={s.suffix}
              label={s.label}
              icon={s.icon}
              desc={s.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
