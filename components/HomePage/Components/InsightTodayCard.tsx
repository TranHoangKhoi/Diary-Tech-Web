"use client";

import { TypeTodayInsights } from "@/types/TypeStatistics";
import { AlertTriangle, CalendarClock, MapPin } from "lucide-react";

interface Props {
  todayInsights?: TypeTodayInsights;
}

export default function InsightTodayCard({ todayInsights }: Props) {
  const insights = [
    {
      icon: AlertTriangle,
      label: "Hộ chưa cập nhật (30 ngày)",
      value: todayInsights ? `${todayInsights.inactiveFarmsCount} hộ` : "—",
      color: "text-red-500",
    },
    {
      icon: CalendarClock,
      label: "Nhật ký tạo hôm nay",
      value: todayInsights ? `${todayInsights.logsCreatedToday} bản ghi` : "—",
      color: "text-yellow-500",
    },
    {
      icon: MapPin,
      label: "Hộ đang hoạt động",
      value: todayInsights ? `${todayInsights.activeFarmsCount} hộ` : "—",
      color: "text-blue-500",
    },
  ];

  return (
    <div className="bg-background shadow-xl drop-shadow rounded-xl px-4 py-4">
      <p className="text-black text-lg font-medium mb-4">Tình trạng hôm nay</p>

      <div className="space-y-3 flex flex-col gap-2">
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
