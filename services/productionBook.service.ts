export const getBookByFarmId = async (farmId: string) => {
  let url = `/api/book/${farmId}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Cannot fetch production logs");
  }

  return res.json();
};
