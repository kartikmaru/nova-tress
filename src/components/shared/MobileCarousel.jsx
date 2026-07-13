"use client";

/**
 * MobileCarousel.jsx
 * ─────────────────────────────────────────────────────────────────
 * Reusable single-card mobile carousel.
 * Props:
 *   items        — array of anything
 *   renderItem   — (item, index) => JSX
 *   className    — optional wrapper class
 *   dotDark      — use dark dots (for light backgrounds), default false (light dots)
 * Features:
 *   • One card visible at a time (full-width slide)
 *   • Touch / finger swipe (left = next, right = prev)
 *   • Dot indicators below
 *   • No auto-advance (user-controlled only)
 * ─────────────────────────────────────────────────────────────────
 */

import { useState, useRef, useCallback } from "react";

export default function MobileCarousel({ items = [], renderItem, className = "", dotDark = false }) {
  const [current, setCurrent]   = useState(0);
  const touchStartX             = useRef(null);
  const touchStartY             = useRef(null);
  const isDragging              = useRef(false);
  const total                   = items.length;

  const goTo = useCallback((idx) => {
    setCurrent(Math.max(0, Math.min(idx, total - 1)));
  }, [total]);

  const next = useCallback(() => goTo((current + 1) % total), [current, goTo, total]);
  const prev = useCallback(() => goTo((current - 1 + total) % total), [current, goTo, total]);

  /* ── Touch handlers ── */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current  = false;
  };

  const onTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (dx > dy && dx > 8) {
      isDragging.current = true;
      e.preventDefault(); /* prevent page scroll during horizontal swipe */
    }
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (isDragging.current && Math.abs(diff) > 40) {
      diff < 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current  = false;
  };

  if (!items.length) return null;

  /* Dot styles */
  const dotActive   = dotDark ? "bg-[#C8A96E]"       : "bg-[#C8A96E]";
  const dotInactive = dotDark ? "bg-[#CCCCCC]"       : "bg-white/30";
  const dotHover    = dotDark ? "hover:bg-[#C8A96E]/60" : "hover:bg-white/50";

  return (
    <div className={`select-none ${className}`}>
      {/* ── Slide track ── */}
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, i) => (
            <div key={i} className="w-full flex-shrink-0 px-1">
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`
              btn-base btn-press rounded-full transition-all duration-300
              hover:scale-110
              ${i === current
                ? `w-6 h-2 ${dotActive} shadow-[0_0_8px_rgba(200,169,110,0.45)]`
                : `w-2 h-2 ${dotInactive} ${dotHover}`
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}
