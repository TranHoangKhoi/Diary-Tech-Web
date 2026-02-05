import { API_URL } from "@/configs/appRoute";

// services/map.service.ts
export const getMapInfo = async (token?: string) => {
  const res = await fetch(`${API_URL.api}${API_URL.getFarm}`, {
    cache: "no-store", // luôn fresh
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthenticated");
  }

  return res.json();
};
