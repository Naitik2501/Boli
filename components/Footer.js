"use client";
import { useLang } from "./LangProvider.js";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-16 border-t border-line">
      <p className="mx-auto max-w-5xl px-5 py-6 text-sm text-haze">{t("footer")}</p>
    </footer>
  );
}