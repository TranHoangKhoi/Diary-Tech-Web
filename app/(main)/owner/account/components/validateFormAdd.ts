import z from "zod/v3";

export const farmSchema = z.object({
  avatar: z
    .any(),

  farm_name: z.string().min(2, "Tên farm quá ngắn"),

  farm_type_id: z
    .string({
      required_error: "Vui lòng chọn kiểu hộ",
      invalid_type_error: "Vui lòng chọn kiểu hộ",
    })
    .min(1, "Vui lòng chọn kiểu hộ"),
  crop_id: z
    .string({
      required_error: "Vui lòng chọn loại hình",
      invalid_type_error: "Vui lòng chọn loại hình",
    })
    .min(1, "Vui lòng chọn kiểu hộ"),

  location: z.string(),

  area: z.string().min(1, "Nhập diện tích"),
  
  unit: z.string().optional(),

  name: z.string().min(2, "Nhập họ tên"),

  phone: z
    .string()
    .regex(
      /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/,
      "Số điện thoại không hợp lệ (Ví dụ: 0912345678)"
    ),

  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),

  // province_code: z.string().min(1, "Vui lòng chọn tỉnh"),
  // ward_code: z.string().min(1, "Vui lòng chọn phường/xã"),
  province_code: z
    .string({
      required_error: "Vui lòng chọn tỉnh",
      invalid_type_error: "Vui lòng chọn tỉnh",
    })
    .min(1, "Vui lòng chọn tỉnh"),

  ward_code: z
    .string({
      required_error: "Vui lòng chọn phường/xã",
      invalid_type_error: "Vui lòng chọn phường/xã",
    })
    .min(1, "Vui lòng chọn phường/xã"),

  geo_location: z.any().refine((val) => val !== null && val !== undefined, "Vui lòng chọn vị trí trên bản đồ"),

  polygon: z.any().refine((val) => val !== null && val !== undefined, "Vui lòng vẽ vùng trang trại"),

  description: z.string().optional(),
});
