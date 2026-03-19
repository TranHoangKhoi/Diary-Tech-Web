import { appRoute } from "@/configs/appRoute";
import { IActivities } from "@/types/TypeActitvities";
import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

interface Props {
  activities: IActivities[];
}

const ActivitiesRecent = (props: Props) => {
  const { activities } = props;
  return (
    <div className="bg-white shadow drop-shadow px-4 py-4 rounded-xl">
      <p className="text-black text-sm font-medium">Hoạt động liên quan</p>

      <div className="pt-6 relative flex flex-col gap-5">
        {activities?.map((item, index) => (
          <Link
            href={`${appRoute.addDiary}?addId=${item?._id}`}
            key={index}
            className="flex items-center justify-between gap-2"
            title={`Thêm nhật ký hoạt động của ${item.activity_name}`}
          >
            <div className="flex items-center gap-2 flex-1">
              <img
                src={item?.image}
                className="w-14 h-10 object-center rounded shadow drop-shadow-2xl"
              />
              <span className="text-sm text-black line-clamp-2">
                {item?.activity_name}
              </span>
            </div>
            <div className="">
              <IoIosArrowForward className="text-black" size={14} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesRecent;
