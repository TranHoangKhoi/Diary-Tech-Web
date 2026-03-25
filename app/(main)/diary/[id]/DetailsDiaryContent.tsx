"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import { useEffect, useState } from "react";
import { FaBookBookmark } from "react-icons/fa6";
import { MdLocalActivity } from "react-icons/md";
import { PiWarningCircleBold } from "react-icons/pi";
import { SiGoogleanalytics } from "react-icons/si";

import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

import { getActivitiesByFarmTypeId } from "@/services/activities.service";
import {
  getDetailsProdutionLogs,
  getProductionLogsRecent,
} from "@/services/diary.service";
import { IActivities } from "@/types/TypeActitvities";
import { IProductionLog } from "@/types/TypeDiary";
import { useParams } from "next/navigation";
import ActivitiesRecent from "../../owner/diary/[id]/components/ActivitiesRecent";
import DiaryDetailsCPT from "../../owner/diary/[id]/components/DiaryDetailsCPT";
import LogsRecent from "../../owner/diary/[id]/components/LogsRecent";
import TitleDetails from "../../owner/diary/[id]/components/TitleDetails";
import UserCreate from "../../owner/diary/[id]/components/UserCreate";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface Props {}

const SkeletonDiaryDetail = () => {
  return (
    <div className="bg-white shadow drop-shadow px-4 py-4 rounded-xl animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-primary/60 rounded"></div>
        <div className="w-40 h-5 bg-primary/60 rounded"></div>
      </div>

      <div className="pt-4 divide-y divide-gray-200">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="grid grid-cols-12 py-4 gap-3">
            <div className="col-span-4 h-4 bg-primary/60 rounded w-3/4"></div>

            <div className="col-span-8 space-y-2">
              <div className="h-4 bg-primary/60 rounded"></div>
              <div className="h-4 bg-primary/60 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkeletonRecentActivities = () => {
  return (
    <div className="bg-white shadow drop-shadow px-4 py-4 rounded-xl animate-pulse">
      <div className="w-40 h-4 bg-primary/60 rounded"></div>

      <div className="pt-6 space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-4 h-4 rounded-full bg-primary/60 shrink-0 mt-1"></div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-primary/60 rounded-full"></div>
                <div className="w-24 h-3 bg-primary/60 rounded"></div>
                <div className="w-16 h-3 bg-primary/60 rounded"></div>
              </div>

              <div className="h-4 bg-primary/60 rounded w-2/3"></div>
              <div className="h-3 bg-primary/60 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DetailsDiaryContent = (props: Props) => {
  const userProfile = useSelector(
    (state: RootState) => state.userProfile.profile,
  );

  const params = useParams();
  const idDiary = Array.isArray(params.id) ? params.id[0] : params.id;

  const isImage = (url: string) => /\.(jpg|jpeg|png|webp|gif)$/i.test(url);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingRecent, setLoadingRecent] = useState<boolean>(false);
  const [loadingActivities, setLoadingActivities] = useState<boolean>(false);
  const [diaryData, setDiaryData] = useState<IProductionLog>(undefined);
  const [logRecent, setLogRecent] = useState<IProductionLog[]>([]);
  const [activities, setActivities] = useState<IActivities[]>([]);

  const formatRecentActivities = (logs: any[]) => {
    return logs.map((item) => {
      const desNote = `Hoạt động ${item.activity_id?.activity_name} đã được cập nhật vào ngày ${new Date(
        item.created_at,
      ).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`;

      const description = item.notes || desNote;

      return {
        id: item._id,
        title: item.activity_id?.activity_name,
        description: description,
        time: new Date(item.created_at).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        user: item.created_by?.name,
        avatar: item.created_by?.avatar,
      };
    });
  };

  const activitiesLog = formatRecentActivities(logRecent);

  useEffect(() => {
    const getDetailsLogs = async () => {
      try {
        setLoading(true);
        const res = await getDetailsProdutionLogs(idDiary);

        setDiaryData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getDetailsLogs();
  }, [idDiary]);

  useEffect(() => {
    if (diaryData?.farm_id?._id) {
      const getLogsRecent = async () => {
        try {
          setLoadingRecent(true);
          const resDiaryRecent = await getProductionLogsRecent(
            diaryData?.farm_id?._id,
            3,
            idDiary,
          );
          setLogRecent(resDiaryRecent.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingRecent(false);
        }
      };

      getLogsRecent();
    }

    if (diaryData?.activity_id?.farm_type_id) {
      const handleGetActivities = async () => {
        try {
          setLoadingActivities(true);
          const resActivities = await getActivitiesByFarmTypeId(
            diaryData?.activity_id?.farm_type_id?._id,
          );
          setActivities(resActivities);
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingActivities(false);
        }
      };

      handleGetActivities();
    }
  }, [diaryData]);

  return (
    <div>
      <div className="container mx-auto">
        <div className="">
          <Breadcrumbs />
        </div>
        <TitleDetails diaryData={diaryData} />

        <div className="grid grid-cols-12 gap-6 py-7">
          <div className="col-span-8 flex flex-col gap-6">
            {/* Thông tin chung của nhật ký điện tử */}

            <div className="bg-white shadow drop-shadow px-4 py-4 rounded-xl">
              <div className="flex items-center gap-2">
                <PiWarningCircleBold className="text-black" size={22} />
                <p className="text-black text-lg font-medium">
                  Thông tin chung
                </p>
              </div>
              <div className="pt-3 grid grid-cols-3 gap-8">
                <div className="flex flex-col gap-2 col-span-1">
                  <div className="flex items-center gap-2">
                    <FaBookBookmark className="text-gray-500" size={12} />
                    <span className="text-sm font-medium text-gray-500">
                      Cuốn nhật ký
                    </span>
                  </div>
                  <div className="text-black text-sm">
                    {diaryData?.book_id?.name}
                  </div>
                </div>
                <div className="flex flex-col gap-2 col-span-1">
                  <div className="flex items-center gap-2">
                    <MdLocalActivity className="text-gray-500" size={12} />
                    <span className="text-sm font-medium text-gray-500">
                      Hoạt động
                    </span>
                  </div>
                  <div className="text-black text-sm">
                    {diaryData?.activity_id?.activity_name}
                  </div>
                </div>
                <div className="flex flex-col gap-2 col-span-1">
                  <div className="flex items-center gap-2">
                    <SiGoogleanalytics className="text-gray-500" size={12} />
                    <span className="text-sm font-medium text-gray-500">
                      Diện tích
                    </span>
                  </div>
                  <div className="text-black text-sm">
                    {diaryData?.farm_id?.area
                      ? diaryData?.farm_id?.area
                      : "Đang cập nhật"}
                  </div>
                </div>
              </div>
            </div>

            {/* Chi tiết nhật ký */}

            {loading ? (
              <SkeletonDiaryDetail />
            ) : (
              <DiaryDetailsCPT
                diaryData={diaryData}
                setImages={setImages}
                setIndex={setIndex}
                setOpen={setOpen}
                isImage={isImage}
              />
            )}
          </div>

          <div className="col-span-4 flex gap-6 flex-col">
            {/* User Create Diary */}
            <UserCreate diaryData={diaryData} />

            {/* Hoạt động gần đây */}
            {loadingRecent ? (
              <SkeletonRecentActivities />
            ) : (
              <LogsRecent
                activitiesLog={activitiesLog}
                activities={activities}
                userProfile={userProfile}
              />
            )}

            {/* Hoạt động liên quan */}
            {loadingActivities ? (
              <SkeletonRecentActivities />
            ) : (
              <ActivitiesRecent activities={activities} />
            )}
          </div>
        </div>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((src) => ({ src }))}
        plugins={[Zoom, Thumbnails]}
        /* ✅ QUAN TRỌNG — sync index khi swipe */
        on={{
          view: ({ index }) => setIndex(index),
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          wheelZoomDistanceFactor: 200,
        }}
        carousel={{
          preload: 3,
        }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
        }}
        styles={{
          container: {
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 99999999999,
          },
        }}
        render={{
          /* ===== CLOSE BUTTON ===== */
          buttonClose: () => (
            <button
              onClick={() => setOpen(false)}
              className="
          absolute top-5 right-5
          bg-black/50 hover:bg-black
          text-white
          w-10 h-10
          rounded-full
          flex items-center justify-center
          text-xl
          backdrop-blur
          z-50
        "
            >
              ✕
            </button>
          ),

          /* ===== IMAGE COUNTER ===== */
          slideFooter: () => (
            <div
              className="
          absolute bottom-6 left-1/2
          -translate-x-1/2
          bg-black/50
          text-white
          px-4 py-1
          rounded-full
          text-sm
          backdrop-blur
        "
            >
              {index + 1} / {images.length}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default DetailsDiaryContent;
