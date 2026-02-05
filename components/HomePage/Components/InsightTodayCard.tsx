"use client";

import { AlertTriangle, CalendarClock, MapPin } from "lucide-react";

export default function InsightTodayCard() {
  const insights = [
    {
      icon: AlertTriangle,
      label: "Nguy cơ sâu bệnh",
      value: "3 khu vực",
      color: "text-red-500",
    },
    {
      icon: CalendarClock,
      label: "Đến hạn chăm sóc",
      value: "12 hộ",
      color: "text-yellow-500",
    },
    {
      icon: MapPin,
      label: "Farm chưa cập nhật",
      value: "5 hộ",
      color: "text-blue-500",
    },
  ];

  return (
    <div className="bg-background shadow-xl drop-shadow rounded-xl px-4 py-4">
      <p className="text-base font-semibold mb-4">Tình trạng hôm nay</p>

      <div className="space-y-3">
        {insights.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <item.icon size={18} className={item.color} />
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
