/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary-dark":   "#222222",
        "secondary-dark": "#333333",
        "light-gray":     "#F5F5F5",
        "white":          "#FFFFFF",
        "accent":         "#C8A96E",
        "border-light":   "#E0E0E0",
        "text-dark":      "#222222",
        "text-light":     "#888888",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        poppins:  ["Poppins", "sans-serif"],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        /* Infinite horizontal marquee for ServicesSlider */
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        /*
         * Mirror shine sweep.
         * The shine div starts fully left (translateX -100%)
         * and exits fully right (translateX 300%).
         * Triggered once per hover via group-hover:animate-shine.
         */
        shine: {
          "0%":   { transform: "translateX(-120%) skewX(-20deg)", opacity: "0" },
          "35%":  {                                                opacity: "1" },
          "65%":  {                                                opacity: "1" },
          "100%": { transform: "translateX(220%)  skewX(-20deg)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        /* 0.9 s, runs once, only while group is hovered */
        shine: "shine 0.9s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
