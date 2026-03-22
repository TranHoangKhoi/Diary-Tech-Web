export interface IWardDetail {
  id: string;
  name: string;
  description: string;
  history: string;
  geography: string;
  economy: string;
  highlights: string[];
  images: string[];
  area: string;
  population: string;
}

export const WARD_FAKE_DATA: IWardDetail[] = [
  {
    id: "nhon-ai",
    name: "Nhơn Ái",
    description:
      "Nhơn Ái là một xã thuộc huyện Phong Điền, thành phố Cần Thơ, Việt Nam.",
    history:
      "Xã Nhơn Ái có lịch sử hình thành lâu đời, gắn liền với quá trình khai hoang mở cõi của vùng đất lúa gạo Cần Thơ.",
    geography:
      "Nằm ở trung tâm huyện Phong Điền, có hệ thống sông ngòi chằng chịt, thuận lợi cho phát triển kinh tế vườn.",
    economy:
      "Chủ yếu là sản xuất nông nghiệp, đặc biệt là cây ăn trái đặc sản như dâu hạ châu, vú sữa.",
    highlights: [
      "Vườn dâu Hạ Châu",
      "Du lịch sinh thái miệt vườn",
      "Lễ hội văn hóa địa phương",
    ],
    images: [
      "https://btgdv.cantho.gov.vn/uploads/news/2022_02/1.1.jpg",
      "https://admin.vov.gov.vn/UploadFolder/KhoTin/Images/UploadFolder/VOVVN/Images/sites/default/files/styles/large_watermark/public/2024-01/xa_nhon_ai_huyen_phong_dien_phan_dau_dat_cac_tieu_chi_nong_thon_moi_kieu_mau.jpg",
      "https://admin.vov.gov.vn/UploadFolder/KhoTin/Images/UploadFolder/VOVVN/Images/sites/default/files/styles/large_watermark/public/2024-01/nam_nay_tet_quan_dan_duoc_to_chuc_tai_huyen_phong_dien.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5fvSsLogMo-73uwDa7GCjMrtG9Kgxp_gUxA&s",
    ],
    area: "15.6 km²",
    population: "12,500 người",
  },
  {
    id: "truong-long",
    name: "Trường Long",
    description:
      "Trường Long là một xã vùng ven của huyện Phong Điền, nổi tiếng với những vườn cây ăn trái sum suê.",
    history:
      "Trước đây là vùng đất hoang sơ, qua bàn tay cải tạo của người dân đã trở thành vùng quê trù phú.",
    geography:
      "Giáp ranh với tỉnh Hậu Giang, địa hình bằng phẳng, đất đai màu mỡ.",
    economy: "Phát triển mạnh về cây ăn trái và chăn nuôi gia súc, gia cầm.",
    highlights: [
      "Cánh đồng lúa vàng",
      "Khu di tích lịch sử",
      "Trại nuôi ong lấy mật",
    ],
    images: [
      "https://static-images.vnncdn.net/files/publish/2024/3/2/w-anhminhhoa-373.png?width=0&s=lZkfpgbUdmRqxuaeo0i-vA",
      "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/11/22/1270678/Cau-Dia-Muong.jpg",
      "https://baocantho.com.vn/image/fckeditor/upload/2024/20240304/images/33.webp",
    ],
    area: "20.1 km²",
    population: "14,200 người",
  },
  {
    id: "my-khanh",
    name: "Mỹ Khánh",
    description:
      "Mỹ Khánh là trung tâm du lịch của huyện Phong Điền, nơi tập trung nhiều khu du lịch sinh thái lớn.",
    history:
      "Được mệnh danh là 'Đà Lạt của Cần Thơ' nhờ khí hậu mát mẻ và nhiều vườn hoa, kiểng.",
    geography:
      "Nằm dọc theo sông Cần Thơ, rất thuận lợi cho giao thương và du lịch đường thủy.",
    economy: "Dịch vụ và du lịch chiếm tỉ trọng lớn trong cơ cấu kinh tế.",
    highlights: [
      "Khu du lịch Mỹ Khánh",
      "Thiền viện Trúc Lâm Phương Nam",
      "Làng hoa kiểng",
    ],
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Khu_du_l%E1%BB%8Bch_M%E1%BB%B9_Kh%C3%A1nh.jpg/1280px-Khu_du_l%E1%BB%8Bch_M%E1%BB%B9_Kh%C3%A1nh.jpg",
      "https://dantocmiennui-media.baotintuc.vn/images/63f0370496e118f98568934074d968cbf11d0a448ae7872fb2c13ebae95126640cc224c8a5a4abeb213feaff0087b3602be1f61e9cf39995f40074ca9ac06df28e5a5bc638566df8585eeb29f2e8a9ee2b299b36d023b9305eaefef0046cdfe7f7e96df1099c647860b6ac4f23ee40b797983469ff792ca3b89f9066ccd92c2a/potal_san_pham_du_lich_dau_tien_o_dong_bang_song_cuu_long_duoc_gan_ocop_4_sao_7144174.jpg",
      "https://images.baodantoc.vn/uploads/2022/Th%C3%A1ng%203/Ng%C3%A0y%208/Anh/SB3440-4.jpg",
    ],
    area: "10.5 km²",
    population: "18,000 người",
  },
  {
    id: "nhon-nghia",
    name: "Nhơn Nghĩa",
    description:
      "Nhơn Nghĩa giáp ranh với quận Cái Răng, là cửa ngõ quan trọng của huyện Phong Điền.",
    history:
      "Vùng đất có truyền thống cách mạng kiên cường trong các cuộc kháng chiến.",
    geography: "Nằm ở phía Đông Nam của huyện, có quốc lộ 61B đi ngang qua.",
    economy: "Kết hợp giữa nông nghiệp công nghệ cao và tiểu thủ công nghiệp.",
    highlights: [
      "Vườn cây ăn trái hữu cơ",
      "Nghề đan lát truyền thống",
      "Khu công nghiệp nhẹ",
    ],
    images: [
      "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/7/25/1072871/1.jpg",
      "https://acccantho.vn/wp-content/uploads/2024/07/Xa-Nhon-Nghia-711x400.png",
      "https://luatquanghuy.vn/wp-content/uploads/cong-an-xa-nhon-nghia-huyen-phong-dien-image-01.jpg",
    ],
    area: "18.3 km²",
    population: "13,800 người",
  },
  {
    id: "giai-xuan",
    name: "Giai Xuân",
    description:
      "Giai Xuân là một xã trù phú với các vườn cam, quýt và bưởi da xanh nổi tiếng.",
    history:
      "Tên gọi Giai Xuân mang ý nghĩa là vùng đất luôn tươi đẹp như mùa xuân.",
    geography: "Giáp với quận Bình Thủy, có nhiều kênh rạch thông thoáng.",
    economy:
      "Kinh tế vườn là chủ đạo, đang chuyển dịch sang hình thức trang trại.",
    highlights: [
      "Vườn bưởi da xanh",
      "Hợp tác xã nông nghiệp kiểu mới",
      "Cầu Giai Xuân",
    ],
    images: [
      "https://i.ex-cdn.com/mientay.giadinhonline.vn/files/content/2022/01/05/_mg_9687-1959.jpg",
      "https://i.ex-cdn.com/mientay.giadinhonline.vn/files/content/2022/01/05/_mg_9695-2000.jpg",
      "https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2025/6/10/img8646-1749536662073620929709-91-0-1483-2227-crop-1749536815521574395066.jpeg",
    ],
    area: "14.2 km²",
    population: "11,500 người",
  },
  {
    id: "tan-thoi",
    name: "Tân Thới",
    description:
      "Tân Thới là vùng đất mới đang phát triển mạnh mẽ về hạ tầng và đô thị hóa.",
    history:
      "Được tách ra và thành lập dựa trên tiềm năng phát triển kinh tế của khu vực.",
    geography: "Nằm ở phía Tây của huyện, giáp với huyện Thới Lai.",
    economy: "Phát triển đa dạng từ trồng lúa, màu đến dịch vụ thương mại.",
    highlights: [
      "Cánh đồng mẫu lớn",
      "Chợ truyền thống Tân Thới",
      "Trung tâm hành chính mới",
    ],
    images: [
      "https://bna.1cdn.vn/2025/06/29/static.vinwonders.com-production-_gioi-thieu-ha-tinh.jpg",
      "https://media.vov.vn/sites/default/files/styles/large/public/2025-04/thanh_pho_cao_bang_du_kien_se_thanh_lap_thanh_3_phuong_moi.jpg",
      "https://resource.kinhtedothi.vn/resources2025/1/users/49/img-5079-1750995000.jpeg",
      "https://cdnmedia.baotintuc.vn/Upload/DmtgOUlHWBO5POIHzIwr1A/files/2022/03/08/nong-thon-kieu-mau-08032022.jpg",
    ],
    area: "16.8 km²",
    population: "10,900 người",
  },
  {
    id: "phong-dien",
    name: "Phong Điền",
    description:
      "Thị trấn Phong Điền là trung tâm hành chính, kinh tế và văn hóa của toàn huyện.",
    history:
      "Nơi hình thành chợ nổi Phong Điền sầm uất nổi tiếng khắp vùng đồng bằng sông Cửu Long.",
    geography: "Nằm tại ngã ba sông, vị trí chiến lược về giao thông thủy bộ.",
    economy:
      "Thương mại, dịch vụ phát triển mạnh, là đầu mối tiêu thụ nông sản.",
    highlights: [
      "Chợ nổi Phong Điền",
      "Công viên huyện Phong Điền",
      "Phố đi bộ đêm",
    ],
    images: [
      "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/4/5/1030914/Can-Tho-4.JPG",
      "https://dntt.mediacdn.vn/197608888129458176/2022/6/18/anh-01-1655518819279798092730.jpg",
      "https://statics.vinpearl.com/cho-noi-phong-dien-3_1632108580.jpg",
    ],
    area: "2.5 km²",
    population: "9,500 người",
  },
];
