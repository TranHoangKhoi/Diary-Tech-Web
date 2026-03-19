import { appRoute } from "@/configs/appRoute";
import { IIProductionLogRecentOwner, IProductionLog } from "@/types/TypeDiary";
import { formatDiaryTime } from "@/utils/helper";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { CiViewTimeline } from "react-icons/ci";
import { FaHistory } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";
import { MdOutlineMenuBook } from "react-icons/md";

interface Props {
  productionLog: IProductionLog[];
  pagination: any;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  loadingLogs: boolean;
  loadingRecent: boolean;
  productionLogRecnet: IIProductionLogRecentOwner[];
}

const getImagesFromData = (data: Record<string, any>) => {
  if (!data) return [];

  const imageField = Object.values(data).find(
    (value) =>
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "string" &&
      value[0].startsWith("http")
  );

  return imageField || [];
};

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

const SkeletonTimelineItem = () => {
  return (
    <div className="flex gap-3 animate-pulse border-b border-gray-200 pb-4">
      <div className="w-5 h-5 rounded-full bg-slate-200"></div>

      <div className="flex-1 space-y-2">
        <div className="h-3 w-24 bg-slate-200 rounded"></div>
        <div className="h-3 w-full bg-slate-200 rounded"></div>
        <div className="h-2 w-16 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
};

const ListActivities = (props: Props) => {
  const {
    productionLog,
    pagination,
    page,
    setPage,
    loadingLogs,
    loadingRecent,
    productionLogRecnet,
  } = props;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Diary List Grid */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <MdOutlineMenuBook className="text-primary" size={22} />
            Danh sách Nhật ký (24)
          </h3>
          <div className="flex bg-slate-200 dark:bg-slate-800 p-2 rounded-lg">
            <button className="px-3 py-1 text-sm font-bold bg-white dark:bg-slate-700 rounded shadow-sm gap-1.5  flex items-center">
              <FiGrid className="text-black" size={14} />
              <span className=""> Lưới</span>
            </button>
            <button className="px-3 py-1 text-sm font-bold text-slate-500 flex items-center gap-1.5">
              <CiViewTimeline className="text-black" size={16} />
              <span className="">Dòng thời gian</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Activity Card 1 */}
          {loadingLogs
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonDiaryCard key={i} />
              ))
            : productionLog?.map((item, index) => {
                const images = getImagesFromData(item?.data);
                const firstImage = images?.[0] || item?.activity_id?.image;
                return (
                  <div
                    key={item._id}
                    className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40 transition-colors group"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-3 mb-4 flex-1">
                        <img
                          className="w-10 h-10 rounded-full border border-white"
                          data-alt="Farmer headshot avatar"
                          src={item?.farm_id?.avatar}
                        />
                        <div className="flex flex-col gap-1">
                          <span className="text-black text-sm font-medium">
                            {item?.farm_id?.farm_name}
                          </span>
                          <span className="text-black text-xs line-clamp-2">
                            {`${item?.farm_id?.ward?.name}, ${item?.farm_id?.province?.name}`}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-medium px-2 py-1 bg-slate-100 rounded-md text-black shadow">
                        {formatDiaryTime(item.created_at)}
                      </span>
                    </div>
                    <Link
                      href={`${appRoute.ownerDiary}/${item._id}`}
                      className="flex gap-3 mt-2"
                    >
                      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800">
                        <div className="relative w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800">
                          <img
                            src={firstImage}
                            className="w-full h-full object-cover"
                            alt=""
                          />

                          {images.length > 1 && (
                            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                              +{images.length - 1}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h4 className="font-bold text-sm">
                          {item?.activity_id?.activity_name}
                        </h4>

                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                          {item?.notes
                            ? item?.notes
                            : item.activity_id.description}
                        </p>
                      </div>
                    </Link>
                    {/* <div className="flex gap-2">
                    <button className="flex-1 py-2 text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      Sửa
                    </button>
                    <button className="flex-1 py-2 text-xs font-bold bg-primary text-slate-900 rounded-lg hover:bg-primary/90 transition-colors">
                      Chi tiết
                    </button>
                  </div> */}
                  </div>
                );
              })}
          {}
        </div>

        {pagination && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 text-sm border rounded-lg disabled:opacity-40"
              >
                Trước
              </button>

              {Array.from({ length: pagination.totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    page === i + 1
                      ? "bg-primary text-white"
                      : "border hover:bg-slate-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page === pagination.totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 text-sm border rounded-lg disabled:opacity-40"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar: Recent Activity Timeline */}
      <div className="w-full lg:w-82 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <FaHistory className="text-black" size={16} />
            Hoạt động Gần đây
          </h3>
          <button className="text-xs font-bold text-primary uppercase hover:underline">
            Xem tất cả
          </button>
        </div>

        {loadingRecent ? (
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonTimelineItem key={i} />
          ))
        ) : (
          <div className="bg-white dark:bg-background-dark p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="relative space-y-8 ">
              {/* Timeline Item 1 */}
              {productionLogRecnet?.map((item, index) => {
                const isFirst = index === 0;
                const isLast = index === productionLogRecnet.length - 1;

                return (
                  <div
                    key={index}
                    className={`relative flex items-center gap-4 m-0
        ${!isLast ? "border-b border-gray-200" : ""}
        ${isFirst ? "pb-4" : isLast ? "pt-4" : "py-4"}
      `}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <img
                          className="w-5 h-5 rounded-full"
                          src={item.farm.avatar}
                        />
                        <span className="text-sm font-bold">
                          {item.user.name}
                        </span>
                      </div>

                      <div className="pt-1">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {item.message}
                        </p>

                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {formatDiaryTime(item.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListActivities;
