import { API_URL } from "@/configs/appRoute";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const farm_id = searchParams.get("farm_id");
  const limit = searchParams.get("limit");
  const exclude_log_id = searchParams.get("exclude_log_id");

  let backendUrl = `${API_URL.api}${API_URL.getProductionLogsRecent}?farm_id=${farm_id}&limit=${limit}`;
  if (exclude_log_id) {
    backendUrl = `${API_URL.api}${API_URL.getProductionLogsRecent}?farm_id=${farm_id}&limit=${limit}&exclude_log_id=${exclude_log_id}`;
  }

  const res = await fetch(backendUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.log("Backend error:", errorText);

    return NextResponse.json(
      { message: "Failed to fetch production logs" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
