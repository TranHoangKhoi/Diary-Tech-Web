# Tài liệu Tóm tắt Dự án DiaryTech Web

Tài liệu này tổng hợp lại cấu trúc source code hiện tại của dự án DiaryTech và kế hoạch phân quyền (RBAC - Role Based Access Control) vừa được triển khai, giúp bạn dễ dàng nắm bắt, bảo trì và mở rộng trong tương lai.

## I. Cấu trúc Source Code Tổng Quan

Dự án được xây dựng trên nền tảng **Next.js (App Router)** kết hợp với **Redux** để quản lý Server State / Global State. Cấu trúc thư mục bám sát theo các thực tiễn tốt (best practices) của Next.js:

- **`app/`**: Chứa toàn bộ các Route (trang) của ứng dụng.
  - **`(main)/`**: Nhóm các route chính yêu cầu layout chung (có Header/Sidebar...).
    - **`home/`**: Trang chủ.
    - **`owner/`**: Khu vực dành riêng cho các User có vai trò Owner/Admin (chứa danh sách nhật ký `owner/diary`).
    - **`diary/`**: Khu vực danh sách/nhật ký xem chung.
  - **`login/`**: Trang đăng nhập.
  - **`map/`**: Trang hiển thị và tương tác với bản đồ (Bản đồ nông trại).
- **`components/`**: Chứa các UI Component dùng chung (Breadcrumbs, Can, Footer, HomePage...).
- **`configs/`**: Nơi lưu trữ các cấu hình cứng.
  - `appConfig.ts`: Các hằng số về Role (SuperAdmin, Admin, Owner, SubAccount) và cấu hình Cloudinary.
  - `appRoute.ts`: Các đường dẫn nội bộ (Internal Route) và đường dẫn gọi API (API Endpoint).
- **`hooks/`**: Chứa các Custom Hook của React. Điển hình là `usePermissions` dùng để quản lý logic phân quyền.
- **`services/`**: Chứa các hàm giao tiếp với API backend (thường dùng Axios hoặc Fetch) như `diary.service.ts`, `activities.service.ts`.
- **`store/`**: Quản lý State Global bằng Redux (lưu trữ `userProfile`, token...).
- **`types/`**: Chứa các interface/type của TypeScript (`IActivities`, `IProductionLog`, `IUserProfile`...) giúp code an toàn và dễ debug.
- **`utils/`**: Các hàm Helper dùng chung như `helper.ts` (format thời gian, chuỗi), `checkRole.ts` (để kiểm tra role level).

---

## II. Hệ thống Phân quyền (RBAC - Permission Based)

Trước đây, logic phân quyền dựa theo kiểm tra Hardcode từng Component (Role-based, ví dụ: kiểm tra `isOwnerRole` ở mọi nơi). Điểm yếu của phương pháp này là khi dự án Scale, việc quản lý và thay đổi quyền lợi sẽ rất khó khăn và rườm rà.

Hệ thống đã được Refactor sang cấu trúc **Permission-based** (Năng lực) theo 2 thành phần lõi sau:

### 1. Hook `usePermissions.ts` (Trái tim của hệ thống phân quyền)
Tách biệt toàn bộ logic kiểm tra User được phép làm gì ra khỏi giao diện.
- **Vị trí**: `hooks/usePermissions.ts`
- **Cách hoạt động**: Tự động kết nối với Redux để lấy Profile của user đang đăng nhập. Sau đó định nghĩa các biến (boolean) chỉ rõ quyền lợi.
- **Ví dụ phân quyền hiện tại**:
  - `canAddNewActivity`: Quyền thêm hoạt động (Hiện tại cấp cho Owner).
  - `canDeleteLog`: Quyền xóa nhật ký.
  - `canViewRecentActivities`: Quyền xem hoạt động gần đây.
- **Tiện ích đường dẫn (Path Computing)**:
  - Sinh đường dẫn động ẩn bên trong hook: `getDiaryDetailsPath(id)`, `getAddDiaryPath(activityId, farmId)`.
  - UI Component không cần viết logic toán tử 3 ngôi rắc rối nữa.

### 2. Component Wrapper `<Can>`
Một Component đặc biệt giúp ẩn/hiện giao diện vô cùng sạch sẽ và rõ nghĩa.
- **Vị trí**: `components/Can/index.tsx`
- **Cách dùng**:
  ```tsx
  import Can from "@/components/Can";

  <Can action="canAddNewActivity">
    <button>Thêm hoạt động mới</button>
  </Can>
  ```
- Lợi ích: Nếu User không có quyền `canAddNewActivity`, component `<Can>` sẽ tự động ẩn đoạn code bên trong mà không cần phải viết hàm kiểm tra ở khắp mọi nơi.

---

## III. Lưu ý cho việc Scale Mở Rộng Dự Án

Khi dự án có thêm Role mới (ví dụ `Guest` hoặc `Agronomist` - Kĩ sư nông nghiệp) hoặc thêm các mô-đun mới, bạn **chỉ cần làm 2 việc**:

1. **Cập nhật `configs/appConfig.ts` & `utils/checkRole.ts`**: Định nghĩa thêm role mới và cấp bậc (Level) nếu cần.
2. **Khai báo năng lực ở `usePermissions.ts`**:
   ```typescript
   // Khai báo thêm quyền
   const canExportData = role === ROLE.Admin || role === ROLE.Agronomist;
   
   // ...
   return { canExportData, ... }
   ```
3. Ở UI Component cần dùng để ẩn/hiện nút "Xuất Dữ Liệu", chỉ cần bọc `<Can action="canExportData">` là xong! Thiết kế này giúp Component không hề bị phình to và rất dễ đọc hiểu ngữ cảnh nghiệp vụ.
