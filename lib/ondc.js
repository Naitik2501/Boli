// Builds a Beckn-style catalog payload from a listing.
// This mirrors the Beckn/ONDC structure but is NOT validated against the ONDC sandbox.
export function buildCatalog(l) {
  const id = "boli-" + (l.title_en || "item").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
  return {
    context: {
      domain: "ONDC:RET",
      action: "on_search",
      core_version: "1.2.0",
      bpp_id: "boli.example.org",
      country: "IND",
    },
    message: {
      catalog: {
        "bpp/descriptor": { name: "BOLI Artisan Storefront" },
        "bpp/providers": [
          {
            id: "artisan-001",
            descriptor: { name: "Independent Artisan" },
            items: [
              {
                id,
                descriptor: {
                  name: l.title_en,
                  short_desc: l.description,
                  long_desc: l.story,
                  images: l.image ? ["(captured image)"] : [],
                },
                price: { currency: "INR", value: String(l.price_inr) },
                category_id: "Handicrafts",
                tags: [
                  { code: "attributes", list: [
                    { code: "material", value: l.material },
                    { code: "craft", value: l.craft },
                    { code: "function", value: l.function },
                    { code: "dimensions", value: l.dimensions },
                  ] },
                  { code: "care", list: [{ code: "instructions", value: l.care }] },
                ],
                "@ondc/org/returnable": false,
                "@ondc/org/time_to_ship": "P3D",
              },
            ],
          },
        ],
      },
    },
  };
}
