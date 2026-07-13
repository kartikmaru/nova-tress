"use client";

/**
 * GallerySection.jsx
 * ─────────────────────────────────────────────────────────────────
 * Gallery folder: client/public/images/gallery/
 * Code path:      /images/gallery/<filename>   (never /public prefix)
 *
 * 21 confirmed images:
 *   image1.jpg  image2.jpg  image3.jpg  image4.jpg  image5.jpg
 *   image6.jpg  image7.jpg  image8.jpg  image9.jpg  image10.jpg
 *   image11..jpg (double-dot — exact filename preserved)
 *   image11.jpg  image12.jpg  image134.jpg  image14.jpg
 *   image15.jpg  image16.jpg  image17.jpg  image18.jpg
 *   image19.jpg  image20.jpg
 *
 * Layout: CSS Grid with a fixed span-pattern (no Math.random).
 * Desktop 4-col / tablet 2-col / mobile 1-col.
 * Each tile: grayscale → colour + zoom + mirror-shine on hover.
 * ─────────────────────────────────────────────────────────────────
 */

import SafeImage from "@/components/shared/SafeImage";
import BookNowButton from "@/components/shared/BookNowButton";
import { GALLERY_IMAGES, GALLERY_SPAN_PATTERN } from "@/data/galleryData";

/* ── Alias to match component variable names ── */
const IMAGES  = GALLERY_IMAGES;
const PATTERN = GALLERY_SPAN_PATTERN;
const COL_SPAN = { 1: "", 2: "md:col-span-2" };
const ROW_SPAN = { 1: "", 2: "md:row-span-2" };


/* ── Single tile ─────────────────────────────────────────────────── */
function GalleryTile({ image, pattern }) {
  const colClass = COL_SPAN[pattern.col] || "";
  const rowClass = ROW_SPAN[pattern.row] || "";

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl shadow-md
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.30)]
        transition-shadow duration-400
        cursor-pointer
        ${colClass} ${rowClass}
        ${pattern.h}
        md:h-auto
      `}
    >
      {/* ── Image — grayscale → colour + zoom ── */}
      <SafeImage
        src={image.src}
        alt={image.alt}
        containerClassName="absolute inset-0 w-full h-full"
        imageClassName="
          w-full h-full object-cover
          grayscale group-hover:grayscale-0
          scale-100 group-hover:scale-110
          transition-all duration-700 ease-out
        "
        fallbackText={image.fallback}
      />

      {/* ── Mirror shine sweep ── */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 z-10 pointer-events-none
          opacity-0 group-hover:opacity-100
          group-hover:animate-shine
        "
        style={{
          background:
            "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.42) 50%, transparent 75%)",
        }}
      />

      {/* ── Caption — slides up from bottom on hover ── */}
      <div
        className="
          absolute inset-x-0 bottom-0 z-20 px-4 py-3
          translate-y-full group-hover:translate-y-0
          transition-transform duration-400 ease-out
        "
        style={{
          background:
            "linear-gradient(to top, rgba(34,34,34,0.82) 0%, transparent 100%)",
        }}
      >
        <p className="font-poppins text-[11px] font-medium uppercase tracking-widest
                      text-white/80 truncate">
          {image.alt}
        </p>
      </div>
    </div>
  );
}

/* ── GallerySection ──────────────────────────────────────────────── */
export default function GallerySection() {
  return (
    <>
      {/* ══════════════════════════════════════════
          HERO HEADER
      ══════════════════════════════════════════ */}
      <section className="bg-[#F5F5F5] pt-20 pb-14 px-6 lg:px-20 text-center">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-poppins text-[11px] font-semibold tracking-[0.4em] uppercase
                        text-[#888888] mb-5">
            Photo Gallery
          </p>
          <h1 className="font-playfair font-bold text-5xl sm:text-6xl lg:text-7xl
                         text-[#222222] leading-[1.05] mb-5">
            Inside Look at{" "}
            <span style={{ color: "#C8A96E" }}>NovaTress</span>
          </h1>
          <div className="w-16 h-[2px] mx-auto mb-6" style={{ backgroundColor: "#C8A96E" }} />
          <p className="font-poppins text-base sm:text-lg text-[#888888]
                        leading-relaxed max-w-xl mx-auto">
            A curated glimpse into the elegance, artistry and warmth of our salon.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MASONRY GRID
          CSS Grid with fixed span-pattern.
          Mobile: 1-col flex column stack.
          Tablet (sm): 2-col grid.
          Desktop (md+): 4-col grid with col/row spans.
      ══════════════════════════════════════════ */}
      <section className="bg-white py-14 px-6 lg:px-20">
        <div className="max-w-[1400px] mx-auto">

          {/* ── Mobile: clean uniform 2-col grid (< sm) ── */}
          <div className="sm:hidden grid grid-cols-2 gap-3">
            {IMAGES.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-xl shadow-sm
                           cursor-pointer h-[180px]"
              >
                <SafeImage
                  src={image.src}
                  alt={image.alt}
                  containerClassName="absolute inset-0 w-full h-full"
                  imageClassName="w-full h-full object-cover
                    grayscale group-hover:grayscale-0
                    scale-100 group-hover:scale-110
                    transition-all duration-700 ease-out"
                  fallbackText={image.fallback}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 pointer-events-none
                             opacity-0 group-hover:opacity-100 group-hover:animate-shine"
                  style={{ background: "linear-gradient(105deg,transparent 25%,rgba(255,255,255,0.42) 50%,transparent 75%)" }}
                />
                {/* Caption */}
                <div
                  className="absolute inset-x-0 bottom-0 z-20 px-2 py-1.5
                             translate-y-full group-hover:translate-y-0
                             transition-transform duration-400 ease-out"
                  style={{ background: "linear-gradient(to top,rgba(34,34,34,0.82) 0%,transparent 100%)" }}
                >
                  <p className="font-poppins text-[10px] uppercase tracking-widest text-white/80 truncate">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Tablet 2-col (sm – md) ── */}
          <div className="hidden sm:grid md:hidden grid-cols-2 gap-4">
            {IMAGES.map((image, idx) => {
              const p = PATTERN[idx % PATTERN.length];
              return (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden rounded-2xl shadow-md
                              transition-shadow duration-400 cursor-pointer ${p.h}`}
                >
                  <SafeImage
                    src={image.src} alt={image.alt}
                    containerClassName="absolute inset-0 w-full h-full"
                    imageClassName="w-full h-full object-cover
                      grayscale group-hover:grayscale-0
                      scale-100 group-hover:scale-110
                      transition-all duration-700 ease-out"
                    fallbackText={image.fallback}
                  />
                  <div aria-hidden="true" className="
                    absolute inset-0 z-10 pointer-events-none
                    opacity-0 group-hover:opacity-100 group-hover:animate-shine"
                    style={{ background: "linear-gradient(105deg,transparent 25%,rgba(255,255,255,0.42) 50%,transparent 75%)" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 z-20 px-4 py-3
                    translate-y-full group-hover:translate-y-0
                    transition-transform duration-400 ease-out"
                    style={{ background: "linear-gradient(to top,rgba(34,34,34,0.82) 0%,transparent 100%)" }}>
                    <p className="font-poppins text-[11px] uppercase tracking-widest text-white/80 truncate">
                      {image.alt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Desktop 4-col grid with spans (md+) ── */}
          <div className="hidden md:grid grid-cols-4 auto-rows-[180px] gap-4">
            {IMAGES.map((image, idx) => (
              <GalleryTile
                key={image.id}
                image={image}
                pattern={PATTERN[idx % PATTERN.length]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA STRIP
      ══════════════════════════════════════════ */}
      <section className="bg-[#222222] py-16 px-6 lg:px-20 text-center">
        <div className="max-w-[700px] mx-auto flex flex-col items-center gap-5">
          <p className="font-poppins text-[11px] font-semibold tracking-[0.4em] uppercase
                        text-[#C8A96E]">
            Ready for Your Transformation?
          </p>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-white leading-tight">
            Let Us Create Your{" "}
            <span style={{ color: "#C8A96E" }}>Perfect Look</span>
          </h2>
          <div className="w-12 h-[2px] rounded-full" style={{ backgroundColor: "#C8A96E" }} />
          <p className="font-poppins text-sm text-white/60 leading-relaxed max-w-md">
            Every transformation you see here started with a single booking.
            Yours is just one click away.
          </p>
          <BookNowButton
            className="
              font-poppins text-sm font-semibold uppercase tracking-widest
              px-9 py-3.5 rounded-full
              bg-[#C8A96E] text-[#222222] border-2 border-[#C8A96E]
              hover:bg-transparent hover:text-[#C8A96E]
              transition-all duration-300
            "
          >
            Book Your Appointment
          </BookNowButton>
        </div>
      </section>
    </>
  );
}
