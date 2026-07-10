"use client";

/**
 * BookNowButton.jsx
 * Drop-in replacement for any "Book Now" / "Book Appointment" link.
 * Click opens the global BookingModal via context.
 *
 * Props:
 *   children      — button label (default "Book Now")
 *   className     — Tailwind classes (completely overrides default styling)
 *   variant       — "dark" | "outline" | "gold" (preset styles, ignored if className given)
 */

import { useBooking } from "./BookingContext";

const VARIANTS = {
  dark: `
    font-poppins text-sm font-semibold uppercase tracking-widest
    px-6 py-2.5 rounded
    bg-accent text-primary-dark border border-accent
    hover:bg-white hover:text-primary-dark
    transition-all duration-300
  `,
  outline: `
    font-poppins text-sm font-semibold uppercase tracking-widest
    px-8 py-3.5 rounded
    border border-white/30 text-white
    hover:border-accent hover:text-accent
    transition-all duration-300
  `,
  gold: `
    font-poppins text-sm font-semibold uppercase tracking-widest
    px-8 py-3.5 rounded
    bg-accent text-primary-dark
    hover:bg-white hover:text-primary-dark
    transition-all duration-300
  `,
  service: `
    block w-full py-2.5 rounded-xl text-center
    font-poppins text-sm font-semibold uppercase tracking-widest
    bg-[#222222] text-white border-2 border-[#222222]
    group-hover:bg-transparent group-hover:text-[#C8A96E]
    group-hover:border-[#C8A96E]
    transition-all duration-300
  `,
};

export default function BookNowButton({
  children = "Book Now",
  className,
  variant  = "dark",
  service  = "",        /* pass service name to pre-select in booking form */
  ...rest
}) {
  const { openBookingModal } = useBooking();

  return (
    <button
      type="button"
      onClick={() => openBookingModal(service)}
      className={className ?? VARIANTS[variant] ?? VARIANTS.dark}
      {...rest}
    >
      {children}
    </button>
  );
}
