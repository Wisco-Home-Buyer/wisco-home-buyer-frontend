import { ChartLine, Home } from "lucide-react";
import { StepCard } from "@/components/shared/stepCard/StepCard";
import { FaSackDollar } from "react-icons/fa6";

export function Process() {
  const steps = [
    {
      imageSrc: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Old house
      imageAlt: "Old house in need of repair",
      icon: <Home className="h-5 w-5" />,
      title: "Submit Your Property - No Matter The Condition!",
      description: "Fill out our quick form with basic property details. Takes less than 2 minutes — no account required.",
      footer: "2-min form"
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Interior window seat
      imageAlt: "Comfortable window seat interior",
      icon: <ChartLine className="h-5 w-5" />,
      title: "We Analyze Using Property Data",
      description: "Our team reviews comparable sales, property details, and local market trends to craft your personalized cash offer.",
      footer: "Data-driven analysis",
      isOffset: true
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Business handshake
      imageAlt: "Handshake after deal closing",
      icon: <FaSackDollar className="h-5 w-5" />,
      title: "Receive Your Fair Cash Offer",
      description: "Get a no-obligation cash offer within 24 hours. No pressure, no hidden fees, no surprises.",
      footer: "24-hr turnaround"
    }
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-16">
        {/* Header */}
        <div className="text-center space-y-3 mb-16 md:mb-20 max-w-2xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              imageSrc={step.imageSrc}
              imageAlt={step.imageAlt}
              icon={step.icon}
              title={step.title}
              description={step.description}
              footer={step.footer}
              isOffset={step.isOffset}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
