"use client";
import Link from "next/link";
import { ArrowRight, Mic, CheckCheck, Languages } from "lucide-react";
import BridgeHero from "@/components/BridgeHero";
import CountUp from "@/components/CountUp";
import Reveal, { useInView } from "@/components/Reveal";
import { useLang } from "@/components/LangProvider";

function Bar({ label, value, max, seen, color, delay }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm font-semibold">
        <span className="text-haze">{label}</span>
        <span><CountUp to={value} run={seen} /></span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-line/50">
        <div
          className={`h-full origin-left rounded-full ${color} transition-transform duration-[1400ms] ease-out`}
          style={{ width: `${(value / max) * 100}%`, transform: `scaleX(${seen ? 1 : 0})`, transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

function GapSection() {
  const { t } = useLang();
  const [ref, seen] = useInView(0.3);
  return (
    <section ref={ref}>
      <Reveal>
        <h2 className="font-display text-3xl text-sky md:text-4xl">{t("gapTitle")}</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-snow/90">{t("gapBody")}</p>
      </Reveal>
      <div className="mt-8 max-w-2xl space-y-5">
        <Bar label={t("gapPaid")} value={150} max={2500} seen={seen} color="bg-marigold" delay={200} />
        <Bar label={t("gapShop")} value={2500} max={2500} seen={seen} color="bg-cobalt" delay={500} />
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLang();
  const steps = [
    { icon: Mic, title: "step1", body: "step1Body" },
    { icon: CheckCheck, title: "step2", body: "step2Body" },
    { icon: Languages, title: "step3", body: "step3Body" },
  ];

  return (
    <div className="space-y-24">
      <section className="relative pt-6 text-center">
        <div aria-hidden className="motif pointer-events-none absolute inset-x-0 -top-8 h-[28rem] opacity-60" />
        <div aria-hidden className="pointer-events-none absolute -left-16 top-4 h-64 w-64 animate-drift rounded-full bg-cobalt/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-16 top-32 h-56 w-56 animate-drift rounded-full bg-marigold/20 blur-3xl" style={{ animationDelay: "-4s" }} />

        <div className="relative">
          <h1 className="animate-fade-up font-display text-6xl text-sky md:text-7xl">बोली</h1>
          <p className="mx-auto mt-4 max-w-xl animate-fade-up text-xl text-haze" style={{ animationDelay: "150ms" }}>{t("tagline")}</p>

          <BridgeHero />

          <div className="mx-auto mt-12 grid max-w-3xl gap-4 text-left sm:grid-cols-2">
            {[
              { href: "/artisan", title: "ctaMakeTitle", sub: "ctaMakeSub", delay: 2600 },
              { href: "/store", title: "ctaBuyTitle", sub: "ctaBuySub", delay: 2800 },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                style={{ animationDelay: `${c.delay}ms` }}
                className="group animate-fade-up rounded-2xl border border-line bg-panel p-6 transition duration-300 hover:-translate-y-1 hover:border-marigold hover:shadow-[0_12px_40px_-12px_rgba(242,169,59,0.35)]"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl text-sky">{t(c.title)}</h2>
                  <ArrowRight className="text-marigold transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
                <p className="mt-2 text-haze">{t(c.sub)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GapSection />

      <section>
        <Reveal><h2 className="font-display text-3xl text-sky md:text-4xl">{t("howTitle")}</h2></Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 150}>
                <div className="group h-full rounded-2xl border border-line bg-panel p-6 transition duration-300 hover:-translate-y-1 hover:border-sky">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-cobalt text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                      <Icon size={20} />
                    </span>
                    <span className="font-display text-3xl text-marigold">{i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{t(s.title)}</h3>
                  <p className="mt-1 leading-relaxed text-haze">{t(s.body)}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}