import { API_URL } from "@/configs/appRoute";
import { fetchServer } from "@/lib/fetchServer";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const res = await fetchServer(API_URL.getFarmByUser, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  return NextResponse.json(data);
}
