import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Phân loại các đường dẫn (Routes)
// Các trang chỉ dành cho khách (chưa đăng nhập) mới được vào
const publicPaths = ["/login", "/register", "/map/gps-polygon"];

// Định nghĩa các route bỏ qua (không chạy middleware để tăng tốc)
// Ví dụ: ảnh, favicon, file css/js, và các API nội bộ
const ignoredPaths = ["/api/", "/_next/", "/favicon.ico", "/icon.png"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Nếu là đường dẫn bỏ qua thì cho đi tiếp ngay lập tức
  if (ignoredPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 2. Lấy token từ HTTP-only cookie như cách bạn đã làm
  const token = request.cookies.get("token")?.value;

  // 3. Kiểm tra xem route hiện tại có nằm trong danh sách public hay không
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // 4a. Chưa đăng nhập + Cố tình vào trang Private (như /map, /(main)) -> Đá về /login
  if (!token && !isPublicPath) {
    // Tạo 1 URL phản hồi điều hướng về trang /login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4b. Đã đăng nhập + Cố tình vào trang Public (như /login) -> Đá về Trang chủ (dashboard)
  if (token && isPublicPath) {
    // Nếu trang chủ dashboard là "/", bặn đặt '/', nếu là '/map' thì tuỳ bạn đổi nhé.
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Nếu mọi thứ bình thường, cho phép tiếp tục truy cập route
  return NextResponse.next();
}

// 5. Cấu hình Matcher: Định nghĩa những path nào sẽ kích hoạt Middleware này
export const config = {
  // Biểu thức Regex này bảo Next.js: "Chạy middleware trên tất cả trang trừ thư mục tĩnh"
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"],
};
