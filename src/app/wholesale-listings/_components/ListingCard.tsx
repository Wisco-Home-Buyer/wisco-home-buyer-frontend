import Link from "next/link";
import {
  formatPrice,
  resolveAssetUrl,
  STATUS_LABELS,
  type PublicWholesaleListing,
} from "@/lib/wholesale-listings";

const STATUS_STYLES: Record<PublicWholesaleListing["status"], string> = {
  AVAILABLE: "bg-emerald-50 text-emerald-700 border-emerald-100",
  UNDER_CONTRACT: "bg-amber-50 text-amber-700 border-amber-100",
  SOLD: "bg-gray-100 text-gray-600 border-gray-200",
};

export function ListingCard({ listing }: { listing: PublicWholesaleListing }) {
  const cover = listing.images[0];
  const facts = [
    listing.bedrooms != null ? `${listing.bedrooms} bd` : null,
    listing.bathrooms != null ? `${listing.bathrooms} ba` : null,
    listing.squareFeet != null
      ? `${listing.squareFeet.toLocaleString("en-US")} sqft`
      : null,
  ].filter(Boolean);

  return (
    <Link
      href={`/wholesale-listings/${listing.id}`}
      className="group block bg-white border border-gray-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-4/3 bg-slate-100">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolveAssetUrl(cover)}
            alt={listing.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-gray-400">
            No photo yet
          </div>
        )}
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full border text-[11px] font-bold ${STATUS_STYLES[listing.status]}`}
        >
          {STATUS_LABELS[listing.status]}
        </span>
      </div>

      <div className="p-5 space-y-2">
        <p className="text-2xl font-extrabold text-[#0B2545] tracking-tight">
          {formatPrice(listing.price)}
        </p>
        <h3 className="font-bold text-gray-900 leading-snug">
          {listing.title}
        </h3>
        <p className="text-sm text-gray-500 font-medium">
          {listing.street}, {listing.city}, {listing.state} {listing.zip}
        </p>
        {facts.length > 0 && (
          <p className="text-xs font-semibold text-gray-400">
            {facts.join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
