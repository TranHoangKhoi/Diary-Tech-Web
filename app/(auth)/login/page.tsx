// app\(auth)\login\page.tsx

"use client";

import Loading from "@/components/Loading";
import { appRoute } from "@/configs/appRoute";
import { login } from "@/services/auth.service";
import { showError } from "@/utils/alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSolidHelpCircle, BiSolidUserRectangle } from "react-icons/bi";
import { FaEarthAmericas, FaEye, FaEyeSlash, FaLock } from "react-icons/fa6";
import { GrFormNextLink } from "react-icons/gr";
import { IoLogoFacebook } from "react-icons/io";
import SlideLogin from "./slideLogin";

const LoginPage = () => {
  const [dataLogin, setDataLogin] = useState({
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    phone?: string;
    password?: string;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validate = () => {
    const newErrors: {
      phone?: string;
      password?: string;
    } = {};

    // validate phone (VN)
    const phoneRegex = /^(0|\+84)[0-9]{9}$/;

    if (!dataLogin.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(dataLogin.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    // validate password
    if (!dataLogin.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (dataLogin.password.length < 6) {
      newErrors.password = "Mật khẩu phải ít nhất 6 ký tự";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await login(dataLogin);
      setError("");

      if (res) {
        const resCookei = await fetch("/api/auth/set-cookie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(res),
        });
        console.log("Token: ", res.token);
        console.log("resCookei: ", resCookei);

        router.replace(appRoute.home);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        // showError(err.message);
        showError("Tài khoản hoặc mật khẩu không đúng !");
        setError(err.message || "Đăng nhập thất bại");
      } else {
        showError("Tài khoản hoặc mật khẩu không đúng !");
        setError("Tài khoản hoặc mật khẩu không đúng");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-6 h-dvh">
        <div className="relative col-span-1">
          {/* <Image
            src="/assets/ImageApp/login.jpg"
            alt="logoBittech"
            fill
            className="object-cover"
          /> */}
          <SlideLogin />
        </div>
        {loading && <Loading />}

        <div className="relative col-span-1 flex justify-center items-center">
          <div className="w-[70%] bg-background shadow-2xl drop-shadow-2xl px-8 py-8 rounded-xl">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-black">Đăng Nhập</h2>
              <p className="text-sm text-gray-600">
                Chào mừng bạn trở lại hệ thống
              </p>
            </div>
            <div className="pt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-black text-sm">
                  Số điện thoại hoặc Email
                </label>
                <div className="relative">
                  <div className="absolute top-0 left-2 bottom-0 flex items-center justify-center">
                    <BiSolidUserRectangle size={18} className="text-grey" />
                  </div>
                  <input
                    onChange={(e) => {
                      setDataLogin((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }));
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    name="phone"
                    placeholder="Số điện thoại của bạn..."
                    className={`w-full h-10 bg-secondary shadow text-sm text-black px-10 rounded outline-none
    ${errors.phone ? "border border-red-500" : ""}`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <label htmlFor="" className="text-black text-sm">
                    Mật khẩu
                  </label>
                  <Link
                    href={"/"}
                    className="text-primary font-semibold text-sm"
                  >
                    Quên mật khẩu
                  </Link>
                </div>
                <div className="relative">
                  {/* icon lock */}
                  <div className="absolute top-0 left-2 bottom-0 flex items-center justify-center">
                    <FaLock size={16} className="text-grey" />
                  </div>

                  {/* input */}
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                      setDataLogin((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    placeholder="Mật khẩu của bạn"
                    className={`w-full h-10 bg-secondary shadow text-sm text-black px-10 pr-10 rounded outline-none
    ${errors.password ? "border border-red-500" : ""}`}
                  />

                  {/* icon eye */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-0 right-2 bottom-0 flex items-center justify-center text-grey"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" />
                <label htmlFor="" className="text-black text-sm">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <div className="">
                <button
                  onClick={handleLogin}
                  className="bg-primary w-full h-10 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:opacity-70"
                >
                  <span className="font-medium text-sm text-white">
                    Đăng nhập
                  </span>
                  <GrFormNextLink size={16} className="text-white" />
                </button>
                {error && (
                  <p className="mt-2 text-sm text-red-500 text-center">
                    {error}
                  </p>
                )}
              </div>
              <div className="flex gap-1 items-center justify-center">
                <p className="text-black text-sm font-medium">
                  Chưa có tài khoản ?{" "}
                </p>
                <span className="text-primary text-sm font-bold">
                  Đăng ký ngay
                </span>
              </div>
              <div className="w-full h-1 border-b border-b-gray-200"></div>
              <div className=" flex justify-center gap-8">
                <div className="flex gap-1 items-center">
                  <FaEarthAmericas size={14} className="text-grey" />
                  <span className="text-grey text-xs font-bold translate-y-px">
                    Tiếng Việt
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <BiSolidHelpCircle size={14} className="text-grey" />
                  <span className="text-grey text-xs font-bold translate-y-px">
                    Hỗ trợ
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <IoLogoFacebook size={14} className="text-grey" />
                  <span className="text-grey text-xs font-bold translate-y-px">
                    Bittech
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
