import type { Metadata } from "next";
import { Manrope, Marhey } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/Provider";
import { Navbar } from "@/components/shared/layout/Navbar";
import { Footer } from "@/components/shared/layout/Footer";
import { SmoothScroll } from "@/components/shared/layout/SmoothScroll";
import { Toaster } from "sonner";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const marhey = Marhey({
  variable: "--font-marhey",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wiscohomebuyer.com"),
  title: {
    default: "Wisco Home Buyer | Sell Your Wisconsin Home Fast for Cash",
    template: "%s | Wisco Home Buyer",
  },
  description:
    "Wisco Home Buyer purchases homes across Wisconsin for cash. No repairs, no agent fees, no hassle. Get a free, no-obligation cash offer within 24 hours.",
  keywords: [
    "sell home fast Wisconsin",
    "cash home buyer Wisconsin",
    "we buy houses Wisconsin",
    "sell house as-is Milwaukee",
    "no repairs cash offer",
    "fast home sale Wisconsin",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wiscohomebuyer.com",
    siteName: "Wisco Home Buyer",
    title: "Wisco Home Buyer | Sell Your Wisconsin Home Fast for Cash",
    description:
      "Get a free cash offer for your Wisconsin home. We buy houses as-is — no fees, no repairs, close in as little as 7 days.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wisco Home Buyer — Fast Cash Offers for Wisconsin Homes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wisco Home Buyer | Sell Your Wisconsin Home Fast for Cash",
    description:
      "No repairs. No fees. Close in 7 days. Get your free cash offer today.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${marhey.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <SmoothScroll>
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
          <Toaster position="top-right" richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}


