"use client";

import Link from "next/link";
import Image from "next/image";
import { navItems } from "./navItems";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isHomepage = pathname === "/";
  const showSolidNavbar = !isHomepage || isScrolled || isOpen;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;

    const hash = href.slice(hashIndex + 1);
    setIsOpen(false);

    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${hash}`);
        window.dispatchEvent(new Event("hashchange"));
      }
    } else {
      e.preventDefault();
      router.push(`/#${hash}`);
    }
  };

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        showSolidNavbar
          ? "bg-white border-b border-gray-200/50 shadow-xs" 
          : "bg-linear-to-r from-white via-transparent to-transparent border-b border-white"
      }`}
    >
      <div className="flex h-20 items-center justify-between px-8 md:px-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="flex items-center"
            onClick={(e) => {
              setIsOpen(false);
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", "/");
              }
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Wisco Home Buyer Logo"
              width={120}
              height={40}
              priority
              className="object-contain w-auto h-auto"
            />
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleHashClick(e, item.href)}
              className="hover:text-blue-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {/* CTA Button - Desktop */}
          <Link href="/cash-offer" className="bg-blue-950 hover:bg-blue-900 text-white rounded-md px-4 py-3 hidden lg:flex cursor-pointer text-sm font-medium transition-colors">
            Get My FREE Cash Offer!
          </Link>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex lg:hidden items-center justify-center text-gray-700 hover:text-blue-950 p-2 rounded-md transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200/60 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-6 py-8 space-y-6 flex flex-col items-stretch">
          <nav className="flex flex-col gap-4 text-base font-semibold text-gray-700">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href} 
                onClick={(e) => handleHashClick(e, item.href)}
                className="hover:text-blue-900 transition-colors py-2 border-b border-gray-100 last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <Link 
            href="/cash-offer"
            onClick={() => setIsOpen(false)}
            className="w-full bg-blue-950 hover:bg-blue-900 text-white rounded-lg py-3 text-base font-bold transition-colors shadow-md cursor-pointer text-center"
          >
            Get My FREE Cash Offer!
          </Link>
        </div>
      </div>
    </header>
  );
}
