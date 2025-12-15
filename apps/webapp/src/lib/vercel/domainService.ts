import * as Sentry from "@sentry/nextjs";

const VERCEL_BEARER_TOKEN = process.env.VERCEL_BEARER_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const BASE_DOMAIN = "marriednext.com";
const VERCEL_API_BASE = "https://api.vercel.com";

export interface DomainAdditionResult {
  success: boolean;
  domain?: string;
  error?: string;
}

export async function addSubdomainToVercel(
  subdomain: string
): Promise<DomainAdditionResult> {
  console.log("[Vercel API] Starting addSubdomainToVercel", { subdomain });

  if (!VERCEL_PROJECT_ID) {
    const error = "VERCEL_PROJECT_ID environment variable is not configured";
    console.error("[Vercel API] Missing VERCEL_PROJECT_ID");
    Sentry.captureException(new Error(error), {
      level: "error",
      tags: {
        service: "vercel-domain",
        action: "add-subdomain",
      },
    });
    return { success: false, error };
  }

  if (!VERCEL_BEARER_TOKEN) {
    const error = "VERCEL_BEARER_TOKEN environment variable is not configured";
    console.error("[Vercel API] Missing VERCEL_BEARER_TOKEN");
    Sentry.captureException(new Error(error), {
      level: "error",
      tags: {
        service: "vercel-domain",
        action: "add-subdomain",
      },
    });
    return { success: false, error };
  }

  const fullDomain = `${subdomain}.${BASE_DOMAIN}`;
  console.log("[Vercel API] Full domain to add:", fullDomain);
  console.log("[Vercel API] Project ID:", VERCEL_PROJECT_ID);

  try {
    const url = `${VERCEL_API_BASE}/v10/projects/${VERCEL_PROJECT_ID}/domains`;
    const body = { name: fullDomain };

    console.log("[Vercel API] Making request to:", url);
    console.log("[Vercel API] Request body:", body);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VERCEL_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("[Vercel API] Response status:", response.status);
    console.log("[Vercel API] Response status text:", response.statusText);

    const responseData = await response.json();
    console.log(
      "[Vercel API] Response data:",
      JSON.stringify(responseData, null, 2)
    );

    if (!response.ok) {
      throw new Error(
        `Vercel API error: ${response.status} - ${JSON.stringify(responseData)}`
      );
    }

    console.log("[Vercel API] Domain added successfully:", {
      name: responseData.name,
      verified: responseData.verified,
    });

    Sentry.captureMessage("Subdomain added to Vercel successfully", {
      level: "info",
      tags: {
        service: "vercel-domain",
        action: "add-subdomain",
      },
      extra: {
        subdomain,
        fullDomain,
        domainName: responseData.name,
        verified: responseData.verified,
      },
    });

    return {
      success: true,
      domain: responseData.name,
    };
  } catch (error) {
    console.error("[Vercel API] Error caught:", error);
    console.error("[Vercel API] Error type:", error?.constructor?.name);
    console.error("[Vercel API] Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      fullError: JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
    });

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    Sentry.captureException(error, {
      level: "error",
      tags: {
        service: "vercel-domain",
        action: "add-subdomain",
      },
      extra: {
        subdomain,
        fullDomain,
        errorMessage,
      },
    });

    return {
      success: false,
      domain: fullDomain,
      error: errorMessage,
    };
  }
}

