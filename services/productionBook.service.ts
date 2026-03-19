import { API_INTERNAL } from "@/configs/appRoute";

export const getBookByFarmId = async (farmId: string) => {
  let url = `${API_INTERNAL}/book/${farmId}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Cannot fetch production logs");
  }

  return res.json();
};
