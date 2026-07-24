import type { Metadata } from "next";
import { CashOfferContent } from "./_components/CashOfferContent";

export const metadata: Metadata = {
  title: "Get a Free Cash Offer for Your Wisconsin Home",
  description:
    "Fill out our quick 2-minute form and receive a no-obligation cash offer for your Wisconsin home within 24 hours. No repairs, no fees, close in 7 days.",
  openGraph: {
    title: "Get a Free Cash Offer | Wisco Home Buyer",
    description:
      "Get your free cash offer in 24 hours. No agent fees, no repairs, no hassle. We buy Wisconsin homes fast.",
    url: "https://wiscohomebuyer.com/cash-offer",
  },
};

export default function CashOfferPage() {
  return <CashOfferContent />;
}
