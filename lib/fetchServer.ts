import { cookies } from "next/headers";
import { API_URL } from "@/configs/appRoute";

/**
 * Hàm call API tự động gắn Token dành riêng cho môi trường Server
 * (áp dụng cho Server Component, Server Action hoặc API Route `app/api/...`)
 */
export async function fetchServer(endpoint: string, options: RequestInit = {}) {
  // 1. Tự động múc token từ Cookie (do Next.js quản lý proxy)
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  // 2. Tự động merge headers (tránh đè header cũ do người dùng truyền vào)
  const headers = new Headers(options.headers);
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Mặc định Content-Type là JSON, trừ khi gọi API upload file bằng FormData
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // 3. Tự động ráp base URL backend
  // Giả sử API_URL.api là "https://diarytech.bittechx.cloud/"
  const baseUrl = API_URL.api.endsWith("/") 
    ? API_URL.api.slice(0, -1) 
    : API_URL.api;
    
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const fullUrl = `${baseUrl}${path}`;

  // 4. Bắn Request
  return fetch(fullUrl, {
    ...options,
    headers,
  });
}
