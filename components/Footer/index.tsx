import { LogoWeb } from "@/configs/appInfo";
import { appRoute } from "@/configs/appRoute";
import Image from "next/image";
import Link from "next/link";
import { BiSolidHelpCircle } from "react-icons/bi";
import { BsCollectionPlayFill } from "react-icons/bs";
import { IoIosMail, IoMdChatboxes, IoMdSend } from "react-icons/io";
import { IoCallSharp, IoLocationSharp, IoMedalSharp } from "react-icons/io5";
import {
  MdGroupAdd,
  MdLocationOn,
  MdOutlineKeyboardArrowRight,
  MdTipsAndUpdates,
} from "react-icons/md";
import { PiChatCenteredTextFill, PiSealWarningFill } from "react-icons/pi";

const Footer = () => {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 gap-10">
          <div className="col-span-1">
            <div className="h-14">
              <Image
                src={LogoWeb.LogoHorizontalGreen}
                alt="logoBittech"
                width={120}
                height={50}
                className="object-contain"
              />
            </div>
            <div className="gap-8 flex flex-col">
              <p className="text-black text-sm">
                Kiến tạo tương lai nông nghiệp số thông minh qua hệ thống nhật
                ký điện tử và bản đồ số toàn diện. Đồng hành cùng bà con nông
                dân trên từng thửa ruộng.
              </p>
              <div className="flex gap-4">
                <div
                  className="bg-black/20 w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 cursor-pointer"
                  title="Thành tựu"
                >
                  <IoMedalSharp className="text-black" size={18} />
                </div>
                <div
                  className="bg-black/20 w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 cursor-pointer"
                  title="Xem Video"
                >
                  <BsCollectionPlayFill className="text-black" size={18} />
                </div>
                <div
                  className="bg-black/20 w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 cursor-pointer"
                  title="Liên hệ với chúng tôi"
                >
                  <PiChatCenteredTextFill className="text-black" size={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <div className="w-1 h-5 bg-primary rounded" />
              <h2 className="text-lg font-bold text-black">Liên kết nhanh</h2>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href={appRoute.home}
                className="flex gap-1 items-center"
                title="Trang chủ"
              >
                <MdOutlineKeyboardArrowRight
                  className="text-black translate-y-px"
                  size={16}
                />
                <p className="text-black text-sm ">Trang chủ</p>
              </Link>
              <Link
                href={appRoute.diary}
                className="flex gap-1 items-center"
                title="Theo dõi nhật ký canh tác"
              >
                <MdOutlineKeyboardArrowRight
                  className="text-black translate-y-px"
                  size={16}
                />
                <p className="text-black text-sm ">Nhật ký canh tác</p>
              </Link>
              <Link
                href={appRoute.map}
                className="flex gap-1 items-center"
                title="Quan sát bản đồ nông nghiệp trên nền tảng số hóa"
              >
                <MdOutlineKeyboardArrowRight
                  className="text-black translate-y-px"
                  size={16}
                />
                <p className="text-black text-sm ">Bản đồ số</p>
              </Link>
              <Link href={appRoute.home} className="flex gap-1 items-center">
                <MdOutlineKeyboardArrowRight
                  className="text-black translate-y-px"
                  size={16}
                />
                <p className="text-black text-sm ">Báo cáo thống kê</p>
              </Link>
              <div className="flex gap-1 items-center">
                <MdOutlineKeyboardArrowRight
                  className="text-black translate-y-px"
                  size={16}
                />
                <p className="text-black text-sm ">Dự báo thời tiết</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <div className="w-1 h-5 bg-primary rounded" />
              <h2 className="text-lg font-bold text-black">Hỗ trợ bà con</h2>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 items-center">
                <BiSolidHelpCircle
                  className="text-black translate-y-px"
                  size={16}
                />
                <p className="text-black text-sm ">Hướng dẫn sử dụng</p>
              </div>
              <div className="flex gap-4 items-center">
                <IoMdChatboxes
                  className="text-black translate-y-px"
                  size={16}
                />
                <p className="text-black text-sm ">Hỏi đáp chuyên gia</p>
              </div>
              <div className="flex gap-4 items-center">
                <PiSealWarningFill
                  className="text-black translate-y-px"
                  size={16}
                />
                <p className="text-black text-sm ">Cộng đồng cảnh báo</p>
              </div>
              <div className="flex gap-4 items-center">
                <MdTipsAndUpdates
                  className="text-black translate-y-px"
                  size={16}
                />
                <p className="text-black text-sm ">Cẩm nang công nghệ</p>
              </div>
              <div className="flex gap-4 items-center">
                <MdGroupAdd className="text-black translate-y-px" size={16} />
                <p className="text-black text-sm ">Gia nhập hợp tác xã</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <div className="w-1 h-5 bg-primary rounded" />
              <h2 className="text-lg font-bold text-black">Liên hệ</h2>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 items-start">
                <div className="">
                  <IoLocationSharp
                    className="text-primary translate-y-1"
                    size={16}
                  />
                </div>
                <p className="text-black text-sm ">
                  Số C9-13 đường số 15, Khu vực 4, Phường Vị Thanh, Thành phố
                  Cần Thơ, Việt Nam.
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <IoCallSharp
                  className="text-primary translate-y-px"
                  size={16}
                />
                <p className="text-black text-sm ">0974 821 032</p>
              </div>
              <div className="flex gap-4 items-center">
                <IoIosMail className="text-primary translate-y-px" size={16} />
                <p className="text-black text-sm ">
                  Contact.bittechx@gmail.com
                </p>
              </div>
            </div>
            <div className="border-t border-grey w-full h-1" />
            <div className="flex flex-col gap-3">
              <div className="">
                <h2 className="text-black font-medium">Yêu cầu liên hệ</h2>
              </div>
              <div className="relative w-full border border-grey h-9 rounded-lg overflow-hidden shadow-lg drop-shadow-2xl bg-white">
                <input
                  type="email"
                  className="w-full px-3 h-full text-sm pr-4"
                  placeholder="Email của bạn..."
                />
                <button
                  className="absolute top-0 right-0 bottom-0 px-4 bg-primary cursor-pointer"
                  title="Gửi ngay"
                >
                  <IoMdSend size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-t border-t-black h-1 my-8" />
        <div className="flex justify-between ">
          <p className="text-black text-sm">
            <span className="text-primary font-bold">© 2026 BITTECH</span>. Tất
            cả quyền được bảo lưu. Đồng hành cùng nông nghiệp số bền vững.
          </p>
          <div className="flex gap-4">
            <p className="text-black text-sm">Chính sách bảo mật</p>
            <p className="text-black text-sm">Điều khoản dịch vụ</p>
            <p className="text-black text-sm">Sơ đồ trang</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
