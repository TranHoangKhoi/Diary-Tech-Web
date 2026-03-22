"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";
import { X } from "lucide-react";
import { MdDescription, MdHistory, MdMap, MdTrendingUp } from "react-icons/md";
import { WARD_FAKE_DATA } from "./Demo/wardDetails";

interface Props {
  wardName: string;
  open: boolean;
  onClose: () => void;
}

const WardDetailSlide = ({ wardName, open, onClose }: Props) => {
  const ward = WARD_FAKE_DATA.find(
    (w) =>
      w.name.toLowerCase().replace(/\s/g, "") ===
      wardName.toLowerCase().replace(/\s/g, "")
  );

  if (!ward && open) {
    return (
      <div
        className={`absolute top-0 left-0 h-full w-105 bg-white z-50 shadow-xl
    transform transition-transform duration-500 ease-out flex items-center justify-center
    ${open ? "translate-x-20" : "-translate-x-250"}`}
      >
        <div className="text-center">
          <p className="text-gray-500">Không tìm thấy thông tin cho {wardName}</p>
          <button className="mt-4 text-primary font-medium" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`absolute top-0 left-0 h-full w-105 bg-white z-50 shadow-xl
  transform transition-transform duration-500 ease-out
  ${open ? "translate-x-20" : "-translate-x-250"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
        <h2 className="font-semibold text-lg">Thông tin {ward?.name}</h2>
        <button className="cursor-pointer p-2" onClick={onClose}>
          <X size={22} />
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-[calc(100%-56px)] p-4 space-y-5 custom-scroll">
        {/* ===== IMAGE SLIDER ===== */}
        {ward?.images && ward.images.length > 0 && (
          <Swiper
            modules={[Pagination, Autoplay]}
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
            {ward.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={ward.name}
                  className="w-full h-55 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* ===== QUICK INFO ===== */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500 uppercase font-bold">Diện tích</p>
            <p className="text-lg font-semibold text-primary">{ward?.area}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500 uppercase font-bold">Dân số</p>
            <p className="text-lg font-semibold text-primary">{ward?.population}</p>
          </div>
        </div>

        {/* ===== DESCRIPTION ===== */}
        <div>
          <h3 className="font-semibold mb-2 flex gap-2 items-center text-sm">
            <MdDescription size={14} className="text-primary" />
            Giới thiệu
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed italic">
            "{ward?.description}"
          </p>
        </div>

        <div className="border-b w-full border-gray-100"></div>

        {/* ===== HISTORY ===== */}
        <div>
          <h3 className="font-semibold mb-2 flex gap-2 items-center text-sm">
            <MdHistory size={14} className="text-primary" />
            Lịch sử hình thành
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {ward?.history}
          </p>
        </div>

        <div className="border-b w-full border-gray-100"></div>

        {/* ===== GEOGRAPHY ===== */}
        <div>
          <h3 className="font-semibold mb-2 flex gap-2 items-center text-sm">
            <MdMap size={14} className="text-primary" />
            Vị trí địa lý
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {ward?.geography}
          </p>
        </div>

        <div className="border-b w-full border-gray-100"></div>

        {/* ===== ECONOMY ===== */}
        <div>
          <h3 className="font-semibold mb-2 flex gap-2 items-center text-sm">
            <MdTrendingUp size={14} className="text-primary" />
            Phát triển kinh tế
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {ward?.economy}
          </p>
        </div>

        {/* ===== HIGHLIGHTS ===== */}
        <div>
          <h3 className="font-semibold mb-2 text-sm">Điểm nổi bật</h3>
          <div className="flex flex-wrap gap-2">
            {ward?.highlights.map((h, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardDetailSlide;
