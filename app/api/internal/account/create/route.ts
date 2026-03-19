// app\api\auth\login\route.ts
import { API_URL } from "@/configs/appRoute";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Bạn chưa đăng nhập !" },
      { status: 401 }
    );
  }

  const formData = await req.formData();

  const res = await fetch(`${API_URL.api}${API_URL.createFarm}`, {
    method: "POST",
    body: formData,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return NextResponse.json(data);
}
