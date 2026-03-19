"use client";

import {
  getProductionLogsByOwner,
  getProductionLogsRecentByOwner,
} from "@/services/diary.service";
import { IIProductionLogRecentOwner, IProductionLog } from "@/types/TypeDiary";
import { useEffect, useState } from "react";
import { CiViewTimeline } from "react-icons/ci";
import { FaHistory } from "react-icons/fa";
import { FaCircleCheck, FaFilter } from "react-icons/fa6";
import { FiGrid } from "react-icons/fi";
import { MdOutlineMenuBook } from "react-icons/md";
import ListActivities from "./ListActivities";

const OwnerDiaryContent = () => {
  const [productionLog, setProductionLog] = useState<IProductionLog[]>([]);
  const [productionLogRecnet, setProductionLogRecent] = useState<
    IIProductionLogRecentOwner[]
  >([]);
  const [pagination, setPagination] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const limit = 6;

  useEffect(() => {
    const handleGetLogRecentByOwner = async () => {
      try {
        setLoadingRecent(true);

        const res = await getProductionLogsRecentByOwner();
        setProductionLogRecent(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingRecent(false);
      }
    };

    handleGetLogRecentByOwner();
  }, []);

  useEffect(() => {
    const handleGetLogByOwner = async () => {
      try {
        setLoadingLogs(true);

        const res = await getProductionLogsByOwner(page, limit);

        setProductionLog(res.data);
        setPagination(res.pagination);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingLogs(false);
      }
    };

    handleGetLogByOwner();
  }, [page]);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background-light">
      {/* Filter Section */}
      <div className="bg-white dark:bg-background-dark p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
        <div className="flex gap-3 justify-between">
          <div className="flex gap-6">
            <div className="space-y-1.5 flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Trang trại
              </label>
              <div className="bg-secondary border-slate-200 drop-shadow-sm shadow rounded-lg pr-3">
                <select className=" text-sm focus:border-primary focus:ring-primary py-2.5 px-4 cursor-pointer">
                  <option>Tất cả trang trại</option>
                  <option>Farm Đông Anh</option>
                  <option>Farm Sóc Sơn</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5 flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Hoạt động
              </label>
              <div className="bg-secondary border-slate-200 drop-shadow-sm shadow rounded-lg pr-3">
                <select className=" text-sm focus:border-primary focus:ring-primary py-2.5  px-4 cursor-pointer">
                  <option>Tất cả hoạt động</option>
                  <option>Tưới nước</option>
                  <option>Bón phân</option>
                  <option>Phun thuốc</option>
                  <option>Thu hoạch</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5 flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Từ ngày
              </label>
              <div className="relative">
                <input
                  className="w-full bg-secondary cursor-pointer border-slate-200 rounded-lg text-sm focus:border-primary focus:ring-primary py-2.5 px-4 drop-shadow-sm shadow"
                  type="date"
                  defaultValue="01/10/2023 - 31/10/2023"
                />
              </div>
            </div>
            <div className="space-y-1.5 flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Đến ngày
              </label>
              <div className="relative">
                <input
                  className="w-full bg-secondary cursor-pointer border-slate-200 rounded-lg text-sm focus:border-primary focus:ring-primary py-2.5 px-4 drop-shadow-sm shadow"
                  type="date"
                  defaultValue="01/10/2023 - 31/10/2023"
                />
              </div>
            </div>
          </div>

          <div className="flex items-end justify-end">
            <button className="bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2.5 px-5 rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-2">
              <FaFilter className="text-white" size={14} />
              Lọc kết quả
            </button>
          </div>
        </div>
      </div>
      <ListActivities
        pagination={pagination}
        productionLog={productionLog}
        page={page}
        setPage={setPage}
        loadingLogs={loadingLogs}
        loadingRecent={loadingRecent}
        productionLogRecnet={productionLogRecnet}
      />
    </div>
  );
};

export default OwnerDiaryContent;
