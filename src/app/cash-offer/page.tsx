"use client";

import { Check, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CashOfferPage() {
  const features = [
    "No repairs or cleaning required",
    "No agent commissions or hidden fees",
    "Close on your timeline (as fast as 7 days)",
    "We cover all closing costs",
  ];

  return (
    <div className="flex-1 bg-white pt-24 pb-16 md:pt-56 md:pb-24">
      <div className="max-w-[90%] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline and Features */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B2545] tracking-tight leading-tight">
                Ready to see your <br className="hidden md:inline" /> cash offer?
              </h1>
              <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
                Answer a few quick questions about your property. It takes less than 2 minutes and there&apos;s absolutely no obligation.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-4 max-w-md">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
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
            <div className="pt-2">
              <Link 
                href="/form" 
                className="inline-flex items-center justify-center bg-blue-950 hover:bg-blue-900 text-white rounded-lg px-8 py-3.5 text-base font-bold transition-all shadow-md active:scale-98 cursor-pointer"
              >
                Start Selling
              </Link>
            </div>
          </div>

          {/* Right Column: Confidential Card and Vertical Stepper */}
          <div className="lg:col-span-5 bg-slate-50 border border-gray-100 rounded-3xl p-6 md:p-8 space-y-8 shadow-md drop-shadow-xl">
            
            {/* Confidential Badge */}
            <div className="flex items-center gap-3.5 bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5 text-blue-900" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm leading-tight">
                  Secure & Confidential
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
              <div className="relative grid grid-cols-2 gap-4 md:gap-8 items-center min-h-20 z-10">
                {/* Left side empty placeholder */}
                <div />
                
                {/* Middle Circle */}
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs md:text-sm font-bold text-[#0B2545] shadow-xs">
                  1
                </div>

                {/* Right side Card */}
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
              <div className="relative grid grid-cols-2 gap-4 md:gap-8 items-center min-h-20 z-10">
                {/* Left side Card */}
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

                {/* Middle Circle */}
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs md:text-sm font-bold text-[#0B2545] shadow-xs">
                  2
                </div>

                {/* Right side empty placeholder */}
                <div />
              </div>

              {/* Step 3: Cash Offer (Right side) */}
              <div className="relative grid grid-cols-2 gap-4 md:gap-8 items-center min-h-20 z-10">
                {/* Left side empty placeholder */}
                <div />

                {/* Middle Circle */}
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs md:text-sm font-bold text-[#0B2545] shadow-xs">
                  3
                </div>

                {/* Right side Card */}
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
  );
}
