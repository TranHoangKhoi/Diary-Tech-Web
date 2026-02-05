import React from "react";

const HomeSlide = () => {
  return (
    <div className="container mx-auto">
      <div className="w-full h-125 overflow-hidden rounded-2xl relative">
        <video
          src="https://res.cloudinary.com/delix6nht/video/upload/v1770301679/13505202-uhd_2560_1440_30fps_bsfkuq.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/40">
          <div className="flex w-165 h-full justify-end items-start px-8 py-8 flex-col gap-6">
            <div className="">
              <h1 className="text-6xl font-bold text-white">
                Số hóa hành trình nông nghiệp của bạn
              </h1>
            </div>
            <div className="">
              <span className="text-white">
                Ghi chép thông tin canh tác, quan sát bản đồ phân bố hộ nông
                nghiệp một cách dễ dàng và chuyên nghiệp nhất dành cho nông dân
                Việt.
              </span>
            </div>
            <div className="flex flex-row gap-4">
              <button className="bg-primary w-38 h-11 rounded-lg shadow-2xl hover:opacity-80 cursor-pointer">
                <span className="text-white font-medium text-sm">
                  Bắt đầu ngay
                </span>
              </button>
              <button className="w-38 h-11 rounded-lg drop-shadow-2xl  bg-white/20 backdrop-blur-md cursor-pointer hover:opacity-80">
                <span className="text-white font-medium text-sm">
                  Xem hướng dẫn
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlide;
