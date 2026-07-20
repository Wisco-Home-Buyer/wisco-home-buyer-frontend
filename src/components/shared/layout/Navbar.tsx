"use client";

import Link from "next/link";
import Image from "next/image";
import { navItems } from "./navItems";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check on mount in case page is already scrolled
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/50 backdrop-blur-sm border-b border-gray-200/50 shadow-xs" 
          : "bg-linear-to-r from-white via-transparent to-transparent border-b border-white"
      }`}
    >
      <div className="flex h-20 items-center justify-between px-4 md:px-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="flex items-center"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Wisco Home Buyer Logo"
              width={130}
              height={120}
              priority
              unoptimized
              className="object-contain"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-blue-900 transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center">
          <button className="bg-blue-950 hover:bg-blue-900 text-white rounded-md px-4 py-2 hidden sm:flex">
            Get My FREE Cash Offer!
          </button>
        </div>
      </div>
    </header>
  );
}

