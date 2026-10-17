"use client";
import { useState } from "react";
import { buildCatalog } from "@/lib/ondc";
import { useLang } from "./LangProvider.js";

export default function OndcViewer({ listing }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(buildCatalog(listing), null, 2);

  async function copy() {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <details className="rounded-2xl border border-line bg-panel p-5">
      <summary className="cursor-pointer font-semibold">{t("ondcTitle")}</summary>
      <p className="mt-2 text-sm text-haze">{t("ondcNote")}</p>
      <button onClick={copy} className="mt-3 rounded-lg bg-cobalt px-4 py-2 text-sm font-semibold text-white hover:bg-cobaltDeep">
        {copied ? t("copied") : t("copy")}
      </button>
      <pre className="mt-3 max-h-80 overflow-auto rounded-lg bg-night p-4 text-xs text-snow">{json}</pre>
    </details>
  );
}