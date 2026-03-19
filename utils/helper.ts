export const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "Đang cập nhật";
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const formatDiaryTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return `Hôm nay • ${time}`;
  if (isYesterday) return `Hôm qua • ${time}`;

  return `${date.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "short",
  })} • ${time}`;
};
