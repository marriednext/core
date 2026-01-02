import type { Metadata } from "next";
import { Cormorant_Infant } from "next/font/google";
import "style-shelf/tailwind";
import { notFound } from "next/navigation";
import { BuilderLayoutContent } from "./BuilderLayoutContent";
import { createDummyWeddingData, isValidTheme, VALID_THEMES } from "./dummyData";

const cormorantInfant = Cormorant_Infant({
  variable: "--font-cormorant-infant",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Local Theme Preview",
  robots: "noindex, nofollow",
};

export default async function BuilderLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ theme: string }>;
}>) {
  const { theme } = await params;

  if (!isValidTheme(theme)) {
    notFound();
  }

  const weddingData = createDummyWeddingData(theme);

  return (
    <html lang="en">
      <body className={`${cormorantInfant.variable} antialiased`}>
        <BuilderLayoutContent initialData={weddingData}>
          {children}
        </BuilderLayoutContent>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return VALID_THEMES.map((theme) => ({ theme }));
}
