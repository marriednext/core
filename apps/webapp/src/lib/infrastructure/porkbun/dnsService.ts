import * as Sentry from "@sentry/nextjs";

const PORKBUN_BASE_URL = process.env.PORKBUN_BASE_URL;
const PORKBUN_API_KEY = process.env.PORKBUN_API_KEY;
const PORKBUN_SECRET_KEY = process.env.PORKBUN_SECRET_KEY;
const BASE_DOMAIN = "marriednext.com";

export interface DnsRecordResult {
  success: boolean;
  id?: string;
  error?: string;
}

export async function createCnameRecord(
  subdomain: string,
  content: string
): Promise<DnsRecordResult> {
  if (!PORKBUN_BASE_URL || !PORKBUN_API_KEY || !PORKBUN_SECRET_KEY) {
    const error = "Porkbun environment variables are not configured";
    Sentry.captureException(new Error(error), {
      level: "error",
      tags: {
        service: "porkbun-dns",
        action: "create-cname",
      },
      extra: {
        PORKBUN_BASE_URL_SET: !!PORKBUN_BASE_URL,
        PORKBUN_API_KEY_SET: !!PORKBUN_API_KEY,
        PORKBUN_SECRET_KEY_SET: !!PORKBUN_SECRET_KEY,
      },
    });
    return { success: false, error };
  }

  try {
    const response = await fetch(
      `${PORKBUN_BASE_URL}/dns/create/${BASE_DOMAIN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secretapikey: PORKBUN_SECRET_KEY,
          apikey: PORKBUN_API_KEY,
          name: subdomain,
          type: "CNAME",
          content,
          ttl: "600",
          notes: "Automatically created by MarriedNext",
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok || responseData.status !== "SUCCESS") {
      throw new Error(
        `Porkbun API error: ${response.status} - ${JSON.stringify(
          responseData
        )}`
      );
    }

    Sentry.captureMessage("CNAME record created in Porkbun successfully", {
      level: "info",
      tags: {
        service: "porkbun-dns",
        action: "create-cname",
      },
      extra: {
        subdomain,
        recordId: responseData.id,
      },
    });

    return {
      success: true,
      id: responseData.id,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    Sentry.captureException(error, {
      level: "error",
      tags: {
        service: "porkbun-dns",
        action: "create-cname",
      },
      extra: {
        subdomain,
        errorMessage,
      },
    });

    return {
      success: false,
      error: errorMessage,
    };
  }
}
