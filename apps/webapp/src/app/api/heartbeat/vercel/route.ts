import * as Sentry from "@sentry/nextjs";
import { NextRequest, NextResponse } from "next/server";

const VERCEL_API_BASE = process.env.VERCEL_API_BASE_URL;
const VERCEL_BEARER_TOKEN = process.env.VERCEL_BEARER_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

export async function GET(req: NextRequest) {
  try {
    if (!VERCEL_PROJECT_ID || !VERCEL_BEARER_TOKEN) {
      const error = new Error("Missing Vercel configuration");
      Sentry.captureException(error, {
        level: "fatal",
        tags: {
          service: "heartbeat",
          provider: "vercel",
        },
      });
      return NextResponse.json({ status: "ERROR" }, { status: 500 });
    }

    const url = `${VERCEL_API_BASE}/v9/projects/${VERCEL_PROJECT_ID}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${VERCEL_BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      const error = new Error("Vercel API returned non-ok status");
      Sentry.captureException(error, {
        level: "fatal",
        tags: {
          service: "heartbeat",
          provider: "vercel",
        },
        extra: {
          statusCode: response.status,
        },
      });
      return NextResponse.json(
        { status: "ERROR" },
        { status: response.status }
      );
    }

    return NextResponse.json({ status: "SUCCESS" }, { status: 200 });
  } catch (err) {
    Sentry.captureException(err, {
      level: "fatal",
      tags: {
        service: "heartbeat",
        provider: "vercel",
      },
    });
    return NextResponse.json({ status: "ERROR" }, { status: 500 });
  }
}
