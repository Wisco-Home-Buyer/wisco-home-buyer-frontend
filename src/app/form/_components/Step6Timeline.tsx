"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

interface Step6TimelineProps {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step6Timeline({
  value,
  onChange,
  onNext,
  onBack,
}: Step6TimelineProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      onNext();
    }
  };

  const options = [
    { label: "Immediately", value: "IMMEDIATELY" },
    { label: "30 Days", value: "THIRTY_DAYS" },
    { label: "60 Days", value: "SIXTY_DAYS" },
    { label: "Just Exploring", value: "JUST_EXPLORING" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#0B2545] tracking-tight">
          Timeline
        </h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          Please provide accurate information for the best offer.
        </p>
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`w-full text-left py-4 px-6 rounded-2xl border font-bold text-sm md:text-base transition-all cursor-pointer ${
                isSelected
                  ? "bg-slate-100/80 border-blue-900 text-blue-950 shadow-2xs"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#0B2545]/80 hover:text-blue-950 transition-colors py-2.5 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          type="submit"
          disabled={!value}
          className="bg-blue-950 hover:bg-blue-900 disabled:opacity-50 text-white rounded-lg px-8 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
