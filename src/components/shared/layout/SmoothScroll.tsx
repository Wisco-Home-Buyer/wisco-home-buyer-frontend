"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    let rafId: number;

    // Animation frame hook with proper cancellation
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Handle initial hash scroll
    const hash = window.location.hash?.slice(1);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          lenis.scrollTo(el, { offset: 0, duration: 1.2 });
        }
      }, 300);
    }

    // Handle all hash link clicks site-wide (Footer, Hero, etc.)
    const handleHashChange = () => {
      const newHash = window.location.hash?.slice(1);
      if (newHash) {
        setTimeout(() => {
          const el = document.getElementById(newHash);
          if (el) {
            lenisRef.current?.scrollTo(el, { offset: 0, duration: 1.2 });
          }
        }, 100);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current = null;
      window.removeEventListener("hashchange", handleHashChange);
      lenis.destroy();
    };
  }, []);

  // On route change: scroll to hash section, or reset to top via Lenis
  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          lenisRef.current?.scrollTo(el, { offset: 0, duration: 1.2 });
        }
      }, 300);
    } else {
      // Use Lenis to reset scroll — window.scrollTo(0,0) is ignored by Lenis
      lenisRef.current?.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
}
