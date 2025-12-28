"use client";

import { useUser } from "@clerk/nextjs";
import {
  ApplicationNavbar,
  ApplicationFooter,
  ApplicationHelpCenter,
} from "@/components/application";

export function HelpPageClient() {
  const { isSignedIn } = useUser();
  return (
    <div className="min-h-screen bg-background">
      <ApplicationNavbar isAuthenticated={isSignedIn} />
      <main className="pt-16">
        <ApplicationHelpCenter />
      </main>
      <ApplicationFooter />
    </div>
  );
}

