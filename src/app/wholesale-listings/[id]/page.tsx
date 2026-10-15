import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchPublicListing,
  formatPrice,
  STATUS_LABELS,
  toEmbedUrl,
} from "@/lib/wholesale-listings";
import { InterestForm } from "../_components/InterestForm";
import { ListingGallery } from "../_components/ListingGallery";

export const dynamic = "force-dynamic";

interface ListingPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ListingPageProps): Promise<Metadata> {
  const { id } = await params;
  const listing = await fetchPublicListing(id);

  if (!listing) {
    return { title: "Listing not found | Wisco Home Buyer" };
  }

  return {
    title: `${listing.title} | Wholesale Listing`,
    description: listing.description.slice(0, 160),
  };
}

export default async function WholesaleListingPage({
  params,
}: ListingPageProps) {
  const { id } = await params;
  const listing = await fetchPublicListing(id);

  if (!listing) {
    notFound();
  }

  const embedUrl = listing.videoUrl ? toEmbedUrl(listing.videoUrl) : null;
  const facts = [
    listing.bedrooms != null ? `${listing.bedrooms} bedrooms` : null,
    listing.bathrooms != null ? `${listing.bathrooms} bathrooms` : null,
    listing.squareFeet != null
      ? `${listing.squareFeet.toLocaleString("en-US")} sqft`
      : null,
  ].filter(Boolean);

  return (
    <main className="flex-1 bg-white pt-32 pb-12 md:pt-48 md:pb-24">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-16 space-y-8">
        <Link
          href="/wholesale-listings"
          className="text-sm font-bold text-blue-900 underline underline-offset-2"
        >
          &larr; All listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <ListingGallery images={listing.images} title={listing.title} />

            {embedUrl ? (
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100">
                <iframe
                  src={embedUrl}
                  title={`${listing.title} video`}
                  className="w-full h-full"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : listing.videoUrl ? (
              <a
                href={listing.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-bold text-blue-900 underline underline-offset-2"
              >
                Watch the property video
              </a>
            ) : null}
          </div>

          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-32">
            <span className="inline-block px-2.5 py-1 rounded-full bg-slate-50 border border-gray-100 text-[11px] font-bold text-gray-600">
              {STATUS_LABELS[listing.status]}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B2545] tracking-tight leading-tight">
              {listing.title}
            </h1>
            <p className="text-3xl font-extrabold text-blue-950">
              {formatPrice(listing.price)}
            </p>
            <p className="text-sm text-gray-500 font-medium">
              {listing.street}, {listing.city}, {listing.state} {listing.zip}
            </p>
            {facts.length > 0 && (
              <p className="text-sm font-semibold text-gray-600">
                {facts.join(" · ")}
              </p>
            )}
            <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>

            {listing.status === "AVAILABLE" && (
              <InterestForm listingId={listing.id} />
            )}

            <div className="bg-slate-50 border border-gray-100 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-[#0B2545]">
                Want first access to deals like this?
              </p>
              <Link
                href="/wholesale"
                className="inline-flex items-center justify-center w-full bg-blue-950 hover:bg-blue-900 text-white rounded-xl py-3 text-sm font-bold"
              >
                Join the buyers list
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
