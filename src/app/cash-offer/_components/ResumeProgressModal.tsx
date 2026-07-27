"use client";

import { ArrowRight, RotateCcw, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResumeProgressModalProps {
  onClose: () => void;
}

export function ResumeProgressModal({ onClose }: ResumeProgressModalProps) {
  const router = useRouter();

  const handleContinue = () => {
    onClose();
    router.push("/form");
  };

  const handleStartOver = () => {
    localStorage.removeItem("tygry8-form-data");
    onClose();
    router.push("/form");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

      {/* Modal Card */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon */}
        <div className="flex justify-center pt-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
            <RotateCcw className="h-7 w-7 text-amber-600" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-[#0B2545] tracking-tight">
            Welcome back! 👋
          </h3>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            Looks like you already started your property application. Pick up where you stopped, or start fresh from the beginning.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleContinue}
            className="w-full flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white rounded-xl px-6 py-3.5 text-sm font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
            Continue
          </button>
          <button
            onClick={handleStartOver}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#0B2545] rounded-xl px-6 py-3.5 text-sm font-bold transition-all active:scale-[0.98] cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            Start fresh
          </button>
        </div>
      </div>
    </div>
  );
}
