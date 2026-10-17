"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "./LangProvider.js";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const path = usePathname();

  const link = (href, label) => (
    <Link
      href={href}
      className={`relative py-1 transition-colors hover:text-sky after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-marigold after:transition-transform after:duration-300 hover:after:scale-x-100 ${
        path.startsWith(href) ? "text-sky after:scale-x-100" : "after:scale-x-0"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-20 animate-slide-down border-b border-line bg-night/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="group font-display text-2xl text-sky transition-transform duration-300 hover:scale-105">
          बोली <span className="text-base text-haze transition-colors group-hover:text-marigold">Boli</span>
        </Link>
        <div className="flex items-center gap-5 text-sm font-semibold">
          {link("/artisan", t("navSell"))}
          {link("/store", t("navBuy"))}
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            aria-label={t("switchAria")}
            className="rounded-full border border-line px-3 py-1 transition hover:border-marigold hover:text-marigold active:scale-90"
          >
            {lang === "en" ? "हिन्दी" : "EN"}
          </button>
        </div>
      </nav>
    </header>
  );
}