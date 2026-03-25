import { API_INTERNAL } from "@/configs/appRoute";
import {
  TypeOwnerStatisticsResponse,
  TypeRecentActivityLogsResponse,
} from "@/types/TypeStatistics";

export const getOwnerStatistics =
  async (): Promise<TypeOwnerStatisticsResponse> => {
    const res = await fetch(`${API_INTERNAL}/owner/statistics`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Cannot fetch owner statistics");
    }

    return res.json();
  };

export const getRecentActivitiesByOwner = async (
  limit = 5,
): Promise<TypeRecentActivityLogsResponse> => {
  const res = await fetch(
    `${API_INTERNAL}/diary/productionLogs/owner/recent?limit=${limit}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Cannot fetch recent activities");
  }

  return res.json();
};
