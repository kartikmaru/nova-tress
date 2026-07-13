"use client";

import { useState } from "react";
import Link from "next/link";

const QUICK_LINKS = [
  { href: "/",         label: "Home"     },
  { href: "/about",    label: "About"    },
  { href: "/services", label: "Services" },
  { href: "/gallery",  label: "Gallery"  },
  { href: "/contact",  label: "Contact"  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <footer className="bg-primary-dark border-t border-secondary-dark">

      {/* ── Mobile toggle button — only visible on mobile ── */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-secondary-dark">
        <span className="font-playfair font-bold text-lg text-white">
          <span className="text-accent">✦</span> NovaTress
        </span>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close footer" : "Open footer"}
          aria-expanded={mobileOpen}
          className="
            btn-base btn-press
            w-9 h-9 flex items-center justify-center rounded-full
            border border-secondary-dark text-text-light
            hover:border-accent hover:text-accent hover:bg-accent/10
            hover:shadow-[0_2px_10px_rgba(200,169,110,0.20)]
            transition-all duration-300
          "
        >
          {mobileOpen ? (
            /* × close icon */
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            /* + open icon */
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14"/>
            </svg>
          )}
        </button>
      </div>

      {/* ── Main 3-column grid ──
          Mobile: hidden by default, revealed when mobileOpen = true
          Desktop (md+): always visible, standard 3-col layout          ── */}
      <div
        className={`
          max-w-[1400px] mx-auto px-6 lg:px-12 py-14
          grid grid-cols-1 md:grid-cols-3 gap-10
          md:!grid
          ${mobileOpen ? "grid" : "hidden"}
        `}
      >
        {/* Column 1 — Brand */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="font-playfair font-bold text-2xl text-white hover:text-accent transition-colors duration-300"
          >
            <span className="text-accent">✦</span> NovaTress
          </Link>
          <p className="font-poppins text-sm text-text-light leading-relaxed max-w-xs">
            Where elegance meets artistry. Premium beauty experiences crafted
            exclusively for you.
          </p>
          {/* Social row placeholder */}
          <div className="flex gap-4 mt-2">
            {["IG", "FB", "TW"].map((s) => (
              <span
                key={s}
                className="
                  w-9 h-9 flex items-center justify-center rounded
                  border border-secondary-dark
                  font-poppins text-xs font-semibold text-text-light
                  hover:border-accent hover:text-accent
                  transition-all duration-300 cursor-pointer
                "
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-playfair font-semibold text-lg text-white tracking-wide">
            Quick Links
          </h3>
          {/* Gold divider */}
          <div className="w-10 h-[2px] bg-accent" />
          <ul className="flex flex-col gap-2">
            {QUICK_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="
                    font-poppins text-sm text-text-light
                    hover:text-accent hover:pl-1
                    transition-all duration-300
                    inline-flex items-center gap-2
                  "
                >
                  <span className="text-accent/40 text-xs">›</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact Info */}
        <div className="flex flex-col gap-4">
          <h3 className="font-playfair font-semibold text-lg text-white tracking-wide">
            Contact Us
          </h3>
          <div className="w-10 h-[2px] bg-accent" />
          <ul className="flex flex-col gap-3 font-poppins text-sm text-text-light">
            <li className="flex items-start gap-3">
              <span className="text-accent mt-0.5">📍</span>
              <span>123 Elegance Avenue,<br />Beauty District, BD 10001</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-accent">📞</span>
              <a href="tel:+15551234567" className="hover:text-accent transition-colors duration-300">
                +1 (555) 123-4567
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-accent">✉️</span>
              <a href="mailto:hello@novatress.com" className="hover:text-accent transition-colors duration-300">
                hello@novatress.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-0.5">🕐</span>
              <span>Mon–Sat: 9 AM – 7 PM<br />Sunday: Closed</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar — always visible ── */}
      <div className="border-t border-secondary-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-poppins text-xs text-text-light">
            &copy; {year} NovaTress. All rights reserved.
          </p>
          <p className="font-poppins text-xs text-text-light">
            Crafted with{" "}
            <span className="text-accent">✦</span>
            {" "}for luxury experiences.
          </p>
        </div>
      </div>
    </footer>
  );
}
