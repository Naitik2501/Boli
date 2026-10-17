# BOLI · बोली

Voice-first storefronts and live translated bargaining for artisans.
Built for GDG on Campus NSUT · Devlympics 2026 (theme: Bridge the Gap).

## Run it

```bash
npm install
cp .env.example .env.local   # then add your GEMINI_API_KEY
npm run dev
```

Open http://localhost:3000 in Chrome. Camera, microphone and voice recognition need `localhost` or HTTPS.

## Project layout

| Path | What it is |
| --- | --- |
| `app/page.js` | Landing page with the Sell and Buy paths |
| `app/artisan/page.js` | Artisan flow: record, confirm by voice, publish |
| `app/store/page.js` | Buyer storefront with bargaining and ONDC view |
| `app/api/generate/route.js` | Audio + photo to structured listing (Gemini, server side) |
| `app/api/negotiate/route.js` | Translates offers and extracts amounts |
| `components/` | Header, Recorder, ListingCard, NegotiationChat, OndcViewer |
| `lib/` | Media capture, speech helpers, storage, ONDC builder, sample data |

## What is real and what is a stand-in

Real: voice + photo to listing, spoken read-back, English/Hindi translation, price-floor hints, Beckn-style catalog JSON.
Stand-ins: listings are saved in `localStorage` (same browser only), the "studio" look is a tone adjustment, and the ONDC JSON is not validated against the sandbox. Browser speech works best in Chrome or Edge.

## Push to GitHub

```bash
git init
git add .
git commit -m "BOLI frontend"
git branch -M main
git remote add origin https://github.com/<your-username>/boli.git
git push -u origin main
```
