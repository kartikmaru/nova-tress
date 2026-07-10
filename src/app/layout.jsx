/**
 * layout.jsx — Root layout (SERVER component — NO "use client").
 * BookingProvider is a client component; it can be imported from a
 * server layout because Next.js renders it in the client bundle.
 */

import "./globals.css";
import Navbar        from "@/components/shared/Navbar";
import Footer        from "@/components/shared/Footer";
import { BookingProvider } from "@/components/shared/BookingContext";
import BookingModal  from "@/components/shared/BookingModal";

export const metadata = {
  title:       "NovaTress | Premium Beauty Salon",
  description: "NovaTress — Where elegance meets artistry. Premium hair, nails, skincare & makeup.",
  keywords:    "salon, beauty, hair, nails, skincare, NovaTress, luxury",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/*
          BookingProvider wraps everything so any client component in
          the tree can call openBookingModal / closeBookingModal.
          BookingModal is rendered once here at the root so it sits
          above all page content in the stacking order.
        */}
        <BookingProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          {/* Global modal — z-[200], rendered at root level */}
          <BookingModal />
        </BookingProvider>
      </body>
    </html>
  );
}
