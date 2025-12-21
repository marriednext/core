"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import {
  ApplicationOnboardingPage,
  type ApplicationOnboardingFormData,
} from "component-shelf";

const LinkWrapper = ({
  href = "/",
  ...props
}: ComponentPropsWithoutRef<"a">) => {
  return <Link href={href || "/"} {...props} />;
};

async function checkSubdomainAvailability(
  subdomain: string
): Promise<{ available: boolean; error?: string }> {
  const response = await fetch("/api/domains/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subdomain }),
  });

  const data = await response.json();
  return { available: data.available, error: data.error };
}

export default function OnboardingPage() {
  const handleSubmit = async (data: ApplicationOnboardingFormData) => {
    console.log("Form submitted:", data);
    const domainResponse = await fetch("/api/domains", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subdomain: data.subdomain }),
    });

    const domainResult = await domainResponse.json();

    if (!domainResult.success) {
      console.error("Domain registration failed:", domainResult.error);
      return;
    }

    // TODO: api/onboarding
    console.log("Domain registered:", domainResult);
  };

  return (
    <ApplicationOnboardingPage
      link={LinkWrapper}
      onSubdomainBlur={checkSubdomainAvailability}
      onSubmit={handleSubmit}
      onSkip={handleSubmit}
    />
  );
}
