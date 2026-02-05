// auth.service.ts

import { API_URL } from "@/configs/appRoute";

export const login = async (payload: { phone: string; password: string }) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const getProfile = async () => {
  const res = await fetch("/api/auth/profile", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok) {
    console.log(res);
    throw new Error(data.message);
  }

  return data;
};

export const getProfileServer = async (token: string) => {
  const res = await fetch(`${API_URL.api}${API_URL.getProfile}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Unauthenticated");
  }

  return res.json();
};

export const logoutAPI = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
  });
};
