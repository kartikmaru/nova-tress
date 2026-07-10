"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Animated counter hook ─────────────────────────────────────── */
function useCounter(target, duration, startCounting) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!startCounting) return;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

/* ─── SVG icons ─────────────────────────────────────────────────── */
const IconExperience = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="32" cy="22" r="10"/>
    <path d="M14 54c0-9.941 8.059-18 18-18s18 8.059 18 18"/>
    <path d="M32 4 L32 12 M16 10 L21 15 M48 10 L43 15"/>
  </svg>
);
const IconClients = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="20" cy="20" r="8"/>
    <circle cx="44" cy="20" r="8"/>
    <path d="M4 52c0-8.837 7.163-16 16-16h24c8.837 0 16 7.163 16 16"/>
    <path d="M28 36h8"/>
  </svg>
);
const IconStaff = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="32" cy="18" r="8"/>
    <path d="M16 52v-2a8 8 0 0 1 8-8h16a8 8 0 0 1 8 8v2"/>
    <line x1="48" y1="6" x2="58" y2="6"/>
    <line x1="53" y1="1" x2="53" y2="11"/>
  </svg>
);

/* ─── Individual stat card — own hooks, no map violation ─────────── */
function StatCard({ target, suffix, label, Icon, started }) {
  const value = useCounter(target, 2200, started);
  return (
    <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl border border-border-light hover:border-accent hover:shadow-lg transition-all duration-300">
      <div className="w-16 h-16 rounded-2xl bg-primary-dark flex items-center justify-center flex-shrink-0">
        <Icon />
      </div>
      <p className="font-playfair text-4xl font-bold text-text-dark leading-none">
        {value}<span className="text-accent">{suffix}</span>
      </p>
      <p className="font-poppins text-xs uppercase tracking-widest text-text-light text-center">
        {label}
      </p>
    </div>
  );
}

/* ─── CounterStats section ───────────────────────────────────────── */
export default function CounterStats() {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-light-gray py-20 px-6 lg:px-20">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left — heading */}
        <div>
          <p className="font-poppins text-[11px] font-semibold tracking-[0.3em] uppercase text-text-light mb-4">
            Company Overview
          </p>
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-text-dark leading-tight">
            Facts &amp; Figures
          </h2>
        </div>

        {/* Right — 3 stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard target={10}  suffix="+" label="Years of Experience" Icon={IconExperience} started={started} />
          <StatCard target={700} suffix="+" label="Google Reviews"      Icon={IconClients}    started={started} />
          <StatCard target={20}  suffix="+" label="Staff Members"       Icon={IconStaff}      started={started} />
        </div>
      </div>
    </section>
  );
}
