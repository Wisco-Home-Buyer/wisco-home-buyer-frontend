"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

interface Step8ReviewProps {
  formData: {
    address: {
      streetAddress: string;
      city: string;
      zipCode: string;
    };
    contact: {
      fullName: string;
      phone: string;
      email: string;
    };
    details: {
      bedrooms: number | string;
      bathrooms: number | string;
      squareFeet: number | string;
      yearBuilt: number | string;
    };
    condition: {
      roofCondition: string;
      kitchenCondition: string;
      bathroomCondition: string;
      foundationCondition: string;
      otherRepairsNeeded: string;
    };
    occupancy: string;
    timeline: string;
    imageUrls: string[];
  };
  onEdit: (step: number) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function Step8Review({
  formData,
  onEdit,
  onSubmit,
  onBack,
  isSubmitting,
}: Step8ReviewProps) {
  const formatValue = (val: string) => {
    return val
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#0B2545] tracking-tight">
          Review
        </h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          Please provide accurate information for the best offer.
        </p>
      </div>

      <div className="space-y-4">
        {/* Section 1: Property */}
        <div className="border border-slate-100 bg-slate-50/30 rounded-2xl p-4 flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-[#0B2545] text-sm">Property</h4>
            <p className="text-xs text-gray-500 font-medium leading-normal">
              {formData.address.streetAddress}, {formData.address.city},{" "}
              {formData.address.zipCode}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onEdit(1)}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
          >
            Edit
          </button>
        </div>

        {/* Section 2: Contact */}
        <div className="border border-slate-100 bg-slate-50/30 rounded-2xl p-4 flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-[#0B2545] text-sm">Contact</h4>
            <p className="text-xs text-gray-500 font-medium leading-normal">
              • Name: {formData.contact.fullName} <br />• Phone:{" "}
              {formData.contact.phone} <br />• Email: {formData.contact.email}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onEdit(2)}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
          >
            Edit
          </button>
        </div>

        {/* Section 3: Details */}
        <div className="border border-slate-100 bg-slate-50/30 rounded-2xl p-4 flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-[#0B2545] text-sm">Details</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              • Timeline: {formatValue(formData.timeline)} <br />• Occupancy:{" "}
              {formatValue(formData.occupancy)} <br />• Space:{" "}
              {formData.details.bedrooms} Beds / {formData.details.bathrooms}{" "}
              Baths / {formData.details.squareFeet} SqFt <br />• Year Built:{" "}
              {formData.details.yearBuilt} <br />• Condition: Roof (
              {formData.condition.roofCondition}), Kitchen (
              {formData.condition.kitchenCondition}), Bath (
              {formData.condition.bathroomCondition}), Foundation (
              {formData.condition.foundationCondition}) <br />• Repairs:{" "}
              {formData.condition.otherRepairsNeeded || "None"} <br />• Images:{" "}
              {formData.imageUrls.length} Uploaded
            </p>
          </div>
          <button
            type="button"
            onClick={() => onEdit(3)}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
          >
            Edit
          </button>
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
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`bg-blue-950 hover:bg-blue-900 text-white rounded-lg px-8 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? "Submitting..." : "Submit Property"}
        </button>
      </div>
    </div>
  );
}
