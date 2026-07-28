"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Animate background image immediately on load
      gsap.fromTo(
        ".hero-bg-img",
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.2, ease: "power2.out" },
      );

      // 2. Animate content timeline immediately on load
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        [
          ".hero-badge",
          ".hero-heading",
          ".hero-subheading",
          ".hero-buttons",
          ".hero-trust",
          ".hero-badges",
        ],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, delay: 0.1 },
      );
    },
    { scope: container },
  );

  const handleHowItWorksClick = () => {
    const el = document.getElementById("how-it-works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "/#how-it-works");
      window.dispatchEvent(new Event("hashchange"));
    }
  };

  return (
    <section
      ref={container}
      className="relative w-full min-h-screen flex items-center"
    >
      {/* Background Image Container */}
      <div
        className="hero-bg-img absolute inset-0 z-0 bg-gray-200"
        style={{
          backgroundImage: "url('/images/bannerImage.png')",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay for Text Readability - Responsive Wash */}
        <div className="absolute inset-0 bg-linear-to-b from-white/30 via-white/45 to-white/20 md:bg-linear-to-r lg:from-white lg:via-transparent lg:to-transparent"></div>
      </div>

      <div className="relative z-10 px-4 md:px-16 pt-32 pb-12 md:pt-40 md:pb-24">
        <div className="max-w-4xl space-y-8">
          {/* Top Badge */}
          <div className="flex justify-center sm:justify-start">
            <div className="hero-badge inline-flex items-center rounded-full bg-gray-200/80 px-3 py-1 text-sm font-medium text-gray-700">
              <span className="mr-2 h-2 w-2 rounded-full bg-gray-500"></span>
              Wisconsin&apos;s Cash Home Buyer
            </div>
          </div>

          {/* Heading */}
          <h1 className="hero-heading text-3xl md:text-[68px] font-bold tracking-tight text-gray-900 leading-[1.1] text-center sm:text-left">
            Sell Your Wisconsin Home Fast. Get a Fair Cash Offer Without the
            Hassle.
          </h1>

          {/* Subheading */}
          <p className="hero-subheading text-lg text-gray-900 font-medium max-w-lg leading-relaxed">
            Skip the agents, skip the repairs. Wisco Home Buyer gives you a fair
            cash offer in 24 hours — close in as little as 7 days.
          </p>

          {/* Action Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4">
            <Link href="/cash-offer" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#0A2F59] hover:bg-blue-900 text-white px-8 h-14 text-base cursor-pointer"
              >
                Get My FREE Cash Offer!
              </Button>
            </Link>
            <button
              onClick={handleHowItWorksClick}
              className="w-full sm:w-auto inline-flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white h-14 px-8 text-base cursor-pointer rounded-md font-medium transition-colors"
            >
              How It Works
            </button>
          </div>

          {/* Trust Rating Section */}
          <div className="hero-trust flex w-full sm:w-auto items-center justify-center sm:justify-start gap-3.5 bg-white sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none px-6 sm:px-0 h-14 sm:h-auto rounded-full sm:rounded-none border border-white/50 sm:border-none shadow-xs sm:shadow-none sm:pt-4">
            <div className="flex -space-x-3 shrink-0">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-full border-2 border-white bg-gray-300 overflow-hidden relative"
                >
                  <Image
                    src={`/images/customers/${i}.jpg`}
                    alt={`Customer ${i}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
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
              <p className="text-xs md:text-sm text-gray-900 font-semibold">
                <span className="font-extrabold text-gray-950">4.9/5</span> from
                500+ homeowners
              </p>
            </div>
          </div>

          {/* Bottom Trust Badges */}
          <div className="hero-badges flex flex-wrap justify-center sm:justify-start gap-3 pt-6">
            <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
              <Image
                src="/images/Licensed-Insured.svg"
                alt=""
                width={16}
                height={16}
                className="w-auto h-auto"
              />
              Licensed &amp; Insured
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
              <Image
                src="/images/Accredited.svg"
                alt=""
                width={16}
                height={16}
                className="w-auto h-auto"
              />
              BBB Accredited
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
              <Image
                src="/images/Homes-Sold.svg"
                alt=""
                width={16}
                height={16}
                className="w-auto h-auto"
              />
              500+ Homes Sold
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
