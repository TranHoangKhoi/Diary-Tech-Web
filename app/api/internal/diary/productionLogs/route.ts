// app\api\auth\login\route.ts
import { API_URL } from "@/configs/appRoute";
import { NextResponse } from "next/server";
import { fetchServer } from "@/lib/fetchServer";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetchServer(API_URL.createProductionLogs, {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
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
