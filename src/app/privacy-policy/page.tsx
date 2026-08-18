import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Wisco Home Buyer",
  description:
    "Learn how Wisco Home Buyer collects, uses, and protects your personal information when you request a cash offer for your Wisconsin home.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "When you submit a cash offer request through our website or contact us by phone or email, we collect the following types of information:",
      "• Personal Identifiers: Your full name, phone number, and email address.",
      "• Property Information: Your property address, home condition, number of bedrooms/bathrooms, reason for selling, and any uploaded photos of the property.",
      "• Communication Records: Notes and records from any phone calls, emails, or form submissions you make with our team.",
      "• Website Usage Data: Your IP address, browser type, pages visited, and time spent on our site (collected automatically via cookies and analytics tools).",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "Wisco Home Buyer uses your information exclusively to provide and improve our cash home buying services:",
      "• To evaluate your property and prepare a fair cash offer within 24 hours.",
      "• To contact you by phone, email, or SMS regarding your offer or any follow-up questions about your property.",
      "• To schedule a property walkthrough if you choose to proceed with our offer.",
      "• To complete the home purchase transaction and closing process.",
      "• To send you relevant information about our services, market updates, or future opportunities — only if you have opted in.",
      "• To analyze and improve our website's performance and user experience.",
    ],
  },
  {
    title: "3. Cash Offer Process & Data",
    content: [
      "When you request a cash offer, the property information you provide is used solely to evaluate your home and generate your offer. We analyze comparable home sales in your Wisconsin neighborhood, current local market conditions, and your property's condition to determine a fair price.",
      "Your property data is never sold to third-party real estate agents, listing services, or marketing companies. Submitting a cash offer request places zero obligation on you to sell.",
    ],
  },
  {
    title: "4. Sharing of Information",
    content: [
      "We do not sell, rent, or trade your personal information. We may share your information only in the following limited circumstances:",
      "• With trusted closing attorneys and title companies as required to complete a real estate transaction you have agreed to.",
      "• With service providers who assist us in operating our website (e.g., hosting, analytics) under strict confidentiality agreements.",
      "• When required by law, such as in response to a court order or legal process.",
    ],
  },
  {
    title: "5. SMS & Marketing Communications",
    content: [
      "By submitting your phone number on our website, you consent to receive SMS messages and calls from Wisco Home Buyer related to your cash offer request. Standard message and data rates may apply.",
      "You may opt out of marketing communications at any time by replying STOP to any SMS message or by contacting us directly. Opting out will not affect your ability to receive transactional communications related to an active offer or closing.",
    ],
  },
  {
    title: "6. Data Security",
    content: [
      "We take the security of your personal information seriously. We use industry-standard encryption (SSL/TLS) for data transmission and secure servers to store your information. Access to your data is restricted to authorized Wisco Home Buyer team members who need it to process your request.",
      "However, no method of electronic transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.",
    ],
  },
  {
    title: "7. Cookies & Tracking",
    content: [
      "Our website uses cookies and similar technologies to enhance your browsing experience and analyze site traffic. These may include Google Analytics and other analytics tools that help us understand how visitors interact with our site.",
      "You can disable cookies through your browser settings at any time. Disabling cookies may affect the functionality of certain features on our website.",
    ],
  },
  {
    title: "8. Your Rights",
    content: [
      "You have the right to:",
      "• Request a copy of the personal information we hold about you.",
      "• Request correction of any inaccurate information.",
      "• Request deletion of your personal data, subject to our legal obligations.",
      "• Opt out of marketing communications at any time.",
      "To exercise any of these rights, please contact us at info@wiscohomebuyer.com.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    content: [
      'We may update this Privacy Policy periodically to reflect changes in our practices or applicable law. When we make changes, we will update the "Effective Date" at the top of this page. We encourage you to review this policy from time to time.',
    ],
  },
  {
    title: "10. Contact Us",
    content: [
      "If you have any questions, concerns, or requests related to this Privacy Policy, please contact us:",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-[#0B2545] pt-36 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Your privacy matters to us. This policy explains how Wisco Home
            Buyer handles the information you share when requesting a cash offer
            for your Wisconsin home.
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
                  <p key={i} className="text-slate-600 text-sm leading-relaxed">
                    {line}
                  </p>
                ))}
                {section.title === "10. Contact Us" && (
                  <div className="mt-4 space-y-3">
                    <a
                      href="mailto:info@wiscohomebuyer.com"
                      className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#0B2545] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0B2545]/5 flex items-center justify-center shrink-0">
                        <Mail className="h-4 w-4 text-[#0B2545]" />
                      </div>
                      info@wiscohomebuyer.com
                    </a>
                    <a
                      href="tel:+19204702396"
                      className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#0B2545] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0B2545]/5 flex items-center justify-center shrink-0">
                        <Phone className="h-4 w-4 text-[#0B2545]" />
                      </div>
                      920-470-2396
                    </a>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-[#0B2545]/5 flex items-center justify-center shrink-0">
                        <MapPin className="h-4 w-4 text-[#0B2545]" />
                      </div>
                      Appleton, Wisconsin
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
            href="/terms-of-service"
            className="text-sm font-bold text-[#0B2545] hover:text-blue-700 transition-colors"
          >
            View Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
}
