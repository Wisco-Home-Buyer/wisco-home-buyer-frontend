"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  type EnrichmentSnapshot,
  useGetEnrichmentQuery,
} from "@/store/api/formApi";

interface SuccessSubmittedProps {
  /**
   * The leadId returned by POST /leads. Required to start the polling
   * loop — when null we skip polling and show a static success.
   */
  leadId: string | null;
  /**
   * The enrichment snapshot embedded in the POST /leads response.
   * Usually PENDING right after submission; if it's already SUCCESS
   * we skip polling and render the value immediately.
   */
  initialEnrichment: EnrichmentSnapshot | null;
}

const POLL_INTERVAL_MS = 2500;
const POLL_TIMEOUT_MS = 30_000;

/**
 * Format a USD integer estimate with thousands separators. Falls back to
 * "—" when the value hasn't been pulled yet.
 */
function formatEstimate(value: number | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Wizard success page. While the backend's fire-and-forget ATTOM
 * enrichment is running, we show a "we're analyzing your property"
 * spinner with periodic progress dots. The moment syncOne completes,
 * we reveal the estimated-value card so the customer can see their
 * cash offer envelope right there on the confirmation page — this is
 * the "magic moment" the client demoed to the customer.
 */
export function SuccessSubmitted({
  leadId,
  initialEnrichment,
}: SuccessSubmittedProps) {
  // RTK Query gives us automatic cache + skip semantics — we set
  // `skip` when there's nothing to poll for, and `pollingInterval` so
  // it auto-retries while pending. No local mirroring of `data` needed;
  // the rendered view just reads whichever snapshot is freshest
  // (initial → first polled → ... → final).
  const initial = initialEnrichment;
  const hasInitialPending =
    initial == null || initial.status === "PENDING";
  const shouldPoll = !!leadId && hasInitialPending;

  const { data, error } = useGetEnrichmentQuery(leadId ?? "", {
    skip: !shouldPoll,
    pollingInterval: POLL_INTERVAL_MS,
  });

  // Pick the freshest snapshot — polling result wins over the seed.
  const snapshot: EnrichmentSnapshot | null = data ?? initial;

  // Hard timeout — after 30s of polling we give up and show a calmer
  // message. The lead is still saved, the dashboard will pick it up;
  // we just don't keep spinning forever in the wizard.
  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    if (!shouldPoll) return;
    // Capture start time inside the effect so we don't call Date.now()
    // during render — react-hooks/purity rule.
    const start = Date.now();
    const handle = window.setTimeout(() => {
      // Only flip to timedOut if we genuinely haven't progressed past
      // PENDING — gives a small grace period for SUCCESS to land first.
      const elapsed = Date.now() - start;
      if (elapsed >= POLL_TIMEOUT_MS) setTimedOut(true);
    }, POLL_TIMEOUT_MS);
    return () => window.clearTimeout(handle);
  }, [leadId, shouldPoll]);

  const isPending =
    (snapshot?.status ?? "PENDING") === "PENDING" && !timedOut;
  const isSuccess = snapshot?.status === "SUCCESS";
  const isFailed = snapshot?.status === "FAILED";
  const showTimedOut = timedOut && !isSuccess && !isFailed;

  return (
    <div className="bg-white border-x border-b border-t-4 border-t-blue-950 border-gray-150 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-md flex flex-col items-center space-y-4 md:space-y-6 text-center">
      {/* Green Checkmark Circle */}
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

      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-bold text-[#0B2545] tracking-tight">
          Property Submitted!
        </h2>
        <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed px-1">
          Thank you for submitting your property details. Our system is
          currently analyzing the data and preparing your cash offer.
        </p>
      </div>

      {/* Estimated value reveal card — only renders on SUCCESS */}
      {isSuccess && (
        <div
          className="w-full bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-2xl p-5 text-left space-y-2 shadow-2xs"
          data-testid="enrichment-success"
        >
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-emerald-700">
            Estimated Value
          </p>
          <p className="text-3xl md:text-4xl font-extrabold text-emerald-900 tabular-nums">
            {formatEstimate(snapshot?.estimatedValue)}
          </p>
          {snapshot?.confidenceScore != null && (
            <p className="text-xxs md:text-xs text-emerald-700/80 font-medium">
              Confidence: {snapshot.confidenceScore}%
            </p>
          )}
          <p className="text-xxs md:text-xs text-gray-500 font-medium pt-1">
            A specialist will reach out shortly with a personalized cash
            offer based on this estimate.
          </p>
        </div>
      )}

      {/* PENDING state — animated dots so the user knows it's working */}
      {isPending && (
        <div className="w-full bg-slate-50 border border-slate-100/70 rounded-2xl p-4 md:p-5 text-left space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5 md:gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-blue-200 border-t-blue-700 animate-spin shrink-0" />
            <span className="text-xxs md:text-xs text-gray-500 font-bold leading-normal">
              Pulling live market data for your property…
            </span>
          </div>
          <div className="flex items-center gap-2.5 md:gap-3">
            <div className="w-5 h-5 rounded-full bg-[#EAF2F8] border border-blue-100/50 flex items-center justify-center shrink-0 text-[10px] font-bold text-[#0B2545]">
              ✓
            </div>
            <span className="text-xxs md:text-xs text-gray-500 font-bold leading-normal">
              Property details saved
            </span>
          </div>
          <div className="flex items-center gap-2.5 md:gap-3">
            <div className="w-5 h-5 rounded-full bg-[#EAF2F8] border border-blue-100/50 flex items-center justify-center shrink-0 text-[10px] font-bold text-[#0B2545]">
              ✓
            </div>
            <span className="text-xxs md:text-xs text-gray-500 font-bold leading-normal">
              Routed to a Wisconsin specialist
            </span>
          </div>
        </div>
      )}

      {/* FAILED state — surface the reason so the user knows what's up */}
      {isFailed && (
        <div className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-4 md:p-5 text-left space-y-2 shadow-2xs">
          <p className="text-xxs md:text-xs font-bold uppercase tracking-widest text-amber-700">
            We&apos;ll finalize your estimate shortly
          </p>
          <p className="text-xxs md:text-xs text-amber-900/80 font-medium leading-normal">
            {snapshot?.errorMessage ??
              "Our data provider is taking a moment — a specialist will be in touch with your personalized offer within 24 hours."}
          </p>
        </div>
      )}

      {/* Timeout state — never block the user; just settle gracefully */}
      {showTimedOut && (
        <div className="w-full bg-slate-50 border border-slate-100/70 rounded-2xl p-4 md:p-5 text-left shadow-2xs">
          <p className="text-xxs md:text-xs text-gray-600 font-medium leading-normal">
            We&apos;ll email you the moment your personalized offer is ready.
          </p>
        </div>
      )}

      {/* Hidden in production — handy for debugging the polling loop */}
      {error && !isSuccess && !isFailed && !showTimedOut && (
        <p className="text-[10px] text-gray-400">
          Live updates paused. (Network hiccup — retrying.)
        </p>
      )}

      {/* Timeline Info Box (always rendered — replaces the prior static version) */}
      <div className="w-full bg-slate-50 border border-slate-100/70 rounded-2xl p-4 md:p-5 text-left space-y-3 shadow-2xs">
        <h4 className="text-xs md:text-sm font-extrabold text-[#0B2545] tracking-wide">
          What happens next?
        </h4>

        <div className="space-y-2.5 md:space-y-3.5">
          <div className="flex items-start gap-2.5 md:gap-3">
            <div className="w-5 h-5 rounded-full bg-[#EAF2F8] border border-blue-100/50 flex items-center justify-center shrink-0 text-[10px] font-bold text-[#0B2545] mt-0.5">
              1
            </div>
            <span className="text-xxs md:text-xs text-gray-500 font-bold leading-normal">
              We review your property details and local market data.
            </span>
          </div>

          <div className="flex items-start gap-2.5 md:gap-3">
            <div className="w-5 h-5 rounded-full bg-[#EAF2F8] border border-blue-100/50 flex items-center justify-center shrink-0 text-[10px] font-bold text-[#0B2545] mt-0.5">
              2
            </div>
            <span className="text-xxs md:text-xs text-gray-500 font-bold leading-normal">
              A specialist will contact you within 24 hours.
            </span>
          </div>

          <div className="flex items-start gap-2.5 md:gap-3">
            <div className="w-5 h-5 rounded-full bg-[#EAF2F8] border border-blue-100/50 flex items-center justify-center shrink-0 text-[10px] font-bold text-[#0B2545] mt-0.5">
              3
            </div>
            <span className="text-xxs md:text-xs text-gray-500 font-bold leading-normal">
              Receive your no-obligation cash offer.
            </span>
          </div>
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="w-full pt-1">
        <Link
          href="/"
          className="inline-flex items-center justify-center w-full bg-white border border-gray-200 hover:bg-slate-50 text-gray-700 rounded-xl py-3 text-sm font-bold shadow-2xs hover:shadow-xs transition-all active:scale-99"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}