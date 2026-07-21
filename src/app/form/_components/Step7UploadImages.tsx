"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, UploadCloud, FolderOpen } from "lucide-react";

interface Step7UploadImagesProps {
  imageUrls: string[];
  onChange: (urls: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step7UploadImages({
  imageUrls,
  onChange,
  onNext,
  onBack,
}: Step7UploadImagesProps) {
  const [mockImages, setMockImages] = useState<string[]>([
    "/images/image1.png",
    "/images/image2.png",
    "/images/image3.png",
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(mockImages);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[#0B2545] tracking-tight">
          Property Images
        </h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          Upload photos of your property to help us make the best offer.
        </p>
      </div>

      {/* Drag & Drop Area */}
      <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center space-y-4 bg-slate-50/30">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
          <UploadCloud className="h-6 w-6 text-blue-900" />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-[#0B2545]">
            Drag & drop photos here
          </p>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">or</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white rounded-lg px-5 py-2.5 text-xs font-bold shadow-md transition-colors cursor-pointer"
        >
          <FolderOpen className="h-4 w-4" />
          Browse Files
        </button>
      </div>

      {/* Thumbnails Section */}
      <div className="grid grid-cols-3 gap-3">
        {mockImages.map((src, i) => (
          <div
            key={i}
            className="relative aspect-video rounded-xl overflow-hidden border border-gray-150 shadow-2xs"
          >
            <Image
              src={src}
              alt={`Property thumbnail ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <p className="text-xxs md:text-xs text-gray-400 font-medium">
        ℹ You can upload up to 10 photos. Accepted formats: JPG, PNG, HEIC.
      </p>

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
          type="submit"
          className="bg-blue-950 hover:bg-blue-900 text-white rounded-lg px-8 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
