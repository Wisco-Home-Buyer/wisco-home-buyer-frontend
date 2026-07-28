"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface JourneyStep {
  number: number;
  title: string;
  subtitle: string;
  badgeText: string;
  status: "active" | "pending" | "queued" | "final";
}

export function Journey() {
  const container = useRef<HTMLDivElement>(null);

  const steps: JourneyStep[] = [
    {
      number: 1,
      title: "Submit",
      subtitle: "Property Form",
      badgeText: "Active",
      status: "active",
    },
    {
      number: 2,
      title: "Property Review",
      subtitle: "Our team reviews",
      badgeText: "Pending",
      status: "pending",
    },
    {
      number: 3,
      title: "Verification",
      subtitle: "Data validation",
      badgeText: "Queued",
      status: "queued",
    },
    {
      number: 4,
      title: "Offer Created",
      subtitle: "Cash offer ready",
      badgeText: "Queued",
      status: "queued",
    },
    {
      number: 5,
      title: "Closing",
      subtitle: "Cash in hand",
      badgeText: "Final",
      status: "final",
    },
  ];

  useGSAP(() => {
    // Header trigger
    gsap.fromTo(
      ".journey-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".journey-header",
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );

    // Timeline line & steps sequence trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".journey-timeline-container",
        start: "top 80%",
        toggleActions: "play none none reset",
      }
    });

    tl.fromTo(
      ".journey-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power2.inOut" }
    )
    .fromTo(
      ".journey-step-wrapper",
      { opacity: 0, scale: 0.85, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "back.out(1.7)" },
      "-=0.4"
    );
  }, { scope: container });

  return (
    <section ref={container} id="how-it-works" className="bg-[#F8FAFC] py-12 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-16 max-w-6xl">
        {/* Header */}
        <div className="journey-header text-center space-y-3 mb-12 md:mb-24 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            The Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Your Journey From Listing to Closing
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Our streamlined 5-step process gets you from inquiry to cash in hand – fast.
          </p>
        </div>

        {/* Stepper Container */}
        <div className="journey-timeline-container relative">
          {/* Desktop Connecting Line */}
          <div 
            className="journey-line hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-gray-200 z-0"
            style={{ transformOrigin: "left center" }}
          />

          {/* Mobile Vertical Connecting Line */}
          <div 
            className="journey-line-mobile block md:hidden absolute left-6 top-6 bottom-6 w-0.5 border-l-2 border-dashed border-gray-300 z-0"
          />

          {/* Stepper Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative z-10">
            {steps.map((step) => {
              let circleStyles = "";
              let badgeStyles = "";

              if (step.status === "active") {
                circleStyles = "bg-[#0A2F59] text-white border-2 border-[#0A2F59] shadow-md shadow-blue-950/20";
                badgeStyles = "bg-[#0A2F59] text-white";
              } else if (step.status === "pending") {
                circleStyles = "bg-white text-[#0A2F59] border-2 border-[#0A2F59] shadow-xs";
                badgeStyles = "bg-slate-200/80 text-slate-700 font-bold";
              } else {
                circleStyles = "bg-white text-gray-300 border-2 border-gray-200";
                badgeStyles = "bg-slate-100 text-gray-400";
              }

              return (
                <div key={step.number} className="journey-step-wrapper">
                  {/* Clean Minimal Layout */}
                  <div className="flex flex-row md:flex-col items-center md:text-center gap-4 py-1.5 md:py-0">
                    {/* Step Number Circle */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 z-10 transition-all duration-300 ${circleStyles}`}>
                      {step.number}
                    </div>

                    {/* Step Details */}
                    <div className="flex-1 md:mt-5 space-y-1">
                      <div className="flex items-center justify-between md:justify-center gap-2">
                        <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight">
                          {step.title}
                        </h3>
                        <span className={`inline-block md:hidden text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${badgeStyles}`}>
                          {step.badgeText}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-tight">
                        {step.subtitle}
                      </p>
                      <div className="hidden md:block pt-2">
                        <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${badgeStyles}`}>
                          {step.badgeText}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

