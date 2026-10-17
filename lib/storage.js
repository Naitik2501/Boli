// Demo persistence: localStorage, so the artisan page and the store page
// share a listing in the SAME browser. Swap for Supabase to share across devices.
const KEY = "boli:listing";

export function saveListing(listing) {
  try { localStorage.setItem(KEY, JSON.stringify(listing)); } catch {}
}

export function loadListing() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
