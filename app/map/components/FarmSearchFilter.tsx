"use client";

import { ICrop } from "@/types/CropType";
import { IFarmMapGeomeTry } from "@/types/MapType";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import { farmHouseGeoJson } from "./Demo/Data/FakeData";

interface Props {
  map: mapboxgl.Map | null;
  open: boolean;
  onClose: () => void;
  setSelectedFarmId: Dispatch<SetStateAction<string>>;
  farms: IFarmMapGeomeTry;
  crops: ICrop[];
}

export const getFarmPointById = (farmId: string) => {
  return farmHouseGeoJson.features.find(
    (f) => f.geometry.type === "Point" && f.id === farmId,
  );
};

const FarmSearchFilter = (props: Props) => {
  const { farms, map, onClose, open, setSelectedFarmId, crops } = props;
  const [keyword, setKeyword] = useState("");
  const [selectedCate, setSelectedCate] = useState("all");

  const farmList = useMemo(() => {
    if (!farms) return [];

    return farms.features
      .filter((f) => f.geometry.type === "Point")
      .map((f) => ({
        id: f.properties.farm_id,
        name: f.properties.farm_name,
        crop_id: f.properties.crop_id,
        cropName: f.properties.crop_name,
        coordinates: (f.geometry as GeoJSON.Point).coordinates,
      }));
  }, [farms]);

  // ===== FILTER LIST ONLY (KHÔNG ĐỤNG MAP) =====
  const filteredFarms = useMemo(() => {
    if (!keyword && selectedCate === "all") return [];

    console.log("selectedCate: ", selectedCate);

    return farmList.filter((farm) => {
      const matchKeyword =
        farm.name.toLowerCase().includes(keyword.toLowerCase()) ||
        farm.cropName.toLowerCase().includes(keyword.toLowerCase());

      const matchCate = selectedCate === "all" || farm.crop_id === selectedCate;
      console.log("farm.crop_id: ", farm.crop_id);

      return matchKeyword && matchCate;
    });
  }, [keyword, selectedCate, farmList]);

  // ===== CLICK FARM → FLY TO MAP =====
  const handleSelectFarm = (farm: any) => {
    if (!map) return;

    const [lng, lat] = farm.coordinates;

    map.flyTo({
      center: [lng, lat],
      zoom: 16,
      offset: [200, -80],
      speed: 1.2,
      essential: true,
    });

    setSelectedFarmId(farm.id);
    onClose();
  };

  return (
    <>
      {/* SLIDE PANEL */}
      <div
        className={`absolute top-0 left-0 h-full w-90 bg-white z-50 shadow-xl
  transform transition-transform duration-500 ease-out
  ${open ? "translate-x-20" : "-translate-x-250"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-base">Tìm hộ trồng</h3>
          <button onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 flex flex-col gap-3 h-full">
          {/* SEARCH */}
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm hộ / cây trồng..."
            className="border px-3 py-2 rounded-lg text-sm outline-none"
          />

          {/* SELECT CATEGORY */}
          <select
            value={selectedCate}
            onChange={(e) => setSelectedCate(e.target.value)}
            className="border px-3 py-2 rounded-lg text-sm"
          >
            <option value="all">Tất cả danh mục</option>
            {crops.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* RESULT LIST */}
          <div className="mt-2 flex-1 overflow-auto pb-16">
            {filteredFarms.length === 0 && keyword && (
              <p className="text-sm text-gray-400">Không tìm thấy hộ phù hợp</p>
            )}

            <ul className="flex flex-col gap-2">
              {filteredFarms.map((farm) => (
                <li
                  key={farm.id}
                  onClick={() => handleSelectFarm(farm)}
                  className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                >
                  <p className="font-medium text-sm">{farm.name}</p>
                  <p className="text-xs text-gray-500">{farm.cropName}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmSearchFilter;
