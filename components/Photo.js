"use client";
import { useEffect, useRef, useState } from "react";

// A photo card. If the image file is missing it shows a labelled placeholder instead of a broken-image icon.
export default function Photo({ src, alt, caption, ratio = "aspect-[4/3]", className = "" }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  // Catches images that already failed before React attached the onError handler.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <figure className={`group overflow-hidden rounded-2xl border border-line bg-panel transition duration-300 hover:-translate-y-1 hover:border-sky/60 ${className}`}>
      <div className={`${ratio} w-full overflow-hidden`}>
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-line/40 p-4 text-center text-sm text-haze">
            Add your photo at<br />public{src}
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={ref}
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      {caption && <figcaption className="p-3 text-sm text-haze">{caption}</figcaption>}
    </figure>
  );
}