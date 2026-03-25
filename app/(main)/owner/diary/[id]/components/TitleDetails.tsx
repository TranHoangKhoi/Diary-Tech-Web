import { appRoute } from "@/configs/appRoute";
import { IProductionLog } from "@/types/TypeDiary";
import { formatDate } from "@/utils/helper";
import Link from "next/link";
import React from "react";
import { FaRegCalendar } from "react-icons/fa6";
import { MdOutlineAddCircle } from "react-icons/md";
import Can from "@/components/Can";

interface Props {
  diaryData: IProductionLog;
  linkAdd?: string;
}

const TitleDetails = (props: Props) => {
  const { diaryData, linkAdd } = props;
  return (
    <div className="pt-4 flex flex-1 justify-between items-end">
      <div className="">
        <h2 className="text-2xl text-black font-bold">
          {diaryData?.activity_id?.activity_name}
        </h2>
        <div className="flex items-center gap-2 pt-2">
          <FaRegCalendar className="text-black" size={14} />
          <span className="text-black text-sm">
            Ngày {formatDate(diaryData?.date)}
          </span>
        </div>
      </div>
      <div className="">
        {/* <Can action="canAddNewActivity"> */}
        <Link
          href={linkAdd ? linkAdd : appRoute.addDiary}
          className="bg-primary px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer hover:opacity-70"
        >
          <MdOutlineAddCircle className="text-white" size={14} />
          <span className="text-sm font-medium text-white">
            Thêm hoạt động mới
          </span>
        </Link>
        {/* </Can> */}
      </div>
    </div>
  );
};

export default TitleDetails;
