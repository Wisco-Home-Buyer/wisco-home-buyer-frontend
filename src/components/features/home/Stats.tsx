"use client";

import React, { useRef } from "react";
import { Star } from "lucide-react";
import { StatCard } from "./_components/StatCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaBriefcase, FaCalendarCheck } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Stats() {
  const container = useRef<HTMLDivElement>(null);

  const statsData = [
    {
      icon: <Star className="h-6 w-6 fill-current" />,
      value: "4.9/5",
      label: "Seller Rating",
    },
    {
      icon: <FaBriefcase className="h-6 w-6" />,
      value: "12+",
      label: "Years Experience",
    },
    {
      icon: <AiFillHome  className="h-6 w-6" />,
      value: "500+",
      label: "Properties Purchased",
    },
    {
      icon: <FaCalendarCheck  className="h-6 w-6" />,
      value: "7 Days",
      label: "Average Closing",
    },
  ];

  useGSAP(() => {
    // Animate Header on scroll
    gsap.fromTo(
      ".stats-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".stats-header",
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );

    // Animate Grid Cards on scroll
    gsap.fromTo(
      ".stats-card-wrapper",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="bg-slate-50/50 py-16 md:py-24">
      <div className="px-4 md:px-16">
        {/* Header */}
        <div className="stats-header text-center space-y-3 mb-12 md:mb-16">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            Proven Results
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Trusted by Wisconsin Homeowners
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div key={index} className="stats-card-wrapper">
              <StatCard
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

