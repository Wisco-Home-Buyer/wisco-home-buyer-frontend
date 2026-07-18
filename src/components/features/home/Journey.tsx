interface JourneyStep {
  number: number;
  title: string;
  subtitle: string;
  badgeText: string;
  status: "active" | "pending" | "queued" | "final";
}

export function Journey() {
  const steps: JourneyStep[] = [
    {
      number: 1,
      title: "Submit",
      subtitle: "Property Form",
      badgeText: "Active",
      status: "active",
    },
    {
      number: 2,
      title: "Property Review",
      subtitle: "Our team reviews",
      badgeText: "Pending",
      status: "pending",
    },
    {
      number: 3,
      title: "Verification",
      subtitle: "Data validation",
      badgeText: "Queued",
      status: "queued",
    },
    {
      number: 4,
      title: "Offer Created",
      subtitle: "Cash offer ready",
      badgeText: "Queued",
      status: "queued",
    },
    {
      number: 5,
      title: "Closing",
      subtitle: "Cash in hand",
      badgeText: "Final",
      status: "final",
    },
  ];

  return (
    <section className="bg-[#F8FAFC] py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-16 max-w-6xl">
        {/* Header */}
        <div className="text-center space-y-3 mb-16 md:mb-24 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            The Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Your Journey From Listing to Closing
          </h2>
          <p className="text-sm text-gray-600">
            Our streamlined 5-step process gets you from inquiry to cash in hand – fast.
          </p>
        </div>

        {/* Stepper Container */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-gray-200 z-0" />

          {/* Stepper Grid (Horizontal on Desktop, Vertical on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
            {steps.map((step) => {
              // Set conditional styles based on step status
              let circleStyles = "";
              let badgeStyles = "";

              if (step.status === "active") {
                circleStyles = "bg-[#0A2F59] text-white border-2 border-[#0A2F59] shadow-md shadow-blue-900/10 border-4 border-white";
                badgeStyles = "bg-[#0A2F59] text-white";
              } else if (step.status === "pending") {
                circleStyles = "bg-white text-[#0A2F59] border-2 border-[#0A2F59] shadow-sm";
                badgeStyles = "bg-slate-100 text-slate-600";
              } else {
                circleStyles = "bg-white text-gray-300 border-2 border-gray-100";
                badgeStyles = "bg-slate-50 text-gray-400";
              }

              return (
                <div key={step.number} className="flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-0">
                  {/* Step Number Circle */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 z-10 transition-all duration-300 ${circleStyles}`}>
                    {step.number}
                  </div>

                  {/* Step Details */}
                  <div className="flex-1 md:mt-5 space-y-1">
                    <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-tight">
                      {step.subtitle}
                    </p>
                    <div className="pt-1.5 md:pt-2">
                      <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${badgeStyles}`}>
                        {step.badgeText}
                      </span>
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
