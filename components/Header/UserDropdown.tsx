"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/auth.slice";
import { useRouter } from "next/navigation";
import { appRoute } from "@/configs/appRoute";
import { logoutAPI } from "@/services/auth.service";

interface Props {
  userData: {
    name: string;
    avatar: string;
    phone: string;
  };
}

const UserDropdown = ({ userData }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  // click ngoài thì đóng
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const res = await logoutAPI(); // 👈 xoá cookie
    dispatch(logout()); // 👈 clear redux
    router.replace(appRoute.login);
    console.log(res);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center cursor-pointer border border-primary rounded-full"
      >
        <Image
          src={userData.avatar}
          alt={userData.name}
          width={36}
          height={36}
          className="rounded-full object-cover border"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white shadow-xl drop-shadow-2xl z-50">
          {/* User info */}
          <div className="px-4 py-3 border-b border-b-gray-200">
            <p className="text-sm font-semibold text-black truncate">
              {userData.name}
            </p>
            {/* <p className="text-xs text-gray-500">{userData.phone}</p> */}
          </div>

          {/* Menu */}
          <div className="py-2">
            <button className="w-full px-4 py-2 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer hover:opacity-70">
              <FaUserCircle />
              Thông tin tài khoản
            </button>

            <button className="w-full px-4 py-2 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer hover:opacity-70">
              <FaCog />
              Cài đặt chung
            </button>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 cursor-pointer hover:opacity-70"
            >
              <FaSignOutAlt />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
