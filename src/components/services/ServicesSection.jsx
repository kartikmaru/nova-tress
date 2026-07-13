"use client";

/**
 * ServicesSection.jsx
 * ─────────────────────────────────────────────────────────────────
 * Mobile:
 *   • Services   → single-card carousel (swipe + dots)
 *   • Contact    → single-card carousel (swipe + dots)
 * Desktop: unchanged 3-col grid for both.
 * ─────────────────────────────────────────────────────────────────
 */

import SafeImage from "@/components/shared/SafeImage";
import BookNowButton from "@/components/shared/BookNowButton";
import MobileCarousel from "@/components/shared/MobileCarousel";
import { SERVICES } from "@/data/servicesData";

/* ─── Contact strip data ──────────────────────────────────────── */
const CONTACT_ITEMS = [
  {
    icon:  "📍",
    title: "Our Location",
    lines: ["123 Elegance Avenue", "Beauty District, BD 10001"],
  },
  {
    icon:  "📞",
    title: "Get In Touch",
    lines: ["+1 (555) 123-4567", "hello@novatress.com"],
  },
  {
    icon:  "🕐",
    title: "Working Hours",
    lines: ["Mon – Sat: 9 AM – 7 PM", "Sunday: Closed"],
  },
];

/* ─── Desktop service card ────────────────────────────────────── */
function ServiceCard({ service }) {
  return (
    <div className="
      group relative rounded-2xl overflow-hidden bg-white
      border border-[#E0E0E0]
      hover:border-[#C8A96E]
      hover:-translate-y-2
      hover:shadow-[0_16px_48px_rgba(200,169,110,0.20)]
      transition-all duration-500 ease-out
      flex flex-col
    ">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
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
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:animate-shine"
          style={{
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
            zIndex: 10,
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3 className="font-playfair font-bold text-lg text-[#222222] leading-snug group-hover:text-[#C8A96E] transition-colors duration-300">
          {service.title}
        </h3>
        <div className="h-[2px] rounded-full bg-[#E0E0E0] group-hover:bg-[#C8A96E] w-8 group-hover:w-14 transition-all duration-500" />
        <p className="font-poppins text-sm text-[#888888] leading-relaxed flex-1">
          {service.desc}
        </p>
        <BookNowButton
          variant="service"
          service={service.title}
          className="
            mt-2 block w-full py-2.5 rounded-xl text-center
            font-poppins text-sm font-semibold uppercase tracking-widest
            bg-[#222222] text-white border-2 border-[#222222]
            group-hover:bg-transparent group-hover:text-[#C8A96E]
            group-hover:border-[#C8A96E]
            transition-all duration-300
          "
        />
      </div>
    </div>
  );
}

/* ─── Mobile service card (carousel slide) ───────────────────── */
function ServiceCardMobile({ service }) {
  return (
    <div className="
      group relative rounded-2xl overflow-hidden bg-white
      border border-[#E0E0E0] flex flex-col mx-2
      shadow-[0_4px_20px_rgba(0,0,0,0.07)]
    ">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <SafeImage
          src={service.img}
          alt={service.title}
          containerClassName="w-full h-full"
          imageClassName="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700"
          fallbackText={service.fallback}
        />
      </div>

      <div className="flex flex-col p-5 gap-3">
        <h3 className="font-playfair font-bold text-lg text-[#222222] leading-snug">
          {service.title}
        </h3>
        <div className="h-[2px] w-8 rounded-full bg-[#C8A96E]" />
        <p className="font-poppins text-sm text-[#888888] leading-relaxed">
          {service.desc}
        </p>
        <BookNowButton
          variant="service"
          service={service.title}
          className="
            mt-1 block w-full py-2.5 rounded-xl text-center
            font-poppins text-sm font-semibold uppercase tracking-widest
            bg-[#222222] text-white border-2 border-[#222222]
            transition-all duration-300
          "
        />
      </div>
    </div>
  );
}

/* ─── Desktop contact card ────────────────────────────────────── */
function ContactCard({ item }) {
  return (
    <div className="
      flex flex-col items-center text-center gap-4 px-6 py-8
      bg-white rounded-2xl border border-[#E0E0E0]
      hover:border-[#C8A96E] hover:shadow-lg
      transition-all duration-300
    ">
      <div className="w-14 h-14 rounded-xl bg-[#222222] flex items-center justify-center text-2xl flex-shrink-0">
        <span role="img" aria-label={item.title}>{item.icon}</span>
      </div>
      <h3 className="font-playfair font-bold text-lg text-[#222222]">{item.title}</h3>
      <div className="w-8 h-[2px] rounded-full bg-[#C8A96E]" />
      <div className="flex flex-col gap-1">
        {item.lines.map((line, i) => (
          <p key={i} className="font-poppins text-sm text-[#888888] leading-relaxed">{line}</p>
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile contact card (carousel slide) ───────────────────── */
function ContactCardMobile({ item }) {
  return (
    <div className="
      flex flex-col items-center text-center gap-4
      px-6 py-8 bg-white rounded-2xl border border-[#E0E0E0] mx-2
      shadow-[0_4px_20px_rgba(0,0,0,0.07)]
    ">
      <div className="w-14 h-14 rounded-2xl bg-[#222222] flex items-center justify-center text-2xl flex-shrink-0">
        <span role="img" aria-label={item.title}>{item.icon}</span>
      </div>
      <h3 className="font-playfair font-bold text-xl text-[#222222]">{item.title}</h3>
      <div className="w-8 h-[2px] rounded-full bg-[#C8A96E]" />
      <div className="flex flex-col gap-1">
        {item.lines.map((line, i) => (
          <p key={i} className="font-poppins text-sm text-[#666666] leading-relaxed">{line}</p>
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
          <p className="font-poppins text-[11px] font-semibold tracking-[0.4em] uppercase text-[#888888] mb-5">
            Premium Beauty Care
          </p>
          <h1 className="font-playfair font-bold text-5xl sm:text-6xl lg:text-7xl text-[#222222] leading-[1.05] mb-5">
            Our <span style={{ color: "#C8A96E" }}>Services</span>
          </h1>
          <div className="w-16 h-[2px] mx-auto mb-6" style={{ backgroundColor: "#C8A96E" }} />
          <p className="font-poppins text-base sm:text-lg text-[#888888] leading-relaxed max-w-xl mx-auto">
            Luxury salon services designed especially for women.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. SERVICES
          Mobile:  single-card carousel, swipe + dots
          Desktop: 3-col grid (unchanged)
      ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-[1200px] mx-auto">

          {/* Mobile carousel */}
          <div className="sm:hidden">
            <MobileCarousel
              items={SERVICES}
              dotDark={true}
              renderItem={(service) => <ServiceCardMobile service={service} />}
            />
          </div>

          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. VISIT OR CONTACT
          Mobile:  single-card carousel, swipe + dots
          Desktop: 3-col grid (unchanged)
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F5F5] py-12 sm:py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-[1200px] mx-auto">

          <div className="text-center mb-8 sm:mb-12">
            <p className="font-poppins text-[11px] font-semibold tracking-[0.4em] uppercase text-[#888888] mb-3">
              We Are Here For You
            </p>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-[#222222]">
              Visit or Contact <span style={{ color: "#C8A96E" }}>NovaTress</span>
            </h2>
          </div>

          {/* Mobile carousel */}
          <div className="sm:hidden">
            <MobileCarousel
              items={CONTACT_ITEMS}
              dotDark={true}
              renderItem={(item) => <ContactCardMobile item={item} />}
            />
          </div>

          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-6">
            {CONTACT_ITEMS.map((item) => (
              <ContactCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
