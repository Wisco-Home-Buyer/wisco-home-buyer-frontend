import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Wisco Home Buyer",
  description:
    "Read the terms and conditions governing your use of Wisco Home Buyer's cash home buying services in Wisconsin.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      'By accessing and using the Wisco Home Buyer website (wiscohomebuyer.com) or by submitting a cash offer request, you agree to be legally bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.',
      "These terms apply to all visitors, homeowners, and any other users of our website or services.",
    ],
  },
  {
    title: "2. Our Services",
    content: [
      "Wisco Home Buyer is a Wisconsin-based real estate investment company that purchases residential properties directly from homeowners for cash. Our services include:",
      "• Reviewing submitted property information and preparing a no-obligation cash offer within 24 hours.",
      "• Conducting property walkthroughs to assess condition prior to finalizing an offer.",
      "• Facilitating a fast, as-is home sale — typically closing in as little as 7 days.",
      "• Coordinating with licensed title companies and real estate attorneys to complete all transactions legally and transparently.",
    ],
  },
  {
    title: "3. No-Obligation Cash Offer",
    content: [
      "Submitting a cash offer request through our website or by phone is completely free and places no obligation on you to sell your home. You are free to decline any offer for any reason.",
      "Wisco Home Buyer also reserves the right to withdraw or modify an offer at any time before a purchase agreement is signed, particularly if new information about the property's condition or title is discovered.",
    ],
  },
  {
    title: "4. As-Is Purchase",
    content: [
      "Wisco Home Buyer purchases properties in their current condition, as-is. You are not required to make any repairs, clean the property, or stage it for showings.",
      "However, you agree to disclose any known material defects, liens, unpaid taxes, code violations, or title encumbrances affecting the property to the best of your knowledge. Misrepresenting the condition or legal status of your property may result in offer cancellation or legal action.",
    ],
  },
  {
    title: "5. Zero Fees & Commissions",
    content: [
      "There are no agent commissions, listing fees, or hidden charges when selling to Wisco Home Buyer. The cash offer you accept is the net amount you receive at closing, minus any outstanding mortgages, liens, or taxes that must be paid off through the title company as part of the closing process.",
      "We cover standard closing costs on our side of the transaction.",
    ],
  },
  {
    title: "6. Closing Process",
    content: [
      "All transactions are handled through a licensed Wisconsin title company or real estate attorney. The closing timeline is typically 7 to 30 days, depending on your preference and title clearance.",
      "You will receive all closing documents for review in advance. We encourage you to consult with an independent attorney before signing any purchase agreement.",
    ],
  },
  {
    title: "7. Use of Website",
    content: [
      "You agree to use this website only for lawful purposes. You must not:",
      "• Submit false, fraudulent, or misleading property information.",
      "• Attempt to interfere with the website's operation or security.",
      "• Use automated tools (bots, scrapers) to access or extract data from our site.",
      "• Impersonate any person or entity or misrepresent your affiliation with any person or entity.",
    ],
  },
  {
    title: "8. Intellectual Property",
    content: [
      "All content on this website — including text, logos, images, graphics, and page layouts — is the exclusive property of Wisco Home Buyer and is protected under U.S. copyright and trademark law.",
      "You may not reproduce, redistribute, or use any content from this website for commercial purposes without our express written permission.",
    ],
  },
  {
    title: "9. Disclaimer of Warranties",
    content: [
      'Our website and services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. Wisco Home Buyer does not warrant that the website will be error-free, uninterrupted, or free of viruses.',
      "We make no representations regarding the accuracy or completeness of any market analysis or property valuation provided during the offer process.",
    ],
  },
  {
    title: "10. Limitation of Liability",
    content: [
      "To the maximum extent permitted by Wisconsin law, Wisco Home Buyer shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services, including lost profits, loss of data, or emotional distress.",
      "Our total liability for any claim arising from these terms or your use of our services shall not exceed the amount paid by us to you in any related transaction.",
    ],
  },
  {
    title: "11. Governing Law & Dispute Resolution",
    content: [
      "These Terms of Service are governed by the laws of the State of Wisconsin, without regard to conflict-of-law principles. Any disputes arising from these terms or your use of our services shall be resolved in the state or federal courts located in Milwaukee County, Wisconsin.",
    ],
  },
  {
    title: "12. Changes to These Terms",
    content: [
      "We reserve the right to update these Terms of Service at any time. Changes will take effect immediately upon posting on this page. Your continued use of our website after any changes constitutes your acceptance of the updated terms.",
      "We recommend checking this page periodically for updates.",
    ],
  },
  {
    title: "13. Contact Us",
    content: [
      "If you have any questions about these Terms of Service, please reach out to us:",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-[#0B2545] pt-36 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Please read these terms carefully before submitting a cash offer
            request or using any of Wisco Home Buyer&apos;s services.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-10">
          {sections.map((section) => (
            <div
              key={section.title}
              className="border-b border-gray-100 last:border-0 last:pb-0"
            >
              <h2 className="text-base font-bold text-[#0B2545] mb-3">
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.content.map((line, i) => (
                  <p
                    key={i}
                    className="text-slate-600 text-sm leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
                {section.title === "13. Contact Us" && (
                  <div className="mt-4 space-y-3">
                    <a
                      href="mailto:hello@wiscohomebuyer.com"
                      className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#0B2545] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0B2545]/5 flex items-center justify-center shrink-0">
                        <Mail className="h-4 w-4 text-[#0B2545]" />
                      </div>
                      hello@wiscohomebuyer.com
                    </a>
                    <a
                      href="tel:+14145550192"
                      className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#0B2545] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0B2545]/5 flex items-center justify-center shrink-0">
                        <Phone className="h-4 w-4 text-[#0B2545]" />
                      </div>
                      (414) 555-0192
                    </a>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-[#0B2545]/5 flex items-center justify-center shrink-0">
                        <MapPin className="h-4 w-4 text-[#0B2545]" />
                      </div>
                      Milwaukee, Wisconsin
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-bold text-[#0B2545] hover:text-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm font-bold text-[#0B2545] hover:text-blue-700 transition-colors"
          >
            View Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
