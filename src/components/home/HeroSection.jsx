"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/shared/SafeImage";
import BookNowButton from "@/components/shared/BookNowButton";

/* ─── Animated counter hook ────────────────────────────────────── */
function useCounter(target, duration, startCounting) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!startCounting) return;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      /* ease-out cubic */
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, startCounting]);

  return count;
}

/* ─── Stat pill inside hero ─────────────────────────────────────── */
function StatPill({ target, suffix = "+", label, started }) {
  const value = useCounter(target, 2000, started);
  return (
    <div className="flex flex-col items-start gap-0.5 min-w-0 flex-shrink-0">
      <span className="font-playfair text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-none whitespace-nowrap">
        {value}
        <span className="text-accent">{suffix}</span>
      </span>
      <span className="font-poppins text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-white/50 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

/* ─── HeroSection ───────────────────────────────────────────────── */
export default function HeroSection() {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  /* Trigger counters once the hero enters the viewport */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Background image via SafeImage ──
          Absolutely positioned, fills the whole section.
          If the image is missing → SafeImage shows a dark fallback div
          that still looks intentional against the overlay.                  */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src="/images/home/salon%20hero.jpg"
          alt="NovaTress hero background"
          containerClassName="w-full h-full"
          imageClassName="w-full h-full object-cover object-center"
          fallbackText="NovaTress hero image not available"
        />
      </div>

      {/* ── Dark overlay — #222222 @ 72% opacity ── */}
      <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: "rgba(34,34,34,0.72)" }}
      />

      {/* ── Bottom gradient fade ── */}
      <div className="absolute inset-x-0 bottom-0 h-48 z-10 bg-gradient-to-t from-primary-dark to-transparent" />

      {/* ── Content — sits above overlay (z-20) ── */}
      <div className="relative z-20 flex-1 flex flex-col justify-center px-6 lg:px-20 pt-28 pb-6">

        {/* Tag */}
        <p className="font-poppins text-xs font-medium tracking-[0.35em] uppercase text-accent mb-6">
          ✦ Premium Salon &amp; Academy
        </p>

        {/* Heading */}
        <h1 className="font-playfair font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] max-w-3xl mb-6">
          Transform Your Look{" "}
          <span className="text-gold-gradient">with NovaTress</span>
        </h1>

        {/* Slogan */}
        <p className="font-poppins text-base sm:text-lg text-white/60 max-w-xl leading-relaxed mb-10">
          Where elegance meets expertise and every strand tells a story.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-row gap-3 sm:gap-4">
          <Link
            href="/services"
            className="
              btn-base btn-press
              inline-block font-poppins text-xs sm:text-sm font-semibold uppercase tracking-widest
              px-5 sm:px-8 py-3 sm:py-3.5 rounded border border-white/30 text-white
              hover:border-accent hover:text-accent hover:bg-accent/10
              hover:shadow-[0_4px_16px_rgba(200,169,110,0.20)]
              transition-all duration-300 text-center
            "
          >
            Explore Services
          </Link>
          <BookNowButton variant="gold">
            Book Appointment
          </BookNowButton>
        </div>
      </div>

      {/* ── Stat row — pinned to hero bottom ── */}
      <div className="relative z-20 px-6 lg:px-20 py-8 sm:py-10 border-t border-white/10">
        <div className="flex flex-row items-start justify-between sm:justify-start sm:gap-20 gap-0">
          <StatPill target={10}  suffix="+"   label="Years of Experience" started={started} />
          <div className="w-px self-stretch bg-white/15 mx-2 sm:hidden" />
          <StatPill target={700} suffix="+"   label="Happy Clients"       started={started} />
          <div className="w-px self-stretch bg-white/15 mx-2 sm:hidden" />
          <StatPill target={20}  suffix="+"   label="Staff Members"       started={started} />
        </div>
      </div>
    </section>
  );
}
