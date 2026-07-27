"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const container = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      question: "How fast can I get a cash offer?",
      answer:
        "Within 24 hours of submitting your property details, you'll receive a no-obligation cash offer directly to your email or phone. Our team works fast – often even faster than 24 hours.",
    },
    {
      question: "Do I need to make repairs?",
      answer:
        "No repairs needed! We buy houses completely as-is, meaning you don't have to spend a dime or lift a finger cleaning, painting, or doing costly repairs.",
    },
    {
      question: "Are there any fees or commissions?",
      answer:
        "There are absolutely zero fees or agent commissions when you sell to Wisco Home Buyer. The offer you accept is exactly what you will walk away with at closing.",
    },
    {
      question: "How is the offer price determined?",
      answer:
        "We analyze local market data, comparable home sales in your area, and the condition of the home to formulate a fair, honest cash offer that works for both of us.",
    },
    {
      question: "What types of properties do you buy?",
      answer:
        "We buy single-family homes, multi-family homes, condos, townhouses, duplexes, and even vacant land. We purchase properties in any condition, situation, or price range.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply fill out our short online form with your property address and contact details, or give us a call. We'll start analyzing your property immediately.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useGSAP(() => {
    // Header trigger animation
    gsap.fromTo(
      ".faq-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".faq-header",
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );

    // Grid content animations on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".faq-grid",
        start: "top 80%",
        toggleActions: "play none none reset",
      }
    });

    tl.fromTo(
      ".faq-image-wrapper",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(
      ".faq-accordion-wrapper",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, { scope: container });

  return (
    <section
      ref={container}
      id="faq"
      className="bg-white py-16 md:py-24 border-b border-gray-100/50"
    >
      <div className="px-4 md:px-16">
        {/* Header */}
        <div className="faq-header text-center space-y-3 mb-12 md:mb-16 max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-blue-900 uppercase tracking-widest block">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Everything you need to know about selling your home to Wisco Home
            Buyer.
          </p>
        </div>

        {/* Content Grid */}
        <div className="faq-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image */}
          <div className="faq-image-wrapper relative w-full h-80 md:h-130 lg:h-136 rounded-3xl overflow-hidden shadow-md">
            <Image
              src="/images/FAQImage.png"
              alt="Customer service representative"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
              className="object-cover"
            />
          </div>

          {/* Right Column: Accordion */}
          <div className="faq-accordion-wrapper bg-white border border-gray-100 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.03)] overflow-hidden">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border-b border-gray-100 transition-colors duration-200 ${
                    isOpen ? "bg-slate-50/50" : "bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-hidden"
                  >
                    <span className="text-sm md:text-base font-bold text-[#0f2942]">
                      {item.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0 ml-4 cursor-pointer ${
                        isOpen
                          ? "bg-[#0b2545] text-white"
                          : "bg-white border border-slate-200 text-slate-400"
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  </button>

                  {/* Answer Container — CSS Grid animation (no height clipping, no scrollbar) */}
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-xs md:text-sm text-slate-500 leading-relaxed max-w-2xl">
                        {item.answer}
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

