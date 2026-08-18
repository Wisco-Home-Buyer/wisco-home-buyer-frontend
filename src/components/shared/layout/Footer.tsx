import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#081321] text-slate-400 text-sm py-12 md:py-16 px-4 md:px-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Top Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-8 md:pb-12">
          {/* Column 1: Logo & Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/logoFooter.png"
                  alt="Wisco Home Buyer Logo"
                  width={130}
                  height={120}
                  priority
                  unoptimized
                  className="object-contain brightness-0 invert"
                />
              </Link>
              <p className="text-xs md:text-sm text-slate-400 max-w-xs leading-relaxed">
                Wisconsin&apos;s #1 Cash Home Buyer. Fast, fair, and stress-free
                since 2012.
              </p>
            </div>
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-300">
                <Image
                  src="/images/Accredited.svg"
                  alt="BBB Accredited"
                  width={16}
                  height={16}
                  className="brightness-0 invert"
                />
                <span>BBB Accredited Business</span>
              </div>
            </div>
          </div>

          {/* Company & Contact Side-by-Side on Mobile */}
          <div className="grid grid-cols-[1fr_1.3fr] gap-4 md:contents">
            {/* Column 2: Company */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">
                Company
              </h4>
              <ul className="space-y-2.5 text-xs md:text-sm">
                <li>
                  <Link
                    href="/#how-it-works"
                    className="hover:text-white transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#why-us"
                    className="hover:text-white transition-colors"
                  >
                    Why Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#testimonials"
                    className="hover:text-white transition-colors"
                  >
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="space-y-4 min-w-0">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <a
                    href="tel:+19204702396"
                    className="font-medium text-xs md:text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    920-470-2396
                  </a>
                </li>
                <li className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <a
                    href="mailto:info@wiscohomebuyer.com"
                    className="font-medium text-[11px] sm:text-xs md:text-sm text-slate-300 hover:text-white transition-colors truncate block"
                    title="info@wiscohomebuyer.com"
                  >
                    info@wiscohomebuyer.com
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-medium text-xs md:text-sm text-slate-300">
                    Appleton, Wisconsin
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal links */}
        <div className="border-t border-slate-800/80 pt-6 mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <span>© {new Date().getFullYear()} Wisco Home Buyer. All rights reserved.</span>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
