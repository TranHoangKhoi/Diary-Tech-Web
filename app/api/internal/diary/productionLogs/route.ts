// app\api\auth\login\route.ts
import { API_URL } from "@/configs/appRoute";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }
  const body = await req.json();

  const res = await fetch(`${API_URL.api}${API_URL.createProductionLogs}`, {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  console.log(res);

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: data.message || "Crate new Logs failed" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
