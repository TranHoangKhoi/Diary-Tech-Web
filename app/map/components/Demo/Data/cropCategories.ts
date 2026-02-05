// data/cropCategories.ts
export type CropCategory = {
  id: string;
  name: string;
  icon: string; // tên icon mapbox
  image: string; // ảnh popup / marker
  color: string; // màu polygon
};

export const CROP_CATEGORIES: Record<string, CropCategory> = {
  dau: {
    id: "dau",
    name: "Dâu Hạ Châu",
    icon: "crop-dau",
    image:
      "https://res.cloudinary.com/delix6nht/image/upload/v1770016424/3_t5xsqm.png",
    color: "#FFEB3B",
  },
  "sau-rieng": {
    id: "sau-rieng",
    name: "Sầu riêng",
    icon: "crop-sau-rieng",
    image:
      "https://res.cloudinary.com/delix6nht/image/upload/v1770016424/2_k8ldki.png",
    color: "#8BC34A",
  },
  "mang-cut": {
    id: "mang-cut",
    name: "Măng cụt",
    icon: "crop-mang-cut",
    image:
      "https://res.cloudinary.com/delix6nht/image/upload/v1770016424/1_nj3rgu.png",
    color: "#9C27B0",
  },
  "chom-chom": {
    id: "chom-chom",
    name: "Chôm chôm",
    icon: "crop-chom-chom",
    image:
      "https://res.cloudinary.com/delix6nht/image/upload/v1770023568/5_rt8ego.png",
    color: "#F44336",
  },
  xoai: {
    id: "xoai",
    name: "Xoài",
    icon: "crop-xoai",
    image:
      "https://res.cloudinary.com/delix6nht/image/upload/v1770023567/4_tg7xky.png",
    color: "#FF9800",
  },
};
