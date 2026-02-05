"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./customSlide.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Dispatch, SetStateAction } from "react";

interface Post {
  id: number;
  title: string;
  desc: string;
  image: string;
}

const posts = [
  {
    id: 1,
    title: "Công nghệ IOT theo dõi độ ẩm đất",
    desc: "Bộ Nông nghiệp và Môi trường đặt mục tiêu tốc độ tăng trưởng GDP toàn ngành năm 2026 đạt 3,7%, tổng kim ngạch xuất khẩu nông, lâm, thủy sản đạt 73-74 tỷ USD, hướng tới chuyển đổi mô hình tăng trưởng theo hướng xanh, hiện đại và bền vững.",
    image:
      "https://i.pinimg.com/736x/59/13/72/5913726d96427a22d26553c7c07dc41e.jpg",
  },
  {
    id: 2,
    title: "Quy trình bón phân hữu cơ cho lúa ST25",
    desc: "Để hiện thực hóa mục tiêu trên, Bộ đã ban hành kế hoạch hành động triển khai Nghị quyết số 01/NQ-CP và Nghị quyết số 02/NQ-CP của Chính phủ, tập trung cơ cấu lại ngành gắn với đổi mới mô hình tăng trưởng, xây dựng nông thôn mới hiện đại, quản lý hiệu quả tài nguyên và bảo vệ môi trường.",
    image:
      "https://i.pinimg.com/736x/bb/db/6e/bbdb6edfc4dc0d097a43c509ba8eb913.jpg",
  },
  {
    id: 3,
    title: "Drone phun thuốc: Giải pháp tiết kiệm nhân lực.",
    desc: "Bên cạnh chỉ tiêu tăng trưởng, ngành Nông nghiệp và Môi trường phấn đấu giảm tỷ lệ hộ nghèo đa chiều từ 1-1,5%, tối thiểu 15% số xã đạt chuẩn nông thôn mới; 95% chất thải rắn sinh hoạt đô thị được thu gom, xử lý đạt quy chuẩn; 62% hộ dân nông thôn được sử dụng nước sạch. Tỷ lệ che phủ rừng duy trì ổn định ở mức 42,02%.",
    image:
      "https://i.pinimg.com/736x/79/fa/82/79fa82a7bfd7a5dd63ef586c7e1f0a35.jpg",
  },
  {
    id: 4,
    title: "Dự báo giá gạo DBSCL tháng tới",
    desc: "Bộ xác định tái cơ cấu sản xuất và đổi mới mô hình tăng trưởng là trọng tâm xuyên suốt, lấy khoa học - công nghệ, chuyển đổi số và tổ chức lại sản xuất làm động lực. Sản xuất nông, lâm, thủy sản được phát triển theo hướng xanh, tuần hoàn, tích hợp đa giá trị; tổ chức theo vùng chuyên canh, quy mô lớn, gắn với truy xuất nguồn gốc, tiêu chuẩn thị trường và liên kết chuỗi giá trị.",
    image:
      "https://i.pinimg.com/736x/55/f3/fd/55f3fda4c21146c5f140cdaea7593bef.jpg",
  },
  {
    id: 5,
    title: "Hà Nội mùa thu",
    desc: "Song song đó, Bộ tiếp tục hoàn thiện thể chế, đẩy mạnh cải cách thủ tục hành chính, cải thiện môi trường đầu tư kinh doanh; mở rộng thị trường tiêu thụ, tận dụng hiệu quả các FTA; đẩy nhanh giải ngân đầu tư công, ưu tiên hạ tầng phục vụ sản xuất, logistics, chuyển đổi số và chủ động thích ứng với biến đổi khí hậu, bảo đảm phát triển nông nghiệp bền vững, lâu dài.",
    image:
      "https://i.pinimg.com/736x/97/76/37/977637ee94ff37410ca5ce78cb137ad7.jpg",
  },
];

interface Props {
  setIsBeginning: Dispatch<SetStateAction<boolean>>;
  setIsEnd: Dispatch<SetStateAction<boolean>>;
}

const HomePost = (props: Props) => {
  const { setIsBeginning, setIsEnd } = props;
  return (
    <Swiper
      className="home-post-swiper"
      modules={[Navigation, Pagination]}
      navigation={{
        prevEl: ".home-prev",
        nextEl: ".home-next",
      }}
      onSwiper={(swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      }}
      onSlideChange={(swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      }}
      pagination={{
        clickable: true,
        bulletClass:
          "swiper-pagination-bullet w-5 h-1 rounded-full bg-white/40 opacity-100 transition-all duration-300",
        bulletActiveClass:
          "swiper-pagination-bullet-active custom-dot-active bg-primary",
      }}
      spaceBetween={24}
      slidesPerView={4}
      breakpoints={{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
    >
      {posts.map((post) => (
        <SwiperSlide key={post.id}>
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            {/* Image */}
            <div className="relative w-full h-40">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-base line-clamp-1">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {post.desc}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomePost;
