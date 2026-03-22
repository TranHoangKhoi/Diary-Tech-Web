import { API_URL } from "@/configs/appRoute";
import { NextResponse } from "next/server";
import { fetchServer } from "@/lib/fetchServer";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const res = await fetchServer(`${API_URL.getProductionLogsByOwnerId}?${searchParams}`, {
    cache: "no-store",
  });

  const data = await res.json();

  return NextResponse.json(data);
}
