import { appRoute } from "@/configs/appRoute";
import { RootState } from "@/store";
import { isOwnerRole, isSubAccountRole } from "@/utils/checkRole";
import { useSelector } from "react-redux";

export const usePermissions = (overrideRole?: string) => {
  // Lấy role từ Redux. Nếu có truyền overrideRole thì ưu tiên dùng override (giúp dễ test hoặc dùng ngoài Redux)
  const reduxProfile = useSelector(
    (state: RootState) => state.userProfile.profile,
  );
  const role = overrideRole || reduxProfile?.role;

  // --- ĐỊNH NGHĨA CÁC QUYỀN (PERMISSIONS / ACTIONS) ---

  // Quyền thêm hoạt động mới
  const canAddNewActivity = isOwnerRole(role);

  // Quyền xoá nhật ký
  const canDeleteLog = isOwnerRole(role);

  // Quyền xem các hoạt động gần đây
  const canViewRecentActivities = isSubAccountRole(role) || isOwnerRole(role);

  // Quyền chỉnh sửa nhật ký
  const canEditDiary = isOwnerRole(role);

  // --- HELPER PATHS ---
  // Thay vì if-else rải rác, ta định nghĩa logic sinh đường dẫn ở đây để UI component dùng luôn

  // Lấy link chi tiết nhật ký
  const getDiaryDetailsPath = (id: string | number) => {
    return isOwnerRole(role)
      ? `${appRoute.ownerDiary}/${id}`
      : `${appRoute.diary}/${id}`;
  };

  // Lấy link thêm nhật ký mới (dựa theo hoạt động)
  const getAddDiaryPath = (
    activityId?: string | number,
    farmId?: string | number,
  ) => {
    const base = isOwnerRole(role) ? appRoute.ownerAddDiary : appRoute.addDiary;

    const params = new URLSearchParams();

    if (activityId) {
      params.append("addId", String(activityId));
    }

    // 👇 chỉ thêm farmId nếu là owner-like
    if (isOwnerRole(role) && farmId) {
      params.append("farmId", String(farmId));
    }

    return params.toString() ? `${base}?${params.toString()}` : base;
  };

  return {
    role,
    canAddNewActivity,
    canDeleteLog,
    canViewRecentActivities,
    canEditDiary,
    getDiaryDetailsPath,
    getAddDiaryPath,
  };
};
