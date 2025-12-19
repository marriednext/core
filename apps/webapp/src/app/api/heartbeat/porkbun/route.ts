import * as Sentry from "@sentry/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const baseUrl = process.env.PORKBUN_BASE_URL;
    const secretKey = process.env.PORKBUN_SECRET_KEY;
    const apiKey = process.env.PORKBUN_API_KEY;

    if (!baseUrl || !secretKey || !apiKey) {
      const error = new Error("Missing Porkbun configuration");
      Sentry.captureException(error, {
        level: "fatal",
        tags: {
          service: "heartbeat",
          provider: "porkbun",
        },
      });
      return NextResponse.json({ status: "ERROR" }, { status: 500 });
    }

    const url = baseUrl + "/ping";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secretapikey: secretKey,
        apikey: apiKey,
      }),
    });

    const res = await response.json();

    if (res.status !== "SUCCESS") {
      const error = new Error("Porkbun API returned non-success status");
      Sentry.captureException(error, {
        level: "fatal",
        tags: {
          service: "heartbeat",
          provider: "porkbun",
        },
      });
      return NextResponse.json({ status: "ERROR" }, { status: 500 });
    }

    return NextResponse.json({ status: "SUCCESS" }, { status: 200 });
  } catch (err) {
    Sentry.captureException(err, {
      level: "fatal",
      tags: {
        service: "heartbeat",
        provider: "porkbun",
      },
    });
    return NextResponse.json({ status: "ERROR" }, { status: 500 });
  }
}
