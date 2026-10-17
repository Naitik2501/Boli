"use client";
import { useEffect, useState } from "react";

const hangers = Array.from({ length: 9 }, (_, i) => {
  const t = (i + 1) / 10;
  const x = 60 + 480 * t;
  const y = 120 * (1 - t) ** 2 + 2 * (1 - t) * t * -20 + 120 * t * t;
  return { x, y };
});

export default function BridgeHero() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <svg viewBox="0 0 600 150" className="w-full" role="img" aria-label="A bridge connecting an artisan and a buyer">
        <rect x="30" y="112" width="40" height="34" rx="6" fill="#161E4A" stroke="#2B3780" strokeWidth="2" />
        <rect x="530" y="112" width="40" height="34" rx="6" fill="#161E4A" stroke="#2B3780" strokeWidth="2" />

        <path d="M30 120H570" stroke="#2B3780" strokeWidth="3" strokeLinecap="round" fill="none" pathLength="1" strokeDasharray="1" className="animate-dash" />

        {hangers.map((h, i) => (
          <line key={i} x1={h.x} y1={h.y} x2={h.x} y2="120" stroke="#3F63E6" strokeWidth="2" className="animate-fade-in" style={{ animationDelay: `${1300 + i * 90}ms` }} />
        ))}

        <path d="M60 120Q300 -20 540 120" stroke="#9DB4FF" strokeWidth="3" strokeLinecap="round" fill="none" pathLength="1" strokeDasharray="1" className="animate-dash" style={{ animationDuration: "1.8s", animationDelay: "250ms" }} />

        {!still && (
          <>
            <circle r="5" fill="#F2A93B">
              <animateMotion dur="4s" begin="2.2s" repeatCount="indefinite" path="M60 120Q300 -20 540 120" />
            </circle>
            <circle r="5" fill="#9DB4FF">
              <animateMotion dur="4s" begin="4.2s" repeatCount="indefinite" path="M540 120Q300 -20 60 120" />
            </circle>
          </>
        )}
      </svg>

      <div className="flex justify-between gap-4 px-1 text-left">
        <div className="w-44 animate-float sm:w-56">
          <div className="animate-pop rounded-2xl rounded-tl-sm bg-marigold/20 p-3" style={{ animationDelay: "1.6s" }}>
            <p className="text-xs font-semibold text-haze">कारीगर</p>
            <p className="font-semibold">यह हांडी ₹200 की है</p>
            <p className="mt-1 animate-fade-up border-t border-snow/10 pt-1 text-sm text-sky" style={{ animationDelay: "2.4s" }}>This pot is ₹200</p>
          </div>
        </div>
        <div className="w-44 animate-float sm:w-56" style={{ animationDelay: "1.2s" }}>
          <div className="animate-pop rounded-2xl rounded-tr-sm bg-line/60 p-3" style={{ animationDelay: "2.1s" }}>
            <p className="text-xs font-semibold text-haze">Buyer</p>
            <p className="font-semibold">Can I get 3 for ₹450?</p>
            <p className="mt-1 animate-fade-up border-t border-snow/10 pt-1 text-sm text-sky" style={{ animationDelay: "2.9s" }}>क्या मैं 3 ₹450 में ले सकता हूँ?</p>
          </div>
        </div>
      </div>
    </div>
  );
}