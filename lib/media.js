// Browser helpers for audio/camera capture.

export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1]);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}

// Grabs the current camera frame and applies a light "studio" tone pass.
// Note: ctx.filter is unsupported in Safari, where the frame is saved unfiltered.
// This is tone correction only, not background removal.
export function captureFrame(video) {
  const c = document.createElement("canvas");
  c.width = video.videoWidth || 960;
  c.height = video.videoHeight || 720;
  const ctx = c.getContext("2d");
  ctx.filter = "brightness(1.08) contrast(1.12) saturate(1.1)";
  ctx.drawImage(video, 0, 0, c.width, c.height);
  return c.toDataURL("image/jpeg", 0.85);
}
