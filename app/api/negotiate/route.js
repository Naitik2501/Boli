// Translates one negotiation message and extracts the offer as structured numbers,
// so the rupee amount shown to the other side never depends on free-form translation.
export async function POST(req) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return Response.json({ error: "GEMINI_API_KEY is not set. Add it to .env.local." }, { status: 500 });
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  try {
    const { from, text, listing } = await req.json();
    const target = from === "buyer" ? "Hindi (Devanagari script)" : "English";
    const prompt = `Product: ${listing.title_en}, asking ₹${listing.price_inr}.
A ${from} said: "${text}"
Translate it into natural, polite ${target}. Keep every number exactly as said.
Return ONLY JSON: {"translated": string, "amount_inr": number|null (total amount offered or asked), "quantity": number|null, "intent": "offer"|"counter"|"accept"|"reject"|"question"}`;

    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", temperature: 0.2 } }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error?.message || "Gemini request failed");
    return Response.json(JSON.parse(data.candidates[0].content.parts[0].text));
  } catch (e) {
    return Response.json({ error: e.message || "Translation failed" }, { status: 500 });
  }
}
