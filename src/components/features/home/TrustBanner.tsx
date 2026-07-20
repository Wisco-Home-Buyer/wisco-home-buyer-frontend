"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TrustBanner() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%",
        toggleActions: "play none none reset",
      }
    });

    tl.fromTo(
      ".trust-tagline",
      { opacity: 0, x: -35 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(
      ".trust-divider",
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      ".trust-desc",
      { opacity: 0, x: 35 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-white border-y border-gray-100 overflow-hidden py-10 md:py-12">
      {/* Left side soft teal curved background */}
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[50%] h-[150%] bg-[#E8F5F5]/60 rounded-full blur-3xl z-0"
        style={{ transformOrigin: "left center" }}
      />

      {/* Right side tree line background fade */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-full opacity-95 md:opacity-95 z-0"
        style={{
          backgroundImage: `url('/images/trustBanner.png')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-16 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left gap-6 md:gap-0">
          {/* Tagline */}
          <div className="trust-tagline flex-1 md:pr-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#0A2F59] tracking-tight font-marhey">
              Local. Trusted. Hassle - Free.
            </h2>
          </div>

          {/* Vertical Divider */}
          <div className="trust-divider hidden md:block w-px h-12 bg-gray-200 mx-8" />

          {/* Description */}
          <div className="trust-desc flex-1 md:pl-8 max-w-md">
            <p className="text-sm md:text-base text-gray-500 leading-relaxed font-medium">
              We make selling your home simple, so you can move forward with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

