import type { Metadata } from "next";
import { Hero } from "@/components/features/home/Hero";
import { Stats } from "@/components/features/home/Stats";
import { Process } from "@/components/features/home/Process";
import { Advantages } from "@/components/features/home/Advantages";
import { TrustBanner } from "@/components/features/home/TrustBanner";
import { Journey } from "@/components/features/home/Journey";
import { Impact } from "@/components/features/home/Impact";
import { Testimonials } from "@/components/features/home/Testimonials";
import { FAQ } from "@/components/features/home/FAQ";
import { CTABanner } from "@/components/features/home/CTABanner";

export const metadata: Metadata = {
  title: "Wisco Home Buyer",
  description:
    "Wisco Home Buyer pays cash for Wisconsin homes in any condition. Get a free offer in 24 hours. No agent fees, no repairs, close in as little as 7 days.",
  openGraph: {
    title: "Wisco Home Buyer",
    description:
      "Get a free cash offer for your Wisconsin home — any condition, any situation. We close fast with zero fees.",
    url: "https://wiscohomebuyer.com",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <Process />
      <Advantages />
      <TrustBanner />
      <Journey />
      <Impact />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </div>
  );
}
