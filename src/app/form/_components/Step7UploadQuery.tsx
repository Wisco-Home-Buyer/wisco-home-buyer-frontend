"use client";

import React from "react";

interface Step7UploadQueryProps {
  onChoose: (upload: boolean) => void;
}

export function Step7UploadQuery({ onChoose }: Step7UploadQueryProps) {
  return (
    <div className="py-8 flex flex-col items-center justify-center space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0B2545] text-center tracking-tight leading-tight">
        Do you want to upload pictures?
      </h2>
      
      <div className="flex gap-4 items-center justify-center">
        <button
          type="button"
          onClick={() => onChoose(true)}
          className="bg-blue-950 hover:bg-blue-900 text-white font-bold text-sm md:text-base px-8 py-3 rounded-lg shadow-md transition-all active:scale-95 cursor-pointer min-w-25"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChoose(false)}
          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-sm md:text-base px-8 py-3 rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer min-w-25"
        >
          No
        </button>
      </div>
    </div>
  );
}
