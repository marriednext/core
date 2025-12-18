// https://porkbun.com/api/json/v3/documentation
// {
//     "data": {
//         "status": "SUCCESS",
//         "yourIp": "47.159.178.214",
//         "xForwardedFor": "47.159.178.214"
//     }
// }
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = process.env.PORKBUN_BASE_URL + "/ping";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secretapikey: process.env.PORKBUN_SECRET_KEY,
        apikey: process.env.PORKBUN_API_KEY,
      }),
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
