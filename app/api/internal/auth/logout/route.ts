import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // xoá cookie token
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, // 👈 xoá ngay
  });

  return response;
}
