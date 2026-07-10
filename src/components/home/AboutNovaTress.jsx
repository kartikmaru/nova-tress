"use client";

/**
 * AboutNovaTress.jsx
 * Two-column layout.
 * Left: image collage — grayscale default → colour + mirror shine on hover.
 * Right: copy with numbered points and Read More CTA.
 *
 * Corrected image paths (leading slash, forward slashes).
 */

import Link from "next/link";
import SafeImage from "@/components/shared/SafeImage";

const POINTS = [
  { num: "01", text: "We Understand What's Most Important To You."      },
  { num: "02", text: "We Use Only Proven Methods And Premium Products."  },
  { num: "03", text: "We Use Techniques That Give You The Best Results." },
];

/*
 * ShineImageCard
 * ──────────────
 * A standalone image wrapper that:
 *  1. Shows the image in grayscale by default.
 *  2. Transitions to full colour on hover.
 *  3. Runs the mirror-shine sweep animation once on hover.
 *
 * Uses SafeImage (native <img>) — no next/image.
 * overflow-hidden on the wrapper clips the shine to the card boundary.
 * aspect-ratio is controlled by the caller via the `ratio` style prop.
 */
function ShineImageCard({ src, alt, fallback, wrapperClassName, ratio }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl shadow-xl flex-shrink-0 ${wrapperClassName}`}
      style={{ aspectRatio: ratio }}
    >
      {/* Image — grayscale → colour, slight zoom on hover */}
      <SafeImage
        src={src}
        alt={alt}
        containerClassName="absolute inset-0 w-full h-full"
        imageClassName="
          w-full h-full object-cover
          grayscale group-hover:grayscale-0
          scale-100 group-hover:scale-105
          transition-all duration-700 ease-out
        "
        fallbackText={fallback}
      />

      {/*
        Mirror shine overlay.
        Diagonal white-transparent gradient sweeps left → right once per hover.
        z-10 → above image.
        pointer-events-none → never blocks clicks or touch.
      */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 z-10 pointer-events-none
          opacity-0 group-hover:opacity-100
          group-hover:animate-shine
        "
        style={{
          background:
            "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.48) 50%, transparent 75%)",
        }}
      />
    </div>
  );
}

/* ─── AboutNovaTress section ───────────────────────────────────── */
export default function AboutNovaTress() {
  return (
    <section className="bg-white py-24 px-6 lg:px-20">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* ══ Left — image collage ════════════════════════════════ */}
        <div className="relative flex gap-4 items-end justify-center">

          {/* Primary image — taller (3/4 ratio) */}
          <ShineImageCard
            src="/images/home/About(1).jpg"
            alt="NovaTress salon interior"
            fallback="Salon interior"
            wrapperClassName="w-[48%]"
            ratio="3/4"
          />

          {/* Secondary image — shorter (4/5 ratio), offset upward by mb-8 */}
          <ShineImageCard
            src="/images/home/about(2)2502ee8f5c459a5697fb53d071683e95.jpg"
            alt="NovaTress stylist at work"
            fallback="Stylist at work"
            wrapperClassName="w-[44%] mb-8"
            ratio="4/5"
          />

          {/* "Since" badge — overlaid top-right corner, above shine (z-20) */}
          <div className="absolute top-4 right-2 z-20
            bg-primary-dark rounded-2xl px-5 py-4 text-center shadow-xl">
            <p className="font-poppins text-[10px] uppercase tracking-widest
              text-white/50 mb-1">
              Since
            </p>
            <p className="font-playfair font-bold text-3xl text-white leading-none">
              2015
            </p>
          </div>
        </div>

        {/* ══ Right — copy ════════════════════════════════════════ */}
        <div className="flex flex-col gap-6">

          {/* Tag */}
          <p className="font-poppins text-[11px] font-semibold tracking-[0.3em]
            uppercase text-text-light">
            About NovaTress
          </p>

          {/* Heading */}
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-text-dark leading-tight">
            About NovaTress{" "}
            <span className="text-accent">Salon</span>{" "}
            and Academy
          </h2>

          {/* Paragraph */}
          <p className="font-poppins text-sm text-text-light leading-relaxed max-w-lg">
            At NovaTress Salon and Academy, with a pure combination of perfection
            and passion for hygiene and beauty, we take pride in every detail.
            When it comes to colouring and hairstyling, we pay close attention to
            each individual. Our premium solutions ensure your comfort at all times —
            from the moment you walk in to the moment you leave feeling transformed.
          </p>

          {/* Gold divider */}
          <div className="w-12 h-[2px] bg-accent" />

          {/* Numbered points */}
          <ul className="flex flex-col gap-4">
            {POINTS.map(({ num, text }) => (
              <li key={num} className="flex items-start gap-4 group">
                <span className="font-playfair font-bold text-base text-accent
                  flex-shrink-0 w-8">
                  {num}.
                </span>
                <div className="flex-1">
                  <p className="font-poppins text-sm font-semibold text-text-dark
                    group-hover:text-accent transition-colors duration-300">
                    {text}
                  </p>
                  <div className="mt-2 h-px bg-border-light" />
                </div>
              </li>
            ))}
          </ul>

          {/* Read More CTA */}
          <div className="mt-2">
            <Link
              href="/about"
              className="inline-block font-poppins text-sm font-semibold uppercase
                tracking-widest px-8 py-3 rounded border border-text-dark text-text-dark
                hover:border-accent hover:text-accent transition-all duration-300"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
