"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
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

  return (
    <section
      id="faq"
      className="bg-white py-16 md:py-24 border-b border-gray-100/50"
    >
      <div className="px-4 md:px-16">
        {/* Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16 max-w-2xl mx-auto">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Image */}
          <div className="relative w-full h-80 md:h-112.5 lg:h-full rounded-3xl overflow-hidden shadow-md">
            <Image
              src="/images/FAQImage.png"
              alt="Beautiful Mediterranean style home with warm lighting"
              fill
              priority
              unoptimized
              className="object-cover"
            />
          </div>

          {/* Right Column: Accordion */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.03)] overflow-hidden">
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
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 shrink-0 ml-4 cursor-pointer ${
                        isOpen
                          ? "bg-[#0b2545] text-white"
                          : "bg-white border border-slate-200 text-slate-400"
                      }`}
                    >
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  {/* Answer Container with Collapsible Transition */}
                  <div
                    className={` overflow-hidden ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 text-xs md:text-sm text-slate-500 leading-relaxed max-w-2xl">
                      {item.answer}
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
