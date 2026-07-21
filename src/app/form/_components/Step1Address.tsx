"use client";

import React from "react";
import Image from "next/image";

interface Step1AddressProps {
  formData: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
  };
  updateFormData: (fields: Partial<Step1AddressProps["formData"]>) => void;
  onNext: () => void;
}

export function Step1Address({ formData, updateFormData, onNext }: Step1AddressProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.streetAddress.trim()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#0B2545] tracking-tight">
          Property Address
        </h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          Please provide accurate information for the best offer.
        </p>
      </div>

      <div className="space-y-4">
        {/* Street Address */}
        <div className="space-y-1.5">
          <label htmlFor="streetAddress" className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide">
            Street Address
          </label>
          <input
            id="streetAddress"
            type="text"
            required
            value={formData.streetAddress}
            onChange={(e) => updateFormData({ streetAddress: e.target.value })}
            placeholder="e.g. 123 Main St"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
          />
        </div>

        {/* City, State and Zip Code */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="city" className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide">
              City
            </label>
            <input
              id="city"
              type="text"
              required
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              placeholder="Milwaukee"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="state" className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide">
              State
            </label>
            <input
              id="state"
              type="text"
              required
              value={formData.state}
              onChange={(e) => updateFormData({ state: e.target.value })}
              placeholder="WI"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="zipCode" className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide">
              ZIP Code
            </label>
            <input
              id="zipCode"
              type="text"
              required
              value={formData.zipCode}
              onChange={(e) => updateFormData({ zipCode: e.target.value })}
              placeholder="53202"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Map Preview Container */}
      <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-gray-150 shadow-2xs bg-slate-50">
        <Image
          src="/images/map_preview.png"
          alt="Map preview of the location"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={!formData.streetAddress.trim()}
          className="bg-blue-950 hover:bg-blue-900 disabled:opacity-50 text-white rounded-lg px-8 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
