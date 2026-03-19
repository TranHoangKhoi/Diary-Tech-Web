import z from "zod/v3";

export const farmSchema = z.object({
  avatar: z
    .any()
    .refine((file) => file instanceof File, "Vui lòng chọn ảnh đại diện"),

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

  location: z.string().min(3, "Nhập địa chỉ"),

  area: z.string().min(1, "Nhập diện tích"),

  name: z.string().min(2, "Nhập họ tên"),

  phone: z.string().min(9, "Số điện thoại không hợp lệ"),

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

  description: z.string().optional(),
});
