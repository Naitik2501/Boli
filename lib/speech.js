// Speech helpers built on the browser's Web Speech API (best in Chrome/Edge).

export function speechSupported() {
  if (typeof window === "undefined") return false;
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

// Speak text aloud. lang examples: "hi-IN", "en-IN"
export function speak(text, lang = "hi-IN") {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

// Listen once and resolve with the transcript.
export function listen(lang = "en-IN") {
  return new Promise((resolve, reject) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return reject(new Error("Speech recognition is not supported in this browser. Use Chrome or type instead."));
    const rec = new SR();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => resolve(e.results[0][0].transcript);
    rec.onerror = (e) => reject(new Error(e.error || "Could not hear anything"));
    rec.onnomatch = () => reject(new Error("Could not understand. Try again."));
    rec.start();
  });
}
