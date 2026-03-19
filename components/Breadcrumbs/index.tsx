"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiHome6Line } from "react-icons/ri";

const routeNameMap: Record<string, string> = {
  diary: "Nhật ký",
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  const allPaths = pathname.split("/").filter(Boolean);
  const displayPaths = allPaths.filter((p) => p !== "owner");

  return (
    <div className="text-sm flex items-center gap-2">
      <Link
        href="/owner"
        className="flex items-center gap-1 text-black hover:text-primary"
      >
        <RiHome6Line />
        Trang chủ
      </Link>

      {displayPaths.map((segment, index) => {
        const originalIndex = allPaths.indexOf(segment);

        const href = "/" + allPaths.slice(0, originalIndex + 1).join("/");

        const isLast = index === displayPaths.length - 1;

        let label = routeNameMap[segment] || segment;

        if (displayPaths[index - 1] === "diary") {
          label = "Chi tiết nhật ký";
        }

        return (
          <div key={href} className="flex items-center gap-2">
            <MdOutlineKeyboardArrowRight size={16} />

            {isLast ? (
              <span className="text-gray-500">{label}</span>
            ) : (
              <Link href={href} className="text-black hover:text-primary">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
