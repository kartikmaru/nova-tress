"use client";

import Link from "next/link";

export default function AboutHero() {
  return (
    <section
      className="relative w-full"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Background image — object-cover + center center ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="images\about\about_hero.jpg"
          alt="NovaTress Salon Interior"
          onError={(e) => { e.target.style.display = "none"; }}
          className="w-full h-full object-cover"
          style={{ objectPosition: "50% 50%" }}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* ── Dark overlay ── */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(34,34,34,0.76)" }}
      />

      {/* ── Bottom gradient ── */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#222222] to-transparent" />

      {/* ── Content ── */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center
                   px-6 lg:px-20 py-32"
        style={{ minHeight: "100svh" }}
      >
        <p className="font-poppins text-[11px] font-semibold tracking-[0.4em] uppercase
                      text-[#C8A96E] mb-6">
          About NovaTress
        </p>

        <h1 className="font-playfair font-bold text-5xl sm:text-6xl lg:text-7xl text-white
                       leading-[1.06] mb-6 max-w-4xl">
          About <span style={{ color: "#C8A96E" }}>NovaTress</span>
        </h1>

        <div className="w-16 h-[2px] mb-7" style={{ backgroundColor: "#C8A96E" }} />

        <p className="font-playfair italic text-xl sm:text-2xl text-white/85 mb-6 max-w-2xl">
          Where beauty, confidence and elegance come together.
        </p>

        <p className="font-poppins text-sm sm:text-base text-white/65 leading-relaxed
                      max-w-2xl mb-12">
          NovaTress is more than just a salon — it&apos;s a sanctuary where women discover
          their inner and outer beauty. From luxurious hair treatments to flawless bridal
          makeup, our expert team delivers exceptional service with passion and precision.
          Our academy also nurtures the next generation of beauty professionals, combining
          artistry with world-class training.
        </p>

        <Link
          href="/services"
          className="inline-block font-poppins font-semibold text-sm tracking-widest uppercase
                     px-9 py-4 rounded-full border-2 border-[#C8A96E] text-[#C8A96E]
                     hover:bg-[#C8A96E] hover:text-[#222222]
                     transition-all duration-300 shadow-lg"
        >
          Explore Our Services
        </Link>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2
                        flex flex-col items-center gap-2 opacity-40">
          <span className="font-poppins text-[10px] uppercase tracking-widest text-white">
            Scroll
          </span>
          <div className="w-px h-10 bg-white/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
