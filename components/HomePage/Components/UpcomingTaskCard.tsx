"use client";

import { TypeRecentActivityLog } from "@/types/TypeStatistics";
import { getRecentActivitiesByOwner } from "@/services/owner.service";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";

export default function UpcomingTaskCard() {
  const [logs, setLogs] = useState<TypeRecentActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await getRecentActivitiesByOwner(5);
        if (res.success && res.data) {
          setLogs(res.data);
        }
      } catch (err) {
        console.error("Error fetching recent activities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="bg-background shadow-xl drop-shadow rounded-xl px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-black text-lg font-medium">Hoạt động gần đây</p>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex gap-3 items-start animate-pulse"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-2 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : logs.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-2">
            Chưa có hoạt động nào
          </p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex gap-3 items-start">
              {/* Farm Avatar */}
              <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-200">
                <Image
                  src={log.farm.avatar || "/default-farm.png"}
                  alt={log.farm.name}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 leading-snug line-clamp-2">
                  {log.message}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatDistanceToNow(new Date(log.created_at), {
                    addSuffix: true,
                    locale: vi,
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
