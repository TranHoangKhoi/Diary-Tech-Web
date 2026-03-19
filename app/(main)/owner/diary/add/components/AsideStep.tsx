import React from "react";
import { BsClipboardDataFill } from "react-icons/bs";
import { IoCreateSharp } from "react-icons/io5";
import { RiHome9Fill } from "react-icons/ri";
import { SiGitbook, SiHomebridge } from "react-icons/si";

interface Props {
  currentStep: number;
}

const AsideStep = (props: Props) => {
  const { currentStep } = props;
  return (
    <aside className="lg:col-span-1 ">
      <div className="sticky top-24 bottom-4 space-y-8 bg-white shadow drop-shadow-xl px-4 py-4 rounded-2xl">
        <nav className="flex flex-col gap-0">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ring-4 ring-primary/30  ${
                  currentStep >= 1
                    ? "bg-primary text-white"
                    : "bg-white border-2 border-black/20"
                }`}
              >
                <RiHome9Fill
                  className="text-white -translate-y-0.5"
                  size={18}
                />
              </div>
              <div
                className={`w-0.5 h-12  ${
                  currentStep >= 2 ? "bg-primary" : "bg-black/20"
                }`}
              />
            </div>
            <div className="pt-1">
              <p className="text-sm font-bold text-primary">Bước 1</p>
              <p className="text-black font-medium text-sm">Chọn hộ cần thêm</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ring-4   ${
                  currentStep >= 2
                    ? "bg-primary text-white ring-primary/30"
                    : "bg-white border-2 border-black/20 "
                }`}
              >
                <BsClipboardDataFill
                  className={`${
                    currentStep >= 2 ? " text-white" : "text-black/20"
                  }`}
                  size={20}
                />
              </div>
              <div
                className={`w-0.5 h-12  ${
                  currentStep >= 3 ? "bg-primary" : "bg-black/20"
                }`}
              />
            </div>
            <div className="pt-1">
              <p
                className={`text-sm font-bold  ${
                  currentStep >= 2 ? "text-primary" : "text-slate-400"
                }`}
              >
                Bước 2
              </p>
              <p
                className={` font-medium text-sm ${
                  currentStep >= 2 ? "text-black" : "text-slate-500"
                }`}
              >
                Chọn hoạt động
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ring-4   ${
                  currentStep >= 3
                    ? "bg-primary text-white ring-primary/30"
                    : "bg-white border-2 border-black/20 "
                }`}
              >
                <SiGitbook
                  className={`${
                    currentStep >= 3 ? " text-white" : "text-black/20"
                  }`}
                  size={20}
                />
              </div>
              <div
                className={`w-0.5 h-12  ${
                  currentStep >= 3 ? "bg-primary" : "bg-black/20"
                }`}
              />
            </div>
            <div className="pt-1">
              <p
                className={`text-sm font-bold  ${
                  currentStep >= 3 ? "text-primary" : "text-slate-400"
                }`}
              >
                Bước 3
              </p>
              <p
                className={` font-medium text-sm ${
                  currentStep >= 3 ? "text-black" : "text-slate-500"
                }`}
              >
                Chọn cuốn nhật ký
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ring-4   ${
                  currentStep >= 4
                    ? "bg-primary text-white ring-primary/30"
                    : "bg-white border-2 border-black/20 "
                }`}
              >
                <IoCreateSharp
                  className={`${
                    currentStep >= 4 ? " text-white" : "text-black/20"
                  }`}
                  size={20}
                />
              </div>
            </div>
            <div className="pt-1">
              <p
                className={`text-sm font-bold  ${
                  currentStep >= 4 ? "text-primary" : "text-slate-400"
                }`}
              >
                Bước 4
              </p>
              <p
                className={` font-medium text-sm ${
                  currentStep >= 4 ? "text-black" : "text-slate-500"
                }`}
              >
                Nhập thông tin nhật ký
              </p>
            </div>
          </div>
        </nav>
        <div className="p-4 bg-[#ECFDF5] border border-primary/30 rounded-2xl">
          <div className="flex items-start gap-2">
            <span className="flex-1 text-emerald-800 text-sm leading-relaxed flex">
              💡 Mẹo: Việc ghi chép đầy đủ giúp bà con dễ dàng truy xuất nguồn
              gốc và nâng cao giá trị nông sản khi bán.
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AsideStep;
