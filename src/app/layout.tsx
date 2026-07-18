import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/Provider";
import { Navbar } from "@/components/shared/layout/Navbar";

const manrope = Manrope({
  variable: "--font-manrope",
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
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
