import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getHostType } from "@/lib/rewrites/multitenancy";

interface ClerkMetadata {
  onboardingComplete?: boolean;
  weddingId?: string;
  role?: string;
}

const isOnboardingRoute = createRouteMatcher(["/engaged/onboarding"]);
const isOnboardingApiRoute = createRouteMatcher(["/api/onboarding(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/welcome",
  "/invitation",
  "/register",
  "/sign-in",
  "/sign-up",
  "/api/tenant/rsvp/(.*)",
  "/documentation",
  "/documentation/(.*)",
  "/blog",
  "/blog/(.*)",
  "/help",
  "/help/(.*)",
  "/templates",
  "/templates/(.*)",
  "/tenant/(.*)",
]);

function nextResponseRewrite(req: NextRequest, url: string) {
  return NextResponse.rewrite(new URL(url, req.url));
}

export default clerkMiddleware(async (auth, req) => {
  const hostHeader = req.headers.get("host") || "";
  const pathname = req.nextUrl.pathname;
  const { isTenantHost, firstLabel } = getHostType(hostHeader);

  if (isTenantHost) {
    if (pathname.startsWith("/api/tenant/")) {
      return NextResponse.next();
    }

    const hostWithoutPort = hostHeader.split(":")[0];
    const hostParts = hostWithoutPort.split(".");
    const isSubdomain =
      hostParts.length > 2 ||
      (hostParts.length > 1 && hostParts[hostParts.length - 1] === "localhost");
    const domain = isSubdomain ? firstLabel : hostWithoutPort;
    const rewriteTarget = `/tenant/${domain}${pathname}`;

    await auth();

    return nextResponseRewrite(req, rewriteTarget);
  }

  const { isAuthenticated, sessionClaims, redirectToSignIn } = await auth();

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  if (
    isAuthenticated &&
    (isOnboardingRoute(req) || isOnboardingApiRoute(req))
  ) {
    return NextResponse.next();
  }

  if (!isAuthenticated && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  const metadata = sessionClaims?.metadata as ClerkMetadata;

  if (isAuthenticated && !metadata?.onboardingComplete) {
    const onboardingUrl = new URL("/engaged/onboarding", req.url);
    return NextResponse.redirect(onboardingUrl);
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
