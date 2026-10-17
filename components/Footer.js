"use client";
import Link from "next/link";
import { useLang } from "./LangProvider.js";

export default function Footer() {
  const { lang, t } = useLang();
  const links = [
    ["/about", lang === "hi" ? "हमारे बारे में" : "About us"],
    ["/faq", lang === "hi" ? "सवाल-जवाब" : "FAQ"],
    ["/contact", lang === "hi" ? "संपर्क करें" : "Contact"],
  ];
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 text-sm text-haze sm:flex-row sm:items-center sm:justify-between">
        <p>{t("footer")}</p>
        <nav className="flex gap-5 font-semibold">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="transition-colors hover:text-marigold">{label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}