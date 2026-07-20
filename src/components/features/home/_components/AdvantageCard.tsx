import React from "react";

export interface AdvantageCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function AdvantageCard({ icon, title, description, imageSrc }: AdvantageCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-center shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden relative min-h-48 h-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${imageSrc}')`,
        }}
      />
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-10 bg-linear-to-r from-white via-white/80 to-transparent" />

      {/* Left Content */}
      <div className="relative z-20 space-y-3 max-w-[60%]">
        <div className="p-2.5 bg-[#0A2F59] text-white rounded-xl w-fit">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 leading-snug">
          {title}
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}
