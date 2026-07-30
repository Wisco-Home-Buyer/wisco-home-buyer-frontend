"use client";

import { useState, useRef } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { ResumeProgressModal } from "./ResumeProgressModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CashOfferContent() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  const handleStartSelling = () => {
    const saved = localStorage.getItem("tygry8-form-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.step && parsed.step > 1) {
          setShowModal(true);
          return;
        }
      } catch {
        // corrupted data — go fresh
      }
    }
    router.push("/form");
  };

  const features = [
    "No repairs or cleaning required",
    "No agent commissions or hidden fees",
    "Close on your timeline (as fast as 7 days)",
    "We cover all closing costs",
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".cash-headline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
      )
        .fromTo(
          ".cash-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".cash-feature",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          ".cash-cta-btn",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        )
        .fromTo(
          ".cash-right-card",
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.8"
        )
        .fromTo(
          ".cash-step-item",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <>
      <div ref={containerRef} className="flex-1 bg-white pt-32 pb-12 md:pt-48 md:pb-24">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Column: Headline and Features */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h1 className="cash-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B2545] tracking-tight leading-tight">
                  Ready to see your <br className="hidden md:inline" /> cash
                  offer?
                </h1>
                <p className="cash-desc text-sm md:text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
                  Answer a few quick questions about your property. It takes
                  less than 2 minutes and there&apos;s absolutely no obligation.
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 md:space-y-4 max-w-md">
                {features.map((feature, index) => (
                  <div key={index} className="cash-feature flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-emerald-600 stroke-3" />
                    </div>
                    <span className="text-sm md:text-base font-semibold text-[#0B2545]/90">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="cash-cta-btn pt-1 md:pt-2">
                <button
                  onClick={handleStartSelling}
                  className="inline-flex items-center justify-center bg-blue-950 hover:bg-blue-900 text-white rounded-lg px-8 py-3.5 text-base font-bold transition-all shadow-md active:scale-[0.98] cursor-pointer w-full sm:w-auto"
                >
                  Start Selling
                </button>
              </div>
            </div>

            {/* Right Column: Confidential Card and Vertical Stepper */}
            <div className="cash-right-card lg:col-span-5 bg-slate-50 border border-gray-100 rounded-3xl p-5 md:p-8 space-y-6 md:space-y-8 shadow-md drop-shadow-xl">
              {/* Confidential Badge */}
              <div className="flex items-center gap-3.5 bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5 text-blue-900" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm leading-tight">
                    Secure &amp; Confidential
                  </h4>
                  <p className="text-xxs md:text-xs text-gray-500 font-medium">
                    Your information is never shared.
                  </p>
                </div>
              </div>

              {/* Staggered Stepper Timeline */}
              <div className="relative space-y-6">
                {/* Connecting Vertical Line in the middle */}
                <div className="absolute left-1/2 top-6 bottom-4 w-0.5 bg-gray-200 -translate-x-1/2 z-0" />

                {/* Step 1: Submit Details (Right side) */}
                <div className="cash-step-item relative grid grid-cols-2 gap-4 md:gap-8 items-center min-h-20 z-10">
                  <div />
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs md:text-sm font-bold text-[#0B2545] shadow-xs">
                    1
                  </div>
                  <div className="pl-3 md:pl-4">
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
                      <h4 className="font-bold text-gray-900 text-xs md:text-sm leading-tight">
                        Submit Details
                      </h4>
                      <p className="text-[10px] md:text-xs text-gray-500 font-medium leading-normal mt-0.5">
                        Basic info about your home
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2: Data Review (Left side) */}
                <div className="cash-step-item relative grid grid-cols-2 gap-4 md:gap-8 items-center min-h-20 z-10">
                  <div className="pr-3 md:pr-4">
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
                      <h4 className="font-bold text-gray-900 text-xs md:text-sm leading-tight">
                        Data Review
                      </h4>
                      <p className="text-[10px] md:text-xs text-gray-500 font-medium leading-normal mt-0.5">
                        We analyze local market data
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs md:text-sm font-bold text-[#0B2545] shadow-xs">
                    2
                  </div>
                  <div />
                </div>

                {/* Step 3: Cash Offer (Right side) */}
                <div className="cash-step-item relative grid grid-cols-2 gap-4 md:gap-8 items-center min-h-20 z-10">
                  <div />
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs md:text-sm font-bold text-[#0B2545] shadow-xs">
                    3
                  </div>
                  <div className="pl-3 md:pl-4">
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
                      <h4 className="font-bold text-gray-900 text-xs md:text-sm leading-tight">
                        Cash Offer
                      </h4>
                      <p className="text-[10px] md:text-xs text-gray-500 font-medium leading-normal mt-0.5">
                        Receive your fair offer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && <ResumeProgressModal onClose={() => setShowModal(false)} />}
    </>
  );
}
