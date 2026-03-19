// app\api\auth\login\route.ts
import { API_URL } from "@/configs/appRoute";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${API_URL.api}${API_URL.login}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: data.message || "Login failed" },
      { status: 401 }
    );
  }

  const response = NextResponse.json(data.user);

  response.cookies.set("token", data.token, {
    httpOnly: true,
    secure: false, // HTTPS → BẮT BUỘC
    sameSite: "lax", // 🔥 QUAN TRỌNG
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
