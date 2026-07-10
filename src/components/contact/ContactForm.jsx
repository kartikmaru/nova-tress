"use client";

/**
 * ContactForm.jsx — Frontend-only, no backend API call.
 * On submit: validates → shows success message → saves to localStorage
 *            → resets form. No axios / fetch required.
 */

import { useState } from "react";
import { SERVICES_LIST } from "@/data/servicesData";
import { CONTACT_INFO }  from "@/data/contactInfoData";

const INITIAL = {
  name:    "",
  email:   "",
  phone:   "",
  service: "",
  message: "",
};

/* ── Field wrapper ───────────────────────────────────────────────── */
function Field({ label, error, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-poppins text-xs font-semibold uppercase tracking-widest
                        text-[#555555]">
        {label}
        {required && <span style={{ color: "#C8A96E" }} className="ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="font-poppins text-xs text-red-500 leading-tight">{error}</p>
      )}
    </div>
  );
}

/* ── Input base class ────────────────────────────────────────────── */
function inputCls(hasError) {
  return [
    "w-full px-4 py-3 rounded-xl font-poppins text-sm text-[#222222]",
    "bg-[#F9F9F9] border placeholder:text-[#BBBBBB]",
    "focus:outline-none focus:ring-2 focus:border-[#C8A96E] transition-all duration-200",
    hasError
      ? "border-red-400 focus:ring-red-200"
      : "border-[#E0E0E0] focus:ring-[#C8A96E]/30",
  ].join(" ");
}

/* ── Quick info pill ──────────────────────────────────────────────── */
function InfoPill({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center
                      flex-shrink-0 text-lg"
           style={{ backgroundColor: "rgba(200,169,110,0.12)" }}>
        {icon}
      </div>
      <div>
        <p className="font-poppins text-[10px] font-semibold uppercase tracking-widest
                      text-[#888888]">
          {label}
        </p>
        <p className="font-poppins text-sm font-medium text-[#222222]">{value}</p>
      </div>
    </div>
  );
}

/* ── ContactForm ─────────────────────────────────────────────────── */
export default function ContactForm() {
  const [form,     setForm]     = useState(INITIAL);
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name])  setErrors((p) => ({ ...p, [name]: "" }));
    if (apiError)      setApiError("");
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Full name is required.";
    if (!form.email.trim())   e.email   = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.phone.trim())   e.phone   = "Phone number is required.";
    if (!form.message.trim()) e.message = "Please write a message.";
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
        body:    JSON.stringify({ formType: "contact", ...form }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setForm(INITIAL);
      } else {
        setApiError(data.message || "Something went wrong. Please try again.");
      }
    } catch (_) {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#F5F5F5] pt-20 pb-16 px-6 lg:px-20">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2
                      gap-14 lg:gap-20 items-start">

        {/* ── Left — heading + quick contact ── */}
        <div className="flex flex-col gap-7 lg:sticky lg:top-28">
          <p className="font-poppins text-[11px] font-semibold tracking-[0.4em]
                        uppercase text-[#888888]">
            Get In Touch
          </p>

          <div>
            <h1 className="font-playfair font-bold text-5xl sm:text-6xl text-[#222222]
                           leading-[1.05] mb-4">
              Contact{" "}
              <span style={{ color: "#C8A96E" }}>NovaTress</span>
            </h1>
            <div className="w-14 h-[2px] rounded-full"
                 style={{ backgroundColor: "#C8A96E" }} />
          </div>

          <p className="font-poppins text-base text-[#888888] leading-relaxed max-w-sm">
            Have questions or want to book your beauty session? Send us a message
            and our team will get back to you within 24 hours.
          </p>

          <div className="flex flex-col gap-4 pt-2">
            <InfoPill icon="📍" label="Location"   value={CONTACT_INFO.address} />
            <InfoPill icon="📞" label="Phone"       value={CONTACT_INFO.phone}   />
            <InfoPill icon="✉️" label="Email"       value={CONTACT_INFO.email}   />
            <InfoPill icon="🕐" label="Hours"       value="Mon – Sat: 10 AM – 8 PM" />
          </div>
        </div>

        {/* ── Right — form card ── */}
        <div className="bg-white rounded-2xl border border-[#E0E0E0]
                        shadow-[0_8px_40px_rgba(0,0,0,0.07)] p-8 sm:p-10">

          {success ? (
            /* ── Success ── */
            <div className="flex flex-col items-center justify-center py-12 text-center gap-5">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: "rgba(200,169,110,0.12)" }}>
                <svg className="w-8 h-8" style={{ color: "#C8A96E" }}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 className="font-playfair font-bold text-2xl text-[#222222]">
                Message Sent!
              </h3>
              <p className="font-poppins text-sm text-[#888888] leading-relaxed max-w-xs">
                Your message has been sent successfully. Our team will contact you soon.
              </p>
              <div className="w-10 h-[2px] rounded-full"
                   style={{ backgroundColor: "#C8A96E" }} />
              <button
                onClick={() => setSuccess(false)}
                className="font-poppins text-sm font-semibold uppercase tracking-widest
                           px-6 py-2.5 rounded-xl border-2 border-[#222222] text-[#222222]
                           hover:border-[#C8A96E] hover:text-[#C8A96E] transition-all duration-300"
              >
                Send Another
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div>
                <p className="font-playfair font-bold text-xl text-[#222222] mb-1">
                  Send Us a Message
                </p>
                <p className="font-poppins text-sm text-[#888888]">
                  Fields marked <span style={{ color: "#C8A96E" }}>*</span> are required.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full Name" error={errors.name} required>
                  <input type="text" name="name" value={form.name}
                    onChange={handleChange} placeholder="Anaya Sharma"
                    className={inputCls(errors.name)} />
                </Field>

                <Field label="Phone Number" error={errors.phone} required>
                  <input type="tel" name="phone" value={form.phone}
                    onChange={handleChange} placeholder="+91 98765 43210"
                    className={inputCls(errors.phone)} />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Email Address" error={errors.email} required>
                    <input type="email" name="email" value={form.email}
                      onChange={handleChange} placeholder="you@example.com"
                      className={inputCls(errors.email)} />
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Field label="Select Service" error={null}>
                    <select name="service" value={form.service}
                      onChange={handleChange} className={inputCls(false)}>
                      <option value="">— Choose a service (optional) —</option>
                      {SERVICES_LIST.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Field label="Your Message" error={errors.message} required>
                    <textarea name="message" value={form.message}
                      onChange={handleChange} rows={4}
                      placeholder="Tell us how we can help you..."
                      className={`${inputCls(errors.message)} resize-none`} />
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

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full py-3.5 rounded-xl
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
                ) : (
                  <>
                    Send Message
                    <svg className="w-4 h-4" fill="none" stroke="currentColor"
                      strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
