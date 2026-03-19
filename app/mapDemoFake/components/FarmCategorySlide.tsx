"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CROP_CATEGORIES } from "./Demo/Data/cropCategories";
import { farmHouseGeoJson } from "./Demo/Data/FakeData";

interface Props {
  open: boolean;
  onClose: () => void;
  map: mapboxgl.Map | null;
  setShowRiver: Dispatch<SetStateAction<boolean>>;
  showRiver: boolean;
}

const FarmCategorySlide = ({
  open,
  onClose,
  map,
  setShowRiver,
  showRiver,
}: Props) => {
  const categoryList = Object.values(CROP_CATEGORIES);

  // Mặc định check hết
  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    categoryList.reduce((acc, c) => {
      acc[c.id] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const farmCountByCrop = categoryList.reduce((acc, c) => {
    acc[c.id] = farmHouseGeoJson.features.filter(
      (f: any) => f.geometry.type === "Point" && f.properties?.cropId === c.id
    ).length;
    return acc;
  }, {} as Record<string, number>);

  // Mỗi lần checkbox đổi → filter map
  useEffect(() => {
    if (!map || !map.isStyleLoaded()) return;

    const activeCategories = Object.keys(checked).filter((key) => checked[key]);

    const hideFilter: any = ["==", ["get", "cropId"], "__none__"];

    // Không chọn gì → ẩn hết
    if (activeCategories.length === 0) {
      map.setFilter("farm-house-point", hideFilter);
      map.setFilter("farm-house-fill", hideFilter);
      map.setFilter("farm-house-outline", hideFilter);
      return;
    }

    // Có chọn → lọc theo cropId
    const filter: any = [
      "in",
      ["get", "cropId"],
      ["literal", activeCategories],
    ];

    map.setFilter("farm-house-point", filter);
    map.setFilter("farm-house-fill", filter);
    map.setFilter("farm-house-outline", filter);
  }, [checked, map]);

  useEffect(() => {
    if (!map || !map.isStyleLoaded()) return;
    if (!map.getLayer("vietnam-rivers-line")) return;

    map.setLayoutProperty(
      "vietnam-rivers-line",
      "visibility",
      showRiver ? "visible" : "none"
    );
  }, [showRiver, map]);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className={`absolute top-0 left-0 h-full w-95 bg-white z-50 shadow-xl
      transform transition-transform duration-500 ease-out
      ${open ? "translate-x-20" : "-translate-x-250"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="font-semibold text-lg">🌱 Loại cây trồng</h2>
        <button onClick={onClose}>
          <X size={22} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-56px)] custom-scroll">
        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="checkbox"
            checked={showRiver}
            onChange={() => setShowRiver((v) => !v)}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="flex-1 font-medium text-sm">
            🌊 Sông / Kênh rạch
          </span>
        </label>

        {categoryList.map((cate) => (
          <label
            key={cate.id}
            className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={checked[cate.id]}
              onChange={() => toggle(cate.id)}
              className="w-4 h-4 accent-green-600"
            />
            <img src={cate.image} alt="" className="w-8 h-8 object-contain" />
            <div className="flex-1">
              <p className="font-medium text-sm">{cate.name}</p>
              {/* <p className="text-xs text-gray-500">{cate.id}</p> */}
              <p className="text-xs text-gray-500">
                {farmCountByCrop[cate.id] || 0} hộ đang trồng
              </p>
            </div>
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: cate.color }}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default FarmCategorySlide;
