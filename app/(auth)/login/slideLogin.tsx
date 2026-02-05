"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "./customSlide.css";
import "swiper/css/pagination";
import { LogoWeb } from "@/configs/appInfo";

const slides = [
  {
    image: "/assets/ImageApp/login.jpg",
    title: "Số hóa Nông nghiệp",
    desc: "Chuyển đổi mô hình quản lý từ truyền thống sang nền tảng số thông minh. Dễ dàng, chính xác và hiệu quả.",
  },
  {
    image: "/assets/ImageApp/map.jpg",
    title: "Quản lý trực quan trên Bản Đồ Số.",
    desc: "Giám sát diện tích, vị trí và tình trạng canh tác theo thời gian thực trên nền tảng bản đồ chuyên sâu.",
  },
  {
    image: "/assets/ImageApp/nn.jpg",
    title: "Minh bạch nguồn gốc",
    desc: "Loại bỏ sổ ghi chép tay. Số hóa mọi công đoạn sản xuất, sẵn sàng cho các chứng chỉ VietGAP, GlobalGAP.",
  },
];

export default function SlideLogin() {
  return (
    <div className="relative w-full h-dvh">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet w-5 h-1 rounded-full bg-white/40 opacity-100 transition-all duration-300",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-dot-active bg-primary",
        }}
        className="w-full h-dvh"
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full ">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* text */}
              <div className="absolute bottom-16 left-6  flex flex-col items-start text-white text-center px-6">
                <div className="bg-background px-5 py-2 rounded-lg">
                  <Image
                    src={LogoWeb.LogoHorizontalGreen}
                    alt="logoBittech"
                    width={100}
                    height={33}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-3xl font-bold my-2">{item.title}</h2>
                <p className="text opacity-90 text-left">{item.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
