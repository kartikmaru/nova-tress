"use client";

/**
 * BookNowButton.jsx
 * Drop-in replacement for any "Book Now" / "Book Appointment" link.
 * Click opens the global BookingModal via context.
 *
 * Props:
 *   children  — button label (default "Book Now")
 *   className — Tailwind classes (completely overrides default styling)
 *   variant   — "dark" | "outline" | "gold" | "service"
 *   service   — service name string to pre-select in booking form
 */

import { useBooking } from "./BookingContext";

const VARIANTS = {
  /* Navbar desktop CTA: gold bg → white bg, slight lift + glow */
  dark: `
    font-poppins text-sm font-semibold uppercase tracking-widest
    px-6 py-2.5 rounded
    bg-accent text-primary-dark border border-accent
    hover:bg-white hover:text-primary-dark
    hover:shadow-[0_4px_18px_rgba(200,169,110,0.35)] hover:-translate-y-0.5
    active:scale-95 active:shadow-none
    transition-all duration-300
  `,

  /* Hero outline variant: ghost → gold tint fill */
  outline: `
    font-poppins text-sm font-semibold uppercase tracking-widest
    px-8 py-3.5 rounded
    border border-white/30 text-white
    hover:border-accent hover:text-accent hover:bg-accent/10
    hover:shadow-[0_4px_16px_rgba(200,169,110,0.20)]
    active:scale-95 active:bg-accent/20
    transition-all duration-300
  `,

  /* Hero CTA / Gallery CTA: gold solid → white bg, lift + glow */
  gold: `
    font-poppins text-xs sm:text-sm font-semibold uppercase tracking-widest
    px-5 sm:px-8 py-3 sm:py-3.5 rounded
    bg-accent text-primary-dark
    hover:bg-white hover:text-primary-dark
    hover:shadow-[0_6px_24px_rgba(200,169,110,0.40)] hover:-translate-y-0.5
    active:scale-95 active:shadow-none
    transition-all duration-300
  `,

  /* Service card Book Now: dark solid → transparent gold border */
  service: `
    block w-full py-2.5 rounded-xl text-center
    font-poppins text-sm font-semibold uppercase tracking-widest
    bg-[#222222] text-white border-2 border-[#222222]
    group-hover:bg-transparent group-hover:text-[#C8A96E] group-hover:border-[#C8A96E]
    hover:shadow-[0_4px_16px_rgba(200,169,110,0.25)]
    active:scale-95
    transition-all duration-300
  `,
};

export default function BookNowButton({
  children = "Book Now",
  className,
  variant  = "dark",
  service  = "",
  ...rest
}) {
  const { openBookingModal } = useBooking();

  return (
    <button
      type="button"
      onClick={() => openBookingModal(service)}
      className={`btn-base btn-press ${className ?? VARIANTS[variant] ?? VARIANTS.dark}`}
      {...rest}
    >
      {children}
    </button>
  );
}
