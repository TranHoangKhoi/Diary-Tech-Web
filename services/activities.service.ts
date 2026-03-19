import { API_INTERNAL } from "@/configs/appRoute";

export const getActivitiesByFarmTypeId = async (farmTypeId: string) => {
  let url = `${API_INTERNAL}/activities/farmtype/${farmTypeId}`;
  console.log("farmTypeId: ", farmTypeId);

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Cannot fetch production logs");
  }

  return res.json();
};
