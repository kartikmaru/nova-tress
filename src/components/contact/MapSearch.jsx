"use client";

/**
 * MapSearch.jsx
 * Google Maps iframe — no API key required.
 * src = `https://www.google.com/maps?q=<query>&output=embed`
 *
 * Features:
 *   - Default query: "NovaTress Salon 123 Beauty Avenue Jaipur Rajasthan"
 *   - Text input lets user type any location; Search button updates the iframe.
 *   - "Use My Location" → browser geolocation → updates map to lat,lng.
 *   - Graceful error messages for permission denied / unsupported browsers.
 *   - Responsive: h-[450px] desktop / h-[320px] mobile.
 *   - Rounded-2xl, shadow, border — matches site theme.
 */

import { useState, useRef } from "react";
import { CONTACT_INFO } from "@/data/contactInfoData";

const DEFAULT_QUERY = CONTACT_INFO.mapQuery;

/* Build an embed URL from a query string */
function buildEmbedUrl(query) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export default function MapSearch() {
  const [inputVal,   setInputVal]   = useState(DEFAULT_QUERY);
  const [activeUrl,  setActiveUrl]  = useState(buildEmbedUrl(DEFAULT_QUERY));
  const [geoError,   setGeoError]   = useState("");
  const [geoLoading, setGeoLoading] = useState(false);
  const inputRef = useRef(null);

  /* ── Text search ── */
  const handleSearch = () => {
    const q = inputVal.trim();
    if (!q) return;
    setGeoError("");
    setActiveUrl(buildEmbedUrl(q));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  /* ── Geolocation ── */
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }
    setGeoLoading(true);
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const q = `${latitude},${longitude}`;
        setInputVal(q);
        setActiveUrl(buildEmbedUrl(q));
        setGeoLoading(false);
      },
      (err) => {
        setGeoLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setGeoError("Location permission denied. Please allow access and try again.");
            break;
          case err.POSITION_UNAVAILABLE:
            setGeoError("Location information is unavailable at this time.");
            break;
          case err.TIMEOUT:
            setGeoError("Location request timed out. Please try again.");
            break;
          default:
            setGeoError("Unable to retrieve your location.");
        }
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  };

  return (
    <section className="bg-[#F5F5F5] py-16 px-6 lg:px-20">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-poppins text-[11px] font-semibold tracking-[0.4em] uppercase
                        text-[#888888] mb-3">
            Location
          </p>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-[#222222]
                         leading-tight">
            Find Us{" "}
            <span style={{ color: "#C8A96E" }}>On Map</span>
          </h2>
          <div className="w-12 h-[2px] mx-auto mt-5 rounded-full"
               style={{ backgroundColor: "#C8A96E" }} />
        </div>

        {/* ── Search bar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 max-w-2xl mx-auto">

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search any location…"
            className="
              flex-1 px-4 py-3 rounded-xl border border-[#E0E0E0]
              bg-white font-poppins text-sm text-[#222222]
              placeholder:text-[#BBBBBB]
              focus:outline-none focus:ring-2 focus:ring-[#C8A96E]/40
              focus:border-[#C8A96E]
              transition-all duration-200
            "
          />

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="
              px-6 py-3 rounded-xl
              font-poppins text-sm font-semibold uppercase tracking-widest
              bg-[#222222] text-white border-2 border-[#222222]
              hover:bg-transparent hover:text-[#C8A96E] hover:border-[#C8A96E]
              transition-all duration-300 flex-shrink-0
              flex items-center gap-2
            "
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor"
              strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
            </svg>
            Search
          </button>

          {/* Use My Location */}
          <button
            onClick={handleUseMyLocation}
            disabled={geoLoading}
            title="Use my current location"
            className="
              px-4 py-3 rounded-xl
              font-poppins text-sm font-semibold uppercase tracking-widest
              border-2 border-[#C8A96E] text-[#C8A96E]
              hover:bg-[#C8A96E] hover:text-[#222222]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 flex-shrink-0
              flex items-center gap-2
            "
          >
            {geoLoading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor"
                strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>
                <circle cx="12" cy="12" r="9" strokeDasharray="4 2"/>
              </svg>
            )}
            <span className="hidden sm:inline">My Location</span>
          </button>
        </div>

        {/* Geo error message */}
        {geoError && (
          <p className="font-poppins text-sm text-red-500 text-center mb-4 max-w-2xl mx-auto">
            {geoError}
          </p>
        )}

        {/* ── Map iframe ── */}
        <div className="
          rounded-2xl overflow-hidden border border-[#E0E0E0]
          shadow-[0_8px_40px_rgba(0,0,0,0.10)]
          h-[320px] sm:h-[400px] lg:h-[450px]
        ">
          <iframe
            key={activeUrl}            /* force re-render when URL changes */
            src={activeUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="NovaTress location map"
          />
        </div>

        {/* Hint */}
        <p className="font-poppins text-xs text-[#AAAAAA] text-center mt-4">
          Type any address or landmark in the search box to update the map.
        </p>
      </div>
    </section>
  );
}
