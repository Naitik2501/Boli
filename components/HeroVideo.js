"use client";
import { useEffect, useRef, useState } from "react";

// Full-bleed looping background video for a `relative overflow-hidden` parent, plus a dark overlay so text stays readable.
// If the video file is missing or fails to load, it renders nothing and the section's normal background shows.
export default function HeroVideo({ src = "/videos/hero.mp4", poster }) {
  const ref = useRef(null);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // React doesn't always set the muted attribute, and browsers block unmuted autoplay
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
    } else {
      v.play().catch(() => {});
    }
  }, []);

  if (!ok) return null;

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onError={() => setOk(false)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/60 to-night" />
    </>
  );
}