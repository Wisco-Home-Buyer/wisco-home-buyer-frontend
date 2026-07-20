"use client";

import React, { useRef } from "react";
import { TestimonialCard } from "./_components/TestimonialCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Testimonials() {
  const container = useRef<HTMLDivElement>(null);

  const testimonialsData = [
    {
      text: `"Wisco Home Buyer made selling my Milwaukee home so easy. Got an offer in 24 hours and closed in 12 days! I couldn't believe how smooth the entire process was."`,
      name: "Sarah M.",
      location: "Milwaukee, WI",
    },
    {
      text: `"I was skeptical at first, but the process was completely transparent. Fair price, no games. They did exactly what they said they would do – no surprises."`,
      name: "James T.",
      location: "Madison, WI",
    },
    {
      text: `"Inherited a property I didn't want to deal with. They handled everything professionally and with so much care. I'll recommend them to anyone in Wisconsin."`,
      name: "Linda K.",
      location: "Green Bay, WI",
    },
  ];

  useGSAP(() => {
    // Header trigger animation
    gsap.fromTo(
      ".testimonials-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".testimonials-header",
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );

    // Cards staggered entry on scroll
    gsap.fromTo(
      ".testimonials-card-wrapper",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.18,
        scrollTrigger: {
          trigger: ".testimonials-grid",
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="testimonials" className="bg-slate-50/30 py-16 md:py-24 border-b border-gray-100/50">
      <div className="px-4 md:px-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="testimonials-header text-center space-y-3 mb-12 md:mb-16 max-w-2xl mx-auto">
          <span className="text-sm font-bold text-blue-900 uppercase tracking-widest block">
            Social Proof
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 tracking-tight">
            What Wisconsin Homeowners Say
          </h2>
          <p className="text-lg  text-gray-500 font-medium leading-relaxed">
            Real stories from real Wisconsin homeowners who chose the <br /> smarter way to sell.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((item, index) => (
            <div key={index} className="testimonials-card-wrapper">
              <TestimonialCard
                text={item.text}
                name={item.name}
                location={item.location}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

