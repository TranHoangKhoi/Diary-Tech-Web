# Thiết Kế Giao Diện Trang Home — Dành Cho Farmer (Hộ Nông Dân)

## 1. Bối Cảnh & Vai Trò Người Dùng

**Đối tượng:** `SubAccount` — Chủ của **1 nông trại đơn lẻ** (được gọi là Farmer / Hộ nông dân).

**Khác biệt so với Owner:** Owner nhìn bao quát nhiều hộ dân. Farmer chỉ quan tâm đến **nông trại của chính họ** — cây trồng đang có, mùa vụ hiện tại, và các nhật ký sản xuất của mình.

**Tone thiết kế:** Thân thiện, dễ dùng, không quá phức tạp. Người dùng có thể không quen với công nghệ cao. Ưu tiên chữ to, icon rõ ràng, màu sắc gần gũi với thiên nhiên (xanh lá, xanh dương, cam nâu đất).

---

## 2. Cấu Trúc Tổng Quan (Layout)

```
┌─────────────────────────────────────────────────────────┐
│                  BANNER CHÀO MỪNG                       │
│  (Tên farmer + Tên nông trại + Ngày/Tháng/Năm)          │
└─────────────────────────────────────────────────────────┘

┌──────────────────────────┐  ┌──────────────────────────┐
│                          │  │   THÔNG TIN NÔNG TRẠI    │
│   BẢN ĐỒ NÔNG TRẠI      │  │   - Tên                  │
│   (Mini Map vị trí farm) │  │   - Diện tích            │
│                          │  │   - Cây trồng chính      │
│                          │  │   - Trạng thái           │
└──────────────────────────┘  └──────────────────────────┘

┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│  Thêm  │ │ Nhật ký│ │  Mùa  │ │ Hoạt  │
│ Nhật ký│ │ của tôi│ │  vụ   │ │ động  │
└────────┘ └────────┘ └────────┘ └────────┘
         [ 4 NÚT QUICK ACTION ]

┌───────────────────────────┐  ┌──────────────────────────┐
│                           │  │   THỐNG KÊ MÙA VỤ       │
│   NHẬT KÝ GẦN ĐÂY        │  │   - Mùa vụ hiện tại      │
│   (Timeline hoạt động)    │  │   - Tổng logs đã ghi     │
│                           │  │   - Ngày bắt đầu mùa vụ  │
│                           │  │   - Hoạt động nhiều nhất │
└───────────────────────────┘  └──────────────────────────┘
```

---

## 3. Chi Tiết Từng Thành Phần

### 3.1. Banner Chào Mừng

- **Nền:** Video/ảnh nền thiên nhiên nông nghiệp (xanh lá, ruộng lúa, vườn cây)
- **Lớp phủ:** Gradient tối nhẹ để chữ dễ đọc
- **Nội dung bên trái:**
  - Dòng nhỏ: *"Xin chào,"*
  - Tên Farmer: **To đậm, chữ trắng**
  - Icon địa chỉ + Tên nông trại / địa chỉ
- **Nội dung bên phải:**
  - 3 box nhỏ: **Ngày / Tháng / Năm** (giống Owner)

---

### 3.2. Khối Thông Tin Nông Trại (Farm Info Card)

**Bố cục 2 cột:**

**Cột trái — Bản đồ mini:**
- Hiển thị vị trí nông trại trên bản đồ (mini map, không tương tác)
- Có Pin đánh dấu vị trí farm
- Nút "Xem bản đồ đầy đủ" → link tới `/map`
- Kích thước: tương đối nhỏ, khoảng 280–320px chiều cao

**Cột phải — Thông tin farm:**
- Avatar / ảnh đại diện nông trại (hình tròn hoặc hình vuông bo góc)
- **Tên nông trại** (chữ to, đậm)
- Dòng phụ: Địa chỉ (xã, huyện, tỉnh)
- Các tag thông tin:
  - 🌿 Cây trồng chính: *Sầu riêng*
  - 📐 Diện tích: *2.5 ha*
  - 📋 Loại hình canh tác: *Trồng trọt*
  - 🟢 Trạng thái: *Đang hoạt động* (badge màu xanh)

---

### 3.3. Quick Actions (4 Nút Thao Tác Nhanh)

Hiển thị dạng hàng ngang, 4 ô đều nhau. Mỗi ô có:
- Icon lớn ở trên (màu primary)
- Nhãn chữ ở dưới (ngắn gọn)

| Icon | Nhãn | Hành động |
|---|---|---|
| 📝 | Thêm nhật ký | → `/diary/add?farmId=...` |
| 📖 | Nhật ký của tôi | → `/diary` |
| 🌱 | Mùa vụ hiện tại | → `/diary?tab=book` |
| ⚡ | Hoạt động hôm nay | → `/diary?tab=activity` |

---

### 3.4. Nhật Ký Gần Đây (Recent Production Logs)

- **Vị trí:** Cột trái, chiếm 2/3 chiều rộng
- **Tiêu đề:** "Nhật ký gần đây của tôi"
- **Hiển thị:** Timeline dạng danh sách (5–8 mục)

Mỗi dòng trong timeline gồm:
- Dot tròn màu primary (dot đầu tiên đậm hơn)
- **Tên hoạt động** (in đậm) — VD: "Bón phân đợt 2"
- **Tên Production Book / Mùa vụ** (chữ nhỏ xám) — VD: "Vụ Hè Thu 2026"
- Thời gian (format: "2 ngày trước" hoặc "27/03 - 09:30")

Nút ở dưới: `Xem tất cả nhật ký` → `/diary`

---

### 3.5. Thống Kê Mùa Vụ Hiện Tại (Season Stats Card)

- **Vị trí:** Cột phải, 1/3 chiều rộng
- **Tiêu đề:** "Mùa vụ hiện tại"
- **Dữ liệu hiển thị:**
  - Tên mùa vụ / Production Book: *"Vụ Hè Thu 2026"*
  - Ngày bắt đầu: *12/01/2026*
  - Tổng số nhật ký đã ghi: *28 bản ghi*
  - Hoạt động thực hiện nhiều nhất: *Tưới nước (12 lần)*
- **Thiết kế:** Card gọn, dữ liệu dạng danh sách key-value, icon nhỏ đầu mỗi dòng

---

### 3.6. (Tùy Chọn) Widget Thời Tiết / Lời Khuyên

Nếu có thể thêm ở dưới cùng:
- Nhiệt độ hiện tại + thời tiết khu vực
- Lời khuyên đơn giản: *"Thời tiết hôm nay thuận lợi cho việc tưới nước"*

*(Phần này có thể dùng API thời tiết bên ngoài, không phụ thuộc vào BE dự án)*

---

## 4. Bảng Màu & Style Gợi Ý

| Yếu tố | Giá trị gợi ý |
|---|---|
| Màu chủ đạo | Xanh nông nghiệp `#4CAF50` hoặc `#2E7D32` |
| Màu phụ | Cam nâu đất `#FF8F00` |
| Background card | Trắng hoặc trắng ngà `#FAFAFA` |
| Chữ tiêu đề | Đen `#1A1A1A`, font Medium/SemiBold |
| Chữ phụ | Xám `#6B7280` |
| Font chữ | Inter hoặc Nunito (thân thiện, dễ đọc) |
| Border radius card | `12px` hoặc `16px` |
| Shadow | `drop-shadow-sm` hoặc `shadow-md` nhẹ nhàng |

---

## 5. Responsive Behavior

- **Desktop (>1280px):** Bố cục 2 cột như mô tả trên.
- **Tablet (768–1280px):** Bản đồ và Info card xếp chồng dọc. Quick Actions vẫn 4 cột.
- **Mobile (<768px):** Stack toàn bộ dọc. Quick Actions thu về 2x2 lưới.

---

## 6. Dữ Liệu Cần Từ API

| Thành phần | API Endpoint | Dữ liệu cần |
|---|---|---|
| Thông tin farm | `GET /api/farm/byUser` | `farm_name`, `area`, `location`, `avatar`, `farm_status`, `geo_location`, crop info |
| Nhật ký gần đây | `GET /api/productionLogs/recent?farmId=...` | `activity_name`, `book_name`, `created_at` |
| Mùa vụ hiện tại | `GET /api/productionBook/farm/:farmId` | `book_name`, `start_date`, số logs, hoạt động nhiều nhất |

---

_Tài liệu này dùng để gửi Stitch thiết kế giao diện Farmer Home Dashboard._  
_Ngày tạo: 24/03/2026_
