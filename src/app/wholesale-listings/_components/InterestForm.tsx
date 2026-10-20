"use client";

import { useState } from "react";
import { useSubmitListingInterestMutation } from "@/store/api/wholesaleListingApi";

const PHONE_REGEX = /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

const inputClass =
  "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900";

interface ApiErrorShape {
  data?: { message?: string; error?: { details?: { message?: string }[] } };
}

export function InterestForm({ listingId }: { listingId: string }) {
  const [submitInterest, { isLoading }] = useSubmitListingInterestMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!PHONE_REGEX.test(phone.trim())) {
      setError("Please enter a valid US phone number.");
      return;
    }

    try {
      await submitInterest({
        listingId,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim() || undefined,
      }).unwrap();
      setIsSubmitted(true);
    } catch (err) {
      const apiError = err as ApiErrorShape;
      setError(
        apiError?.data?.error?.details?.[0]?.message ??
          apiError?.data?.message ??
          "Something went wrong. Please try again.",
      );
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 space-y-1">
        <p className="font-bold text-emerald-800">
          Thanks, we got your request.
        </p>
        <p className="text-sm text-emerald-700 font-medium">
          We&apos;ll be in touch shortly about this property.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-50 border border-gray-100 rounded-2xl p-5 space-y-3"
    >
      <p className="font-bold text-[#0B2545]">
        I&apos;m interested in this deal
      </p>

      <input
        required
        maxLength={100}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        aria-label="Full name"
        autoComplete="name"
        className={inputClass}
      />
      <input
        required
        type="email"
        maxLength={200}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        aria-label="Email"
        autoComplete="email"
        className={inputClass}
      />
      <input
        required
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        aria-label="Phone"
        autoComplete="tel"
        className={inputClass}
      />
      <textarea
        rows={3}
        maxLength={1000}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Anything we should know? (optional)"
        aria-label="Message"
        className={inputClass}
      />

      {error && (
        <p role="alert" className="text-sm font-semibold text-rose-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center justify-center w-full bg-blue-950 hover:bg-blue-900 text-white rounded-xl py-3 text-sm font-bold disabled:opacity-60"
      >
        {isLoading ? "Sending..." : "Send my interest"}
      </button>
    </form>
  );
}
