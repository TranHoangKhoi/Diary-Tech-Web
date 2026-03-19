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

  let backendUrl = `${API_URL.api}${API_URL.getFarmByOwner}`;

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
