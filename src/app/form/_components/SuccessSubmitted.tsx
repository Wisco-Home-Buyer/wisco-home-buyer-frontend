"use client";

import React from "react";
import Link from "next/link";

export function SuccessSubmitted() {
  return (
    <div className="bg-white border-x border-b border-t-4 border-t-blue-950 border-gray-150 rounded-3xl p-6 md:p-8 shadow-md flex flex-col items-center space-y-6 text-center">
      
      {/* Green Checkmark Circle */}
      <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-2xs">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      {/* Header */}
      <div className="space-y-2.5">
        <h2 className="text-2xl font-bold text-[#0B2545] tracking-tight">
          Property Submitted!
        </h2>
        <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed px-2">
          Thank you for submitting your property details. Our system is currently analyzing the data and preparing your cash offer.
        </p>
      </div>

      {/* Timeline Info Box */}
      <div className="w-full bg-slate-50 border border-slate-100/70 rounded-2xl p-5 text-left space-y-4 shadow-2xs">
        <h4 className="text-sm font-extrabold text-[#0B2545] tracking-wide">
          What happens next?
        </h4>
        
        <div className="space-y-3.5">
          {/* Point 1 */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#EAF2F8] border border-blue-100/50 flex items-center justify-center shrink-0 text-[10px] font-bold text-[#0B2545] mt-0.5">
              1
            </div>
            <span className="text-xxs md:text-xs text-gray-500 font-bold leading-normal">
              We review your property details and local market data.
            </span>
          </div>

          {/* Point 2 */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#EAF2F8] border border-blue-100/50 flex items-center justify-center shrink-0 text-[10px] font-bold text-[#0B2545] mt-0.5">
              2
            </div>
            <span className="text-xxs md:text-xs text-gray-500 font-bold leading-normal">
              A specialist will contact you within 24 hours.
            </span>
          </div>

          {/* Point 3 */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#EAF2F8] border border-blue-100/50 flex items-center justify-center shrink-0 text-[10px] font-bold text-[#0B2545] mt-0.5">
              3
            </div>
            <span className="text-xxs md:text-xs text-gray-500 font-bold leading-normal">
              Receive your no-obligation cash offer.
            </span>
          </div>
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="w-full pt-2">
        <Link
          href="/"
          className="inline-flex items-center justify-center w-full bg-white border border-gray-200 hover:bg-slate-50 text-gray-700 rounded-xl py-3 text-sm font-bold shadow-2xs hover:shadow-xs transition-all active:scale-99"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
