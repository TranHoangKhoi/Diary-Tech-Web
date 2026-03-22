import { API_URL } from "@/configs/appRoute";
import { NextResponse } from "next/server";
import { fetchServer } from "@/lib/fetchServer";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const farm_id = searchParams.get("farm_id");
  const limit = searchParams.get("limit");
  const exclude_log_id = searchParams.get("exclude_log_id");

  let backendUrl = `${API_URL.getProductionLogsRecent}?farm_id=${farm_id}&limit=${limit}`;
  if (exclude_log_id) {
    backendUrl = `${API_URL.getProductionLogsRecent}?farm_id=${farm_id}&limit=${limit}&exclude_log_id=${exclude_log_id}`;
  }

  const res = await fetchServer(backendUrl, {
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
