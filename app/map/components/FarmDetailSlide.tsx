"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Image from "next/image";
import { X } from "lucide-react";
import { FaHistory } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { MdDescription } from "react-icons/md";
import { useEffect, useState } from "react";
import { getMapInfoDetails } from "@/services/map.service";
import { IFarmMapDetails } from "@/types/MapType";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  farmId: string;
  open: boolean;
  onClose: () => void;
}

const FarmDetailSlide = ({ farmId, open, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [farm, setFarm] = useState<IFarmMapDetails>();
  // if (!farm) return null;

  const chartData = {
    labels: farm?.reports?.map((r: any) => r.year),
    datasets: [
      {
        label: "Sản lượng (tấn)",
        data: farm?.reports?.map((r: any) => r.yield),
        backgroundColor: "#4CAF50",
      },
    ],
  };

  useEffect(() => {
    const handleGetFarmDetails = async (farmId: string) => {
      try {
        setLoading(true);
        const res = await getMapInfoDetails(farmId);
        setFarm(res);
        console.log("handleGetFarmDetails: ", res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(true);
      }
    };

    if (farmId) {
      handleGetFarmDetails(farmId);
    }
  }, [farmId]);

  return (
    <div
      className={`absolute top-0 left-0 h-full w-105 bg-white z-50 shadow-xl
  transform transition-transform duration-500 ease-out
  ${open ? "translate-x-20" : "-translate-x-250"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
        <h2 className="font-semibold text-lg">{farm?.name}</h2>
        <button className="cursor-pointer p-2" onClick={() => onClose()}>
          <X size={22} />
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-[calc(100%-56px)] p-4 space-y-5 custom-scroll">
        {/* ===== IMAGE SLIDER ===== */}
        {farm?.images.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            navigation
            autoplay={{ delay: 3000 }}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet w-5 h-1 rounded-full bg-white/40 opacity-100 transition-all duration-300",
              bulletActiveClass:
                "swiper-pagination-bullet-active custom-dot-active bg-primary",
            }}
            className="rounded-lg overflow-hidden"
          >
            {farm?.images?.map((img: string, idx: number) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt=""
                  width={400}
                  height={250}
                  className="w-full h-55 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="">
            <img
              src={farm?.avatar}
              width={400}
              height={250}
              className="w-full h-55 object-cover"
            />
          </div>
        )}

        {/* ===== INFO ===== */}
        <div className="space-y-2">
          <InfoRow label="Chủ hộ" value={farm?.owner} />
          <InfoRow label="SĐT" value={farm?.phone} />
          <InfoRow label="Cây trồng" value={farm?.cropName} />
          <InfoRow label="Mô hình" value={farm?.farmingModel} />
          <InfoRow
            label="Chứng nhận"
            value={
              farm?.certification.length > 0
                ? farm?.certification.join(", ")
                : "Chưa có"
            }
          />
          <InfoRow label="Diện tích" value={`${farm?.area} ha`} />
          <InfoRow label="Vị trí" value={farm?.address} />
          <InfoRow
            label="Trạng thái"
            value={
              farm?.status === "active"
                ? "🟢 Đang hoạt động"
                : farm?.status === "warning"
                ? "🟠 Cảnh báo"
                : "🔴 Ngừng canh tác"
            }
          />
        </div>

        <div className="border-b w-full border-gray-300"></div>

        {/* <div>
          <h3 className="font-semibold mb-2 flex gap-2 items-center text-sm">
            <FaHistory size={14} className="text-black" />
            Lịch sử mùa vụ
          </h3>

          <ul className="text-sm">
            {farm?.seasons.map((s: any, idx: number) => {
              const isLast = idx === farm?.seasons.length - 1;

              return (
                <li
                  key={idx}
                  className={`flex justify-between py-2 ${
                    !isLast ? "border-b border-gray-200" : ""
                  }`}
                >
                  <span>
                    {s.season} {s.year}
                  </span>
                  <span className="font-medium">{s.result}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-b w-full border-gray-300"></div> */}

        {/* ===== CHART ===== */}
        <div>
          <h3 className="font-semibold mb-2 flex gap-2 items-center text-sm">
            <SiGoogleanalytics size={14} className="text-black" />
            Báo cáo sản lượng
          </h3>
          {farm?.reports?.length > 0 ? (
            <Bar data={chartData} />
          ) : (
            <div className="py-3">
              <p className="text-sm text-black">
                Chưa có thông tin sản lượng ...
              </p>
            </div>
          )}
        </div>

        <div className="border-b w-full border-gray-300"></div>

        {/* ===== DESCRIPTION ===== */}
        <div>
          <h3 className="font-semibold mb-2 flex gap-2 items-center text-sm">
            <MdDescription size={14} className="text-black" />
            Mô tả
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {farm?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default FarmDetailSlide;
