"use client";

import MapRenderDemo from "@/app/map/components/MapRenderDemo";
import { RootState } from "@/store";
import Link from "next/link";
import { BsFillHouseAddFill } from "react-icons/bs";
import { FaHistory, FaStore } from "react-icons/fa";
import { IoLocation, IoMapSharp } from "react-icons/io5";
import { MdOutlineEventNote } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { SiGoogleanalytics } from "react-icons/si";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOwnerStatistics } from "@/services/owner.service";
import { TypeOwnerStatistics } from "@/types/TypeStatistics";
import InsightTodayCard from "./Components/InsightTodayCard";
import UpcomingTaskCard from "./Components/UpcomingTaskCard";
import CropStatisticCard from "./CropStatisticCard";
import HomePost from "./HomePost";
import RecentActivities from "./RecentActivities";

const HomePage = () => {
  const userProfile = useSelector(
    (state: RootState) => state.userProfile.profile,
  );

  const currentFarm = useSelector((state: RootState) => state.farm.currentFarm);

  const now = new Date();

  const [statistics, setStatistics] = useState<TypeOwnerStatistics | null>(
    null,
  );

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await getOwnerStatistics();
        if (response.success && response.data) {
          setStatistics(response.data);
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    if (
      userProfile?.role === "owner" ||
      userProfile?.role === "admin" ||
      userProfile?.role === "superadmin"
    ) {
      fetchStatistics();
    }
  }, [userProfile]);

  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();

  return (
    <div className="">
      <div className="container mx-auto pb-10">
        {/* Banner Hello */}
        <div className="relative">
          <div className="relative w-full h-40 rounded-2xl overflow-hidden">
            <video
              src="https://res.cloudinary.com/delix6nht/video/upload/v1770301679/13505202-uhd_2560_1440_30fps_bsfkuq.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bg-black/60 top-0 left-0 bottom-0 right-0"></div>
          </div>
          <div className="absolute top-4 left-6 bottom-4 right-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-grey text-sm">Xin chào,</p>
              <p className="text-white font-medium text-2xl">
                {userProfile?.name}
              </p>
              <div className="flex gap-1 items-center">
                <IoLocation size={16} className="text-grey" />

                <p className="text-grey text-sm">
                  {userProfile?.address
                    ? userProfile?.address
                    : `${currentFarm?.location}, ${currentFarm?.ward?.name}, ${currentFarm?.province?.name}`}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-20 h-16 border rounded-lg drop-shadow-2xl  bg-white/20 backdrop-blur-sm cursor-pointer hover:opacity-80 border-grey flex flex-col justify-center gap-1 ">
                <p className="text-gray-300 text-center font-bold text-sm">
                  Ngày
                </p>
                <span className="text-white font-bold text-center text-lg">
                  {day}
                </span>
              </div>
              <div className="w-20 h-16 border rounded-lg drop-shadow-2xl  bg-white/20 backdrop-blur-sm cursor-pointer hover:opacity-80 border-grey flex flex-col justify-center gap-1 ">
                <p className="text-gray-300 text-center font-bold text-sm">
                  Tháng
                </p>
                <span className="text-white font-bold text-center text-lg">
                  {month}
                </span>
              </div>
              <div className="w-20 h-16 border rounded-lg drop-shadow-2xl  bg-white/20 backdrop-blur-sm cursor-pointer hover:opacity-80 border-grey flex flex-col justify-center gap-1 ">
                <p className="text-gray-300 text-center font-bold text-sm">
                  Năm
                </p>
                <span className="text-white font-bold text-center text-lg">
                  {year}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="grid grid-cols-3 gap-4 py-10">
          {/* Right Side */}
          <div className="col-span-2 flex flex-col gap-4">
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
                <MapRenderDemo height={470} dataMap={[]} />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-background shadow-xl drop-shadow rounded-xl px-4 py-4 col-span-1 gap-4 flex flex-col">
                <MdOutlineEventNote className="text-primary" size={26} />
                <p className="text-black font-medium text-sm">
                  Tổng quan nhật ký
                </p>
              </div>
              <div className="bg-background shadow-xl drop-shadow rounded-xl px-4 py-4 col-span-1 gap-4 flex flex-col">
                <FaStore className="text-primary" size={26} />
                <p className="text-black font-medium text-sm">
                  Kiểu hộ kinh doanh
                </p>
              </div>
              <div className="bg-background shadow-xl drop-shadow rounded-xl px-4 py-4 col-span-1 gap-4 flex flex-col">
                <BsFillHouseAddFill className="text-primary" size={26} />
                <p className="text-black font-medium text-sm">
                  Thêm hộ kinh doanh
                </p>
              </div>
              <div className="bg-background shadow-xl drop-shadow rounded-xl px-4 py-4 col-span-1 gap-4 flex flex-col">
                <RiUserSettingsFill className="text-primary" size={26} />
                <p className="text-black font-medium text-sm">
                  Quản lý tài khoản
                </p>
              </div>
            </div>
          </div>
          {/* Left Side */}
          <div className="col-span-1 flex flex-col gap-6">
            {/* Left - Top Side */}
            <InsightTodayCard todayInsights={statistics?.todayInsights} />
            <RecentActivities />
            {/* <UpcomingTaskCard /> */}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 pb-10 items-stretch">
          <div className="col-span-2">
            <CropStatisticCard
              cropStructure={statistics?.cropStructure}
              totalFarms={statistics?.totalFarms}
              totalArea={statistics?.totalArea}
            />
          </div>
          <div className="col-span-1 space-y-4">
            <div className="bg-background shadow-xl drop-shadow rounded-xl px-4 py-4  h-full flex flex-col justify-between">
              {/* Header */}
              <div className="flex-1">
                <div className="flex gap-2 items-center justify-between">
                  <p className="text-black text-lg font-medium">
                    Báo cáo thống kê
                  </p>
                  <div className="bg-primary/10 w-8 h-8 items-center justify-center flex rounded">
                    <SiGoogleanalytics size={18} className="text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="pt-6 flex flex-col gap-4">
                  {/* Item */}
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <p className="text-sm text-gray-600">Tổng số hộ</p>
                    <p className="font-semibold text-black">
                      {statistics?.totalSubAccounts || 0} hộ
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <p className="text-sm text-gray-600">Diện tích canh tác</p>
                    <p className="font-semibold text-black">
                      {statistics?.totalArea?.value
                        ? statistics.totalArea.value.toLocaleString("vi-VN")
                        : 0}{" "}
                      {statistics?.totalArea?.unit || "ha"}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <p className="text-sm text-gray-600">
                      Tổng nông trại hiển thị
                    </p>
                    <p className="font-semibold text-primary">
                      {statistics?.totalFarms || 0}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <p className="text-sm text-gray-600">
                      Diện tích nhiều nhất
                    </p>
                    <p className="font-semibold text-black">
                      {statistics?.cropStructure?.length
                        ? statistics.cropStructure.reduce(
                            (prev, current) =>
                              prev.percentage > current.percentage
                                ? prev
                                : current,
                            statistics.cropStructure[0],
                          ).cropName
                        : "Chưa xác định"}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      Tỉ lệ farm đang hoạt động
                    </p>
                    <p className="font-semibold text-black">
                      {statistics?.activeRate
                        ? `${statistics.activeRate}%`
                        : "0%"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-5 mt-auto">
                <button className="h-9 w-full bg-primary shadow drop-shadow-2xl rounded-lg">
                  <span className="text-white text-sm font-medium">
                    Xem báo cáo chi tiết
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Post */}
        <div className="bg-white shadow-lg drop-shadow-2xl py-4 pb-1 px-4 rounded-2xl">
          <HomePost />
        </div>
      </div>

      {/* <HomeSlide /> */}
    </div>
  );
};

export default HomePage;
