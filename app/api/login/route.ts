import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { pi_auth_token } = await req.json();

  const res = await fetch("https://api.minepi.com/v2/me", {
    headers: { Authorization: `Bearer ${pi_auth_token}` },
  });

  if (!res.ok) return NextResponse.json({ error: "Auth failed" }, { status: 401 });

  const piUser = await res.json();

  return NextResponse.json({
    id: piUser.uid,
    username: piUser.username,
    credits_balance: 0,
    terms_accepted: true,
    app_id: process.env.NEXT_PUBLIC_PI_APP_ID,
  });
}
