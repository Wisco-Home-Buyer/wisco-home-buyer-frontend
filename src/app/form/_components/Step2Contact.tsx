"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

interface Step2ContactProps {
  formData: {
    fullName: string;
    phone: string;
    email: string;
  };
  updateFormData: (fields: Partial<Step2ContactProps["formData"]>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Contact({ formData, updateFormData, onNext, onBack }: Step2ContactProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName.trim() && formData.phone.trim() && formData.email.trim()) {
      onNext();
    }
  };

  const isFormValid = 
    formData.fullName.trim() !== "" && 
    formData.phone.trim() !== "" && 
    formData.email.trim() !== "";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#0B2545] tracking-tight">
          Your Information
        </h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          Please provide accurate information for the best offer.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            placeholder="John Doe"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            placeholder="(555) 123-4567"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="john@example.com"
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
          disabled={!isFormValid}
          className="bg-blue-950 hover:bg-blue-900 disabled:opacity-50 text-white rounded-lg px-8 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
