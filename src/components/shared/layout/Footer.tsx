import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#081321] text-slate-400 text-sm py-16 px-4 md:px-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Top Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12">
          {/* Column 1: Logo & Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Wisco Home Buyer Logo"
                width={130}
                height={120}
                priority
                unoptimized
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-xs md:text-sm text-slate-400 max-w-xs leading-relaxed">
              Wisconsin&apos;s #1 Cash Home Buyer. Fast, fair, and stress-free since 2012.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-300">
                <Award className="h-4 w-4 text-slate-400 shrink-0" />
                <span>BBB Accredited Business</span>
              </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#why-us" className="hover:text-white transition-colors">
                  Why Us
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="font-medium text-xs md:text-sm text-slate-300">(414) 555-0192</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:hello@wiscohomebuyer.com" className="font-medium text-xs md:text-sm text-slate-300 hover:text-white transition-colors">
                  hello@wiscohomebuyer.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="font-medium text-xs md:text-sm text-slate-300">Milwaukee, WI</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal links */}
        <div className="border-t border-slate-800/80 pt-6 mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <span>© 2024 Wisco Home Buyer. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
