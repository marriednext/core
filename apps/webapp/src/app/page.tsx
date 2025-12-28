"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { LandingPage } from "@/components/application";

export default function Home() {
  const { isSignedIn } = useUser();
  return <LandingPage isAuthenticated={isSignedIn} Link={Link} />;
}
