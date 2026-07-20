import { Hero } from "@/components/features/home/Hero";
import { Stats } from "@/components/features/home/Stats";
import { Process } from "@/components/features/home/Process";
import { Advantages } from "@/components/features/home/Advantages";
import { TrustBanner } from "@/components/features/home/TrustBanner";
import { Journey } from "@/components/features/home/Journey";
import { Impact } from "@/components/features/home/Impact";

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
    </div>
  );
}
