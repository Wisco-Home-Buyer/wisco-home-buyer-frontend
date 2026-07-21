"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

interface Step3DetailsProps {
  formData: {
    bedrooms: number | string;
    bathrooms: number | string;
    squareFeet: number | string;
    yearBuilt: number | string;
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
    formData.yearBuilt !== "" &&
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

      <div className="space-y-4">
        {/* First Row: 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Bedrooms */}
          <div className="space-y-1.5">
            <label
              htmlFor="bedrooms"
              className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide"
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
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
            />
          </div>

          {/* Bathrooms */}
          <div className="space-y-1.5">
            <label
              htmlFor="bathrooms"
              className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide"
            >
              Bathrooms
            </label>
            <input
              id="bathrooms"
              type="number"
              required
              min="0"
              step="0.5"
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
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
            />
          </div>
        </div>

        {/* Second Row: 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Square Feet */}
          <div className="space-y-1.5">
            <label
              htmlFor="squareFeet"
              className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide"
            >
              Square Feet
            </label>
            <input
              id="squareFeet"
              type="number"
              required
              min="0"
              value={formData.squareFeet}
              onChange={(e) => handleNumberChange("squareFeet", e.target.value)}
              placeholder="e.g. 1500"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
            />
          </div>

          {/* Lot Size in Acres */}
          <div className="space-y-1.5">
            <label
              htmlFor="lotSizeAcres"
              className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide"
            >
              Lot Size (Acres)
            </label>
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
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
            />
          </div>

          {/* Year Built */}
          <div className="space-y-1.5">
            <label
              htmlFor="yearBuilt"
              className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide"
            >
              Year Built
            </label>
            <input
              id="yearBuilt"
              type="number"
              required
              min="1700"
              max={new Date().getFullYear()}
              value={formData.yearBuilt}
              onChange={(e) => handleNumberChange("yearBuilt", e.target.value)}
              placeholder="e.g. 1950"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
            />
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
