import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { navItems } from "./navItems";

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full bg-linear-to-r from-white via-white/50 to-transparent">
      <div className="flex h-20 items-center justify-between px-4 md:px-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Wisco Home Buyer Logo"
              width={100}
              height={100}
              priority
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
          <Button className="bg-blue-950 hover:bg-blue-900 text-white rounded-md px-6 hidden sm:flex">
            Get My FREE Cash Offer!
          </Button>
        </div>
      </div>
    </header>
  );
}
