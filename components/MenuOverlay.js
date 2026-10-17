"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowUpRight } from "lucide-react";
import { MENU } from "@/lib/menu";
import { useLang } from "./LangProvider.js";

export default function MenuOverlay({ open, onClose }) {
  const { lang } = useLang();
  const path = usePathname();
  const closeRef = useRef(null);

  // While open: Esc closes, the page behind can't scroll, and focus moves to the close button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    // The wrapper only toggles visibility (so hidden links can't be tabbed to). Each layer animates itself.
    <div
      role="dialog"
      aria-modal="true"
      aria-label={lang === "hi" ? "मेन्यू" : "Menu"}
      className={`fixed inset-0 z-50 transition-[visibility] ${open ? "visible" : "invisible delay-500"}`}
    >
      {/* Blurred, dimmed page behind the menu. Click it to close. */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-night/50 backdrop-blur-md transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-line bg-panel/80 p-6 backdrop-blur-2xl transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl text-sky">बोली <span className="text-base text-haze">Boli</span></span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={lang === "hi" ? "मेन्यू बंद करें" : "Close menu"}
            className="rounded-full border border-line p-2 transition hover:rotate-90 hover:border-marigold hover:text-marigold active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="mt-8 space-y-1">
          {MENU.map((m, i) => {
            const active = path === m.href;
            return (
              <li
                key={m.href}
                style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
                className={`transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
              >
                <Link
                  href={m.href}
                  onClick={onClose}
                  className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-line/40"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="w-6 text-xs font-semibold text-haze">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className={`block font-display text-2xl transition-colors group-hover:text-marigold ${active ? "text-marigold" : "text-snow"}`}>
                        {lang === "hi" ? m.hi : m.en}
                      </span>
                      <span className="block text-sm text-haze">{lang === "hi" ? m.subHi : m.subEn}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="text-haze opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-marigold group-hover:opacity-100" size={20} />
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-auto pt-8 text-xs text-haze">GDG on Campus NSUT · Devlympics 2026</p>
      </aside>
    </div>
  );
}