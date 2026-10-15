import type { Metadata } from "next";
import Link from "next/link";
import { fetchPublicListings } from "@/lib/wholesale-listings";
import { ListingCard } from "./_components/ListingCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wholesale Listings | Off-Market Wisconsin Deals",
  description:
    "Browse wholesale real estate deals in Wisconsin. Join our buyers list to see private off-market deals first.",
  openGraph: {
    title: "Wholesale Listings | Wisco Home Buyer",
    description:
      "Wholesale real estate deals in Wisconsin, listed by Wisco Home Buyer.",
    url: "https://wiscohomebuyer.com/wholesale-listings",
  },
};

export default async function WholesaleListingsPage() {
  const listings = await fetchPublicListings();

  return (
    <main className="flex-1 bg-white pt-32 pb-12 md:pt-48 md:pb-24">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-16 space-y-8 md:space-y-12">
        <div className="space-y-3 md:space-y-4 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B2545] tracking-tight leading-tight">
            Wholesale Listings
          </h1>
          <p className="text-sm md:text-lg text-gray-500 font-medium leading-relaxed">
            Current wholesale deals in Wisconsin. Some deals are shared only
            with our buyers list.{" "}
            <Link
              href="/wholesale"
              className="font-bold text-blue-900 underline underline-offset-2"
            >
              Join the list
            </Link>{" "}
            to see them first.
          </p>
        </div>

        {listings === null ? (
          <p className="text-sm font-semibold text-gray-500">
            We couldn&apos;t load the listings right now. Please try again in a
            few minutes.
          </p>
        ) : listings.length === 0 ? (
          <div className="bg-slate-50 border border-gray-100 rounded-3xl p-8 text-center space-y-3">
            <p className="font-bold text-[#0B2545]">
              No public listings right now.
            </p>
            <p className="text-sm text-gray-500 font-medium">
              New deals go to our buyers list first.
            </p>
            <Link
              href="/wholesale"
              className="inline-flex items-center justify-center bg-blue-950 hover:bg-blue-900 text-white rounded-xl px-5 py-3 text-sm font-bold"
            >
              Join the buyers list
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
