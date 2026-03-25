# Tài Liệu Cấu Trúc Dự Án: DiaryTech Web

Tài liệu này tổng hợp toàn bộ cấu trúc dự án DiaryTech để phục vụ cho việc bảo trì, mở rộng và phát triển sau này.

---

## 1. Tổng quan Dự án (Overview)

DiaryTech Web là nền tảng quản lý sổ tay nông nghiệp/nhật ký sản xuất điện tử dành cho các chủ nông trại, hộ nông dân và quản trị viên. Hệ thống cho phép:

- Xem và quản lý các nông trại trên Bản đồ (Map).
- Theo dõi nhật ký canh tác (Production Logs), các hoạt động (Activities) theo từng mô hình nông nghiệp (Farm Type/Crop Category).
- Phân quyền động, quản lý ai có thể Xem/Sửa/Thêm thẻ nhật ký dựa trên Role.

## 2. Công nghệ Cốt lõi (Tech Stack)

- **Framework**: Next.js (Khung kiến trúc dạng **App Router**)
- **State Management**: Redux Toolkit (để lưu trữ profile user toàn cầu)
- **Styling**: Tailwind CSS
- **API Fetching**: Axios / Fetch API được phân tách thành từng Service rõ ràng
- **Xử lý Ảnh/Album**: `yet-another-react-lightbox`
- **Icon**: `react-icons`
- **Cloud Storage**: Cloudinary (Dùng cho avatar, hình ảnh hoạt động/nhật ký)

---

## 3. Cấu trúc Thư mục (Directory Structure)

Sử dụng kiến trúc Modular chuẩn của Next.js:

```text
e:/HKB/DiaryTech/DiaryTechWeb/
├── app/                  # Chứa tất cả các trang, API nội bộ (Backend For Frontend) và giao diện
│   ├── (auth)/           # Nhóm tính năng xác thực không cần layout chung
│   │   └── login/        # Trang đăng nhập
│   ├── (main)/           # Nhóm hiển thị sau khi login, dùng chung header/sidebar
│   │   ├── home/         # Bảng xếp hạng / Thống kê tổng quan (Dashboard)
│   │   ├── diary/        # Xem nhật ký danh cho User phổ thông (SubAccount)
│   │   └── owner/        # Khu vực quản trị riêng (Owner/Admin)
│   │       ├── account/  # Thêm tài khoản nhân viên (OwnerAddAccount)
│   │       └── diary/    # Danh sách, chi tiết và Thêm nhật ký của Chủ nông trại
│   ├── api/              # Route handlers Backend giả định của Next, ví dụ /api/internal
│   ├── map/              # Trang Bản đồ hiển thị vị trí Farm
│   ├── mapDemoFake/      # Dữ liệu/Trang dùng để test map
│   ├── layout.tsx        # Root layout bọc toàn dự án (chứa Provider Redux, Theme...)
│   └── globals.css       # File style gốc (Tailwind directive)
│
├── components/           # UI Component có thể tái sử dụng nhiều nơi
│   ├── Can/              # Wrapper độc quyền xử lý RBAC ẩn/hiện element theo Permission
│   ├── Breadcrumbs/      # Thanh điều hướng Breadcrumb
│   ├── Footer/
│   └── HomePage/
│
├── configs/              # Các hằng số, biến cấu hình cứng
│   ├── appConfig.ts      # Biến môi trường nội bộ, Cloudinary, và các ROLE định sẵn
│   └── appRoute.ts       # Enum/Object tổng hợp link chuyển hướng Frontend và API Backend
│
├── hooks/                # Custom React Hooks
│   └── usePermissions.ts # "Trái tim" của hệ thống phân quyền (Xác nhận các Quyền từ Redux/CheckRole)
│
├── services/             # Lớp kết nối API Backend (chia theo từng Model cụ thể)
│   ├── auth.service.ts
│   ├── farm.service.ts
│   ├── diary.service.ts
│   ├── activities.service.ts
│   ├── map.service.ts
│   ├── productionBook.service.ts
│   ├── cropCate.service.ts
│   └── farmType.service.ts
│
├── store/                # Redux Configuration
│   └── ...               # Config rootReducer, middleware,...
│
├── types/                # Khai báo TypeScript Interfaces để tăng độ an toàn code
│   ├── TypeUser.ts       # Dữ liệu User/Profile
│   ├── TypeActivities.ts # Hoạt động của nông trại
│   ├── TypeBook.ts       # Sổ ghi chép mùa vụ
│   └── TypeDiary.ts      # Cấu trúc của 1 Production Log
│
└── utils/                # Hàm Helper thông dụng
    ├── checkRole.ts      # Hàm check level quyền truy cập thô
    └── helper.ts         # format date, time...
```

---

## 4. Hệ thống Định tuyến (Routing - Frontend)

(Dựa trên file `appRoute.ts` và App Router):

- **`/home`**: Màn hình chính sau Login.
- **`/login`**: Hệ thống xác thực bằng Token.
- **`/map`**: Bản đồ quản lý các cụm nông trại theo tỉnh thành.
- **`/diary`** & **`/diary/[id]`**: Link hiển thị cho nhóm SubAccount
- **`/owner/diary`** & **`/owner/diary/[id]`**: Cổng điều hành của Owner (Toàn quyền CRUD).
- **`/owner/diary/add`**: Luồng nhập liệu 3-4 bước cực mượt:
  - _Bước 1:_ Chọn Farm (Bỏ qua tự động nếu URL đính `?farmId=...`)
  - _Bước 2:_ Chọn Activity (Bỏ qua tự động nếu URL đính `?addId=...`)
  - _Bước 3/4:_ Nhập các form đặc tả của hoạt động (tưới nước, bón phân...)

---

## 5. Danh sách API Chính (Tích hợp Backend)

Toàn bộ đường truyền backend được nạp qua `API_URL` tập trung:

- **Tài khoản (Auth)**:
  - `login` -> `api/auth/login`
  - `profile` -> `api/auth/profile`
- **Nông trại (Farm / Map)**:
  - `getFarmByUser` / `getFarmByOwner`
  - `getProvince` / `getWards` (Cho Map và Farm Register)
- **Hoạt động / Sổ lồng (Activities / Book / Type)**:
  - `getActivitiByFarmType` -> Lấy danh sách việc cần làm ứng với cây trồng
  - `getBookByFarm` -> Lấy mùa vụ
  - `getFarmType` / `getCropsCate`
- **Nhật ký canh tác (Production Logs)**:
  - `getProductionLogs` / `createProductionLogs` -> Lấy / Tạo thẻ nhật ký
  - `getProductionLogsRecent` -> Dùng để render list Hoạt động Gần đây

---

## 6. Logic Phân Quyền Thông Minh (Permission-Based RBAC)

Hệ thống không còn kiểm tra Role thô kệch (`role === 'owner'`) mà đã được "tiến hóa" thành khái niệm năng lực thông qua hook tĩnh `hooks/usePermissions.ts`.

Quy trình sử dụng:

1. `usePermissions` tự cắm vào Redux lấy trạng thái của User đang Login.
2. Trả ra các `action` động (true/false) như: `canAddNewActivity`, `canDeleteLog`, `canEditDiary`.
3. Trả ra các hàm tiện ích (`getDiaryDetailsPath(id)`) để dẫn User tới URL chính xác thay vì if-else bằng tay.
4. **`components/Can`**: Được dùng ngoài View để bọc các khối HTML/Button đặc thù dựa trên biến `action` sinh ra bởi `usePermissions`. Nếu không đủ level quyền lợi => Tự động trở nên "tàng hình".

Nhờ kiến trúc này, 1.000 files UI không bị phụ thuộc vào Logic Role cứng (SuperAdmin, SubAccount, v.v.), rất dễ khi rẽ nhánh Scale Up team dự án.

---

_Tự động tổng hợp và lưu trữ vào ngày 23/03/2026_
