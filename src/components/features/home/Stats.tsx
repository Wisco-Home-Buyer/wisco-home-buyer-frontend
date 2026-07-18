import { Star, Briefcase, Home, Calendar } from "lucide-react";
import { StatCard } from "@/components/shared/statCard/StatCard";

export function Stats() {
  const statsData = [
    {
      icon: <Star className="h-6 w-6 fill-current" />,
      value: "4.9/5",
      label: "Seller Rating",
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      value: "12+",
      label: "Years Experience",
    },
    {
      icon: <Home className="h-6 w-6" />,
      value: "500+",
      label: "Properties Purchased",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      value: "7 Days",
      label: "Average Closing",
    },
  ];

  return (
    <section className="bg-slate-50/50 py-16 md:py-24">
      <div className="px-4 md:px-16">
        {/* Header */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            Proven Results
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Trusted by Wisconsin Homeowners
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
