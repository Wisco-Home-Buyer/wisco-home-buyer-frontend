import React from "react";

interface LoadingProps {
  className?: string;
  fullScreen?: boolean;
}

export const Loading = ({ className = "", fullScreen = false }: LoadingProps) => {
  return (
    <div 
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen flex-1 bg-slate-50/50 pt-28 pb-16 md:pt-40 md:pb-24" : "min-h-[50vh]"
      } ${className}`}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950"></div>
    </div>
  );
};
