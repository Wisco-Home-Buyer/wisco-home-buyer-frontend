import React from "react";
import Image from "next/image";

export interface StepCardProps {
  imageSrc: string;
  imageAlt: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  footer: string;
  isOffset?: boolean;
}

export function StepCard({ 
  imageSrc, 
  imageAlt, 
  icon, 
  title, 
  description, 
  footer, 
  isOffset 
}: StepCardProps) {
  return (
    <div 
      className={`bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 border-t-4 border-t-blue-600 h-fit ${
        isOffset ? "lg:translate-y-20" : ""
      }`}
    >
      <div className="space-y-6">
        {/* Card Image */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
          <Image 
            src={imageSrc} 
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Icon Badge */}
        <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl w-fit">
          {icon}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 leading-snug">
            {title}
          </h3>
          <p className="text-sm text-[#64748B] leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Footer Text */}
      <div className="pt-2 mt-2">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
          {footer}
        </span>
      </div>
    </div>
  );
}
