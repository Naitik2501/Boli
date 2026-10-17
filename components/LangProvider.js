"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { dict } from "@/lib/dict";

const Ctx = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("boli:lang");
      if (saved === "hi" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("boli:lang", l); } catch {}
  };

  const t = useCallback(
    (key, vars = {}) => (dict[lang][key] ?? dict.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? ""),
    [lang]
  );

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);