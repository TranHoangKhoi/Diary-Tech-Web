// app\api\auth\login\route.ts
import { API_URL } from "@/configs/appRoute";
import { NextResponse } from "next/server";
import { fetchServer } from "@/lib/fetchServer";

export async function POST(req: Request) {
  const formData = await req.formData();

  const res = await fetchServer(API_URL.createFarm, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = await res.json();
  
  return NextResponse.json(data, { status: res.status });
}
