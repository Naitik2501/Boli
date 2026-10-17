"use client";
import { useLang } from "./LangProvider.js";

export default function ListingCard({ listing: l }) {
  const { lang, t } = useLang();
  const pick = (k) => (lang === "hi" ? l[k + "_hi"] || l[k] : l[k]);
  const size = l.dimensions === "Not stated" ? t("notStated") : l.dimensions;
  const main = lang === "hi" ? l.title_hi : l.title_en;
  const sub = lang === "hi" ? l.title_en : l.title_hi;

  const row = (label, value, i) => (
    <div className="animate-fade-up" style={{ animationDelay: `${450 + i * 90}ms` }}>
      <dt className="font-semibold text-haze">{label}</dt><dd>{value}</dd>
    </div>
  );

  return (
    <article className="group animate-fade-up overflow-hidden rounded-2xl border border-line bg-panel transition duration-300 hover:border-sky/60 hover:shadow-[0_16px_50px_-20px_rgba(157,180,255,0.35)]">
      <div className="overflow-hidden">
        {l.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={l.image} alt={l.title_en} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="flex aspect-[4/3] w-full items-center justify-center bg-line/50 font-display text-3xl text-sky/70">{l.title_hi}</div>
        )}
      </div>
      <div className="space-y-4 p-6">
        <div>
          <h2 className="font-display text-3xl leading-tight text-sky">{main}</h2>
          <p className="mt-1 text-haze">{sub}</p>
        </div>
        <p className="animate-pop text-2xl font-bold text-marigold" style={{ animationDelay: "300ms" }}>₹{l.price_inr}</p>
        <p className="max-w-prose leading-relaxed">{pick("description")}</p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {row(t("material"), pick("material"), 0)}
          {row(t("craft"), pick("craft"), 1)}
          {row(t("use"), pick("function"), 2)}
          {row(t("size"), size, 3)}
        </dl>
        <section className="animate-fade-up" style={{ animationDelay: "850ms" }}>
          <h3 className="font-semibold">{t("story")}</h3>
          <p className="mt-1 max-w-prose leading-relaxed text-snow/90">{pick("story")}</p>
        </section>
        <section className="animate-fade-up" style={{ animationDelay: "1000ms" }}>
          <h3 className="font-semibold">{t("care")}</h3>
          <p className="mt-1 max-w-prose leading-relaxed text-snow/90">{pick("care")}</p>
        </section>
      </div>
    </article>
  );
}