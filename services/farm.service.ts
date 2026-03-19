export const getMyFarms = async () => {
  const res = await fetch("/api/auth/farm", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Cannot fetch farms");
  }

  return res.json();
};

export const getFarmsByOwner = async () => {
  const res = await fetch("/api/owner/farm", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Cannot fetch farms");
  }

  return res.json();
};

export const createNewAccountFarm = async (formData: FormData) => {
  const res = await fetch("/api/account/create", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};
