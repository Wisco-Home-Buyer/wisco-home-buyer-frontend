import React from "react";
import Image from "next/image";
import { Zap } from "lucide-react";

export function CTABanner() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden text-center flex flex-col items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/CTABanner.png"
          alt="Beautiful Wisconsin home at dusk"
          fill
          priority
          unoptimized
          className="object-cover"
        />
        {/* Dark Blue Overlay for Text Readability */}
        <div className="absolute inset-0 bg-[#06182c]/0 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-16 max-w-4xl mx-auto space-y-6 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs md:text-sm font-medium text-slate-300/90 shadow-sm">
          <Zap className="h-3.5 w-3.5 fill-current text-[#CBD5E1]" />
          <span className="text-[#CBD5E1]">No Obligation. 100% Free.</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Ready to Sell Your Wisconsin Home?
        </h2>
        <p className="text-sm md:text-xl text-[#CBD5E1] font-medium max-w-2xl mx-auto leading-relaxed">
          Join 500+ homeowners who chose the smarter, faster way to sell. Get your fair cash offer today.
        </p>

        <div className="pt-4">
          <button className="bg-[#4B6983] hover:bg-blue-500 active:scale-95 text-white font-bold text-sm md:text-base px-8 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
            Get My FREE Cash Offer!
          </button>
        </div>

        <span className="text-xxs md:text-xs text-[#BECADA] font-medium tracking-wide block pt-2">
          No obligation. No fees. Just a fair cash offer — guaranteed.
        </span>
      </div>
    </section>
  );
}
