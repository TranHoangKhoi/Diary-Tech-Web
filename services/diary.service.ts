export const getProductionLogs = async (
  farmId: string,
  page?: number,
  limit?: number,
  bookId?: string
) => {
  let url = `/api/diary/productionLogs/${farmId}`;

  const params = new URLSearchParams();

  if (page && limit) {
    params.append("page", String(page));
    params.append("limit", String(limit));
  }

  if (bookId) {
    params.append("book_id", bookId);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Cannot fetch production logs");
  }

  return res.json();
};

export const getDetailsProdutionLogs = async (productionLogId: string) => {
  let url = `/api/diary/productionLogs/details/${productionLogId}`;
  console.log("url: ", url);

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Cannot fetch production logs");
  }

  return res.json();
};

export const getProductionLogsRecent = async (
  farm_id: string,
  limit: number,
  curentId?: string
) => {
  let url = `/api/diary/productionLogs/recent?farm_id=${farm_id}&limit=${limit}`;

  if (curentId) {
    url = `/api/diary/productionLogs/recent?farm_id=${farm_id}&limit=${limit}&exclude_log_id=${curentId}`;
  }

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Cannot fetch production logs");
  }

  return res.json();
};

export const getProductionLogsByOwner = async (
  page = 1,
  limit = 5,
  farm_id?: string,
  farmer_id?: string
) => {
  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));

  if (farm_id) params.append("farm_id", farm_id);
  if (farmer_id) params.append("farmer_id", farmer_id);

  const res = await fetch(`/api/diary/productionLogs/owner?${params}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Cannot fetch production logs");
  }

  return res.json();
};

export const getProductionLogsRecentByOwner = async () => {
  const res = await fetch(`/api/diary/productionLogs/owner/recent`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Cannot fetch production logs");
  }

  return res.json();
};

export const crateProductionLogs = async (data: any) => {
  let url = `/api/diary/productionLogs/`;

  const res = await fetch(url, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // ✅
  });

  if (!res.ok) {
    throw new Error("Cannot create new logs");
  }

  return res.json();
};
