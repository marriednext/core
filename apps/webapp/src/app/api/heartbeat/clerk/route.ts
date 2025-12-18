// https://clerk.com/docs/reference/frontend-api
// {"data":{"status":"healthy"}}
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = process.env.CLERK_FRONTEND_API_URL + "/v1/health";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    return NextResponse.json({ data: res }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong, idk" },
      { status: 500 }
    );
  }
}
