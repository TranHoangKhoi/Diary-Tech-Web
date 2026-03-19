import { IProductionLog } from "@/types/TypeDiary";
import React from "react";
import { FaBookBookmark } from "react-icons/fa6";
import { MdLocalActivity } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";

interface Props {
  diaryData: IProductionLog;
}

const InfoFarmDetails = (props: Props) => {
  const { diaryData } = props;
  return (
    <div className="grid grid-cols-3 gap-8 col-span-2">
      <div className="flex flex-col gap-2 col-span-1">
        <div className="flex items-center gap-2">
          <FaBookBookmark className="text-primary" size={12} />
          <span className="text-sm font-medium text-primary">Cuốn nhật ký</span>
        </div>
        <div className="text-black text-sm">{diaryData?.book_id?.name}</div>
      </div>
      <div className="flex flex-col gap-2 col-span-1">
        <div className="flex items-center gap-2">
          <MdLocalActivity className="text-primary" size={12} />
          <span className="text-sm font-medium text-primary">Hoạt động</span>
        </div>
        <div className="text-black text-sm">
          {diaryData?.activity_id?.activity_name}
        </div>
      </div>
      <div className="flex flex-col gap-2 col-span-1">
        <div className="flex items-center gap-2">
          <SiGoogleanalytics className="text-primary" size={12} />
          <span className="text-sm font-medium text-primary">Diện tích</span>
        </div>
        <div className="text-black text-sm">
          {diaryData?.farm_id?.area
            ? diaryData?.farm_id?.area
            : "Đang cập nhật"}
        </div>
      </div>
    </div>
  );
};

export default InfoFarmDetails;
