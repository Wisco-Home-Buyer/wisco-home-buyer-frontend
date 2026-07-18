import { Button } from "@/components/ui/button";
import { ShieldCheck, Award, Home, Star } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center">
      <div
        className="absolute inset-0 z-0 bg-gray-200"
        style={{
          backgroundImage: "url('/images/bannerImage.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/85 to-transparent"></div>
      </div>

      <div className=" relative z-10 px-4 md:px-16 pt-32 pb-12 md:pt-40 md:pb-24">
        <div className="max-w-2xl space-y-8">
          {/* Top Badge */}
          <div className="inline-flex items-center rounded-full bg-gray-200/80 px-3 py-1 text-sm font-medium text-gray-700">
            <span className="mr-2 h-2 w-2 rounded-full bg-gray-500"></span>
            Wisconsin&apos;s Cash Home Buyer
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
            Sell Your Wisconsin Home Fast. Get a Fair Cash Offer Without the{" "}
            <span className="text-blue-900">Hassle</span>.
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-700 max-w-lg">
            Skip the agents, skip the repairs. Wisco Home Buyer gives you a fair
            cash offer in 24 hours — close in as little as 7 days.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-blue-950 hover:bg-blue-900 text-white px-8 h-12 text-base"
            >
              Get My FREE Cash Offer!
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-white h-12 px-8 text-base"
            >
              How It Works
            </Button>
          </div>

          {/* Trust Rating Section */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden relative"
                >
                  <Image
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt={`Customer ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">4.9/5</span> from 500+
                homeowners
              </p>
            </div>
          </div>

          {/* Bottom Trust Badges */}
          <div className="flex flex-wrap gap-3 pt-6">
            <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
              <ShieldCheck className="h-4 w-4 text-blue-900" />
              Licensed & Insured
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
              <Award className="h-4 w-4 text-blue-900" />
              BBB Accredited
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
              <Home className="h-4 w-4 text-blue-900" />
              500+ Homes Sold
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
