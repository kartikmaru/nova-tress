"use client";

/**
 * ServicesSection.jsx
 * ─────────────────────────────────────────────────────────────────
 * Services page — full redesign.
 * Sections:
 *   1. Hero header
 *   2. Services card grid  (3-col desktop / 2-col tablet / 1-col mobile)
 *   3. Contact info strip  (3-col desktop / stacked mobile)
 *
 * Mirror shine effect: group-hover triggers animate-shine on an
 * absolutely-positioned diagonal gradient overlay inside each card.
 * Defined in tailwind.config.js → keyframes.shine / animation.shine
 * ─────────────────────────────────────────────────────────────────
 */

import SafeImage from "@/components/shared/SafeImage";
import BookNowButton from "@/components/shared/BookNowButton";
import { SERVICES } from "@/data/servicesData";

/* ─── Contact strip data ──────────────────────────────────────── */
const CONTACT_ITEMS = [
  {
    icon: "📍",
    title: "Our Location",
    lines: ["123 Elegance Avenue", "Beauty District, BD 10001"],
  },
  {
    icon: "📞",
    title: "Get In Touch",
    lines: ["+1 (555) 123-4567", "hello@novatress.com"],
  },
  {
    icon: "🕐",
    title: "Working Hours",
    lines: ["Mon – Sat: 9 AM – 7 PM", "Sunday: Closed"],
  },
];

/* ─── Single service card ─────────────────────────────────────── */
function ServiceCard({ service }) {
  return (
    /*
      group: enables all group-hover variants on children.
      Default state: grayscale image, white bg, dark border.
      Hover state   : colored image, lifted, accent border, shine runs.
    */
    <div className="
      group relative rounded-2xl overflow-hidden bg-white
      border border-[#E0E0E0]
      hover:border-[#C8A96E]
      hover:-translate-y-2
      hover:shadow-[0_16px_48px_rgba(200,169,110,0.20)]
      transition-all duration-500 ease-out
      flex flex-col
    ">

      {/* ── Image area ── */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>

        {/* Image — grayscale by default, color on hover */}
        <SafeImage
          src={service.img}
          alt={service.title}
          containerClassName="w-full h-full"
          imageClassName="
            w-full h-full object-cover
            grayscale group-hover:grayscale-0
            scale-100 group-hover:scale-105
            transition-all duration-700 ease-out
          "
          fallbackText={service.fallback}
        />

        {/*
          ── Mirror shine overlay ──────────────────────────────────
          A narrow diagonal white-to-transparent gradient strip.
          Sits on top of the image, invisible by default (opacity-0,
          translated far left).
          On group-hover: animate-shine runs once — sweeps left→right
          like a glass reflection.
          pointer-events-none so it never blocks image interactions.
        */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0 pointer-events-none
            opacity-0 group-hover:opacity-100
            group-hover:animate-shine
          "
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
            zIndex: 10,
          }}
        />

        {/* Subtle bottom gradient for text legibility */}
        <div className="
          absolute inset-x-0 bottom-0 h-16 pointer-events-none
          bg-gradient-to-t from-black/20 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        "/>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-6 gap-3">

        {/* Title */}
        <h3 className="
          font-playfair font-bold text-lg text-[#222222] leading-snug
          group-hover:text-[#C8A96E] transition-colors duration-300
        ">
          {service.title}
        </h3>

        {/* Thin accent divider — expands on hover */}
        <div className="
          h-[2px] rounded-full bg-[#E0E0E0]
          group-hover:bg-[#C8A96E]
          transition-colors duration-400
          w-8 group-hover:w-14
          transition-all duration-500
        "/>

        {/* Description */}
        <p className="
          font-poppins text-sm text-[#888888] leading-relaxed flex-1
        ">
          {service.desc}
        </p>

        {/* Book Now — opens booking modal with this service pre-selected */}
        <BookNowButton variant="service" service={service.title} className="
          mt-2 block w-full py-2.5 rounded-xl text-center
          font-poppins text-sm font-semibold uppercase tracking-widest
          bg-[#222222] text-white border-2 border-[#222222]
          group-hover:bg-transparent group-hover:text-[#C8A96E]
          group-hover:border-[#C8A96E]
          transition-all duration-300
        " />
      </div>
    </div>
  );
}

/* ─── Contact strip card ─────────────────────────────────────── */
function ContactCard({ item }) {
  return (
    <div className="
      flex flex-col items-center text-center gap-4 px-6 py-8
      bg-white rounded-2xl border border-[#E0E0E0]
      hover:border-[#C8A96E] hover:shadow-lg
      transition-all duration-300
    ">
      {/* Icon in dark box */}
      <div className="
        w-14 h-14 rounded-xl bg-[#222222] flex items-center justify-center
        text-2xl flex-shrink-0
        group-hover:bg-[#C8A96E] transition-colors duration-300
      ">
        <span role="img" aria-label={item.title}>{item.icon}</span>
      </div>

      {/* Title */}
      <h3 className="font-playfair font-bold text-lg text-[#222222]">
        {item.title}
      </h3>

      {/* Gold divider */}
      <div className="w-8 h-[2px] rounded-full bg-[#C8A96E]" />

      {/* Lines */}
      <div className="flex flex-col gap-1">
        {item.lines.map((line, i) => (
          <p key={i} className="font-poppins text-sm text-[#888888] leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ─── ServicesSection ────────────────────────────────────────── */
export default function ServicesSection() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO HEADER
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F5F5] pt-20 pb-16 px-6 lg:px-20 text-center">
        <div className="max-w-[1200px] mx-auto">

          {/* Tag */}
          <p className="
            font-poppins text-[11px] font-semibold tracking-[0.4em] uppercase
            text-[#888888] mb-5
          ">
            Premium Beauty Care
          </p>

          {/* Heading */}
          <h1 className="
            font-playfair font-bold text-5xl sm:text-6xl lg:text-7xl
            text-[#222222] leading-[1.05] mb-5
          ">
            Our <span style={{ color: "#C8A96E" }}>Services</span>
          </h1>

          {/* Gold divider */}
          <div className="w-16 h-[2px] mx-auto mb-6" style={{ backgroundColor: "#C8A96E" }} />

          {/* Subtitle */}
          <p className="
            font-poppins text-base sm:text-lg text-[#888888]
            leading-relaxed max-w-xl mx-auto
          ">
            Luxury salon services designed especially for women.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. SERVICES GRID
      ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 px-6 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. CONTACT INFO STRIP
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F5F5] py-16 px-6 lg:px-20">
        <div className="max-w-[1200px] mx-auto">

          {/* Strip heading */}
          <div className="text-center mb-12">
            <p className="
              font-poppins text-[11px] font-semibold tracking-[0.4em] uppercase
              text-[#888888] mb-3
            ">
              We Are Here For You
            </p>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-[#222222]">
              Visit or Contact <span style={{ color: "#C8A96E" }}>NovaTress</span>
            </h2>
          </div>

          {/* 3-col desktop / stacked mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CONTACT_ITEMS.map((item) => (
              <ContactCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
