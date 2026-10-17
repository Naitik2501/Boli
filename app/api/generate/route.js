// Server-side route so the API key never reaches the browser.
const PROMPT = `You are helping an Indian artisan list a handmade product. You get the artisan's spoken audio (Hindi, Hinglish or a regional dialect) and a photo of the product.
Return ONLY JSON with these keys:
transcript (what was said, in the original language), title_en, title_hi (Devanagari), description (2 sentences, English, buyer-facing),
material, craft, function, dimensions (use "Not stated" if unknown), price_inr (number, from what the artisan said),
price_floor_inr (number: the lowest price the artisan said they would accept, or null if not said), story (2 sentences, only from what was said or visible), care (1-2 sentences).
Also return Hindi (Devanagari) versions as description_hi, material_hi, craft_hi, function_hi, story_hi and care_hi.
Never invent a price, material or dimension that was not spoken or clearly visible.`;

export async function POST(req) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return Response.json({ error: "GEMINI_API_KEY is not set. Add it to .env.local." }, { status: 500 });
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  try {
    const { audioBase64, mime, image } = await req.json();
    const parts = [
      { text: PROMPT },
      { inline_data: { mime_type: mime || "audio/webm", data: audioBase64 } },
    ];
    if (image) parts.push({ inline_data: { mime_type: "image/jpeg", data: image.split(",")[1] } });

    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({ contents: [{ parts }], generationConfig: { responseMimeType: "application/json", temperature: 0.3 } }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error?.message || "Gemini request failed");

    const listing = JSON.parse(data.candidates[0].content.parts[0].text);
    // If the artisan gave no minimum, suggest 85% of the asking price. They can change it later.
    if (!listing.price_floor_inr) listing.price_floor_inr = Math.round(listing.price_inr * 0.85);
    return Response.json(listing);
  } catch (e) {
    return Response.json({ error: e.message || "Could not create the listing" }, { status: 500 });
  }
}
