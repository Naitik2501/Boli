"use client";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LangProvider";

// Edit this list with your real team. Add a photo in public/images/team/ later if you want.
const TEAM = [
  { name: "Naitik Gupta"},
  { name: "Anuj Sharma"},
  { name: "Akarsh Pandey"},
];

const COPY = {
  en: {
    title: "About us",
    lead: "Boli is a voice-first storefront for artisans who make beautiful things but are shut out of online shops by language and paperwork.",
    blocks: [
      { h: "The problem", p: "Online shops ask for English, product codes, tax paperwork and studio photos. Most makers have none of these, so they sell through a middleman and the difference in price goes to someone else." },
      { h: "What we built", p: "An artisan points the phone at their work and speaks in their own language. Boli writes the listing and reads it back in Hindi to be checked. Buyers then make offers in English, the artisan hears them in Hindi, and the artisan decides every price." },
      { h: "What we believe", p: "Technology should meet people in the language they already speak. The maker stays in charge of the price, and Boli only translates and gives hints." },
    ],
    teamTitle: "The team",
    built: "Built for GDG on Campus NSUT · Devlympics 2026.",
  },
  hi: {
    title: "हमारे बारे में",
    lead: "बोली उन कारीगरों के लिए आवाज़ से चलने वाली दुकान है जो सुंदर चीज़ें बनाते हैं, पर भाषा और कागज़ी काम की वजह से ऑनलाइन दुकानों तक नहीं पहुँच पाते।",
    blocks: [
      { h: "समस्या", p: "ऑनलाइन दुकानें अंग्रेज़ी, प्रोडक्ट कोड, टैक्स के कागज़ और स्टूडियो फ़ोटो माँगती हैं। ज़्यादातर कारीगरों के पास ये नहीं होते, इसलिए वे बिचौलिये के ज़रिये बेचते हैं और दाम का फ़र्क़ किसी और की जेब में जाता है।" },
      { h: "हमने क्या बनाया", p: "कारीगर फ़ोन अपने काम की ओर रखकर अपनी भाषा में बोलता है। बोली लिस्टिंग लिखता है और जाँचने के लिए हिंदी में पढ़कर सुनाता है। फिर खरीदार अंग्रेज़ी में दाम बताते हैं, कारीगर उन्हें हिंदी में सुनता है, और हर दाम कारीगर खुद तय करता है।" },
      { h: "हम क्या मानते हैं", p: "तकनीक को लोगों से उसी भाषा में मिलना चाहिए जो वे पहले से बोलते हैं। दाम कारीगर के हाथ में रहता है, बोली सिर्फ़ अनुवाद करता है और सुझाव देता है।" },
    ],
    teamTitle: "हमारी टीम",
    built: "GDG on Campus NSUT · Devlympics 2026 के लिए बनाया गया।",
  },
};

export default function AboutPage() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <div className="space-y-16">
      <header>
        <h1 className="animate-fade-up font-display text-4xl text-sky md:text-5xl">{c.title}</h1>
        <p className="mt-4 max-w-2xl animate-fade-up text-lg leading-relaxed text-snow/90" style={{ animationDelay: "120ms" }}>{c.lead}</p>
      </header>

      <Reveal>
        <Photo src="/images/about.jpg" alt="Artisans at work" ratio="aspect-[21/9]" />
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {c.blocks.map((b, i) => (
          <Reveal key={b.h} delay={i * 150}>
            <div className="h-full rounded-2xl border border-line bg-panel p-6 transition duration-300 hover:-translate-y-1 hover:border-sky">
              <h2 className="font-display text-2xl text-marigold">{b.h}</h2>
              <p className="mt-2 leading-relaxed text-haze">{b.p}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <section>
        <Reveal><h2 className="font-display text-3xl text-sky">{c.teamTitle}</h2></Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="flex items-center gap-4 rounded-2xl border border-line bg-panel p-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cobalt font-display text-xl text-white">
                  {m.name.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-sm text-haze">{m.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-haze">{c.built}</p>
      </section>
    </div>
  );
}