// auth.service.ts

import { API_INTERNAL, API_URL } from "@/configs/appRoute";

// export const login = async (payload: { phone: string; password: string }) => {
//   const res = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json();

//   if (!res.ok) throw new Error(data.message);
//   console.log("res: ");

//   return data;
// };

export const login = async (payload) => {
  const res = await fetch(`${API_URL.api}${API_URL.login}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "omit", // 🔥
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data; // { token, user }
};

export const getProfile = async () => {
  const res = await fetch(`${API_INTERNAL}/auth/profile`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log("res: ", res);
  console.log("data: ", data);

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
