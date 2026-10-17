import "./globals.css";
import { Fraunces, Noto_Serif_Devanagari, Plus_Jakarta_Sans, Hind } from "next/font/google";
import { LangProvider } from "@/components/LangProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Headings: Fraunces for English, Noto Serif Devanagari for Hindi (Fraunces has no Devanagari, so the browser falls through to it).
const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const displayHi = Noto_Serif_Devanagari({ subsets: ["devanagari"], variable: "--font-display-hi", display: "swap" });
// Body text: Plus Jakarta Sans for English, Hind for Hindi.
const body = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const bodyHi = Hind({ weight: ["400", "500", "600", "700"], subsets: ["devanagari"], variable: "--font-body-hi", display: "swap" });

export const metadata = {
  title: "BOLI · बोली",
  description: "Voice-first storefronts and live translated bargaining for artisans.",
  manifest: "/manifest.json",
};

export const viewport = { themeColor: "#0E1330", colorScheme: "dark" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${displayHi.variable} ${body.variable} ${bodyHi.variable}`}>
      <body className="antialiased">
        <LangProvider>
          <Header />
          <main className="mx-auto max-w-5xl px-5 py-8">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}