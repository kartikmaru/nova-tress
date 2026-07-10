"use client";

import { CONTACT_CARDS } from "@/data/contactInfoData";

const CARDS = CONTACT_CARDS;

export default function ContactInfoCards() {
  return (
    <section className="bg-white py-16 px-6 lg:px-20">
      <div className="max-w-[1200px] mx-auto">

        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="font-poppins text-[11px] font-semibold tracking-[0.4em] uppercase
                        text-[#888888] mb-3">
            We Are Here For You
          </p>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-[#222222]
                         leading-tight">
            Visit or Reach{" "}
            <span style={{ color: "#C8A96E" }}>NovaTress</span>
          </h2>
          <div className="w-12 h-[2px] mx-auto mt-5 rounded-full"
               style={{ backgroundColor: "#C8A96E" }} />
        </div>

        {/* 3-col desktop / 2-col tablet / 1-col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARDS.map(({ icon, title, lines, action }) => (
            <div
              key={title}
              className="
                group flex flex-col items-center text-center gap-5
                bg-[#F9F9F9] rounded-2xl border border-[#E0E0E0] px-7 py-9
                hover:border-[#C8A96E] hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
              "
            >
              {/* Icon box */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center
                           text-2xl flex-shrink-0 transition-all duration-300
                           group-hover:scale-110"
                style={{ backgroundColor: "#222222" }}
              >
                <span role="img" aria-label={title}>{icon}</span>
              </div>

              {/* Title */}
              <h3 className="font-playfair font-bold text-xl text-[#222222]
                             group-hover:text-[#C8A96E] transition-colors duration-300">
                {title}
              </h3>

              {/* Gold divider */}
              <div className="w-8 h-[2px] rounded-full"
                   style={{ backgroundColor: "#C8A96E" }} />

              {/* Lines */}
              <div className="flex flex-col gap-1">
                {lines.map((line, i) =>
                  line === "" ? (
                    <div key={i} className="h-2" />
                  ) : (
                    <p key={i}
                       className="font-poppins text-sm text-[#666666] leading-relaxed">
                      {line}
                    </p>
                  )
                )}
              </div>

              {/* Optional action link */}
              {action && (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-auto font-poppins text-xs font-semibold uppercase tracking-widest
                    text-[#C8A96E] hover:underline transition-all duration-200
                  "
                >
                  {action.label} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
