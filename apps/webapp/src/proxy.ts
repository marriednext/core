import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getHostType } from "@/lib/rewrites/multitenancy";
import { edgeDb } from "@/database/edge";
import { logs } from "orm-shelf/schema";

interface ClerkMetadata {
  onboardingComplete?: boolean;
  weddingId?: string;
  role?: string;
}

function log(info: Record<string, unknown>) {
  edgeDb
    .insert(logs)
    .values({ info })
    .catch(() => {});
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

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const startTime = Date.now();
  const hostHeader = req.headers.get("host") || "";
  const pathname = req.nextUrl.pathname;
  const { isTenantHost, firstLabel } = getHostType(hostHeader);

  log({
    step: "request_start",
    host: hostHeader,
    pathname,
    isTenantHost,
    firstLabel,
    url: req.url,
    timestamp: new Date().toISOString(),
  });

  if (isTenantHost) {
    log({ step: "tenant_detected", host: hostHeader, pathname });

    if (pathname.startsWith("/api/tenant/")) {
      log({ step: "tenant_api_passthrough", duration: Date.now() - startTime });
      return NextResponse.next();
    }

    const hostWithoutPort = hostHeader.split(":")[0];
    const hostParts = hostWithoutPort.split(".");
    const isSubdomain =
      hostParts.length > 2 ||
      (hostParts.length > 1 && hostParts[hostParts.length - 1] === "localhost");
    const domain = isSubdomain ? firstLabel : hostWithoutPort;
    const rewriteTarget = `/tenant/${domain}${pathname}`;

    log({
      step: "tenant_rewrite_prep",
      hostWithoutPort,
      hostParts,
      isSubdomain,
      domain,
      rewriteTarget,
      durationBeforeRewrite: Date.now() - startTime,
    });

    log({ step: "tenant_auth_start", host: hostHeader });
    const authStartTime = Date.now();
    await auth();
    log({
      step: "tenant_auth_complete",
      authDuration: Date.now() - authStartTime,
    });

    const response = nextResponseRewrite(req, rewriteTarget);
    log({
      step: "tenant_rewrite_complete",
      totalDuration: Date.now() - startTime,
    });
    return response;
  }

  log({ step: "non_tenant_auth_start", host: hostHeader, pathname });
  const authStartTime = Date.now();
  const { isAuthenticated, sessionClaims, redirectToSignIn } = await auth();
  log({
    step: "non_tenant_auth_complete",
    isAuthenticated,
    authDuration: Date.now() - authStartTime,
    totalDuration: Date.now() - startTime,
  });

  if (isPublicRoute(req)) {
    log({
      step: "public_route_passthrough",
      totalDuration: Date.now() - startTime,
    });
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
