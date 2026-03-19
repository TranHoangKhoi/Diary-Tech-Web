import { IProductionLog } from "@/types/TypeDiary";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { LuBadgeCheck } from "react-icons/lu";

interface Props {
  diaryData: IProductionLog;
}

const UserCreate = (props: Props) => {
  const { diaryData } = props;

  return (
    <div className="bg-white shadow drop-shadow px-4 py-4 rounded-xl">
      <div className="flex items-center gap-2">
        <p className="text-black text-base font-medium">Nhân sự thực hiện</p>
      </div>
      <div className="pt-6 flex gap-4 items-center">
        {diaryData?.created_by?.avatar ? (
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={diaryData?.created_by?.avatar}
          />
        ) : (
          <FaUserCircle className="text-black" size={36} />
        )}
        <div className="">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium text-black">
              {diaryData?.created_by?.name}
            </p>
            <LuBadgeCheck className="text-[#0061FF]" size={14} />
          </div>
          <p className="text-xs text-gray-600">Nhân viên thực hiện</p>
        </div>
      </div>
    </div>
  );
};

export default UserCreate;
