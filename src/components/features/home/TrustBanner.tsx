export function TrustBanner() {
  return (
    <section className="relative w-full bg-white border-y border-gray-100 overflow-hidden py-10 md:py-12">
      {/* Left side soft teal curved background */}
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[50%] h-[150%] bg-[#E8F5F5]/60 rounded-full blur-3xl z-0"
        style={{ transformOrigin: "left center" }}
      />

      {/* Right side tree line background fade */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-full opacity-95 md:opacity-95 z-0"
        style={{
          backgroundImage: `url('/images/trustBanner.png')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-16 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left gap-6 md:gap-0">
          {/* Tagline */}
          <div className="flex-1 md:pr-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2F59] tracking-tight">
              Local. Trusted. Hassle - Free.
            </h2>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-12 bg-gray-200 mx-8" />

          {/* Description */}
          <div className="flex-1 md:pl-8 max-w-md">
            <p className="text-sm md:text-base text-gray-500 leading-relaxed font-medium">
              We make selling your home simple, so you can move forward with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
