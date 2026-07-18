
import { Hero } from "@/components/features/home/Hero";
import { Stats } from "@/components/features/home/Stats";
import { Process } from "@/components/features/home/Process";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <Process />
    </div>
  );
}
