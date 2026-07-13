"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SafeImage from "@/components/shared/SafeImage";
import { TESTIMONIALS } from "@/data/testimonialsData";

function Stars() {
  return (
    <div className="flex gap-1 justify-center">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className="w-4 h-4 text-[#C8A96E]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969
            0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688
            -1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118
            l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0
            00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const AUTO_MS = 5000;
const TOTAL   = TESTIMONIALS.length;

export default function ClientWords() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef            = useRef(null);
  const touchStartX         = useRef(null);
  const touchStartY         = useRef(null);
  const isDragging          = useRef(false);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % TOTAL);
    }, AUTO_MS);
  }, []);

  useEffect(() => {
    if (!paused) startTimer();
    return () => clearInterval(timerRef.current);
  }, [paused, startTimer]);

  const goTo = useCallback((idx) => {
    setActive(idx);
    setPaused(true);
    clearInterval(timerRef.current);
    setTimeout(() => setPaused(false), 8000);
  }, []);

  const prev = () => goTo((active - 1 + TOTAL) % TOTAL);
  const next = () => goTo((active + 1) % TOTAL);

  /* ── Touch / swipe handlers ── */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current  = false;
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
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current  = false;
  };

  /* ── Single slide card ── */
  const SlideCard = ({ t }) => (
    <div
      className="rounded-2xl px-4 sm:px-10 py-5 sm:py-8 text-center"
      style={{
        background: "rgba(255,255,255,0.05)",
        boxShadow:  "0 4px 32px rgba(0,0,0,0.30)",
      }}
    >
      <Stars />

      <p className="font-playfair text-4xl sm:text-5xl leading-none mb-1 mt-2 sm:mt-3 select-none"
         style={{ color: "rgba(200,169,110,0.25)" }}>
        &ldquo;
      </p>

      <p className="font-playfair italic text-sm sm:text-lg leading-relaxed mb-4 sm:mb-6
                    max-w-lg mx-auto"
         style={{ color: "rgba(255,255,255,0.75)" }}>
        {t.review}
      </p>

      <div className="w-10 h-px mx-auto mb-4 sm:mb-5"
           style={{ backgroundColor: "rgba(200,169,110,0.3)" }} />

      <div className="flex items-center justify-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0"
             style={{ outline: "2px solid rgba(200,169,110,0.4)", outlineOffset: "2px" }}>
          <SafeImage
            src={t.img}
            alt={t.name}
            containerClassName="w-full h-full"
            imageClassName="w-full h-full object-cover object-top"
            fallbackText={t.fallback}
          />
        </div>
        <div className="text-left">
          <p className="font-playfair font-bold text-sm sm:text-base text-white leading-tight">
            {t.name}
          </p>
          <span className="font-poppins text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "#C8A96E" }}>
            {t.service}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-[#222222] py-16 px-6 lg:px-20">
      <div className="max-w-[860px] mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-poppins text-[11px] font-semibold tracking-[0.4em] uppercase
                        text-[#C8A96E] mb-3">
            Client Words
          </p>
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-white leading-tight">
            What Our Clients Say
          </h2>
          <div className="w-14 h-[2px] bg-[#C8A96E] mx-auto mt-5" />
        </div>

        {/* ─────────────────────────────────────────────────────
            MOBILE: no arrows, just swipe + dots
        ───────────────────────────────────────────────────── */}
        <div className="sm:hidden">
          <div
            className="overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <SlideCard t={t} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots only — no arrows on mobile */}
          <div className="flex justify-center gap-2 mt-5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Review ${i + 1}`}
                className={`
                  btn-base btn-press rounded-full transition-all duration-300
                  hover:scale-110
                  ${active === i
                    ? "w-6 h-2 bg-[#C8A96E] shadow-[0_0_8px_rgba(200,169,110,0.5)]"
                    : "w-2 h-2 bg-white/25 hover:bg-white/50"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────
            DESKTOP (sm+): arrows + dots — unchanged behaviour
        ───────────────────────────────────────────────────── */}
        <div className="hidden sm:block">
          <div className="relative px-12">
            {/* Track */}
            <div
              className="overflow-hidden rounded-2xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${active * 100}%)` }}
              >
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0">
                    <SlideCard t={t} />
                  </div>
                ))}
              </div>
            </div>

            {/* Prev arrow */}
            <button
              onClick={prev}
              aria-label="Previous review"
              className="
                btn-base btn-press
                absolute left-0 top-1/2 -translate-y-1/2 z-20
                w-9 h-9 rounded-full flex items-center justify-center
                transition-all duration-300
                hover:scale-110
              "
              style={{
                background: "rgba(255,255,255,0.10)",
                border:     "1px solid rgba(255,255,255,0.20)",
                color:      "#ffffff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background    = "#C8A96E";
                e.currentTarget.style.borderColor   = "#C8A96E";
                e.currentTarget.style.color         = "#222";
                e.currentTarget.style.boxShadow     = "0 4px 16px rgba(200,169,110,0.40)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background    = "rgba(255,255,255,0.10)";
                e.currentTarget.style.borderColor   = "rgba(255,255,255,0.20)";
                e.currentTarget.style.color         = "#fff";
                e.currentTarget.style.boxShadow     = "none";
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next arrow */}
            <button
              onClick={next}
              aria-label="Next review"
              className="
                btn-base btn-press
                absolute right-0 top-1/2 -translate-y-1/2 z-20
                w-9 h-9 rounded-full flex items-center justify-center
                transition-all duration-300
                hover:scale-110
              "
              style={{ background: "#C8A96E", color: "#222222" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background  = "#ffffff";
                e.currentTarget.style.boxShadow   = "0 4px 16px rgba(200,169,110,0.40)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background  = "#C8A96E";
                e.currentTarget.style.boxShadow   = "none";
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-7">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Review ${i + 1}`}
                className={`
                  btn-base btn-press rounded-full transition-all duration-300
                  hover:scale-110
                  ${active === i
                    ? "w-6 h-2 bg-[#C8A96E] shadow-[0_0_8px_rgba(200,169,110,0.5)]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }
                `}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
