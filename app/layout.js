import "./globals.css";
import { Tiro_Devanagari_Hindi, Mukta } from "next/font/google";
import { LangProvider } from "@/components/LangProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Tiro_Devanagari_Hindi({ weight: "400", subsets: ["devanagari", "latin"], variable: "--font-display" });
const body = Mukta({ weight: ["400", "600", "700"], subsets: ["devanagari", "latin"], variable: "--font-body" });

export const metadata = {
  title: "BOLI · बोली",
  description: "Voice-first storefronts and live translated bargaining for artisans.",
  manifest: "/manifest.json",
};

export const viewport = { themeColor: "#0E1330", colorScheme: "dark" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <LangProvider>
          <Header />
          <main className="mx-auto max-w-5xl px-5 py-8">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}