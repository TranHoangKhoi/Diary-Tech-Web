import { RootState } from "@/store";
import { FaBuffer } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PiNotebookFill } from "react-icons/pi";
import { SiGoogleanalytics } from "react-icons/si";
import { useSelector } from "react-redux";
import ListActivities from "./ListActivities";
import Link from "next/link";
import { appRoute } from "@/configs/appRoute";

const DiaryPage = () => {
  return (
    <div className="container mx-auto">
      {/* Component 1 - Title */}
      <div className="flex justify-between items-end">
        <div className="">
          <h2 className="text-2xl font-bold">Nhật ký canh tác</h2>
          <p>Theo dõi và quản lý mọi hoạt động trên nông trại của bạn</p>
        </div>
        <div className="">
          <Link
            href={appRoute.addDiary}
            className="bg-primary text-white text-sm px-4 py-2 rounded flex items-center gap-1 cursor-pointer hover:opacity-70"
          >
            <IoMdAddCircleOutline
              className="text-white translate-y-px"
              size={16}
            />
            Tạo nhật ký mới
          </Link>
        </div>
      </div>

      {/* Component 2 - Analyze */}
      <div className=" gap-4 grid grid-cols-4 py-8">
        {/* Num Diary */}
        <div className="bg-white shadow drop-shadow-2xl px-4 py-3 rounded-xl col-span-1">
          <div className="flex gap-3 items-center ">
            <div className="bg-primary/15 px-1 py-1 rounded w-6 h-6 items-center justify-center">
              <PiNotebookFill className="text-primary" size={16} />
            </div>
            <div className="text-base">
              <p className="font-medium">Số lượng nhật ký</p>
            </div>
          </div>
          <div className="pt-3">
            <p className="text-black font-medium text-xl tracking-wider">
              1,284
            </p>
            <span className="text-primary text-xs">+ 12 trong tuần này</span>
          </div>
        </div>

        {/* Diện tích */}
        <div className="bg-white shadow drop-shadow-2xl px-4 py-3 rounded-xl col-span-1">
          <div className="flex gap-3 items-center ">
            <div className="bg-[#0077B5]/15 px-1 py-1 rounded w-6 h-6 items-center justify-center">
              <FaBuffer className="text-[#0077B5]" size={16} />
            </div>
            <div className="text-base">
              <p className="font-medium">Diện tích</p>
            </div>
          </div>
          <div className="pt-3">
            <p className="text-black font-medium text-xl tracking-wider">
              12.5 ha
            </p>
            <span className="text-black text-xs">3 vùng canh tách</span>
          </div>
        </div>

        {/*  */}
        <div className="bg-white shadow drop-shadow-2xl px-4 py-3 rounded-xl col-span-1">
          <div className="flex gap-3 items-center ">
            <div className="bg-[#FF5700]/15 px-1 py-1 rounded w-6 h-6 items-center justify-center">
              <FaBoxArchive className="text-[#FF5700]" size={16} />
            </div>
            <div className="text-base">
              <p className="font-medium">Vật tư sử dụng</p>
            </div>
          </div>
          <div className="pt-3">
            <p className="text-black font-medium text-xl tracking-wider">
              450 Kg
            </p>
            <span className="text-[#FF5700] text-xs">Sấp hết hàng</span>
          </div>
        </div>

        {/*  */}
        <div className="bg-white shadow drop-shadow-2xl px-4 py-3 rounded-xl col-span-1">
          <div className="flex gap-3 items-center ">
            <div className="bg-[#410093]/15 px-1 py-1 rounded">
              <SiGoogleanalytics className="text-[#410093]" size={16} />
            </div>
            <div className="text-base">
              <p className="font-medium">Sản lượng dự kiến</p>
            </div>
          </div>
          <div className="pt-3">
            <p className="text-black font-medium text-xl tracking-wider">
              85 Tấn
            </p>
            <span className="text-primary text-xs">Đạt 95% mục tiêu</span>
          </div>
        </div>
      </div>

      <ListActivities />
    </div>
  );
};

export default DiaryPage;
