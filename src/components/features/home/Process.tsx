"use client";

import React, { useRef } from "react";
import { ChartLine, Home } from "lucide-react";
import { StepCard } from "./_components/StepCard";
import { FaSackDollar } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Process() {
  const container = useRef<HTMLDivElement>(null);

  const steps = [
    {
      imageSrc: "/images/processImage1.png", // Old house
      imageAlt: "Old house in need of repair",
      icon: <Home className="h-5 w-5" />,
      title: "Submit Your Property - No Matter The Condition!",
      description: "Fill out our quick form with basic property details. Takes less than 2 minutes — no account required.",
      footer: "2-min form"
    },
    {
      imageSrc: "/images/processImage2.png", // Interior window seat
      imageAlt: "Comfortable window seat interior",
      icon: <ChartLine className="h-5 w-5" />,
      title: "We Analyze Using Property Data",
      description: "Our team reviews comparable sales, property details, and local market trends to craft your personalized cash offer.",
      footer: "Data-driven analysis",
      isOffset: true
    },
    {
      imageSrc: "/images/processImage3.png", // Business handshake
      imageAlt: "Handshake after deal closing",
      icon: <FaSackDollar className="h-5 w-5" />,
      title: "Receive Your Fair Cash Offer",
      description: "Get a no-obligation cash offer within 24 hours. No pressure, no hidden fees, no surprises.",
      footer: "24-hr turnaround"
    }
  ];

  useGSAP(() => {
    // Header trigger animation
    gsap.fromTo(
      ".process-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".process-header",
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );

    // Cards staggered entry on scroll
    gsap.fromTo(
      ".process-card-wrapper",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-16">
        {/* Header */}
        <div className="process-header text-center space-y-3 mb-16 md:mb-20 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Three Simple Steps to Your Cash Offer
          </h2>
          <p className="text-md text-gray-600">
            From inquiry to closing, we&apos;ve made the entire process transparent, <br /> fast, and hassle-free.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="process-grid grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="process-card-wrapper">
              <StepCard
                imageSrc={step.imageSrc}
                imageAlt={step.imageAlt}
                icon={step.icon}
                title={step.title}
                description={step.description}
                footer={step.footer}
                isOffset={step.isOffset}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

