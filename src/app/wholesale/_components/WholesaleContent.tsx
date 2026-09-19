"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TrendingUp, ShieldCheck, Zap } from "lucide-react";
import {
  useSubmitBuyerLeadMutation,
  type BuyerReferralSource,
  type BuyerServiceArea,
} from "@/store/api/buyerLeadApi";

const AREA_OPTIONS: {
  value: BuyerServiceArea;
  label: string;
  hint: string;
}[] = [
  {
    value: "NORTHEAST_WI",
    label: "Northeast Wisconsin",
    hint: "Green Bay area, Fox Cities, Marinette",
  },
  {
    value: "GREATER_MADISON",
    label: "Greater Madison Area",
    hint: "Madison, Janesville, Watertown, Fort Atkinson",
  },
  {
    value: "GREATER_MILWAUKEE",
    label: "Greater Milwaukee Area",
    hint: "Milwaukee, Sheboygan",
  },
];

const REFERRAL_OPTIONS: { value: BuyerReferralSource; label: string }[] = [
  { value: "WEB", label: "Web" },
  { value: "REFERRAL", label: "Referral" },
  { value: "SOCIAL_MEDIA", label: "Social Media" },
  { value: "REI_SUCCESS", label: "REI Success" },
  { value: "ORGANIC_SEARCH", label: "Organic Search" },
  { value: "CAFFEINE_AND_CASH_FLOW", label: "Caffeine and Cash Flow" },
  { value: "WISCO_REIA", label: "Wisco REIA" },
  {
    value: "WISCONSIN_INVESTOR_PODCAST",
    label: "The Wisconsin Investor Podcast",
  },
];

const PHONE_REGEX = /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

interface UtmFields {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  landingPageUrl?: string;
}

const PARAM_MAP: Record<keyof UtmFields, string> = {
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  utmTerm: "utm_term",
  utmContent: "utm_content",
  gclid: "gclid",
  landingPageUrl: "",
};

export function WholesaleContent() {
  const [submitBuyerLead, { isLoading }] = useSubmitBuyerLeadMutation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [email, setEmail] = useState("");
  const [areas, setAreas] = useState<BuyerServiceArea[]>([]);
  const [consent, setConsent] = useState(false);
  const [questions, setQuestions] = useState("");
  const [referralSource, setReferralSource] = useState<
    BuyerReferralSource | ""
  >("");
  const [referredBy, setReferredBy] = useState("");

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const utmFields = useRef<UtmFields>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const captured: UtmFields = { landingPageUrl: window.location.href };
    (Object.keys(PARAM_MAP) as (keyof UtmFields)[]).forEach((key) => {
      const param = PARAM_MAP[key];
      if (!param) return;
      const value = params.get(param);
      if (value) captured[key] = value;
    });
    utmFields.current = captured;
  }, []);

  const toggleArea = (value: BuyerServiceArea) => {
    setAreas((prev) =>
      prev.includes(value)
        ? prev.filter((area) => area !== value)
        : [...prev, value]
    );
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setPhoneError(value.length > 0 && !PHONE_REGEX.test(value));
  };

  const isFormValid =
    name.trim() !== "" &&
    PHONE_REGEX.test(phone) &&
    email.trim() !== "" &&
    areas.length > 0 &&
    consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setSubmitError(null);
    try {
      await submitBuyerLead({
        name: name.trim(),
        phone,
        email: email.trim(),
        areas,
        consent,
        questions: questions.trim() || undefined,
        referralSource: referralSource || undefined,
        referredBy: referredBy.trim() || undefined,
        ...utmFields.current,
      }).unwrap();
      setIsSubmitted(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.data?.error?.details?.[0]?.message ??
        error?.data?.message ??
        "Something went wrong submitting the form. Please try again.";
      setSubmitError(message);
    }
  };

  const perks = [
    {
      icon: Zap,
      title: "First access to deals",
      desc: "See off-market properties before they hit the open market.",
    },
    {
      icon: TrendingUp,
      title: "Investor-ready pricing",
      desc: "Discounted properties priced to leave room for your returns.",
    },
    {
      icon: ShieldCheck,
      title: "No cost, no obligation",
      desc: "Join for free — unsubscribe from deal alerts anytime.",
    },
  ];

  return (
    <div className="flex-1 bg-white pt-32 pb-12 md:pt-48 md:pb-24">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Headline + perks */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 lg:sticky lg:top-32">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B2545] tracking-tight leading-tight">
                Join Our Buyer&apos;s List and Get Access to Off-Market Deals
                Today!
              </h1>
              <p className="text-sm md:text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
                We buy discounted Wisconsin properties every week. Tell us
                where you invest and we&apos;ll send new deals straight to your
                inbox and phone — before they&apos;re listed anywhere else.
              </p>
            </div>

            <div className="space-y-3 md:space-y-4 max-w-md">
              {perks.map((perk) => (
                <div key={perk.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <perk.icon className="h-4.5 w-4.5 text-blue-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm leading-tight">
                      {perk.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500 font-medium">
                      {perk.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Form / Success */}
          <div className="lg:col-span-6">
            {isSubmitted ? (
              <div className="bg-white border-x border-b border-t-4 border-t-blue-950 border-gray-150 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-md flex flex-col items-center space-y-4 md:space-y-6 text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-2xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-5 h-5 md:w-6 md:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B2545] tracking-tight">
                    You&apos;re on the list!
                  </h2>
                  <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed px-1">
                    Thanks, {name.split(" ")[0] || "there"} — we&apos;ll text
                    and email you as soon as a matching off-market deal comes
                    available.
                  </p>
                </div>
                <div className="w-full pt-1">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center w-full bg-white border border-gray-200 hover:bg-slate-50 text-gray-700 rounded-xl py-3 text-sm font-bold shadow-2xs hover:shadow-xs transition-all active:scale-99"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-slate-50 border border-gray-100 rounded-3xl p-5 md:p-8 space-y-6 shadow-md drop-shadow-xl"
              >
                <div className="space-y-1">
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B2545] tracking-tight">
                    Get Access to Off-Market Deals
                  </h2>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    Fill out the form below to join our buyers list.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="phone"
                      className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="(555) 123-4567"
                      className={`w-full bg-white border ${
                        phoneError ? "border-red-500" : "border-gray-200"
                      } rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs`}
                    />
                    {phoneError && (
                      <p className="text-[10px] text-red-500 font-bold">
                        Please enter a valid US phone number
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
                    />
                  </div>

                  {/* Areas */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide">
                      Send me deals that are in...
                    </label>
                    <div className="space-y-2">
                      {AREA_OPTIONS.map((option) => (
                        <label
                          key={option.value}
                          className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-2xs cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={areas.includes(option.value)}
                            onChange={() => toggleArea(option.value)}
                            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-950 focus:ring-blue-900"
                          />
                          <span>
                            <span className="block text-sm font-semibold text-[#0B2545]">
                              {option.label}
                            </span>
                            <span className="block text-xs text-gray-500">
                              {option.hint}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Questions/Comments */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="questions"
                      className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide"
                    >
                      Questions/Comments{" "}
                      <span className="normal-case font-medium text-gray-400">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="questions"
                      rows={3}
                      value={questions}
                      onChange={(e) => setQuestions(e.target.value)}
                      placeholder="Tell us what you're looking for..."
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs resize-none"
                    />
                  </div>

                  {/* Where did you hear about us */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="referralSource"
                      className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide"
                    >
                      Where did you hear about us?{" "}
                      <span className="normal-case font-medium text-gray-400">
                        (optional)
                      </span>
                    </label>
                    <select
                      id="referralSource"
                      value={referralSource}
                      onChange={(e) =>
                        setReferralSource(
                          e.target.value as BuyerReferralSource | ""
                        )
                      }
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
                    >
                      <option value="">Select an option</option>
                      {REFERRAL_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Who referred you */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="referredBy"
                      className="text-xs font-bold text-[#0B2545]/80 uppercase tracking-wide"
                    >
                      Who referred you?{" "}
                      <span className="normal-case font-medium text-gray-400">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="referredBy"
                      type="text"
                      value={referredBy}
                      onChange={(e) => setReferredBy(e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0B2545] focus:outline-none transition-colors shadow-2xs"
                    />
                  </div>

                  {/* Consent */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-950 focus:ring-blue-900"
                    />
                    <span className="text-xs text-gray-500 font-medium leading-relaxed">
                      I agree to receive text messages and emails from Wisco
                      Home Buyer about off-market deals. Msg &amp; data rates
                      may apply. Reply STOP to opt out at any time.
                    </span>
                  </label>
                </div>

                {submitError && (
                  <p className="text-xs text-red-500 font-bold">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="w-full inline-flex items-center justify-center bg-blue-950 hover:bg-blue-900 disabled:opacity-50 text-white rounded-lg px-8 py-3.5 text-base font-bold transition-all shadow-md active:scale-[0.98] cursor-pointer"
                >
                  {isLoading ? "Submitting..." : "Join the Buyers List"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
