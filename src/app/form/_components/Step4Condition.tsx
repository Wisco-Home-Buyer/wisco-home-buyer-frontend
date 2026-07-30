"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

interface Step4ConditionProps {
  formData: {
    roofCondition: string;
    kitchenCondition: string;
    bathroomCondition: string;
    foundationCondition: string;
    otherRepairsNeeded: string;
  };
  updateFormData: (fields: Partial<Step4ConditionProps["formData"]>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step4Condition({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step4ConditionProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const conditionOptions = [
    { label: "Good", value: "GOOD" },
    { label: "Fair", value: "FAIR" },
    { label: "Needs Work", value: "NEEDS_WORK" },
  ];

  const sections = [
    { label: "Roof Condition", key: "roofCondition" as const },
    { label: "Kitchen Condition", key: "kitchenCondition" as const },
    { label: "Bathroom Condition", key: "bathroomCondition" as const },
    { label: "Foundation Condition", key: "foundationCondition" as const },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#0B2545] tracking-tight">
          Condition
        </h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          Please provide accurate information for the best offer.
        </p>
      </div>

      <div className="space-y-4 md:space-y-5">
        {sections.map((section) => (
          <div key={section.key} className="space-y-1.5 md:space-y-2">
            <span className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide">
              {section.label}
            </span>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {conditionOptions.map((option) => {
                const isSelected = formData[section.key] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      updateFormData({ [section.key]: option.value })
                    }
                    className={`py-2.5 px-2 sm:px-4 text-xs md:text-sm font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-950 border-blue-950 text-white shadow-2xs"
                        : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Other Repairs Needed */}
        <div className="space-y-1.5 pt-2">
          <label
            htmlFor="otherRepairs"
            className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide"
          >
            Other Repairs Needed (Optional)
          </label>
          <input
            id="otherRepairs"
            type="text"
            value={formData.otherRepairsNeeded}
            onChange={(e) =>
              updateFormData({ otherRepairsNeeded: e.target.value })
            }
            placeholder="e.g. HVAC needs replacement"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
          />
        </div>
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
          className="bg-blue-950 hover:bg-blue-900 text-white rounded-lg px-8 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
