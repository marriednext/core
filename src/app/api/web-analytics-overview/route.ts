import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  const projectId = process.env.POSTHOG_PROJECT_KEY;
  if (!projectId) {
    return NextResponse.json(
      {
        error:
          "Missing POSTHOG_PROJECT_ID (or NEXT_PUBLIC_POSTHOG_PROJECT_ID) env var",
      },
      { status: 500 }
    );
  }

  const rawHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  const baseUrl = rawHost;

  const personalApiKey = process.env.POSTHOG_APIKEY;
  if (!personalApiKey) {
    return NextResponse.json(
      { error: "Missing POSTHOG_APIKEY (personal API key) env var" },
      { status: 500 }
    );
  }

  try {
    const incomingUrl = new URL(req.url);
    const targetUrl = new URL(
      `/api/projects/${projectId}/web_analytics/overview/`,
      baseUrl
    );
    targetUrl.search = incomingUrl.search;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      // "User-Agent": "adminyulissaandmatthew-web-analytics-proxy",
      Authorization: `Bearer ${personalApiKey}`,
    };

    const response = await fetch(targetUrl.toString(), {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const text = await response.text();

    try {
      const data = text ? JSON.parse(text) : null;
      return NextResponse.json(data, { status: response.status });
    } catch {
      return new NextResponse(text, {
        status: response.status,
        headers: {
          "Content-Type": response.headers.get("Content-Type") || "text/plain",
        },
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch web analytics overview", details: `${error}` },
      { status: 500 }
    );
  }
}
