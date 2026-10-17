"use client";
import { useState } from "react";
import { Mic } from "lucide-react";
import { listen, speak } from "@/lib/speech";
import { useLang } from "./LangProvider.js";

export default function NegotiationChat({ listing }) {
  const { t } = useLang();
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(null); // "buyer" | "artisan" while the mic is open
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const floor = listing.price_floor_inr;

  async function send(from, text) {
    if (!text.trim()) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/negotiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, text, listing }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Translation failed");
      setMessages((m) => [...m, { from, original: text, ...data }]);
      speak(data.translated, from === "buyer" ? "hi-IN" : "en-IN");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function hear(from, lang) {
    setError("");
    setListening(from);
    try {
      await send(from, await listen(lang));
    } catch (e) {
      setError(e.message);
    } finally {
      setListening(null);
    }
  }

  function hint(msg) {
    if (msg.from !== "buyer" || !msg.amount_inr) return null;
    const q = msg.quantity || 1;
    const p = (msg.amount_inr / q).toFixed(0);
    return p >= floor ? t("hintOk", { p }) : t("hintLow", { p, f: floor, c: floor * q, q });
  }

  return (
    <section className="rounded-2xl border border-line bg-panel p-6">
      <h2 className="font-display text-2xl text-sky">{t("negTitle")}</h2>
      <p className="mt-1 text-sm text-haze">{t("negSub")}</p>

      <ul className="my-5 space-y-3" aria-live="polite">
        {messages.length === 0 && <li className="text-haze">{t("negEmpty")}</li>}
        {messages.map((m, i) => (
          <li key={i} className={`max-w-md animate-pop rounded-xl p-4 ${m.from === "buyer" ? "origin-bottom-left bg-line/60" : "ml-auto origin-bottom-right bg-marigold/20"}`}>
            <p className="text-xs font-semibold text-haze">{m.from === "buyer" ? t("buyerLabel") : t("artisanLabel")}</p>
            <p className="mt-1">{m.original}</p>
            <p className="mt-2 border-t border-snow/10 pt-2 font-semibold">{m.translated}</p>
            {hint(m) && <p className="mt-2 animate-fade-up text-sm text-sky" style={{ animationDelay: "350ms" }}>{hint(m)}</p>}
          </li>
        ))}
        {busy && (
          <li className="flex max-w-[12rem] animate-pop items-center gap-2 rounded-xl bg-line/40 p-3 text-sm text-haze">
            <span className="flex gap-1" aria-hidden>
              {[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 animate-dot rounded-full bg-sky" style={{ animationDelay: `${i * 160}ms` }} />)}
            </span>
            {t("translating")}
          </li>
        )}
      </ul>

      {error && <p role="alert" className="mb-3 rounded-lg bg-marigold/20 p-3 text-sm font-semibold">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button disabled={busy || !!listening} onClick={() => hear("buyer", "en-IN")} className={`relative flex items-center gap-2 rounded-xl bg-cobalt px-5 py-3 font-semibold text-white transition hover:bg-cobaltDeep active:scale-95 disabled:opacity-50 ${listening === "buyer" ? "ring-4 ring-sky/60 animate-breathe" : ""}`}>
          <Mic size={18} className={listening === "buyer" ? "animate-blink" : ""} /> {t("buyerBtn")}
        </button>
        <button disabled={busy || !!listening} onClick={() => hear("artisan", "hi-IN")} className={`relative flex items-center gap-2 rounded-xl bg-marigold px-5 py-3 font-semibold text-night transition hover:brightness-95 active:scale-95 disabled:opacity-50 ${listening === "artisan" ? "ring-4 ring-marigold/60 animate-breathe" : ""}`}>
          <Mic size={18} className={listening === "artisan" ? "animate-blink" : ""} /> {t("artisanBtn")}
        </button>
      </div>

      <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); send("buyer", draft); setDraft(""); }}>
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={t("typePlaceholder")} aria-label={t("typePlaceholder")} className="min-w-0 flex-1 rounded-lg border border-line bg-night px-3 py-2 text-snow placeholder:text-haze/70" />
        <button disabled={busy} className="rounded-lg border border-sky px-4 py-2 font-semibold text-sky transition hover:bg-line/50 active:scale-95 disabled:opacity-50">{t("send")}</button>
      </form>
    </section>
  );
}