"use client";

import { useUser } from "@clerk/nextjs";
import {
  ApplicationNavbar,
  ApplicationFooter,
  ApplicationTemplatesHero,
  ApplicationTemplatesGrid,
  ApplicationTemplatesCta,
} from "@/components/application";

export function TemplatesPageClient() {
  const { isSignedIn } = useUser();
  return (
    <main className="min-h-screen">
      <ApplicationNavbar isAuthenticated={isSignedIn} />
      <ApplicationTemplatesHero />
      <ApplicationTemplatesGrid isSignedIn={isSignedIn} />
      <ApplicationTemplatesCta />
      <ApplicationFooter />
    </main>
  );
}

