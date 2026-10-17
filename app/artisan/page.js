"use client";
import { useState } from "react";
import Link from "next/link";
import Recorder from "@/components/Recorder";
import ListingCard from "@/components/ListingCard";
import { useLang } from "@/components/LangProvider";
import { speak } from "@/lib/speech";
import { saveListing } from "@/lib/storage";
import { SAMPLE_LISTING } from "@/lib/sample";

function Working({ text }) {
  return (
    <div className="flex flex-col items-center gap-5 py-12" aria-live="polite">
      <div className="relative h-20 w-20">
        <span className="absolute inset-0 rounded-full border-4 border-line" />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-marigold" />
        <span className="absolute inset-3 animate-spin rounded-full border-4 border-transparent border-b-sky" style={{ animationDirection: "reverse" }} />
      </div>
      <p className="text-xl font-semibold">{text}</p>
      <div className="flex gap-2" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 animate-dot rounded-full bg-sky" style={{ animationDelay: `${i * 160}ms` }} />
        ))}
      </div>
    </div>
  );
}

function Success() {
  const sparks = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * 2 * Math.PI;
    return { x: Math.round(Math.cos(a) * 90), y: Math.round(Math.sin(a) * 90) };
  });
  return (
    <div className="relative mx-auto flex h-28 w-28 items-center justify-center" aria-hidden>
      <span className="absolute inset-2 animate-ring rounded-full bg-marigold/40 motion-reduce:hidden" />
      {sparks.map((s, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 -ml-1 -mt-1 h-2 w-2 animate-burst rounded-full bg-marigold motion-reduce:hidden"
          style={{ "--x": `${s.x}px`, "--y": `${s.y}px`, animationDelay: "350ms" }}
        />
      ))}
      <svg viewBox="0 0 52 52" className="relative h-24 w-24">
        <circle cx="26" cy="26" r="23" fill="none" stroke="#F2A93B" strokeWidth="3" pathLength="1" strokeDasharray="1" className="animate-dash" />
        <path d="M15 27l8 8 14-16" fill="none" stroke="#EAF0FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" className="animate-dash" style={{ animationDelay: "600ms" }} />
      </svg>
    </div>
  );
}

export default function ArtisanPage() {
  const { t } = useLang();
  const [stage, setStage] = useState("record"); // record | working | confirm | live
  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");

  async function handleDone(payload) {
    setStage("working");
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create the listing");
      showForConfirm({ ...data, image: payload.image });
    } catch (e) {
      setError(e.message);
      setStage("record");
    }
  }

  function showForConfirm(l) {
    setListing(l);
    setStage("confirm");
    speak(`मैंने लिखा है: ${l.title_hi}. कीमत ${l.price_inr} रुपये. क्या यह सही है?`, "hi-IN");
  }

  function publish() {
    saveListing(listing);
    setStage("live");
  }

  return (
    <div>
      <h1 className="animate-fade-up font-display text-4xl text-sky">{t("artisanTitle")}</h1>
      <p className="mb-8 mt-1 animate-fade-up text-haze" style={{ animationDelay: "100ms" }}>{t("artisanSub")}</p>

      {error && (
        <div role="alert" className="mb-6 animate-pop rounded-xl bg-marigold/20 p-4">
          <p className="font-semibold">{error}</p>
          <button onClick={() => showForConfirm(SAMPLE_LISTING)} className="mt-2 text-sm font-semibold text-sky underline">
            {t("useSample")}
          </button>
        </div>
      )}

      {/* key={stage} re-mounts this wrapper on every stage change, so each stage fades in */}
      <div key={stage} className="animate-fade-up">
        {stage === "record" && <Recorder onDone={handleDone} />}
        {stage === "working" && <Working text={t("working")} />}

        {stage === "confirm" && listing && (
          <div className="space-y-6">
            <p className="text-lg font-semibold">{t("check")}</p>
            <div className="max-w-xl"><ListingCard listing={listing} /></div>
            <div className="flex flex-wrap gap-3">
              <button onClick={publish} className="rounded-xl bg-cobalt px-8 py-4 text-lg font-bold text-white transition hover:-translate-y-0.5 hover:bg-cobaltDeep active:scale-95">{t("publish")}</button>
              <button onClick={() => setStage("record")} className="rounded-xl border-2 border-cobalt px-8 py-4 text-lg font-bold text-sky transition hover:-translate-y-0.5 hover:bg-panel active:scale-95">{t("redo")}</button>
            </div>
          </div>
        )}

        {stage === "live" && (
          <div className="space-y-6 text-center">
            <Success />
            <p className="animate-fade-up text-2xl font-bold text-sky" style={{ animationDelay: "900ms" }}>{t("live")}</p>
            <Link href="/store" style={{ animationDelay: "1100ms" }} className="inline-block animate-fade-up rounded-xl bg-marigold px-8 py-4 text-lg font-bold text-night transition hover:-translate-y-0.5 hover:brightness-95 active:scale-95">{t("seeBuyer")}</Link>
          </div>
        )}
      </div>
    </div>
  );
}