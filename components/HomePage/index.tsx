"use client";

import Image from "next/image";
import HomeSlide from "./HomeSlide";
import { IoLocation, IoMapSharp } from "react-icons/io5";
import MapboxMap from "../MapboxMap/MapboxMap";
import { FaHistory, FaStore } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { MdOutlineEventNote } from "react-icons/md";
import { BsFillHouseAddFill } from "react-icons/bs";
import { RiUserSettingsFill } from "react-icons/ri";
import HomePost from "./HomePost";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import MapRenderDemo from "@/app/map/components/MapRenderDemo";
import Link from "next/link";
import CropStatisticCard from "./CropStatisticCard";
import InsightTodayCard from "./Components/InsightTodayCard";
import UpcomingTaskCard from "./Components/UpcomingTaskCard";
import WeeklyKPIStrip from "./Components/WeeklyKPIStrip";

const HomePage = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="">
      <div className="container mx-auto pb-10">
        {/* Banner Hello */}
        <div className="relative">
          <div className="relative w-full h-40 rounded-2xl overflow-hidden">
            {/* <Image
              src={"/assets/ImageApp/strawberrField.jpg"}
              alt="bgnn"
              fill
              className="object-cover"
              priority
            /> */}
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
              <p className="text-white font-medium text-2xl">Trần Hoàng Khôi</p>
              <div className="flex gap-1 items-center">
                <IoLocation size={16} className="text-grey" />

                <p className="text-grey text-sm">
                  Hợp tác xã nông nghiệp Cần Thơ
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-20 h-16 border rounded-lg drop-shadow-2xl  bg-white/20 backdrop-blur-sm cursor-pointer hover:opacity-80 border-grey flex flex-col justify-center gap-1 ">
                <p className="text-gray-300 text-center font-bold text-sm">
                  Ngày
                </p>
                <span className="text-white font-bold text-center text-lg">
                  27
                </span>
              </div>
              <div className="w-20 h-16 border rounded-lg drop-shadow-2xl  bg-white/20 backdrop-blur-sm cursor-pointer hover:opacity-80 border-grey flex flex-col justify-center gap-1 ">
                <p className="text-gray-300 text-center font-bold text-sm">
                  Tháng
                </p>
                <span className="text-white font-bold text-center text-lg">
                  01
                </span>
              </div>
              <div className="w-20 h-16 border rounded-lg drop-shadow-2xl  bg-white/20 backdrop-blur-sm cursor-pointer hover:opacity-80 border-grey flex flex-col justify-center gap-1 ">
                <p className="text-gray-300 text-center font-bold text-sm">
                  Năm
                </p>
                <span className="text-white font-bold text-center text-lg">
                  2026
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
            <div className="bg-background shadow-xl drop-shadow rounded-xl px-4 py-4">
              <div className="flex gap-2 items-center justify-between">
                <p className="text-black text-lg font-medium">
                  Hoạt động gần đây
                </p>
                <div className="bg-primary/10 w-8 h-8 items-center justify-center flex rounded">
                  <FaHistory size={18} className="text-primary" />
                </div>
              </div>
              <div className="pt-6 flex flex-col gap-1">
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full translate-y-1.5" />
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-black text-sm line-clamp-1">
                      Bón phân đợt 2
                    </p>
                    <p className="text-gray-500 text-xs line-clamp-1">
                      27/09/2026 - 09:30
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-primary/50 rounded-full translate-y-1.5" />
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-black text-sm line-clamp-1">
                      Phun thuốc trừ sâu hại
                    </p>
                    <p className="text-gray-500 text-xs line-clamp-1">
                      27/09/2026 - 09:30
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-primary/50 rounded-full translate-y-1.5" />
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-black text-sm line-clamp-1">
                      Bón phân kali và thuốc dưỡng lá
                    </p>
                    <p className="text-gray-500 text-xs line-clamp-1">
                      27/09/2026 - 09:30
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button className="h-9 w-full bg-primary shadow drop-shadow-2xl rounded-lg">
                  <span className="text-white text-sm font-medium">
                    Xem nhật ký
                  </span>
                </button>
              </div>
            </div>

            {/* Left - Bottom Side */}
            {/* Left - Bottom Side : Báo cáo thống kê */}
            <div className="bg-background shadow-xl drop-shadow rounded-xl px-4 py-4">
              {/* Header */}
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
                  <p className="font-semibold text-black">60 hộ</p>
                </div>

                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <p className="text-sm text-gray-600">Diện tích canh tác</p>
                  <p className="font-semibold text-black">143.0 ha</p>
                </div>

                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <p className="text-sm text-gray-600">Farm đang hiển thị</p>
                  <p className="font-semibold text-primary">60 / 60</p>
                </div>

                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <p className="text-sm text-gray-600">Cây trồng chính</p>
                  <p className="font-semibold text-black">Sầu riêng</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Xã nhiều hộ nhất</p>
                  <p className="font-semibold text-black">Mỹ Khánh</p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-5">
                <button className="h-9 w-full bg-primary shadow drop-shadow-2xl rounded-lg">
                  <span className="text-white text-sm font-medium">
                    Xem báo cáo chi tiết
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 pb-10">
          <div className="col-span-2">
            <CropStatisticCard />
          </div>
          <div className="col-span-1 space-y-4">
            <InsightTodayCard />
            <UpcomingTaskCard />
          </div>
        </div>

        {/* Post */}
        <div className="bg-white shadow-lg drop-shadow-2xl py-4 pb-1 px-4 rounded-2xl">
          <div className="">
            <div className="flex items-center justify-between">
              <p className="text-black text-lg font-medium">Tin tức mới nhất</p>
              <div className="">
                <button
                  className={`home-prev nav-btn left p-2 cursor-pointer text-primary ${
                    isBeginning ? "opacity-40 cursor-none" : ""
                  }`}
                  disabled={isBeginning}
                >
                  <FiChevronLeft size={20} />
                </button>

                <button
                  className={`home-next nav-btn right p-2 cursor-pointer text-primary ${
                    isEnd ? "opacity-40 cursor-none" : ""
                  }`}
                  disabled={isEnd}
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="pt-6 ">
              <HomePost setIsBeginning={setIsBeginning} setIsEnd={setIsEnd} />
            </div>
          </div>
        </div>
      </div>

      {/* <HomeSlide /> */}
    </div>
  );
};

export default HomePage;
