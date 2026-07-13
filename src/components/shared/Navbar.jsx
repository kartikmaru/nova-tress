"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BookNowButton from "@/components/shared/BookNowButton";

const NAV_LINKS = [
  { href: "/",         label: "Home"     },
  { href: "/about",    label: "About"    },
  { href: "/services", label: "Services" },
  { href: "/gallery",  label: "Gallery"  },
  { href: "/contact",  label: "Contact"  },
];

export default function Navbar() {
  const pathname   = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  /* Detect scroll to add shadow / bg change */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Body padding so content clears the fixed nav ── */}
      <div className="h-[72px]" aria-hidden="true" />

      {/* ════════════════════════════════════════
          NAVBAR SHELL
      ════════════════════════════════════════ */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 h-[72px]
          bg-primary-dark border-b border-secondary-dark
          transition-all duration-300
          ${scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "shadow-none"}
        `}
      >
        <nav className="h-full px-6 lg:px-12 flex items-center justify-between max-w-[1400px] mx-auto">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="
              font-playfair font-bold text-2xl tracking-wide
              text-white hover:text-accent
              transition-colors duration-300 whitespace-nowrap flex-shrink-0
            "
          >
            <span className="text-accent">✦</span> NovaTress
          </Link>

          {/* ── Desktop Center Nav ── */}
          <ul className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    relative font-poppins text-sm font-medium uppercase tracking-widest
                    transition-colors duration-300 pb-1
                    group
                    ${isActive(href)
                      ? "text-accent"
                      : "text-white/80 hover:text-accent"
                    }
                  `}
                >
                  {/* Active / hover underline */}
                  <span
                    className={`
                      absolute bottom-0 left-0 h-[1.5px] bg-accent
                      transition-all duration-300
                      ${isActive(href) ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                  {/* Active bg pill */}
                  {isActive(href) && (
                    <span className="absolute inset-0 -mx-2 -my-1 rounded bg-accent/5 -z-10" />
                  )}
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:block flex-shrink-0">
            <BookNowButton variant="dark" />
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            className="
              btn-base btn-press
              lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[6px] flex-shrink-0
              rounded-lg hover:bg-white/10 active:bg-white/20
              transition-all duration-200
            "
          >
            {/* Bar 1 */}
            <span
              className={`
                block w-6 h-[2px] bg-white rounded
                transition-all duration-300 origin-center
                ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}
              `}
            />
            {/* Bar 2 */}
            <span
              className={`
                block w-6 h-[2px] bg-white rounded
                transition-all duration-300
                ${menuOpen ? "opacity-0 scale-x-0" : ""}
              `}
            />
            {/* Bar 3 */}
            <span
              className={`
                block w-6 h-[2px] bg-white rounded
                transition-all duration-300 origin-center
                ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}
              `}
            />
          </button>
        </nav>
      </header>

      {/* ════════════════════════════════════════
          MOBILE DROPDOWN — right-aligned slide-down
      ════════════════════════════════════════ */}
      <div
        className={`
          fixed top-[72px] right-0 z-40 lg:hidden
          w-full sm:w-72
          bg-secondary-dark border-l border-b border-secondary-dark
          shadow-2xl
          transition-all duration-300 ease-in-out overflow-hidden
          ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <ul className="flex flex-col py-4 px-6 gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`
                  block py-3 px-4 rounded
                  font-poppins text-sm font-medium uppercase tracking-widest
                  transition-all duration-200
                  ${isActive(href)
                    ? "text-accent bg-accent/10 border-l-2 border-accent"
                    : "text-white/80 hover:text-accent hover:bg-white/5"
                  }
                `}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* Book Now — inside mobile menu */}
          <li className="mt-3 pt-3 border-t border-white/10">
            <BookNowButton
              className="
                btn-base btn-press
                block w-full text-center py-3 px-4 rounded
                font-poppins text-sm font-semibold uppercase tracking-widest
                bg-accent text-primary-dark
                hover:bg-white hover:text-primary-dark
                hover:shadow-[0_4px_16px_rgba(200,169,110,0.30)]
                transition-all duration-300
              "
              onClick={() => setMenuOpen(false)}
            >
              Book Now
            </BookNowButton>
          </li>
        </ul>
      </div>
    </>
  );
}
