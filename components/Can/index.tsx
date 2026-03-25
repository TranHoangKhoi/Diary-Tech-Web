import { ReactNode } from "react";
import { usePermissions } from "@/hooks/usePermissions";

interface CanProps {
  /**
   * Tên quyền cần kiểm tra, tương ứng với kiểu trả về của hook usePermissions.
   * Ví dụ: "canAddNewActivity", "canDeleteLog", "canEditDiary"
   */
  action: keyof ReturnType<typeof usePermissions>;
  
  /**
   * Component sẽ được render nếu user có quyền thực thi action
   */
  children: ReactNode;
  
  /**
   * (Tùy chọn) Component thay thế nếu user không có quyền. Mặc định là null (không render gì)
   */
  fallback?: ReactNode;

  /**
   * (Tùy chọn) Truyền trực tiếp role nếu không muốn hook tự lấy từ Redux
   */
  role?: string;
}

export const Can = ({ action, children, fallback = null, role }: CanProps) => {
  // Lấy danh sách quyền hiện tại của user
  const permissions = usePermissions(role);
  
  // Lấy ra kết quả boolean dựa theo action
  const isAllowed = Boolean(permissions[action]);

  return isAllowed ? <>{children}</> : <>{fallback}</>;
};

export default Can;
