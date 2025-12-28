"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useClerk } from "@clerk/nextjs";
import { ApplicationDashboardLayout, ComingSoonOverlay } from "component-shelf";
import { fetchShell } from "@/lib/fetch";
import {
  transformShellToUserData,
  transformShellToWeddingData,
} from "transformer-shelf";

export default function MemoriesPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();

  const { data } = useQuery({
    queryKey: ["shell"],
    queryFn: fetchShell,
  });

  const userData = data ? transformShellToUserData(data) : undefined;
  const weddingData = data ? transformShellToWeddingData(data) : undefined;

  return (
    <ApplicationDashboardLayout
      user={userData}
      wedding={weddingData}
      Link={Link}
      pathname={pathname}
      onLogout={() => signOut({ redirectUrl: "/" })}
      onInviteClick={() => router.push("/engaged/permissions")}
    >
      <ComingSoonOverlay />
    </ApplicationDashboardLayout>
  );
}
