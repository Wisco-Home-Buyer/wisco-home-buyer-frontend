import React from "react";

export interface ImpactCardProps {
  icon: React.ReactNode;
  value: string;
  title: string;
  description: string;
}

export function ImpactCard({ icon, value, title, description }: ImpactCardProps) {
  return (
    <div className="bg-white border border-gray-100/80 rounded-2xl md:rounded-3xl p-4 sm:p-8 flex flex-col items-center text-center sm:items-start sm:text-left shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 h-full">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#eef3f7] text-[#0f2942] rounded-xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0f2942] tracking-tight mt-3 sm:mt-6">
        {value}
      </span>
      <span className="text-sm sm:text-lg font-bold text-[#0f2942] mt-1.5 sm:mt-2 leading-snug">
        {title}
      </span>
      <span className="text-[11px] sm:text-sm text-gray-500 mt-1 leading-relaxed">
        {description}
      </span>
    </div>
  );
}
