import React from "react";
import { Star, Check } from "lucide-react";

export interface TestimonialCardProps {
  text: string;
  name: string;
  location: string;
  stars?: number;
}

export function TestimonialCard({ text, name, location, stars = 5 }: TestimonialCardProps) {
  return (
    <div className="bg-white border border-gray-100/80 rounded-3xl p-8 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 h-full">
      <div className="space-y-6">
        {/* Star Rating */}
        <div className="flex gap-1">
          {Array.from({ length: stars }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-sm font-medium text-slate-600 leading-relaxed">
          {text}
        </p>
      </div>

      {/* Footer / Reviewer Info */}
      <div className="border-t border-slate-100 mt-6 pt-6 flex items-center justify-between">
        <div className="space-y-0.5">
          <h4 className="text-sm font-bold text-[#0f2942]">{name}</h4>
          <p className="text-xs text-slate-400 font-medium">{location}</p>
        </div>

        {/* Verified Badge */}
        <div className="flex items-center gap-1.5 bg-[#edf5fd] text-[#0e5ea9] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-[#d2e5f9]">
          <div className="w-3.5 h-3.5 rounded-full bg-[#0e5ea9] flex items-center justify-center text-white">
            <Check className="h-2 w-2 stroke-4" />
          </div>
          <span>Verified</span>
        </div>
      </div>
    </div>
  );
}
