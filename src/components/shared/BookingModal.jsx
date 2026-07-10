"use client";

/**
 * BookingModal.jsx
 * Full-screen modal with appointment booking form.
 * Reads isOpen/closeBookingModal from BookingContext.
 * Closes on: X button, overlay click, Escape key.
 * Locks body scroll while open.
 */

import { useState, useEffect, useCallback } from "react";
import { useBooking } from "./BookingContext";
import { SERVICES_LIST } from "@/data/servicesData";

const INITIAL_FORM = {
  name:    "",
  phone:   "",
  email:   "",
  service: "",
  date:    "",
  time:    "",
  message: "",
};

export default function BookingModal() {
  const { isOpen, closeBookingModal, preSelectedService } = useBooking();

  const [form,    setForm]    = useState(INITIAL_FORM);
  const [errors,  setErrors]  = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  /* ── Pre-select service when modal opens with a service name ── */
  useEffect(() => {
    if (isOpen && preSelectedService) {
      setForm((prev) => ({ ...prev, service: preSelectedService }));
    }
  }, [isOpen, preSelectedService]);

  /* ── Body scroll lock ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* ── Escape key closes modal ── */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = useCallback(() => {
    closeBookingModal();
    setTimeout(() => {
      setForm(INITIAL_FORM);
      setErrors({});
      setSuccess(false);
      setApiError("");
    }, 300);
  }, [closeBookingModal]);

  /* ── Field change ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Full name is required.";
    if (!form.phone.trim())   e.phone   = "Phone number is required.";
    if (!form.email.trim())   e.email   = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.service)        e.service = "Please select a service.";
    if (!form.date)           e.date    = "Preferred date is required.";
    if (!form.time)           e.time    = "Preferred time is required.";
    return e;
  };

  /* ── Submit — calls Next.js API route, API key stays server-side ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setApiError("");

    try {
      const res  = await fetch("/api/send-email", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ formType: "appointment", ...form }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setForm(INITIAL_FORM);
        /* Auto-close after 2.5 s */
        setTimeout(handleClose, 2500);
      } else {
        setApiError(data.message || "Something went wrong. Please try again.");
      }
    } catch (_) {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    /* ── Full-screen overlay ── */
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.72)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Book Your Appointment"
    >
      {/* ── Modal card ── */}
      <div
        className="
          relative w-full max-w-2xl max-h-[92vh] overflow-y-auto
          bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.45)]
          flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header bar ── */}
        <div
          className="flex items-center justify-between px-7 pt-7 pb-5 flex-shrink-0"
          style={{ borderBottom: "1px solid #F0F0F0" }}
        >
          <div>
            <p className="font-poppins text-[11px] font-semibold tracking-[0.35em] uppercase
                          text-[#888888] mb-1">
              NovaTress Salon
            </p>
            <h2 className="font-playfair font-bold text-2xl sm:text-3xl text-[#222222] leading-tight">
              Book Your <span style={{ color: "#C8A96E" }}>Appointment</span>
            </h2>
          </div>

          {/* Close × */}
          <button
            onClick={handleClose}
            aria-label="Close booking modal"
            className="
              w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
              bg-[#F5F5F5] text-[#888888]
              hover:bg-[#222222] hover:text-white
              transition-all duration-200
            "
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-7 py-6 flex-1">

          {/* ── Success state ── */}
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#C8A96E]/10 flex items-center justify-center">
                <svg className="w-8 h-8" style={{ color: "#C8A96E" }} fill="none" stroke="currentColor"
                  strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 className="font-playfair font-bold text-2xl text-[#222222]">
                Appointment Requested!
              </h3>
              <p className="font-poppins text-sm text-[#888888] leading-relaxed max-w-sm">
                Your appointment request has been submitted successfully. We will contact you shortly to confirm.
              </p>
              <div className="w-12 h-[2px] rounded-full" style={{ backgroundColor: "#C8A96E" }} />
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate>
              <p className="font-poppins text-sm text-[#888888] mb-6 leading-relaxed">
                Fill in your details below and we will confirm your booking within 24 hours.
              </p>

              {/* 2-col grid on sm+, 1-col on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* Full Name */}
                <Field label="Full Name" error={errors.name} required>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange} placeholder="Anaya Sharma"
                    className={inputClass(errors.name)}
                  />
                </Field>

                {/* Phone */}
                <Field label="Phone Number" error={errors.phone} required>
                  <input
                    type="tel" name="phone" value={form.phone}
                    onChange={handleChange} placeholder="+91 99999 00000"
                    className={inputClass(errors.phone)}
                  />
                </Field>

                {/* Email — full width */}
                <div className="sm:col-span-2">
                  <Field label="Email Address" error={errors.email} required>
                    <input
                      type="email" name="email" value={form.email}
                      onChange={handleChange} placeholder="you@example.com"
                      className={inputClass(errors.email)}
                    />
                  </Field>
                </div>

                {/* Service */}
                <Field label="Select Service" error={errors.service} required>
                  <select
                    name="service" value={form.service}
                    onChange={handleChange}
                    className={inputClass(errors.service)}
                  >
                    <option value="">— Choose a service —</option>
                    {SERVICES_LIST.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>

                {/* Date */}
                <Field label="Preferred Date" error={errors.date} required>
                  <input
                    type="date" name="date" value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={inputClass(errors.date)}
                  />
                </Field>

                {/* Time */}
                <Field label="Preferred Time" error={errors.time} required>
                  <input
                    type="time" name="time" value={form.time}
                    onChange={handleChange}
                    className={inputClass(errors.time)}
                  />
                </Field>

                {/* Message — full width */}
                <div className="sm:col-span-2">
                  <Field label="Message / Notes" error={null}>
                    <textarea
                      name="message" value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any special requests or notes for our team..."
                      className={`${inputClass(null)} resize-none`}
                    />
                  </Field>
                </div>
              </div>

              {/* API-level error banner */}
              {apiError && (
                <div className="flex items-start gap-3 px-4 py-3 rounded-xl
                                bg-red-50 border border-red-200">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5"
                       fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0
                             001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  </svg>
                  <p className="font-poppins text-sm text-red-600 leading-snug">
                    {apiError}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  mt-2 w-full py-3.5 rounded-xl
                  font-poppins text-sm font-semibold uppercase tracking-widest
                  bg-[#222222] text-white border-2 border-[#222222]
                  hover:bg-transparent hover:text-[#C8A96E] hover:border-[#C8A96E]
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition-all duration-300
                  flex items-center justify-center gap-2
                "
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Sending…
                  </>
                ) : "Confirm Booking"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Reusable field wrapper ── */
function Field({ label, error, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-poppins text-xs font-semibold uppercase tracking-widest text-[#555555]">
        {label}{required && <span className="text-[#C8A96E] ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="font-poppins text-xs text-red-500 leading-tight">{error}</p>
      )}
    </div>
  );
}

/* ── Input base class ── */
function inputClass(error) {
  return `
    w-full px-4 py-2.5 rounded-xl
    font-poppins text-sm text-[#222222]
    bg-[#F9F9F9] border
    ${error ? "border-red-400 focus:ring-red-300" : "border-[#E0E0E0] focus:ring-[#C8A96E]/40"}
    focus:outline-none focus:ring-2 focus:border-[#C8A96E]
    transition-all duration-200
    placeholder:text-[#BBBBBB]
  `;
}
