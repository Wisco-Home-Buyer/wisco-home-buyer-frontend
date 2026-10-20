"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { photoUrl } from "@/lib/wholesale-listings";

/** Photos shown on the page before the "+N more" tile; the rest open in the viewer. */
const VISIBLE_PHOTOS = 4;

interface ListingGalleryProps {
  images: string[];
  title: string;
}

export function ListingGallery({ images, title }: ListingGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const urls = images;
  const isOpen = openIndex !== null && urls[openIndex] !== undefined;

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) =>
        current === null ? null : (current + delta + urls.length) % urls.length,
      );
    },
    [urls.length],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, step]);

  if (urls.length === 0) {
    return (
      <div className="w-full aspect-4/3 rounded-2xl md:rounded-3xl bg-slate-100 flex items-center justify-center text-sm font-semibold text-gray-400">
        No photos yet
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenIndex(0)}
        aria-label="View photo 1 larger"
        className="block w-full cursor-zoom-in"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoUrl(urls[0], 1200)}
          alt={title}
          fetchPriority="high"
          decoding="async"
          className="w-full aspect-4/3 object-cover rounded-2xl md:rounded-3xl bg-slate-100"
        />
      </button>

      {urls.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {urls.slice(1, VISIBLE_PHOTOS).map((url, index) => {
            const isLastVisible =
              index === VISIBLE_PHOTOS - 2 && urls.length > VISIBLE_PHOTOS;
            const hidden = urls.length - VISIBLE_PHOTOS;
            return (
              <button
                key={url}
                type="button"
                onClick={() => setOpenIndex(index + 1)}
                aria-label={
                  isLastVisible
                    ? `View all ${urls.length} photos`
                    : `View photo ${index + 2} larger`
                }
                className="relative block cursor-zoom-in"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl(url, 400)}
                  alt={`${title} photo ${index + 2}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-4/3 object-cover rounded-xl bg-slate-100"
                />
                {isLastVisible && (
                  <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-slate-950/60 text-white text-sm font-extrabold">
                    +{hidden} more photos
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {isOpen && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${openIndex + 1} of ${urls.length}`}
          className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/85 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close photo"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {urls.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl leading-none"
              >
                &lsaquo;
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
                className="absolute right-3 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl leading-none"
              >
                &rsaquo;
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoUrl(urls[openIndex], 1600)}
            alt={`${title} photo ${openIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
          />

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-bold text-white/80">
            {openIndex + 1} / {urls.length}
          </p>
        </div>
      )}
    </>
  );
}
