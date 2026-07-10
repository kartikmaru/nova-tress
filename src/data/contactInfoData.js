/**
 * contactInfoData.js
 * Contact details — used by ContactInfoCards, ContactForm, Footer.
 */

export const CONTACT_INFO = {
  address:  "123 Beauty Avenue, Jaipur, Rajasthan 302001",
  phone:    "+91 98765 43210",
  email:    "info@novatress.com",
  mapQuery: "NovaTress Salon 123 Beauty Avenue Jaipur Rajasthan",
  hours: {
    weekdays: "Monday – Saturday: 10:00 AM – 8:00 PM",
    sunday:   "Sunday: 11:00 AM – 6:00 PM",
  },
};

export const CONTACT_CARDS = [
  {
    icon:  "📍",
    title: "Our Location",
    lines: [
      "123 Beauty Avenue,",
      "Jaipur, Rajasthan 302001",
      "India",
    ],
    action: {
      label: "Get Directions",
      href:  "https://maps.google.com/?q=123+Beauty+Avenue+Jaipur+Rajasthan",
    },
  },
  {
    icon:  "📞",
    title: "Contact Us",
    lines: ["+91 98765 43210", "info@novatress.com"],
    action: { label: "Call Now", href: "tel:+919876543210" },
  },
  {
    icon:  "🕐",
    title: "Working Hours",
    lines: [
      "Monday – Saturday",
      "10:00 AM – 8:00 PM",
      "",
      "Sunday",
      "11:00 AM – 6:00 PM",
    ],
  },
];
