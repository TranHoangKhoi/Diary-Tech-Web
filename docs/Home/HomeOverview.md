# Phân Tích & Kế Hoạch Phát Triển Trang Home (Dành cho Role Owner)

Tài liệu này phân tích cấu trúc màn hình Home hiện tại của dự án và đề xuất định hướng phát triển dành riêng cho tài khoản **Owner** (hoặc cao hơn).

_**Lưu ý:** Role "SubAccount" là chủ của 1 nông trại đơn lẻ. Role "Owner" là người quản lý danh sách nhiều SubAccount và nhiều Farm trực thuộc._

---

## 1. Phân Tích Thực Trạng Component `HomePage` (Hiện Tại)

Màn hình Home hiện tại (nằm trong `components/HomePage/index.tsx`) đang được thiết kế dạng Dashboard tổng quan. Giao diện đang hiển thị các khối sau:

1. **Banner Xin Chào**: Hiện tên User, Địa chỉ, và block Ngày/Tháng/Năm.
2. **Khối Bản Đồ (MapRenderDemo)**: Ý tưởng là hiển thị vị trí các nông trại lên bản đồ nông nghiệp.
3. **4 Nút Quick Action (Thao tác nhanh)**:
   - Tổng quan nhật ký
   - Kiểu hộ kinh doanh
   - Thêm hộ kinh doanh
   - Quản lý tài khoản
4. **Cột Trái - Tin tức & Thống kê**:
   - Khối **RecentActivities**: Danh sách hoạt động gần đây.
   - Khối **Báo cáo thống kê**: Đang bị **Hardcode** dữ liệu tĩnh (Ví dụ: Tổng số hộ: 60 hộ, Diện tích: 143.0 ha, Xã nhiều hộ nhất: Mỹ Khánh...).
5. **Cột Dưới - Biểu đồ & Insight**:
   - `CropStatisticCard`: Thống kê cây trồng.
   - `InsightTodayCard`: Phân tích / Lời khuyên trong ngày.
   - `UpcomingTaskCard`: Công việc sắp tới.
6. **Bảng tin / Đăng bài (`HomePost`)**: Nơi chứa Feed tin tức hoặc bài đăng.

---

## 2. Định Hướng Hiển Thị Cho Role "Owner" (What needs to be shown)

Bởi vì Owner quản lý **nhiều hộ kinh doanh (Sub-accounts)**, Dashboard của Owner phải mang tính chất **Tổng Hợp (Aggregate)** và **Bao Quát (Macro)** thay vì góc nhìn vi mô của một nông trại.

Những phần CẦN show và NÊN tối ưu lại cho Owner:

### A. Báo Cáo Thống Kê Tổng Hợp (Aggregate Statistics)
Phần đang hardcode cần được làm động hoàn toàn bằng API. Owner cần nhìn thấy ngay:
- **Tổng số hộ nông dân (SubAccounts)** đang quản lý.
- **Tổng diện tích canh tác** toàn khu vực (Cộng dồn tất cả các Farm thuộc Owner).
- **Cơ cấu cây trồng chính** (Ví dụ: 60% Sầu riêng, 40% Bưởi).
- **Tỉ lệ hoạt động**: Bao nhiêu Farm đang nhập nhật ký thường xuyên.

### B. Khối Bản Đồ Nông Nghiệp (Giám Sát Vị Trí)
Bản đồ không chỉ để chưng, nó nên hiển thị **Pin (Điểm đánh dấu)** của toàn bộ các hộ dân trực thuộc. Khi Owner bấm vào 1 Pin trên bản đồ, nó sẽ hiện lên Tooltip popup nhỏ (Tên hộ, diện tích, cây trồng).

### C. Hoạt Động Gần Đây Toàn Khu Vực (Global Recent Activities)
Component `RecentActivities` cần được sửa lại để lấy log của **TẤT CẢ** các hộ trực thuộc.
- Giao diện dạng Timeline.
- Trên mỗi mục phải ghi rõ: `[Tên hộ] đã thực hiện [Hoạt động] vào lúc [Thời gian]`. Giúp Owner nắm được nhịp độ sản xuất chung.

### D. Thao Tác Nhanh (Quyền Quản Trị)
Các nút Quick Action hiện tại rất hợp lý. Cần đảm bảo chúng trỏ đúng link:
- **Thêm hộ kinh doanh**: Dẫn tới luồng tạo Farm/User mới (`/owner/account`).
- **Quản lý tài khoản**: Dẫn tới danh sách Admin/SubAccount.

### E. Insight và Cảnh Báo Không Gian Rộng (Optional nhưng cực xịn)
- Cảnh báo thời tiết chung cho cả khu vực.
- Nhắc việc chung: Ví dụ "Hiện có 4 hộ đang trễ lịch bón phân đợt 2".

---

## 3. Kế Hoạch Phát Triển & Code Tiếp Theo

Để biến Trang Home thành một Dashboard thực thụ cho Owner, đưới đây là lộ trình Code (Action Plan):

1. **Xây dựng API Thống Kê (Backend)**
   - Cần 1 API route (Ví dụ: `/api/statistics/owner`) trả về các con số tổng hợp: `totalFarms`, `totalArea`, `topCrops`... thay vì bắt Frontend tải toàn bộ mảng dữ liệu về rồi mới đếm (sẽ gây chậm web nếu có 1000 farms).
2. **Kết nối API vào Frontend**
   - Thay thế các đoạn chữ cứng "60 hộ", "143.0 ha" trong `components/HomePage/index.tsx` bằng State / SWR / React Query.
3. **Cập nhật `RecentActivities`**
   - Viết hook hoặc fetch lấy list `productionLog` của toàn bộ Owner (`getProductionLogsRecentByOwnerId`).
4. **Gắn Link Điều Hướng cho Quick Actions**
   - Bọc các Thẻ thao tác nhanh bằng `<Link>` tới đúng các Route định sẵn trong `appRoute.ts`.
5. **(Tuỳ chọn) Farm Switcher**
   - Thêm một Dropdown góc phải trên cùng: "Chọn nhanh nông trại". Khi Owner chọn 1 hộ, các biểu đồ bên dưới (CropStatistic, UpcomingTask) sẽ filter chỉ hiển thị của hộ đó.
