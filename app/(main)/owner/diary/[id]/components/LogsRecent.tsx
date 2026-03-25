import EmptyIcon from "@/assets/icon/empty.png";
import { IActivities } from "@/types/TypeActitvities";
import { IUserProfile } from "@/types/TypeUser";
import Image from "next/image";
import Link from "next/link";
import { usePermissions } from "@/hooks/usePermissions";

interface Props {
  activitiesLog: {
    id: any;
    title: any;
    description: any;
    time: string;
    user: any;
    avatar: any;
  }[];
  activities: IActivities[];
  userProfile: IUserProfile;
}

const LogsRecent = (props: Props) => {
  const { activitiesLog, activities, userProfile } = props;
  const { getDiaryDetailsPath } = usePermissions(userProfile?.role);

  return (
    <div className="bg-white shadow drop-shadow px-4 py-4 pb-10 rounded-xl">
      <p className="text-black text-sm font-medium">Hoạt động gần đây</p>

      {activitiesLog.length > 0 ? (
        <>
          {activitiesLog.map((item, i) => (
            <div key={item.id} className={`relative ${i === 0 && "pt-6"}`}>
              <div key={item.id} className="flex gap-3 relative">
                {i !== activities.length - 1 && (
                  <span className="absolute left-2 top-4 h-full border-l border-dashed border-primary" />
                )}

                <div
                  className={`w-4 h-4 rounded-full mt-1 shrink-0 ring-4 ring-green-100 ${
                    i === 0 ? "bg-primary" : "bg-gray-400"
                  }`}
                />

                <div
                  className={`flex flex-col gap-2 w-full ${
                    i === activitiesLog.length - 1 ? "" : "pb-6"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <img src={item.avatar} className="w-5 h-5 rounded-full" />
                      <span className="text-xs text-gray-400">{item.user}</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-400 rounded-4xl" />
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                  <Link
                    href={getDiaryDetailsPath(item.id)}
                  >
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-semibold text-black">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center pt-8">
          <Image
            src={EmptyIcon}
            alt="logoBittech"
            width={150}
            height={150}
            className="object-contain "
          />
          <p className="text-sm text-black text-center">
            Chưa có hoạt động mới !
          </p>
        </div>
      )}
    </div>
  );
};

export default LogsRecent;
