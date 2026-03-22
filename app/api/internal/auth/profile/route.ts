import { API_URL } from "@/configs/appRoute";
import { NextResponse } from "next/server";
import { fetchServer } from "@/lib/fetchServer";

export const dynamic = "force-dynamic";

export async function GET() {
  // Thay vì lấy cookies, token và tự set Header, chúng ta chỉ cần gọi fetchServer cực ngắn gọn
  const res = await fetchServer(API_URL.getProfile, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    // Nếu Unauthorized (lỗi token), backend có thể trả 401
    return NextResponse.json({ message: "Invalid token" }, { status: res.status });
  }

  return NextResponse.json(data);
}
