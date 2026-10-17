"use client";
import { useEffect, useState } from "react";
import ListingCard from "@/components/ListingCard";
import NegotiationChat from "@/components/NegotiationChat";
import OndcViewer from "@/components/OndcViewer";
import { useLang } from "@/components/LangProvider";
import { loadListing } from "@/lib/storage";
import { SAMPLE_LISTING } from "@/lib/sample";

export default function StorePage() {
  const { t } = useLang();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    setListing(loadListing() || SAMPLE_LISTING);
  }, []);

  if (!listing) return <p className="animate-blink">{t("loading")}</p>;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        {listing.sample && <p className="animate-pop rounded-lg bg-marigold/20 p-3 text-sm font-semibold">{t("sampleBanner")}</p>}
        <ListingCard listing={listing} />
      </div>
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "250ms" }}>
        <NegotiationChat listing={listing} />
        <OndcViewer listing={listing} />
      </div>
    </div>
  );
}