"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { blobToBase64, captureFrame } from "@/lib/media";
import { useLang } from "./LangProvider.js";

export default function Recorder({ onDone, disabled }) {
  const { t } = useLang();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recRef = useRef(null);
  const chunks = useRef([]);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" }, audio: { echoCancellation: true, noiseSuppression: true } })
      .then((s) => {
        if (!alive) return s.getTracks().forEach((tr) => tr.stop());
        streamRef.current = s;
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch(() => setError(true));
    return () => {
      alive = false;
      streamRef.current?.getTracks().forEach((tr) => tr.stop());
    };
  }, []);

  useEffect(() => {
    if (!recording) return;
    setSeconds(0);
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  function start() {
    if (!streamRef.current) return;
    const audioOnly = new MediaStream(streamRef.current.getAudioTracks());
    const rec = new MediaRecorder(audioOnly);
    chunks.current = [];
    rec.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
    rec.onstop = async () => {
      const blob = new Blob(chunks.current, { type: rec.mimeType || "audio/webm" });
      const image = videoRef.current ? captureFrame(videoRef.current) : null;
      onDone({ audioBase64: await blobToBase64(blob), mime: blob.type.split(";")[0], image });
    };
    rec.start();
    recRef.current = rec;
    setRecording(true);
  }

  function stop() {
    recRef.current?.stop();
    setRecording(false);
  }

  if (error) return <p role="alert" className="rounded-xl bg-marigold/20 p-4 font-semibold">{t("camBlocked")}</p>;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full max-w-md">
        <video ref={videoRef} autoPlay playsInline muted className="aspect-[4/3] w-full rounded-2xl border border-line bg-panel object-cover" />
        {recording && (
          <span className="absolute left-3 top-3 flex animate-pop items-center gap-2 rounded-full bg-night/70 px-3 py-1 text-xs font-bold">
            <span className="h-2.5 w-2.5 animate-blink rounded-full bg-red-500" /> REC {seconds}s
          </span>
        )}
      </div>

      <div className="relative flex items-center justify-center">
        {recording && (
          <>
            <span className="absolute h-28 w-28 animate-ring rounded-full bg-red-600/50 motion-reduce:hidden" />
            <span className="absolute h-28 w-28 animate-ring rounded-full bg-red-600/40 motion-reduce:hidden" style={{ animationDelay: "700ms" }} />
          </>
        )}
        <button
          onClick={recording ? stop : start}
          disabled={disabled}
          aria-label={recording ? t("micStop") : t("micStart")}
          className={`relative flex h-28 w-28 items-center justify-center rounded-full text-white shadow-lg transition active:scale-90 disabled:opacity-50 ${
            recording ? "bg-red-600" : "animate-breathe bg-cobalt hover:bg-cobaltDeep"
          }`}
        >
          {recording ? <Square size={40} fill="white" /> : <Mic size={48} />}
        </button>
      </div>

      <div className="flex h-8 items-end gap-1" aria-hidden>
        {recording && [0, 1, 2, 3, 4, 5, 6].map((i) => (
          <span key={i} className="h-8 w-1.5 origin-bottom animate-wave rounded bg-marigold" style={{ animationDelay: `${i * 110}ms` }} />
        ))}
      </div>

      <p className="text-center text-lg font-semibold">{recording ? t("micRec", { n: seconds }) : t("micIdle")}</p>
    </div>
  );
}