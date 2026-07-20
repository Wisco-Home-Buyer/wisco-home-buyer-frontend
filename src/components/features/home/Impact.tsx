"use client";

import React, { useRef } from "react";
import { Home, Clock, Heart, Calendar } from "lucide-react";
import { ImpactCard } from "./_components/ImpactCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Impact() {
  const container = useRef<HTMLDivElement>(null);

  const impactData = [
    {
      icon: <Home className="h-5 w-5" />,
      value: "500+",
      title: "Homes Purchased",
      description: "Across all of Wisconsin",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      value: "24 Hrs",
      title: "Average Response",
      description: "Offer in your inbox fast",
    },
    {
      icon: <Heart className="h-5 w-5 fill-current" />,
      value: "98%",
      title: "Customer Satisfaction",
      description: "5-star verified reviews",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      value: "07",
      title: "Days Avg. Closing",
      description: "From offer to closed",
    },
  ];

  useGSAP(() => {
    // Header trigger animation
    gsap.fromTo(
      ".impact-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".impact-header",
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );

    // Cards staggered entry on scroll
    gsap.fromTo(
      ".impact-card-wrapper",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".impact-grid",
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="bg-slate-50/30 py-16 md:py-24 border-y border-gray-100/50">
      <div className="px-4 md:px-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="impact-header text-center space-y-3 mb-12 md:mb-16">
          <span className="text-sm font-bold text-blue-900 uppercase tracking-widest block">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 tracking-tight">
            Numbers That Speak for Themselves
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="impact-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactData.map((item, index) => (
            <div key={index} className="impact-card-wrapper">
              <ImpactCard
                icon={item.icon}
                value={item.value}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

