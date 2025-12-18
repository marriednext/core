import { NextRequest, NextResponse } from "next/server";

const VERCEL_API_BASE = process.env.VERCEL_API_BASE_URL;
const VERCEL_BEARER_TOKEN = process.env.VERCEL_BEARER_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

export async function GET(req: NextRequest) {
  try {
    if (!VERCEL_PROJECT_ID || !VERCEL_BEARER_TOKEN) {
      return NextResponse.json(
        { error: "Missing Vercel configuration" },
        { status: 500 }
      );
    }

    const url = `${VERCEL_API_BASE}/v9/projects/${VERCEL_PROJECT_ID}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${VERCEL_BEARER_TOKEN}`,
      },
    });

    const res = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: res.error?.message || "Vercel API error" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        data: {
          status: "SUCCESS",
          projectId: res.id,
          projectName: res.name,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
