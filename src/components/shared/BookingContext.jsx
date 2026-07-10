"use client";

/**
 * BookingContext.jsx
 * Provides openBookingModal / closeBookingModal to the whole tree.
 * Wrap the app in <BookingProvider> inside layout.jsx.
 *
 * openBookingModal(service?) — pass a service name string to pre-select
 * it in the booking form dropdown. Omit or pass "" for no pre-selection.
 */

import { createContext, useContext, useState, useCallback } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [isOpen,             setIsOpen]             = useState(false);
  const [preSelectedService, setPreSelectedService] = useState("");

  const openBookingModal = useCallback((service = "") => {
    setPreSelectedService(service || "");
    setIsOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsOpen(false);
    /* Reset pre-selection after modal closes */
    setPreSelectedService("");
  }, []);

  return (
    <BookingContext.Provider value={{ isOpen, openBookingModal, closeBookingModal, preSelectedService }}>
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
