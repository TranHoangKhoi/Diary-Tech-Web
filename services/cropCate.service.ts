import { API_URL } from "@/configs/appRoute";

// services/map.service.ts
export const getCrops = async (farmTypeId?: string) => {
  let url = `${API_URL.api}${API_URL.getCropsCate}`;
  if (farmTypeId) {
    url = `${API_URL.api}${API_URL.getCropsCate}?farm_type_id=${farmTypeId}`;
  }

  const res = await fetch(url, {
    cache: "no-store", // luôn fresh
    headers: {},
  });

  if (!res.ok) {
    throw new Error("Unauthenticated");
  }

  return res.json();
};
