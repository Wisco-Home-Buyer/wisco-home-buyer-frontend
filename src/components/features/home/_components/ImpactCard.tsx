import React from "react";

export interface ImpactCardProps {
  icon: React.ReactNode;
  value: string;
  title: string;
  description: string;
}

export function ImpactCard({ icon, value, title, description }: ImpactCardProps) {
  return (
    <div className="bg-white border border-gray-100/80 rounded-3xl p-8 flex flex-col items-start text-left shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1">
      <div className="w-12 h-12 bg-[#eef3f7] text-[#0f2942] rounded-full flex items-center justify-center">
        {icon}
      </div>
      <span className="text-4xl md:text-5xl font-extrabold text-[#0f2942] tracking-tight mt-6">
        {value}
      </span>
      <span className="text-lg font-bold text-[#0f2942] mt-2">
        {title}
      </span>
      <span className="text-sm text-gray-500 mt-1 leading-relaxed">
        {description}
      </span>
    </div>
  );
}
