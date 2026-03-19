import { API_URL } from "@/configs/appRoute";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const res = await fetch(`${API_URL.api}${API_URL.getProfile}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  return NextResponse.json(data);
}
