export type MultiTenantInput = {
  hostHeader: string;
  pathname: string;
  isApiRoute: boolean;
  isWelcomeRoute: boolean;
};

export type MultiTenantHelpers = {
  findWeddingIdByApexDomain: (
    apexDomain: string
  ) => Promise<string | undefined>;
  findWeddingIdBySubdomain: (subdomain: string) => Promise<string | undefined>;
};

export type MultiTenantDecision =
  | { action: "none" }
  | { action: "rewrite"; path: string }
  | { action: "redirect"; path: string };

// helpers are injected as dependencies so tests can mock database lookups without mocking imports
export async function decideMultiTenantRouting(
  input: MultiTenantInput,
  helpers: MultiTenantHelpers
): Promise<MultiTenantDecision> {
  const requestPathname = input.pathname || "";
  if (input.isApiRoute) {
    return { action: "none" };
  }
  if (input.isWelcomeRoute) {
    return { action: "none" };
  }

  const hostHeader = input.hostHeader || "";
  const hostWithoutPort = hostHeader.split(":")[0];
  const hostParts = hostWithoutPort.split(".");
  const firstLabel = hostParts[0] || "";

  const hasSubdomain =
    hostParts.length > 2 ||
    (hostParts.length > 1 && hostParts[hostParts.length - 1] === "localhost");
  const isTenantHost =
    hasSubdomain && firstLabel !== "www" && firstLabel !== "admin";
  const isBaseHost =
    !hasSubdomain || firstLabel === "www" || firstLabel === "admin";

  if (isBaseHost) {
    if (requestPathname.startsWith("/site")) {
      console.log("isBaseHost and requestPathname starts with /site");
      return { action: "rewrite", path: "/404" };
    }
    let possibleApexDomain = "";
    if (firstLabel === "www") {
      possibleApexDomain = hostParts.slice(1).join(".");
    } else {
      possibleApexDomain = hostWithoutPort;
    }
    try {
      const matchedWeddingId = await helpers.findWeddingIdByApexDomain(
        possibleApexDomain
      );
      if (matchedWeddingId) {
        let rewritePath = "";
        if (requestPathname === "/") {
          rewritePath = `/site/${possibleApexDomain}`;
        } else {
          rewritePath = `/site/${possibleApexDomain}${requestPathname}`;
        }
        return { action: "rewrite", path: rewritePath };
      }
    } catch {
      console.log("isBaseHost and findWeddingIdByApexDomain error");
      return { action: "rewrite", path: "/404" };
    }
    return { action: "none" };
  }

  if (isTenantHost) {
    if (requestPathname.startsWith("/dashboard")) {
      console.log("isTenantHost and requestPathname starts with /dashboard");
      return { action: "rewrite", path: "/404" };
    }
    if (requestPathname.startsWith("/site")) {
      return { action: "redirect", path: "/" };
    }
    const tenantSubdomain = firstLabel;
    const foundId = await helpers.findWeddingIdBySubdomain(tenantSubdomain);
    if (!foundId) {
      console.log("isTenantHost and findWeddingIdBySubdomain error");
      return { action: "rewrite", path: "/404" };
    }
    let rewritePath = "";
    if (requestPathname === "/") {
      rewritePath = `/tenant/${tenantSubdomain}`;
    } else {
      rewritePath = `/tenant/${tenantSubdomain}${requestPathname}`;
    }
    return { action: "rewrite", path: rewritePath };
  }

  return { action: "none" };
}
