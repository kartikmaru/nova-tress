"use client";

/**
 * OurProfessionals.jsx
 * Staff cards: grayscale image default → colour + shine on hover.
 * Card lifts with shadow on hover.
 */

import SafeImage from "@/components/shared/SafeImage";
import { STAFF } from "@/data/professionalsData";

/* ─── Single staff card ─────────────────────────────────────────── */
function StaffCard({ person }) {
  return (
    /*
      group on the outer card enables all group-hover: variants inside.
      overflow-hidden on the photo wrapper clips the shine to the photo area.
    */
    <div
      className="
        group flex flex-col bg-white rounded-2xl overflow-hidden
        border border-border-light
        hover:-translate-y-2
        hover:shadow-[0_16px_48px_rgba(34,34,34,0.14)]
        transition-all duration-400
      "
    >
      {/* ── Photo area — 3:4 aspect ── */}
      <div
        className="relative w-full flex-shrink-0 overflow-hidden bg-secondary-dark"
        style={{ aspectRatio: "3/4" }}
      >
        {/* Image — grayscale default, colour on hover */}
        <SafeImage
          src={person.img}
          alt={person.name}
          containerClassName="absolute inset-0 w-full h-full"
          imageClassName="
            w-full h-full object-cover object-top
            grayscale group-hover:grayscale-0
            scale-100 group-hover:scale-105
            transition-all duration-700 ease-out
          "
          fallbackText={person.fallback}
        />

        {/* ── Mirror shine overlay ──
            Sweeps once across the photo when the card is hovered.
            z-10 → above image, below role pill (z-20).               */}
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

        {/* Role pill — pinned to photo bottom, z-20 above shine */}
        <div
          className="absolute bottom-0 inset-x-0 px-4 py-3 z-20
            bg-gradient-to-t from-primary-dark/85 to-transparent"
        >
          <p className="font-poppins text-[11px] font-semibold uppercase
            tracking-widest text-accent">
            {person.role}
          </p>
        </div>
      </div>

      {/* ── Text copy ── */}
      <div className="px-5 py-5 flex flex-col gap-3">
        <h3 className="font-playfair font-bold text-xl text-text-dark leading-snug
          group-hover:text-accent transition-colors duration-300">
          {person.name}
        </h3>

        <p className="font-poppins text-sm text-text-light leading-relaxed">
          {person.desc}
        </p>

        <div className="h-px bg-border-light" />

        <div className="flex items-start gap-2">
          <span className="font-poppins text-[11px] font-semibold uppercase
            tracking-widest text-accent flex-shrink-0 mt-[1px]">
            Expert In:
          </span>
          <span className="font-poppins text-xs text-text-light leading-relaxed">
            {person.expertIn}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── OurProfessionals section ─────────────────────────────────── */
export default function OurProfessionals() {
  return (
    <section className="bg-white py-24 px-6 lg:px-20">
      <div className="max-w-[1200px] mx-auto">

        <div className="text-center mb-14">
          <p className="font-poppins text-[11px] font-semibold tracking-[0.35em]
            uppercase text-text-light mb-4">
            Our Professionals
          </p>
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-text-dark leading-tight">
            Meet Our{" "}
            <span className="text-accent">Beauty Experts</span>
          </h2>
          <div className="w-14 h-[2px] bg-accent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {STAFF.map((person) => (
            <StaffCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
