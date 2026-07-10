"use client";

/**
 * SafeImage.jsx
 * A robust image wrapper that uses a native <img> tag (NOT next/image).
 * - If src is empty / null / undefined → shows fallback immediately.
 * - If the image fails to load (404, bad format, etc.) → shows fallback div.
 * - Never causes a page crash or broken-image icon.
 *
 * Props:
 *   src               {string}  — image path, e.g. "/images/home/hero-bg.jpg"
 *   alt               {string}  — alt text for accessibility
 *   containerClassName{string}  — Tailwind classes for the outer wrapper div
 *   imageClassName    {string}  — Tailwind classes for the <img> element
 *   fallbackText      {string}  — text shown inside fallback box (optional)
 *   style             {object}  — optional inline style on the wrapper
 */

import { useState } from "react";

export default function SafeImage({
  src,
  alt = "",
  containerClassName = "",
  imageClassName = "",
  fallbackText = "Image not available",
  style = {},
}) {
  /* If src is empty from the start, go straight to fallback */
  const hasSrc = src && src.trim() !== "";
  const [failed, setFailed] = useState(!hasSrc);

  /* Show fallback when img fires onError */
  const handleError = () => setFailed(true);

  /* ── Fallback box ── */
  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-secondary-dark/30 ${containerClassName}`}
        style={style}
        role="img"
        aria-label={alt || fallbackText}
      >
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          {/* Simple camera icon */}
          <svg
            className="w-10 h-10 text-white/20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <circle cx="12" cy="13" r="3" />
          </svg>
          <p className="font-poppins text-xs text-white/30 leading-snug max-w-[160px]">
            {fallbackText}
          </p>
        </div>
      </div>
    );
  }

  /* ── Real image ── */
  return (
    <div className={`relative overflow-hidden ${containerClassName}`} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onError={handleError}
        className={imageClassName}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
