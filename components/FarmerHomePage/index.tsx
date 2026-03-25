"use client";

import MapRenderDemo from "@/app/map/components/MapRenderDemo";
import { appRoute } from "@/configs/appRoute";
import { usePermissions } from "@/hooks/usePermissions";
import { getProductionLogsRecent } from "@/services/diary.service";
import { getMyFarms } from "@/services/farm.service";
import { getBookByFarmId } from "@/services/productionBook.service";
import { RootState } from "@/store";
import { IProductionBook } from "@/types/TypeBook";
import { IProductionLog } from "@/types/TypeDiary";
import { IFarm } from "@/types/TypeFarm";
import { formatDiaryTime } from "@/utils/helper";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsBookHalf, BsPlusCircleFill } from "react-icons/bs";
import { FaClipboardList, FaLeaf, FaSeedling, FaTractor } from "react-icons/fa";
import { IoLocation, IoMapSharp } from "react-icons/io5";
import { MdOutlineEventNote, MdWaves } from "react-icons/md";
import { useSelector } from "react-redux";
import WeatherWidget from "./components/WeatherWidget";
import { getActivitiesByFarmTypeId } from "@/services/activities.service";
import { IActivities } from "@/types/TypeActitvities";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import HomePost from "../HomePage/HomePost";

const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: "Đang hoạt động", color: "bg-green-100 text-green-700" },
  inactive: { label: "Tạm ngừng", color: "bg-gray-100 text-gray-500" },
  under_maintenance: {
    label: "Đang bảo trì",
    color: "bg-yellow-100 text-yellow-700",
  },
};

export default function FarmerHomePage() {
  const userProfile = useSelector(
    (state: RootState) => state.userProfile.profile,
  );

  const { getDiaryDetailsPath, getAddDiaryPath } = usePermissions(
    userProfile?.role,
  );

  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();

  const [farm, setFarm] = useState<IFarm | null>(null);
  const [recentLogs, setRecentLogs] = useState<IProductionLog[]>([]);
  const [books, setBooks] = useState<IProductionBook[]>([]);
  const [activities, setActivities] = useState<IActivities[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const farmRes = await getMyFarms();
        const farmData: IFarm = farmRes;

        setFarm(farmData);

        if (farmData?._id) {
          const [logsRes, booksRes, activitiesRes] = await Promise.all([
            getProductionLogsRecent(farmData._id, 6),
            getBookByFarmId(farmData._id),
            getActivitiesByFarmTypeId(farmData?.farm_type_id?._id),
          ]);

          console.log("Res Data: ", farmData, activitiesRes);

          setRecentLogs(logsRes?.data || []);
          setBooks(booksRes?.data || []);
          setActivities(activitiesRes || []);
        }
      } catch (e) {
        console.error("FarmerHomePage fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const latestBook = books[0] ?? null;
  const statusInfo = farm ? statusMap[farm.farm_status] : null;

  const quickActions = [
    {
      icon: BsPlusCircleFill,
      label: "Thêm nhật ký",
      href: appRoute.ownerAddDiary,
      bg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: FaClipboardList,
      label: "Nhật ký của tôi",
      href: appRoute.ownerDiary,
      bg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      icon: BsBookHalf,
      label: "Sổ mùa vụ",
      href: `${appRoute.ownerDiary}?tab=book`,
      bg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
    {
      icon: FaTractor,
      label: "Hoạt động",
      href: `${appRoute.ownerDiary}?tab=activity`,
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div>
      <div className="container mx-auto pb-10">
        {/* ─── BANNER ─── */}
        <div className="relative">
          <div className="relative w-full h-44 rounded-2xl overflow-hidden">
            <video
              src="https://res.cloudinary.com/delix6nht/video/upload/v1770301679/13505202-uhd_2560_1440_30fps_bsfkuq.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
          </div>
          <div className="absolute inset-0 flex items-center justify-between px-6">
            <div className="flex flex-col gap-1">
              <p className="text-gray-300 text-sm">Xin chào, hộ nông dân 👋</p>
              <p className="text-white font-bold text-2xl">
                {userProfile?.name}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <IoLocation size={14} className="text-green-300" />
                <p className="text-green-200 text-sm">
                  {loading
                    ? "Đang tải..."
                    : farm
                      ? `${farm.farm_name} · ${farm.ward?.name}, ${farm.province?.name}`
                      : userProfile?.address || "Chưa cập nhật địa chỉ"}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              {[
                { label: "Ngày", val: day },
                { label: "Tháng", val: month },
                { label: "Năm", val: year },
              ].map((d) => (
                <div
                  key={d.label}
                  className="w-16 h-14 border border-white/30 rounded-xl bg-white/15 backdrop-blur-sm flex flex-col items-center justify-center"
                >
                  <p className="text-gray-300 text-[10px] font-medium">
                    {d.label}
                  </p>
                  <p className="text-white font-bold text-base">{d.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── FARM INFO + MAP ─── */}
        <div className="grid grid-cols-3 gap-6 py-7">
          {/* Map Render */}
          <div className="col-span-2 flex flex-col gap-4">
            {/* Map card */}
            <div className="bg-background shadow-xl drop-shadow rounded-2xl px-4 py-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="bg-primary/10 w-8 h-8 items-center justify-center flex rounded">
                    <IoMapSharp size={18} className="text-primary" />
                  </div>
                  <p className="text-black text-lg font-medium">
                    Bản đồ nông nghiệp
                  </p>
                </div>
                <div className="">
                  <button className="bg-primary px-4 py-1 rounded">
                    <Link href={"/map"} className="text-white text-sm">
                      Xem chi tiết
                    </Link>
                  </button>
                </div>
              </div>
              <div className="mt-6 relative border rounded-2xl overflow-hidden">
                {/* <MapboxMap height={400} /> */}
                <MapRenderDemo
                  height={470}
                  dataMap={[]}
                  focusLocation={farm?.geo_location}
                />
              </div>
            </div>
          </div>

          {/* Farm Info Card */}
          <div className="col-span-1 bg-background rounded-2xl shadow-xl drop-shadow p-5 flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              {/* Avatar */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 border-primary/30">
                {farm?.avatar ? (
                  <img
                    src={farm.avatar}
                    alt="farm"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <FaSeedling size={28} className="text-primary" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-900 text-base line-clamp-1">
                  {loading
                    ? "Đang tải..."
                    : (farm?.farm_name ?? "Nông trại của bạn")}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                  {farm?.ward?.name && farm?.province?.name
                    ? `${farm.ward.name}, ${farm.province.name}`
                    : "—"}
                </p>
                {statusInfo && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${statusInfo.color}`}
                  >
                    {statusInfo.label}
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <MdWaves size={15} />
                  <span className="text-xs">Diện tích</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {farm?.area
                    ? `${parseFloat(farm.area).toLocaleString("vi-VN")} ha`
                    : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <FaLeaf size={13} />
                  <span className="text-xs">Loại hình</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {farm?.farm_type_id?.type_name ?? "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <IoLocation size={14} />
                  <span className="text-xs">Khu vực</span>
                </div>
                <span className="text-sm font-semibold text-gray-800 text-right line-clamp-1 max-w-[120px]">
                  {farm?.location || "—"}
                </span>
              </div>
            </div>

            {/* Season Card */}
            {latestBook && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <BsBookHalf size={13} className="text-primary" />
                  <p className="text-xs font-semibold text-primary">
                    Mùa vụ hiện tại
                  </p>
                </div>
                <p className="text-sm font-bold text-gray-900 line-clamp-1">
                  {latestBook.name}
                </p>
                <p className="text-xs text-gray-500">
                  Bắt đầu:{" "}
                  {new Date(latestBook.start_date).toLocaleDateString("vi-VN")}
                </p>
                {latestBook.status && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block w-fit
                    ${latestBook.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                  >
                    {latestBook.status === "active"
                      ? "Đang canh tác"
                      : "Đã kết thúc"}
                  </span>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="bg-background rounded-xl shadow-md px-4 py-5 flex items-center gap-3 hover:scale-[1.02] transition-transform"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${action.bg} flex items-center justify-center`}
                  >
                    <action.icon size={24} className={action.iconColor} />
                  </div>

                  <p className="text-sm font-medium text-gray-800">
                    {action.label}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ─── RECENT LOGS ─── */}
        <div className="py-7">
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3 bg-background rounded-2xl shadow-xl drop-shadow p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 w-8 h-8 rounded flex items-center justify-center">
                    <MdOutlineEventNote size={18} className="text-primary" />
                  </div>
                  <p className="font-semibold text-gray-900 text-base">
                    Nhật ký gần đây của tôi
                  </p>
                </div>
                <Link
                  href={appRoute.ownerDiary}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Xem tất cả →
                </Link>
              </div>

              {loading ? (
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="border border-gray-100 rounded-xl p-4 animate-pulse"
                    >
                      <div className="h-3 bg-gray-200 rounded w-2/3 mb-3" />
                      <div className="h-2 bg-gray-100 rounded w-full mb-2" />
                      <div className="h-2 bg-gray-100 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : recentLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                  <FaClipboardList size={40} className="mb-3 opacity-30" />
                  <p className="text-sm">Chưa có nhật ký nào.</p>
                  <Link
                    href={appRoute.ownerAddDiary}
                    className="mt-3 text-xs bg-primary text-white px-4 py-2 rounded-lg"
                  >
                    Thêm nhật ký đầu tiên
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {recentLogs.map((log, idx) => (
                    <Link
                      key={log?._id}
                      href={`${getDiaryDetailsPath(log?._id)}`}
                      className="group border border-gray-100 hover:border-primary/30 rounded-xl p-4 flex flex-col gap-2 transition-all hover:shadow-md shadow-sm drop-shadow-xl"
                    >
                      {/* Header: farm avatar + name */}
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${idx === 0 ? "bg-primary" : "bg-primary/40"}`}
                        />
                        <img
                          src={log?.activity_id?.image}
                          alt={log?.activity_id?.activity_name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <p className="text-sm font-semibold text-gray-700 line-clamp-1">
                          {log?.activity_id?.activity_name}
                        </p>
                      </div>
                      {/* Message */}
                      <p className="text-sm leading-snug line-clamp-2">
                        {log?.notes?.trim() ? (
                          <span className="text-gray-800">{log.notes}</span>
                        ) : (
                          <span className="text-gray-600 italic">
                            {`Hoạt động "${log?.activity_id?.activity_name}" chưa cập nhật ghi chú`}
                          </span>
                        )}
                      </p>
                      {/* Meta */}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-[11px] text-gray-400">
                          {log?.created_by.name}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {formatDiaryTime(log.created_at)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="col-span-1">
              <WeatherWidget
                temperature={30}
                location="Cần Thơ"
                weatherType="sunny"
              />
            </div>
          </div>
        </div>

        {/* ─── ADD LOG CTA ─── */}
        <div className="mt-6 bg-linear-to-r from-primary to-green-600 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-lg">
              Chưa ghi nhật ký hôm nay?
            </p>
            <p className="text-green-100 text-sm mt-1">
              Ghi lại hoạt động canh tác giúp bạn theo dõi mùa vụ hiệu quả hơn.
            </p>
          </div>
          <Link
            href={getAddDiaryPath()}
            className="bg-white text-primary font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors shrink-0"
          >
            + Thêm nhật ký
          </Link>
        </div>

        {/* ─── ACTIVITIES ─── */}
        <div className="py-7">
          <div className="bg-background rounded-2xl shadow-xl drop-shadow p-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary/10 w-8 h-8 rounded flex items-center justify-center">
                <FaTractor size={18} className="text-primary" />
              </div>
              <p className="font-semibold text-gray-900 text-base">
                Các hoạt động sản xuất
              </p>
            </div>

            <style>{`
              .activities-swiper .swiper-grid-column > .swiper-wrapper {
                flex-direction: row !important;
              }
              .activities-swiper .swiper-pagination-bullet-active {
                background: var(--color-primary, #2ecc71);
              }
            `}</style>

            <Swiper
              slidesPerView={4}
              grid={{
                rows: 2,
                fill: "row",
              }}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              modules={[Grid, Pagination]}
              className="activities-swiper pb-2! px-2!"
            >
              {activities.length > 0
                ? activities.map((activity) => (
                    <SwiperSlide key={activity._id}>
                      <Link
                        href={getAddDiaryPath(activity._id)}
                        className="group flex flex-col justify-center p-3 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer bg-white h-full min-h-[140px] shadow drop-shadow-xs"
                      >
                        <div className="w-full h-40 rounded-xl overflow-hidden bg-gray-50 mb-3 border-2 border-transparent group-hover:border-primary/20 transition-all">
                          <img
                            src={
                              activity.image ||
                              "/images/placeholder-activity.png"
                            }
                            alt={activity.activity_name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="h-20 gap-2 flex flex-col">
                          <p className="text-sm font-medium text-gray-800 text-left line-clamp-2">
                            {activity.activity_name}
                          </p>
                          <p className="text-xs text-gray-500 text-left line-clamp-2">
                            {activity.description}
                          </p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))
                : [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <SwiperSlide key={i}>
                      <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-50 animate-pulse bg-white min-h-[140px]">
                        <div className="w-16 h-16 rounded-full bg-gray-100 mb-3" />
                        <div className="w-20 h-3 bg-gray-100 rounded" />
                      </div>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>

        {/* Post  */}

        <div className="bg-white shadow-lg drop-shadow-2xl py-4 px-4 rounded-2xl mt-7">
          <HomePost />
        </div>
      </div>
    </div>
  );
}
