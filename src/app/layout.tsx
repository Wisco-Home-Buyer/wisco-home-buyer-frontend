import type { Metadata } from "next";
import { Manrope, Marhey } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/Provider";
import { Navbar } from "@/components/shared/layout/Navbar";
import { Footer } from "@/components/shared/layout/Footer";
import { SmoothScroll } from "@/components/shared/layout/SmoothScroll";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const marhey = Marhey({
  variable: "--font-marhey",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wisco Home Buyer",
  description: "Sell your Wisconsin home fast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${marhey.variable} h-full antialiased`}
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
        </ReduxProvider>
      </body>
    </html>
  );
}


