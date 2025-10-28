import type { Metadata } from "next";
import { Cormorant_Infant } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/tenant/Header";
import Footer from "@/components/tenant/Footer";
import "./globals.css";
import Swipeable from "@/components/tenant/Swipeable";
import { getWeddingByDomain } from "@/lib/tenant/getWeddingByDomain";
import { notFound } from "next/navigation";

const cormorantInfant = Cormorant_Infant({
  variable: "--font-cormorant-infant",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Yulissa and Matthew's Wedding — April 23, 2026 — Temecula, CA",
    template: "%s | Yulissa and Matthew's Wedding",
  },
  description:
    "Join us in Temecula, CA on April 23, 2026 to celebrate the wedding of Yulissa and Matthew. Find our story, photos, directions to the venue, FAQs, and registry information.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}>) {
  const { domain } = await params;
  const weddingData = await getWeddingByDomain(domain);

  if (!weddingData) {
    notFound();
  }

  return (
    <html lang="en">
      <body className={`${cormorantInfant.variable} antialiased`}>
        <Swipeable>
          <Header weddingData={weddingData} />
          <div className="px-4 md:px-0 mx-auto">{children}</div>
          <Footer />
        </Swipeable>
        <Analytics />
      </body>
    </html>
  );
}
