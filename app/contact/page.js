"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { useLang } from "@/components/LangProvider";

// Change this to your own email address. The form opens the visitor's email app with a message ready to send to it.
const CONTACT_EMAIL = "guptanaitik25012009@gmail.com";

const COPY = {
  en: {
    title: "Contact us",
    lead: "Questions, ideas, or a craft community that wants to try Boli? Write to us.",
    name: "Your name", email: "Your email", message: "Your message", send: "Send message",
    thanks: "Your email app should open with the message ready. Just press send there.",
  },
  hi: {
    title: "संपर्क करें",
    lead: "कोई सवाल, सुझाव, या कोई शिल्प समुदाय जो बोली आज़माना चाहता है? हमें लिखिए।",
    name: "आपका नाम", email: "आपका ईमेल", message: "आपका संदेश", send: "संदेश भेजें",
    thanks: "आपका ईमेल ऐप संदेश के साथ खुलना चाहिए। वहाँ बस भेज दीजिए।",
  },
};

const field = "w-full rounded-lg border border-line bg-night px-4 py-3 text-snow transition placeholder:text-haze/70 focus:border-marigold";

export default function ContactPage() {
  const { lang } = useLang();
  const c = COPY[lang];
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Boli message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="animate-fade-up font-display text-4xl text-sky md:text-5xl">{c.title}</h1>
      <p className="mt-3 animate-fade-up text-haze" style={{ animationDelay: "100ms" }}>{c.lead}</p>

      <form onSubmit={submit} className="mt-8 animate-fade-up space-y-4" style={{ animationDelay: "200ms" }}>
        <input required value={form.name} onChange={set("name")} placeholder={c.name} aria-label={c.name} className={field} />
        <input required type="email" value={form.email} onChange={set("email")} placeholder={c.email} aria-label={c.email} className={field} />
        <textarea required rows={5} value={form.message} onChange={set("message")} placeholder={c.message} aria-label={c.message} className={field} />
        <button className="flex items-center gap-2 rounded-xl bg-marigold px-6 py-3 font-bold text-night transition hover:-translate-y-0.5 hover:brightness-95 active:scale-95">
          <Send size={18} /> {c.send}
        </button>
      </form>

      {sent && <p role="status" className="mt-5 animate-pop rounded-xl bg-marigold/20 p-4 font-semibold">{c.thanks}</p>}
    </div>
  );
}