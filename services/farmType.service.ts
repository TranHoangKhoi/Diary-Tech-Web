import { API_INTERNAL } from "@/configs/appRoute";

export const getFarmType = async () => {
  const res = await fetch(`${API_INTERNAL}/diary/farmType`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Cannot fetch production logs");
  }

  return res.json();
};
