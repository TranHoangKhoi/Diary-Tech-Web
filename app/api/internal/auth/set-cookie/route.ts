import { NextResponse } from "next/server";

// app\api\auth\set-cookie\route.ts

export async function POST(req: Request) {
  const { token } = await req.json();

  const res = NextResponse.json({ ok: true });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
