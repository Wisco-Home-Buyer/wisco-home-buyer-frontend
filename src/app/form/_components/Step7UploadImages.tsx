/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef } from "react";
import { ArrowLeft, UploadCloud, FolderOpen, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useUploadImagesMutation } from "@/store/api/formApi";
import Image from "next/image";

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
  const [uploadImages, { isLoading: isUploading }] = useUploadImagesMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const data = await uploadImages(formData).unwrap();
      
      if (data.success) {
        toast.success(data.message || "Photos uploaded successfully");
        const newUrls = data.data.urls.map((u: string) => `https://tygry8.saikat.com.bd/uploads${u}`);
        onChange([...imageUrls, ...newUrls]);
      } else {
        toast.error(data.message || "Failed to upload photos");
      }
    } catch (error: any) {
      toast.error(error.data?.message || "An error occurred while uploading photos");
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== indexToRemove);
    onChange(newUrls);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <div 
        className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center space-y-4 bg-slate-50/30 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
          {isUploading ? (
            <Loader2 className="h-6 w-6 text-blue-900 animate-spin" />
          ) : (
            <UploadCloud className="h-6 w-6 text-blue-900" />
          )}
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-[#0B2545]">
            {isUploading ? "Uploading..." : "Drag & drop photos here"}
          </p>
          {!isUploading && <p className="text-xs text-gray-400 font-semibold mt-0.5">or</p>}
        </div>
        
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isUploading}
        />
        
        <button
          type="button"
          disabled={isUploading}
          className="inline-flex items-center gap-2 bg-blue-950 hover:bg-blue-900 disabled:opacity-50 text-white rounded-lg px-5 py-2.5 text-xs font-bold shadow-md transition-colors cursor-pointer"
        >
          <FolderOpen className="h-4 w-4" />
          Browse Files
        </button>
          <p className="text-xxs md:text-xs text-gray-400 font-medium">
        ℹ You can upload up to 10 photos. Accepted formats: JPG, PNG, HEIC.
      </p>
      </div>

      {/* Thumbnails Section */}
      {imageUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {imageUrls.map((src, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden border border-gray-150 shadow-2xs group w-full aspect-220/130"
            >
              <Image
                src={src}
                alt={`Property thumbnail ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover object-center"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(i)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow-md transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Footer Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onBack}
          disabled={isUploading}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#0B2545]/80 hover:text-blue-950 transition-colors py-2.5 cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          type="submit"
          disabled={isUploading}
          className="bg-blue-950 hover:bg-blue-900 disabled:opacity-50 text-white rounded-lg px-8 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
