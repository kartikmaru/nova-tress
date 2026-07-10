"use client";

import { useState } from "react";
import { FAQS } from "@/data/faqData";

/* ── Single FAQ accordion item ──────────────────────────────────── */
function FAQItem({ faq, index, openIdx, setOpenIdx }) {
  const isOpen = openIdx === index;
  const toggle = () => setOpenIdx(isOpen ? null : index);

  return (
    <div
      className="mb-3 rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background:  "#ffffff",
        border:      isOpen ? "1px solid rgba(200,169,110,0.5)" : "1px solid #E0E0E0",
        boxShadow:   isOpen ? "0 4px 16px rgba(200,169,110,0.10)" : "none",
      }}
    >
      {/* ── Question button ── */}
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-3 px-5 py-4
                   cursor-pointer text-left select-none transition-colors duration-200"
        style={{
          background: isOpen
            ? "linear-gradient(135deg,rgba(200,169,110,0.06) 0%,transparent 100%)"
            : "transparent",
        }}
      >
        {/*
          Left side: number badge + question text.
          min-w-0 on wrapper + truncate on text prevents overflow.
          On sm+ we allow full text via overflow-visible but keep one line
          by not wrapping (question text is short enough at sm sizes).
        */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Number badge */}
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                       font-poppins text-[11px] font-bold transition-all duration-300"
            style={{
              background: isOpen ? "#C8A96E" : "#F5F5F5",
              color:      isOpen ? "#ffffff" : "#888888",
            }}
          >
            {index + 1}
          </span>

          {/* Question text — truncate on xs, nowrap on sm+ */}
          <span
            className="font-poppins font-semibold text-[13px] sm:text-sm
                       truncate sm:overflow-visible sm:whitespace-nowrap
                       transition-colors duration-300 leading-snug"
            style={{ color: isOpen ? "#222222" : "#444444" }}
          >
            {faq.q}
          </span>
        </div>

        {/* Plus / Minus — always visible, never shrinks */}
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center
                     transition-all duration-300 ml-2"
          style={{
            border:     `1px solid ${isOpen ? "#C8A96E" : "#E0E0E0"}`,
            background: isOpen ? "#C8A96E" : "transparent",
            color:      isOpen ? "#ffffff" : "#888888",
          }}
        >
          {isOpen ? (
            /* Minus */
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14"/>
            </svg>
          ) : (
            /* Plus */
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14"/>
            </svg>
          )}
        </span>
      </button>

      {/*
        Answer panel.
        maxHeight animates 0 → 240px on open, 240px → 0 on close.
        opacity animates simultaneously.
        transition-all duration-500 ease-in-out handles both.
      */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? "240px" : "0px",
          opacity:   isOpen ? 1 : 0,
        }}
      >
        <div className="flex px-5 pb-5 pt-1">
          {/* Gold left bar */}
          <div
            className="w-[3px] flex-shrink-0 rounded-full mr-4 self-stretch"
            style={{ background: "#C8A96E" }}
          />
          <p className="font-poppins text-sm text-[#555555] leading-relaxed">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── AboutFAQ section ───────────────────────────────────────────── */
export default function AboutFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-20 px-6 lg:px-20" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-[1200px] mx-auto">

        {/* ── Heading block ── */}
        <div className="text-center mb-12">
          <p className="font-poppins text-[11px] font-semibold tracking-[0.4em] uppercase
                        text-[#888888] mb-4">
            FAQs
          </p>

          {/*
            Heading forced to one line on all screens:
            - tracking-tight reduces letter spacing so it fits narrower containers
            - text-[22px] on xs, scale up at each breakpoint
            - whitespace-nowrap prevents ANY line break
            - overflow-hidden prevents the container itself from expanding weirdly
          */}
          <div className="overflow-hidden">
            <h2
              className="font-playfair font-bold text-[#222222] leading-none
                         whitespace-nowrap tracking-tight
                         text-[22px] xs:text-[26px] sm:text-[34px] md:text-[42px] lg:text-[48px]"
            >
              Most Frequent{" "}
              <span style={{ color: "#C8A96E" }}>Asked Questions</span>
            </h2>
          </div>

          <div className="w-14 h-[2px] mx-auto mt-5 mb-5"
               style={{ backgroundColor: "#C8A96E" }} />

          <p className="font-poppins text-sm text-[#888888] max-w-xl mx-auto leading-relaxed">
            Click any question to reveal the answer.
          </p>
        </div>

        {/* ── 2-col on lg, single col below ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 max-w-5xl mx-auto">
          <div>
            {FAQS.slice(0, 3).map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i}
                       openIdx={openIdx} setOpenIdx={setOpenIdx} />
            ))}
          </div>
          <div>
            {FAQS.slice(3).map((faq, i) => (
              <FAQItem key={i + 3} faq={faq} index={i + 3}
                       openIdx={openIdx} setOpenIdx={setOpenIdx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
