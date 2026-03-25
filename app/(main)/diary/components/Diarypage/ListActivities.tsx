"use client";

import { appRoute } from "@/configs/appRoute";
import { getProductionLogs } from "@/services/diary.service";
import { RootState } from "@/store";
import { IProductionLog } from "@/types/TypeDiary";
import { IFarm } from "@/types/TypeFarm";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { MdDateRange } from "react-icons/md";
import { useSelector } from "react-redux";

interface Props {}

const groupByDate = (logs: IProductionLog[]) => {
  return logs.reduce((acc: any, log) => {
    const dateKey = new Date(log.date).toDateString();

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }

    acc[dateKey].push(log);
    return acc;
  }, {});
};

const getDateLabel = (dateString: string) => {
  const today = new Date();
  const date = new Date(dateString);

  const diff =
    (today.setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0)) /
    (1000 * 60 * 60 * 24);

  if (diff === 0) return "HÔM NAY";
  if (diff === 1) return "HÔM QUA";

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
const SkeletonCard = () => {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <div className="flex gap-4 items-center">
        <div className="w-24 h-20 rounded-lg bg-linear-to-r from-primary/80 via-white to-primary/20 bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]"></div>

        <div className="flex-1 space-y-3">
          <div className="h-4 rounded w-1/3 bg-linear-to-r from-primary/80 via-white to-primary/20 bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]"></div>
          <div className="h-3 rounded w-2/3 bg-linear-to-r from-primary/80 via-white to-primary/20 bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]"></div>
          <div className="h-3 rounded w-1/4 bg-linear-to-r from-primary/80 via-white to-primary/20 bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

const ListActivities = (props: Props) => {
  const currentFarm = useSelector((state: RootState) => state.farm.currentFarm);

  const [productionLog, setProductionLog] = useState<IProductionLog[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  const grouped = useMemo(() => {
    const sorted = [...productionLog].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    console.log(groupByDate(sorted));

    return groupByDate(sorted);
  }, [productionLog]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (pagination && page < pagination.totalPages) {
      setPage(page + 1);
    }
  };

  const renderPageNumbers = () => {
    if (!pagination) return null;

    const pages = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded text-sm ${
            page === i
              ? "bg-primary text-white"
              : "bg-secondary hover:opacity-70 cursor-pointer"
          }`}
        >
          {i}
        </button>,
      );
    }

    return pages;
  };
  useEffect(() => {
    if (!currentFarm?._id) return;

    const fetchProductionLogs = async () => {
      try {
        setLoading(true);

        const res = await getProductionLogs(currentFarm._id, page, limit);

        setProductionLog(res.data);
        setPagination(res.pagination);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductionLogs();
  }, [currentFarm, page]);

  return (
    <div className="">
      {/* Component 3 - Filter */}
      <div className="bg-white shadow drop-shadow-2xl py-4 px-4 rounded-xl flex w-full justify-between">
        <div className="flex items-end gap-6">
          <div className="flex gap-6 items-center">
            {/* <div className="">
                <span className="text-black">Bộ lọc: </span>
              </div> */}
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-xs text-black">
                Từ ngày
              </label>
              <div className="bg-secondary px-3 py-2 rounded shadow drop-shadow">
                <div className="">
                  <div className="flex gap-2 items-center justify-center">
                    <MdDateRange className="text-black" size={14} />
                    <span className="text-black text-sm">01/01/2026</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-xs text-black">
                Đến ngày
              </label>
              <div className="bg-secondary px-3 py-2 rounded shadow drop-shadow">
                <div className="">
                  <div className="flex gap-2 items-center justify-center">
                    <MdDateRange className="text-black" size={14} />
                    <span className="text-black text-sm">30/01/2026</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-xs text-black">
                Cuốn nhật ký
              </label>
              <div className="bg-secondary px-3 py-2 rounded shadow drop-shadow">
                <div className="">
                  <div className="flex gap-2 items-center justify-center">
                    <span className="text-black text-sm">
                      Tất cả cuốn nhật ký
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-xs text-black">
                Hoạt động
              </label>
              <div className="bg-secondary px-3 py-2 rounded shadow drop-shadow">
                <div className="">
                  <div className="flex gap-2 items-center justify-center">
                    <span className="text-black text-sm">Tất cả hoạt động</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              className="bg-secondary text-black shadow drop-shadow-2xl h-9 w-64 text-sm px-4 pr-8 rounded-2xl outline-none"
              placeholder="Tìm kiếm..."
            />
            <div className="absolute top-0 right-4 bottom-0 items-center justify-center flex">
              <LuSearch size={16} className="text-black" />
            </div>
          </div>
        </div>

        <div className="flex items-end gap-4">
          <button className="bg-secondary px-4 h-9 rounded-full shadow drop-shadow hover:opacity-70 cursor-pointer">
            <span className="text-black text-sm">Hủy bộ lọc</span>
          </button>
          <button className="bg-primary px-4 h-9 rounded-full shadow drop-shadow hover:opacity-70 cursor-pointer">
            <span className="text-white text-sm">Áp dụng bộ lọc</span>
          </button>
        </div>
      </div>

      {/* Component 4 - List Diary */}
      <div className="">
        {loading ? (
          <div className="">
            <div className="space-y-4 mt-10">
              {Array.from({ length: limit }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="">
            <div className="relative mt-8">
              <div className="absolute left-2.75 top-0 bottom-0 w-0.5 border-primary border-dashed border-l-2" />

              {Object.entries(grouped).map(([dateKey, logs]) => (
                <div key={dateKey} className="space-y-4 mt-10">
                  <div className="pl-10">
                    <span className="text-gray-600 font-semibold">
                      {getDateLabel(dateKey)}
                    </span>
                  </div>

                  <div className="relative pl-10 space-y-4">
                    <div className="absolute left-1.25 top-2 w-4 h-4 bg-primary rounded-full border-4 border-secondary shadow"></div>

                    {(logs as IProductionLog[]).map((log) => {
                      const extraImages = log.data["Hình ảnh bổ xung"];
                      const firstImage = Array.isArray(extraImages)
                        ? extraImages[0]
                        : extraImages || log.activity_id.image;
                      return (
                        <Link
                          href={`${appRoute.diary}/${log._id}`}
                          key={log._id}
                          className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition drop-shadow-xl block"
                        >
                          <div className="flex gap-4 items-center">
                            <div className="relative">
                              <img
                                src={firstImage}
                                className="w-24 h-20 object-cover rounded-lg"
                              />

                              {Array.isArray(extraImages) &&
                                extraImages.length > 1 && (
                                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                                    +{extraImages.length - 1}
                                  </div>
                                )}
                            </div>

                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">
                                {log.activity_id.activity_name}
                              </h3>

                              <p className="text-sm leading-snug line-clamp-2">
                                {log?.notes?.trim() ? (
                                  <span className="text-gray-800">
                                    {log.notes}
                                  </span>
                                ) : (
                                  <span className="text-gray-600 italic text-sm">
                                    {`Hoạt động "${log?.activity_id?.activity_name}" không có ghi chú`}
                                  </span>
                                )}
                              </p>

                              <span className="text-xs text-gray-500">
                                {new Date(log.created_at).toLocaleTimeString(
                                  "vi-VN",
                                  { hour: "2-digit", minute: "2-digit" },
                                )}
                              </span>
                            </div>

                            <div>
                              <HiDotsVertical
                                className="text-black"
                                size={18}
                              />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-t-gray-200 w-full h-1 mt-10"></div>
            <div className="flex justify-between mt-8 items-center">
              <div className="text-sm text-black">
                {pagination && (
                  <p>
                    Hiển thị {(pagination.page - 1) * pagination.limit + 1} -{" "}
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total,
                    )}{" "}
                    trong số {pagination.total}
                  </p>
                )}
              </div>
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={page === 1}
                  className="px-3 py-1 bg-secondary rounded text-sm disabled:opacity-40 cursor-pointer hover:opacity-80"
                >
                  Trước
                </button>

                {renderPageNumbers()}

                <button
                  onClick={handleNext}
                  disabled={!pagination || page === pagination.totalPages}
                  className="px-3 py-1 bg-secondary rounded text-sm disabled:opacity-40 cursor-pointer hover:opacity-80"
                >
                  Sau
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListActivities;
