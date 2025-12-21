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

interface RecommendedRecord {
  rank: number;
  value: string | string[];
}

export interface DomainConfigResult {
  success: boolean;
  configuredBy?: "CNAME" | "A" | "http" | "dns-01" | null;
  nameservers?: string[];
  serviceType?: "external" | "zeit.world" | "na";
  cnames?: string[];
  aValues?: string[];
  conflicts?: string[];
  acceptedChallenges?: ("dns-01" | "http-01")[];
  recommendedIPv4?: RecommendedRecord[];
  recommendedCNAME?: RecommendedRecord[];
  ipStatus?: string | null;
  misconfigured?: boolean;
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

export async function getDomainConfig(
  domain: string
): Promise<DomainConfigResult> {
  if (!VERCEL_BEARER_TOKEN) {
    const error = "Vercel bearer token is not configured";
    Sentry.captureException(new Error(error), {
      level: "error",
      tags: {
        service: "vercel-domain",
        action: "get-domain-config",
      },
    });
    return { success: false, error };
  }

  try {
    const url = `${VERCEL_API_BASE}/v6/domains/${domain}/config`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${VERCEL_BEARER_TOKEN}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        `Vercel API error: ${response.status} - ${JSON.stringify(responseData)}`
      );
    }

    console.log("responseData", responseData);

    return {
      success: true,
      configuredBy: responseData.configuredBy,
      nameservers: responseData.nameservers,
      serviceType: responseData.serviceType,
      cnames: responseData.cnames,
      aValues: responseData.aValues,
      conflicts: responseData.conflicts,
      acceptedChallenges: responseData.acceptedChallenges,
      recommendedIPv4: responseData.recommendedIPv4,
      recommendedCNAME: responseData.recommendedCNAME,
      ipStatus: responseData.ipStatus,
      misconfigured: responseData.misconfigured,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    Sentry.captureException(error, {
      level: "error",
      tags: {
        service: "vercel-domain",
        action: "get-domain-config",
      },
      extra: {
        domain,
        errorMessage,
      },
    });

    return {
      success: false,
      error: errorMessage,
    };
  }
}
