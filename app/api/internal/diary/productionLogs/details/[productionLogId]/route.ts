import { API_URL } from "@/configs/appRoute";
import { NextResponse } from "next/server";
import { fetchServer } from "@/lib/fetchServer";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productionLogId: string }> }
) {
  const { productionLogId } = await params;
  // ✅ Build lại URL backend
  const backendUrl = `${API_URL.getProductionLogsDetails}/${productionLogId}`;
  
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
