import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { decideMultiTenantRouting } from "./lib/rewrites/multitenancy";
import { edgeDb } from "./database/edge";
import { wedding } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const isOnboardingRoute = createRouteMatcher(["/onboarding"]);
const isOnboardingApiRoute = createRouteMatcher(["/api/onboarding/(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/welcome",
  "/api/v3/rsvp/(.*)",
]);

function isWelcomeRoute(req: NextRequest): boolean {
  return req.nextUrl.pathname.startsWith("/welcome");
}

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const startTime = performance.now();

  const { isAuthenticated, sessionClaims, redirectToSignIn } = await auth();
  console.log(
    `[Perf] Auth check: ${(performance.now() - startTime).toFixed(2)}ms`
  );

  if (
    isAuthenticated &&
    (isOnboardingRoute(req) || isOnboardingApiRoute(req))
  ) {
    console.log(
      `[Perf] Onboarding route check: ${(performance.now() - startTime).toFixed(
        2
      )}ms`
    );
    return NextResponse.next();
  }

  if (!isAuthenticated && !isPublicRoute(req)) {
    console.log(
      `[Perf] Public route check: ${(performance.now() - startTime).toFixed(
        2
      )}ms`
    );
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  if (isAuthenticated && !sessionClaims?.metadata?.onboardingComplete) {
    console.log(
      `[Perf] Onboarding complete check: ${(
        performance.now() - startTime
      ).toFixed(2)}ms`
    );
    const onboardingUrl = new URL("/onboarding", req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  const multiTenantStart = performance.now();
  const multiTenantResponse = await applyMultiTenantRewrite(req);
  console.log(
    `[Perf] Multi-tenant rewrite: ${(
      performance.now() - multiTenantStart
    ).toFixed(2)}ms`
  );

  if (multiTenantResponse) {
    console.log("multiTenantResponse", multiTenantResponse);
    console.log(
      `[Perf] Total middleware time: ${(performance.now() - startTime).toFixed(
        2
      )}ms`
    );
    return multiTenantResponse;
  }

  console.log(
    `[Perf] Total middleware time: ${(performance.now() - startTime).toFixed(
      2
    )}ms`
  );
});

async function applyMultiTenantRewrite(req: NextRequest) {
  const fnStartTime = performance.now();

  const requestUrl = req.nextUrl;
  const pathname = requestUrl.pathname;
  const hostHeader = req.headers.get("host") || "";
  console.log(
    `[Perf] Request parsing: ${(performance.now() - fnStartTime).toFixed(2)}ms`
  );

  const decisionStart = performance.now();
  const decision = await decideMultiTenantRouting(
    {
      hostHeader,
      pathname,
      isApiRoute: requestUrl.pathname.startsWith("/api"),
      isWelcomeRoute: isWelcomeRoute(req as NextRequest),
    },
    {
      findWeddingIdByApexDomain: async (apexDomain) => {
        const dbStart = performance.now();
        try {
          const rows = await edgeDb
            .select({ id: wedding.id })
            .from(wedding)
            .where(eq(wedding.customDomain, apexDomain))
            .limit(1);
          console.log(
            `[Perf] Custom domain DB lookup: ${(
              performance.now() - dbStart
            ).toFixed(2)}ms`
          );
          const matchedWeddingId = rows?.[0]?.id as string | undefined;
          return matchedWeddingId ? matchedWeddingId : undefined;
        } catch (error) {
          console.log("custom domain lookup error", error);
          console.log(
            `[Perf] Custom domain DB lookup (error): ${(
              performance.now() - dbStart
            ).toFixed(2)}ms`
          );
          return undefined;
        }
      },
      findWeddingIdBySubdomain: async (subdomain) => {
        const dbStart = performance.now();
        try {
          const rows = await edgeDb
            .select({ id: wedding.id })
            .from(wedding)
            .where(eq(wedding.subdomain, subdomain))
            .limit(1);

          console.log(
            `[Perf] Subdomain DB lookup: ${(
              performance.now() - dbStart
            ).toFixed(2)}ms`
          );
          const matchedWeddingId = rows?.[0]?.id as string | undefined;

          return matchedWeddingId ? matchedWeddingId : undefined;
        } catch (error) {
          console.log("subdomain lookup error", error);
          console.log(
            `[Perf] Subdomain DB lookup (error): ${(
              performance.now() - dbStart
            ).toFixed(2)}ms`
          );
          return undefined;
        }
      },
    }
  );
  console.log(
    `[Perf] Decision routing logic: ${(
      performance.now() - decisionStart
    ).toFixed(2)}ms`
  );

  if (decision.action === "none") {
    console.log(
      `[Perf] applyMultiTenantRewrite total (none): ${(
        performance.now() - fnStartTime
      ).toFixed(2)}ms`
    );
    return undefined;
  }
  if (decision.action === "rewrite") {
    console.log(
      `[Perf] applyMultiTenantRewrite total (rewrite): ${(
        performance.now() - fnStartTime
      ).toFixed(2)}ms`
    );
    return NextResponse.rewrite(new URL(decision.path, requestUrl));
  }
  if (decision.action === "redirect") {
    console.log(
      `[Perf] applyMultiTenantRewrite total (redirect): ${(
        performance.now() - fnStartTime
      ).toFixed(2)}ms`
    );
    return NextResponse.redirect(new URL(decision.path, requestUrl));
  }
  console.log(
    `[Perf] applyMultiTenantRewrite total (undefined): ${(
      performance.now() - fnStartTime
    ).toFixed(2)}ms`
  );
  return undefined;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
