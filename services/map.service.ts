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

export const getMapInfoDetails = async (farmId?: string) => {
  const res = await fetch(`${API_URL.api}${API_URL.getFarm}/${farmId}`, {
    cache: "no-store", // luôn fresh
  });

  if (!res.ok) {
    throw new Error("Unauthenticated");
  }

  return res.json();
};

export const getProvince = async () => {
  const res = await fetch(`${API_URL.api}${API_URL.getProvince}`, {
    cache: "no-store", // luôn fresh
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

  if (!res.ok) {
    throw new Error("Lỗi khi call API ");
  }

  return res.json();
};

export const getWards = async (idProvince: string) => {
  const res = await fetch(
    `${API_URL.api}${API_URL.getWards}?province_code=${idProvince}`,
    {
      cache: "no-store", // luôn fresh
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }
  );

  if (!res.ok) {
    throw new Error("Lỗi khi call API ");
  }

  return res.json();
};
