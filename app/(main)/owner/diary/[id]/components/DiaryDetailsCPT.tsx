import { IProductionLog } from "@/types/TypeDiary";
import React, { Dispatch, SetStateAction } from "react";
import { MdEventNote } from "react-icons/md";

interface Props {
  diaryData: IProductionLog;
  setImages: Dispatch<SetStateAction<string[]>>;
  setIndex: Dispatch<SetStateAction<number>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isImage: (url: string) => boolean;
}

const DiaryDetailsCPT = (props: Props) => {
  const { diaryData, setImages, setIndex, setOpen, isImage } = props;
  const cultivationDetail = diaryData?.data || {};

  return (
    <div className="bg-white shadow drop-shadow px-4 py-4 rounded-xl">
      <div className="flex items-center gap-2">
        <MdEventNote className="text-black" size={22} />
        <p className="text-black text-lg font-medium">Chi tiết canh tác</p>
      </div>

      <div className="pt-4 divide-y divide-gray-200">
        {Object.entries(cultivationDetail).map(([key, value]) => (
          <div key={key} className="grid grid-cols-12 py-4 items-start gap-3">
            {/* Label */}
            <div className="col-span-4 text-gray-500 text-sm font-medium">
              {key}
            </div>

            {/* Value */}
            <div className="col-span-8 text-black text-sm leading-relaxed">
              {/* ===== MULTIPLE IMAGE ===== */}
              {Array.isArray(value) ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {value.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="relative group cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => {
                        setImages(value);
                        setIndex(imgIndex);
                        setOpen(true);
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full aspect-4/3 object-cover transition duration-300 group-hover:scale-110"
                      />

                      {/* overlay */}
                      <div
                        className="
        absolute inset-0
        bg-black/0
        group-hover:bg-black/30
        transition
        flex items-center justify-center
      "
                      >
                        <span
                          className="
          opacity-0
          group-hover:opacity-100
          text-white text-xl
          transition
        "
                        >
                          🔍
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : isImage(value) ? (
                <img
                  src={value}
                  alt={key}
                  onClick={() => {
                    setImages([value]);
                    setIndex(0);
                    setOpen(true);
                  }}
                  className="cursor-pointer w-full max-h-60 object-cover rounded-lg border border-gray-200 hover:scale-105 transition"
                />
              ) : (
                <p>{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryDetailsCPT;
