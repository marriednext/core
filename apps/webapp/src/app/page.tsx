"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  Navbar,
  HeroSection,
  FeaturesSection,
  ApplicationHowItWorksSection,
  ApplicationCtaSection,
  ApplicationFooter,
} from "component-shelf";
import "style-shelf/tailwind";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div>
      {/* <MarriedNextMarketingNavigation isAuthenticated={isSignedIn} /> */}
      <Navbar
        Link={Link}
        loginUrl="/sign-in"
        signUpUrl="/register"
        isAuthenticated={isSignedIn}
      />
      <HeroSection />
      <FeaturesSection />
      <ApplicationHowItWorksSection />
      {/* <ApplicationSeatingPlannerSection /> */}
      {/* <ApplicationMemoriesSection /> */}
      {/* <ApplicationPricingSection /> */}
      <ApplicationCtaSection Link={Link} signUpUrl="/register" />
      <ApplicationFooter />
    </div>
  );
}
