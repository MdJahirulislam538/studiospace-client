import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toast";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Platform",
  description:
    "Discover, filter, inspect dynamic availability, and reserve photography cyc walls, cinema sound stages, podcast lounges, music suites, and art workshops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Toaster>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Toaster>
      </body>
    </html>
  );
}
