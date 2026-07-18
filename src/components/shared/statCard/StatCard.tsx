import React from "react";

export interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xs transition-shadow hover:shadow-md">
      <div className="p-3 bg-blue-50 text-blue-900 rounded-xl mb-4">
        {icon}
      </div>
      <span className="text-3xl font-extrabold text-blue-950 tracking-tight">
        {value}
      </span>
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-2">
        {label}
      </span>
    </div>
  );
}
