"use client";

import { appRoute } from "@/configs/appRoute";
import { getProductionLogsRecentByOwner } from "@/services/diary.service";
import { IIProductionLogRecentOwner } from "@/types/TypeDiary";
import { formatDiaryTime } from "@/utils/helper";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";

const RecentActivities = () => {
  const [productionLogRecnet, setProductionLogRecent] = useState<
    IIProductionLogRecentOwner[]
  >([]);
  const [loadingRecent, setLoadingRecent] = useState(false);

  useEffect(() => {
    const handleGetLogRecentByOwner = async () => {
      try {
        setLoadingRecent(true);

        const res = await getProductionLogsRecentByOwner();
        setProductionLogRecent(res.data);
        console.log("handleGetLogRecentByOwner: ", res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingRecent(false);
      }
    };

    handleGetLogRecentByOwner();
  }, []);

  const SkeletonDiaryCard = () => {
    return (
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 animate-pulse">
        <div className="flex justify-between items-center gap-4 mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-slate-200"></div>

            <div className="flex flex-col gap-2">
              <div className="h-3 w-28 bg-slate-200 rounded"></div>
              <div className="h-3 w-40 bg-slate-200 rounded"></div>
            </div>
          </div>

          <div className="h-4 w-16 bg-slate-200 rounded"></div>
        </div>

        <div className="flex gap-3">
          <div className="w-20 h-20 bg-slate-200 rounded-lg"></div>

          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 w-32 bg-slate-200 rounded"></div>
            <div className="h-3 w-full bg-slate-200 rounded"></div>
            <div className="h-3 w-5/6 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background shadow-xl drop-shadow rounded-xl px-4 py-4 h-full flex flex-col justify-between">
      <div className="">
        <div className="flex gap-2 items-center justify-between">
          <p className="text-black text-lg font-medium">Hoạt động gần đây</p>
          <div className="bg-primary/10 w-8 h-8 items-center justify-center flex rounded">
            <FaHistory size={18} className="text-primary" />
          </div>
        </div>
        <div className="pt-6 flex flex-col gap-4">
          {loadingRecent
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonDiaryCard key={i} />
              ))
            : productionLogRecnet?.map((item, index) => {
                const isFirst = index === 0;
                const isLast = index === productionLogRecnet.length - 1;

                return (
                  <Link
                    href={`${appRoute.ownerDiary}/${item.id}`}
                    key={index}
                    className="flex gap-4"
                  >
                    <div
                      className={`w-2 h-2 rounded-full translate-y-1.5 ${isFirst ? "bg-primary" : "bg-primary/50"}`}
                    />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.farm.avatar}
                          className="w-5 h-5 object-cover rounded-full"
                        />
                        <p className="font-medium text-black text-sm line-clamp-1">
                          {item.farm.name}
                        </p>
                      </div>
                      <p className="text-black text-xs line-clamp-2">
                        {item.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-500 text-[10px] line-clamp-1">
                          {item.user.name}
                        </p>
                        <p className="text-gray-500 text-[10px] line-clamp-1">
                          {formatDiaryTime(item.created_at)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
      <div className="pt-6">
        <Link
          href={appRoute.ownerDiary}
          className="h-9 w-full bg-primary shadow drop-shadow-2xl rounded-lg flex items-center justify-center"
        >
          <span className="text-white text-sm font-medium">Xem nhật ký</span>
        </Link>
      </div>
    </div>
  );
};

export default RecentActivities;
