"use client";
import { Plus } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LangProvider";

const COPY = {
  en: {
    title: "Frequently asked questions",
    items: [
      { q: "What is Boli?", a: "A voice-first storefront. An artisan speaks about their craft, Boli turns it into a shop page, and buyers can bargain with live translation between English and Hindi." },
      { q: "Does the artisan need to type anything?", a: "No. The artisan points the camera at the work and speaks. Boli reads the listing back in Hindi, and the artisan says yes or records it again." },
      { q: "Who decides the price?", a: "The artisan, always. Boli shows a hint when an offer is below the artisan's minimum, but it never accepts or rejects an offer on its own." },
      { q: "Is Boli connected to ONDC?", a: "Boli generates catalog data in the Beckn/ONDC format, but it has not yet been validated against the ONDC sandbox, so it is not live on the network." },
      { q: "Which languages work?", a: "English and Hindi for now. Adding a language means adding a block of text to the dictionary file." },
      { q: "Which browser should I use?", a: "Chrome or Edge on a phone or laptop. Voice recognition and the camera need those browsers, and they work on localhost or HTTPS." },
    ],
  },
  hi: {
    title: "अक्सर पूछे जाने वाले सवाल",
    items: [
      { q: "बोली क्या है?", a: "आवाज़ से चलने वाली दुकान। कारीगर अपनी कला के बारे में बोलता है, बोली उससे दुकान का पेज बनाता है, और खरीदार अंग्रेज़ी-हिंदी के सीधे अनुवाद के साथ मोलभाव कर सकते हैं।" },
      { q: "क्या कारीगर को कुछ टाइप करना पड़ता है?", a: "नहीं। कारीगर कैमरा अपने काम की ओर रखकर बोलता है। बोली लिस्टिंग हिंदी में पढ़कर सुनाता है, और कारीगर हाँ कहता है या दोबारा रिकॉर्ड करता है।" },
      { q: "दाम कौन तय करता है?", a: "हमेशा कारीगर। कोई प्रस्ताव कारीगर के न्यूनतम दाम से कम हो तो बोली सुझाव दिखाता है, पर खुद कोई प्रस्ताव मंज़ूर या नामंज़ूर नहीं करता।" },
      { q: "क्या बोली ONDC से जुड़ा है?", a: "बोली Beckn/ONDC प्रारूप में कैटलॉग डेटा बनाता है, लेकिन उसे अभी ONDC सैंडबॉक्स पर जाँचा नहीं गया है, इसलिए वह नेटवर्क पर लाइव नहीं है।" },
      { q: "कौन-सी भाषाएँ चलती हैं?", a: "अभी अंग्रेज़ी और हिंदी। नई भाषा जोड़ने के लिए शब्दकोश की फ़ाइल में एक नया हिस्सा जोड़ना होता है।" },
      { q: "कौन-सा ब्राउज़र इस्तेमाल करें?", a: "फ़ोन या लैपटॉप पर Chrome या Edge। आवाज़ पहचानने और कैमरे के लिए यही ब्राउज़र चाहिए, और ये localhost या HTTPS पर चलते हैं।" },
    ],
  },
};

export default function FaqPage() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="animate-fade-up font-display text-4xl text-sky md:text-5xl">{c.title}</h1>
      <div className="mt-10 space-y-3">
        {c.items.map((it, i) => (
          <Reveal key={it.q} delay={i * 80}>
            <details className="group rounded-2xl border border-line bg-panel transition-colors open:border-sky/60">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
                {it.q}
                <Plus className="shrink-0 text-marigold transition-transform duration-300 group-open:rotate-45" size={20} />
              </summary>
              <p className="animate-fade-up px-5 pb-5 leading-relaxed text-haze">{it.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  );
}