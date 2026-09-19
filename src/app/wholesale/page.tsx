import type { Metadata } from "next";
import { WholesaleContent } from "./_components/WholesaleContent";

export const metadata: Metadata = {
  title: "Join Our Buyers List | Off-Market Wisconsin Deals",
  description:
    "Join our buyers list and get access to off-market Wisconsin real estate deals before anyone else. Free to join, no obligation.",
  openGraph: {
    title: "Join Our Buyer's List | Wisco Home Buyer",
    description:
      "Get access to off-market deals in Wisconsin the moment they're available. Join our buyers list for free.",
    url: "https://wiscohomebuyer.com/wholesale",
  },
};

export default function WholesalePage() {
  return <WholesaleContent />;
}
