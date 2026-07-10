"use client";

import SafeImage from "@/components/shared/SafeImage";

const FEATURES = [
  {
    icon:  "👩‍🎨",
    title: "Expert Professionals",
    desc:  "Our certified stylists bring years of expertise and genuine passion to every single appointment.",
  },
  {
    icon:  "🌿",
    title: "Premium Products",
    desc:  "We use only top-tier, skin-safe products sourced from trusted international beauty brands.",
  },
  {
    icon:  "💬",
    title: "Personalized Consultation",
    desc:  "Every client receives a tailored one-on-one consultation to achieve their unique vision.",
  },
  {
    icon:  "🛡️",
    title: "Hygiene & Comfort",
    desc:  "We maintain the highest hygiene standards so you always feel safe, relaxed and comfortable.",
  },
  {
    icon:  "⚡",
    title: "Modern Techniques",
    desc:  "Our team constantly upskills with ongoing training in the very latest beauty techniques.",
  },
  {
    icon:  "⭐",
    title: "Client Satisfaction",
    desc:  "Your happiness is our absolute priority — we do not stop until you love your look.",
  },
];

export default function WhyChooseNovaTress() {
  return (
    <section className="bg-white py-24 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ── Left: overlapping image collage ── */}
        <div className="relative flex-shrink-0 h-[540px] hidden lg:block">

          {/* Primary image — fills most of the left column */}
          <div className="absolute top-0 left-0 w-[88%] h-[480px] rounded-2xl overflow-hidden
                          shadow-[0_12px_48px_rgba(34,34,34,0.18)]">
            <SafeImage
              src="/images/home/About(1).jpg"
              alt="NovaTress Salon Interior"
              containerClassName="w-full h-full"
              imageClassName="w-full h-full object-cover"
              fallbackText="Salon Interior"
            />
          </div>

          {/*
            Secondary image — overlaps primary at bottom-right corner.
            Positioned right-0 bottom-0 so it sits on top of primary's corner.
          */}
          <div className="absolute bottom-0 right-0 w-[56%] h-[280px] rounded-2xl overflow-hidden
                          ring-4 ring-white
                          shadow-[0_16px_56px_rgba(34,34,34,0.30)]
                          z-10">
            <SafeImage
              src="/images/home/about(2)2502ee8f5c459a5697fb53d071683e95.jpg"
              alt="NovaTress Beauty Services"
              containerClassName="w-full h-full"
              imageClassName="w-full h-full object-cover object-center"
              fallbackText="Beauty Services"
            />
          </div>

          {/* Gold accent dot cluster — decorative */}
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full
                          opacity-20 z-0"
               style={{ backgroundColor: "#C8A96E" }} />
          <div className="absolute -top-4 right-[10%] w-10 h-10 rounded-full
                          opacity-10 z-0"
               style={{ backgroundColor: "#C8A96E" }} />
        </div>

        {/* Mobile: simple stacked images */}
        <div className="lg:hidden flex flex-col gap-4">
          <div className="w-full h-[260px] rounded-2xl overflow-hidden shadow-lg">
            <SafeImage
              src="/images/home/About(1).jpg"
              alt="NovaTress Salon Interior"
              containerClassName="w-full h-full"
              imageClassName="w-full h-full object-cover"
              fallbackText="Salon Interior"
            />
          </div>
          <div className="w-full h-[200px] rounded-2xl overflow-hidden shadow-lg">
            <SafeImage
              src="/images/home/about(2)2502ee8f5c459a5697fb53d071683e95.jpg"
              alt="NovaTress Beauty Services"
              containerClassName="w-full h-full"
              imageClassName="w-full h-full object-cover"
              fallbackText="Beauty Services"
            />
          </div>
        </div>

        {/* ── Right: copy + features ── */}
        <div>
          <p className="font-poppins text-[11px] font-semibold tracking-[0.35em] uppercase
                        text-[#888888] mb-4">
            Why Choose Us
          </p>
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-[#222222]
                         leading-tight mb-5">
            Why Choose{" "}
            <span style={{ color: "#C8A96E" }}>NovaTress</span>
          </h2>
          <p className="font-poppins text-sm text-[#888888] leading-relaxed mb-10 max-w-md">
            We combine luxury, expertise and genuine care to deliver an unparalleled beauty
            experience that leaves you feeling confident, radiant and truly seen.
          </p>

          {/* 2-col feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            {FEATURES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="group flex flex-col gap-2 hover:-translate-y-0.5 transition-transform duration-300"
              >
                {/* Icon box */}
                <div className="w-12 h-12 bg-[#222222] rounded-xl flex items-center justify-center
                                text-xl flex-shrink-0
                                group-hover:bg-[#C8A96E] transition-colors duration-300">
                  <span role="img" aria-label={title}>{icon}</span>
                </div>
                <h3 className="font-poppins font-bold text-sm text-[#222222]
                               group-hover:text-[#C8A96E] transition-colors duration-300">
                  {title}
                </h3>
                <p className="font-poppins text-xs text-[#888888] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
