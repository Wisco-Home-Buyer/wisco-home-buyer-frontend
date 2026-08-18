"use client";

import React from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";

export enum HouseAge {
  YEARS_0_19 = "YEARS_0_19",
  YEARS_20_49 = "YEARS_20_49",
  YEARS_50_PLUS = "YEARS_50_PLUS",
}

interface Step3DetailsProps {
  formData: {
    bedrooms: number | string;
    bathrooms: number | string;
    squareFeet: number | string;
    houseAge: HouseAge | string;
    lotSizeAcres: number | string;
  };
  updateFormData: (fields: Partial<Step3DetailsProps["formData"]>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3Details({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step3DetailsProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onNext();
    }
  };

  const handleNumberChange = (
    field: keyof Step3DetailsProps["formData"],
    val: string,
  ) => {
    if (val === "") {
      updateFormData({ [field]: "" });
    } else {
      const parsed = parseFloat(val);
      if (!isNaN(parsed)) {
        updateFormData({ [field]: parsed });
      }
    }
  };

  const isFormValid =
    formData.bedrooms !== "" &&
    formData.bathrooms !== "" &&
    formData.squareFeet !== "" &&
    Boolean(formData.houseAge) &&
    formData.lotSizeAcres !== "";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#0B2545] tracking-tight">
          Property Details
        </h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          Please provide accurate information for the best offer.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Bedrooms */}
        <div className="space-y-1.5">
          <label
            htmlFor="bedrooms"
            className="block text-xs font-bold text-[#0B2545]/85 uppercase tracking-wide"
          >
            Bedrooms
          </label>
          <input
            id="bedrooms"
            type="number"
            required
            min="0"
            value={formData.bedrooms}
            onChange={(e) => handleNumberChange("bedrooms", e.target.value)}
            placeholder="e.g. 3"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#0B2545]/10 transition-all shadow-2xs font-medium"
          />
        </div>

        {/* Bathrooms */}
        <div className="space-y-1.5">
          <label
            htmlFor="bathrooms"
            className="block text-xs font-bold text-[#0B2545]/85 uppercase tracking-wide"
          >
            Bathrooms
          </label>
          <input
            id="bathrooms"
            type="number"
            required
            min="0"
            step="any"
            value={formData.bathrooms}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                updateFormData({ bathrooms: "" });
              } else {
                const parsed = parseFloat(val);
                if (!isNaN(parsed)) {
                  updateFormData({ bathrooms: parsed });
                }
              }
            }}
            placeholder="e.g. 2"
            className="w-full bg-white border focus:border-[#0B2545] rounded-xl px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#0B2545]/10 transition-all shadow-2xs font-medium"
          />
        </div>

        {/* Square Feet */}
        <div className="space-y-1.5">
          <label
            htmlFor="squareFeet"
            className="block text-xs font-bold text-[#0B2545]/85 uppercase tracking-wide"
          >
            Square Feet
          </label>
          <div className="relative">
            <input
              id="squareFeet"
              type="number"
              required
              min="0"
              value={formData.squareFeet}
              onChange={(e) => handleNumberChange("squareFeet", e.target.value)}
              placeholder="e.g. 1500"
              className="w-full bg-white border focus:border-[#0B2545] rounded-xl pl-4 pr-16 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#0B2545]/10 transition-all shadow-2xs font-medium"
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-gray-400">
              sq ft
            </span>
          </div>
        </div>

        {/* Lot Size in Acres */}
        <div className="space-y-1.5">
          <label
            htmlFor="lotSizeAcres"
            className="block text-xs font-bold text-[#0B2545]/85 uppercase tracking-wide"
          >
            Lot Size (Acres)
          </label>
          <div className="relative">
            <input
              id="lotSizeAcres"
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.lotSizeAcres}
              onChange={(e) =>
                handleNumberChange("lotSizeAcres", e.target.value)
              }
              placeholder="e.g. 0.15"
              className="w-full bg-white border focus:border-[#0B2545] rounded-xl pl-4 pr-16 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#0B2545]/10 transition-all shadow-2xs font-medium"
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-gray-400">
              acres
            </span>
          </div>
        </div>

        {/* How old the house is */}
        <div className="sm:col-span-2 space-y-1.5">
          <label
            htmlFor="houseAge"
            className="block text-xs font-bold text-[#0B2545]/85 uppercase tracking-wide"
          >
            How old is the house?
          </label>
          <div className="relative">
            <select
              id="houseAge"
              required
              value={formData.houseAge || ""}
              onChange={(e) => updateFormData({ houseAge: e.target.value })}
              className="w-full bg-white border focus:border-[#0B2545] rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none focus:ring-4 focus:ring-[#0B2545]/10 transition-all shadow-2xs appearance-none cursor-pointer pr-10 font-medium"
            >
              <option value="" disabled className="text-gray-400">
                Select age
              </option>
              <option value={HouseAge.YEARS_0_19}>0-19 years</option>
              <option value={HouseAge.YEARS_20_49}>20-49 years</option>
              <option value={HouseAge.YEARS_50_PLUS}>50+ years</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
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
          disabled={!isFormValid}
          className="bg-blue-950 hover:bg-blue-900 disabled:opacity-50 text-white rounded-lg px-8 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
