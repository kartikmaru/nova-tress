"use client";

/**
 * ContactSection.jsx
 * Orchestrates the full Contact page in order:
 *   1. ContactForm       — message form + left-side info
 *   2. ContactInfoCards  — 3 premium info cards
 *   3. MapSearch         — Google Maps iframe with search
 */

import ContactForm      from "./ContactForm";
import ContactInfoCards from "./ContactInfoCards";
import MapSearch        from "./MapSearch";

export default function ContactSection() {
  return (
    <>
      <ContactForm />
      <ContactInfoCards />
      <MapSearch />
    </>
  );
}
