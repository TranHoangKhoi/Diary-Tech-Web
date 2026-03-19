export const getFarmType = async () => {
  const res = await fetch(`/api/diary/farmType`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Cannot fetch production logs");
  }

  return res.json();
};
