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
  if (!VERCEL_PROJECT_ID || !VERCEL_BEARER_TOKEN) {
    const error = "Vercel environment variables are not configured";
    Sentry.captureException(new Error(error), {
      level: "error",
      tags: {
        service: "vercel-domain",
        action: "add-subdomain",
      },
      extra: {
        VERCEL_PROJECT_ID_SET: !!VERCEL_PROJECT_ID,
        VERCEL_BEARER_TOKEN_SET: !!VERCEL_BEARER_TOKEN,
      },
    });
    return { success: false, error };
  }

  const fullDomain = `${subdomain}.${BASE_DOMAIN}`;

  try {
    const url = `${VERCEL_API_BASE}/v10/projects/${VERCEL_PROJECT_ID}/domains`;
    const body = { name: fullDomain };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VERCEL_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        `Vercel API error: ${response.status} - ${JSON.stringify(responseData)}`
      );
    }

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
