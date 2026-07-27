"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTABanner() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Background slow zoom on scroll
      gsap.fromTo(
        ".cta-bg-img",
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        },
      );

      // Stagger animation for content on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      });

      tl.fromTo(
        [".cta-badge", ".cta-heading", ".cta-desc", ".cta-btn", ".cta-footer"],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative py-20 md:py-28 overflow-hidden text-center flex flex-col items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="cta-bg-img absolute inset-0 w-full h-full"
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src="/images/CTABanner.png"
            alt="Beautiful Wisconsin home at dusk"
            fill
            sizes="100vw"
            priority
            unoptimized
            className="object-cover"
          />
        </div>
        {/* Dark Blue Overlay for Text Readability */}
        <div className="absolute inset-0 bg-[#06182c]/0 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-16 max-w-4xl mx-auto space-y-6 flex flex-col items-center">
        <div className="cta-badge inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs md:text-sm font-medium text-slate-300/90 shadow-sm">
          <Zap className="h-3.5 w-3.5 fill-current text-[#CBD5E1]" />
          <span className="text-[#CBD5E1]">No Obligation. 100% Free.</span>
        </div>
        <h2 className="cta-heading text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Ready to Sell Your Wisconsin Home?
        </h2>
        <p className="cta-desc text-sm md:text-xl text-[#CBD5E1] font-medium max-w-2xl mx-auto leading-relaxed">
          Join 500+ homeowners who chose the smarter, faster way to sell. Get
          your fair cash offer today.
        </p>

        <div className="cta-btn pt-4">
          <Link
            href="/cash-offer"
            className="inline-block bg-[#4B6983] hover:bg-[#3f5c75] duration-300 active:scale-95 text-white font-bold text-sm md:text-base px-8 py-3.5 rounded-lg shadow-lg cursor-pointer"
          >
            Get My FREE Cash Offer!
          </Link>
        </div>

        <span className="cta-footer text-xxs md:text-xs text-[#BECADA] font-medium tracking-wide block pt-2">
          No obligation. No fees. Just a fair cash offer — guaranteed.
        </span>
      </div>
    </section>
  );
}
