"use client";

import { LogoWeb } from "@/configs/appInfo";
import { appRoute } from "@/configs/appRoute";
import { RootState } from "@/store";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";
import { usePathname } from "next/navigation";

const Header = () => {
  const userData = useSelector((state: RootState) => state.userProfile.profile);
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path &&
    "text-primary font-medium! border-b-2 border-b-primary";

  return (
    <header className="bg-background h-16 shadow fixed top-0 left-0 right-0 z-99999">
      <div className="container mx-auto h-full flex items-center gap-4">
        {/* Logo → Home */}
        <Link href="/" className="flex items-center">
          <Image
            src={LogoWeb.LogoHorizontalGreen}
            alt="logoBittech"
            width={100}
            height={33}
            className="object-contain"
          />
        </Link>

        {/* Menu */}
        <nav className="flex gap-7 px-3 flex-1 h-full">
          <Link
            href="/"
            className={`hover:text-primary flex items-center text-base font-normal ${isActive(
              "/"
            )}`}
          >
            Trang chủ
          </Link>

          <Link
            href="/about"
            className={`hover:text-primary flex items-center text-base font-normal ${isActive(
              "/about"
            )}`}
          >
            Nhật ký
          </Link>

          <Link
            href="/map"
            className={`hover:text-primary flex items-center text-base font-normal ${isActive(
              "/map"
            )}`}
          >
            Bản đồ
          </Link>

          <Link
            href="/login"
            className={`hover:text-primary flex items-center text-base font-normal ${isActive(
              "/login"
            )}`}
          >
            Hỗ trợ
          </Link>
        </nav>

        {/* Search */}
        <div className=" bg-secondary px-3 rounded-full shadow h-9 flex items-center justify-center">
          <div className="pl-7 relative">
            <div className="absolute top-0 left-0 bottom-0 flex items-center justify-center">
              <Search size={18} className="text-black" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="text-black text-sm w-52 outline-none"
            />
          </div>
        </div>
        <div className="">
          {userData && userData.name ? (
            <div className="">
              {userData && <UserDropdown userData={userData} />}
            </div>
          ) : (
            <Link
              href={appRoute.login}
              className="inline-flex items-center justify-center
               bg-primary px-4 h-9 hover:opacity-70 rounded
               font-medium text-sm text-white"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
