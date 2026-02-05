"use client";

export default function UpcomingTaskCard() {
  const tasks = [
    {
      title: "Phun thuốc phòng nấm",
      farm: "Hộ Nguyễn Văn An",
      date: "Hôm nay",
    },
    {
      title: "Bón phân đợt 2",
      farm: "Hộ Trần Ngọc Bích",
      date: "Ngày mai",
    },
    {
      title: "Kiểm tra sâu đục thân",
      farm: "Hộ Lê Văn Công",
      date: "2 ngày nữa",
    },
  ];

  return (
    <div className="bg-background shadow-xl drop-shadow rounded-xl px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-black text-lg font-medium">Việc sắp tới</p>
        <button className="text-sm text-primary hover:underline">
          Xem tất cả
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task, idx) => (
          <div key={idx} className="border-l-4 border-primary pl-3 py-1">
            <p className="text-sm font-medium text-gray-900">{task.title}</p>
            <p className="text-xs text-gray-500">
              {task.farm} · {task.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
