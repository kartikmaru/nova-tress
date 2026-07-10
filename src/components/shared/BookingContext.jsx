"use client";

/**
 * BookingContext.jsx
 * Provides openBookingModal / closeBookingModal to the whole tree.
 * Wrap the app in <BookingProvider> inside layout.jsx.
 */

import { createContext, useContext, useState, useCallback } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBookingModal  = useCallback(() => setIsOpen(true),  []);
  const closeBookingModal = useCallback(() => setIsOpen(false), []);

  return (
    <BookingContext.Provider value={{ isOpen, openBookingModal, closeBookingModal }}>
      {children}
    </BookingContext.Provider>
  );
}

/** useBooking — consume the booking context in any client component */
export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
