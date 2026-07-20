import React from "react";
import { Home, Clock, Heart, Calendar } from "lucide-react";
import { ImpactCard } from "./_components/ImpactCard";

export function Impact() {
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

  return (
    <section className="bg-slate-50/30 py-16 md:py-24 border-y border-gray-100/50">
      <div className="px-4 md:px-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <span className="text-sm font-bold text-blue-900 uppercase tracking-widest block">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 tracking-tight">
            Numbers That Speak for Themselves
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactData.map((item, index) => (
            <ImpactCard
              key={index}
              icon={item.icon}
              value={item.value}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
