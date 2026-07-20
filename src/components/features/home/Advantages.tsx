"use client";

import React, { useRef } from "react";
import { Zap, Hammer, Users } from "lucide-react";
import { AdvantageCard } from "./_components/AdvantageCard";
import { CiCoinInsert } from "react-icons/ci";
import { FaLock, FaRegChartBar } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Advantages() {
  const container = useRef<HTMLDivElement>(null);

  const advantages = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Fast Closing",
      description: "Close in as few as 7 days. No waiting for bank approvals or buyer financing to fall through.",
      imageSrc: "/images/image1.png",
      imageAlt: "Calendar and deadline"
    },
    {
      icon: <Hammer className="h-5 w-5" />,
      title: "No Repairs Needed",
      description: "Sell completely as-is. We handle all repairs, cleaning, and updates after closing.",
      imageSrc: "/images/image2.png",
      imageAlt: "Clean modern living room"
    },
    {
      icon: <CiCoinInsert className="h-5 w-5" />,
      title: "No Hidden Fees",
      description: "Zero commissions, zero closing costs, zero surprises. The offer you receive is exactly what you get.",
      imageSrc: "/images/image3.png",
      imageAlt: "Money jar with tag"
    },
    {
      icon: <FaRegChartBar className="h-5 w-5" />,
      title: "Fair Cash Offers",
      description: "Our offers are based on real market data, comparable property sales, and local expertise—always fair.",
      imageSrc: "/images/image4.png",
      imageAlt: "Laptop analyzing data"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Professional Team",
      description: "Local Wisconsin experts who understand your market and treat you with honesty and respect.",
      imageSrc: "/images/image5.png",
      imageAlt: "Team of experts discussing"
    },
    {
      icon: <FaLock  className="h-5 w-5" />,
      title: "Secure Process",
      description: "Fully licensed and insured. Your transaction is protected every step of the way.",
      imageSrc: "/images/image6.png",
      imageAlt: "Secure house transaction"
    }
  ];

  useGSAP(() => {
    // Header trigger animation
    gsap.fromTo(
      ".adv-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".adv-header",
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );

    // Cards staggered entry on scroll
    gsap.fromTo(
      ".adv-card-wrapper",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".adv-grid",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="why-us" className="bg-slate-50/50 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-16">
        {/* Header */}
        <div className="adv-header text-center space-y-3 mb-16 md:mb-20 max-w-4xl mx-auto">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            Our Advantage
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Why Homeowners Choose Wisco Home Buyer
          </h2>
          <p className="text-sm text-gray-600">
            We&apos;ve reimagined the home-selling experience from the ground up — faster, fairer, and stress-free.
          </p>
        </div>

        {/* Grid of Advantages */}
        <div className="adv-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {advantages.map((adv, index) => (
            <div key={index} className="adv-card-wrapper">
              <AdvantageCard
                icon={adv.icon}
                title={adv.title}
                description={adv.description}
                imageSrc={adv.imageSrc}
                imageAlt={adv.imageAlt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

