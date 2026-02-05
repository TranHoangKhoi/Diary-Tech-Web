"use client";

import { CROP_CATEGORIES } from "@/app/map/components/Demo/Data/cropCategories";
import { farmHouseGeoJson } from "@/app/map/components/Demo/Data/FakeData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { FaSeedling } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CropStatisticCard() {
  const farmPoints = farmHouseGeoJson.features.filter(
    (f) => f.geometry.type === "Point"
  ) as any[];

  const cropStats = Object.values(CROP_CATEGORIES).map((crop) => {
    const farms = farmPoints.filter((f) => f.properties?.cropId === crop.id);

    return {
      ...crop,
      count: farms.length,
      area: farms.reduce((s, f) => s + (f.properties?.area ?? 0), 0),
    };
  });

  const totalFarm = farmPoints.length;
  const totalArea = cropStats.reduce((s, i) => s + i.area, 0);
  const topCrop = cropStats.reduce((a, b) => (b.count > a.count ? b : a));

  return (
    <div className="bg-background shadow-xl drop-shadow rounded-xl px-4 py-4 flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
            <FaSeedling className="text-primary" />
          </div>
          <p className="text-black font-medium">Thống kê cây trồng</p>
        </div>
        <p className="text-xs text-gray-500">Theo bản đồ</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-secondary rounded-lg px-3 py-2">
          <p className="text-xs text-gray-500">Số hộ</p>
          <p className="font-bold text-black">{totalFarm}</p>
        </div>
        <div className="bg-secondary rounded-lg px-3 py-2">
          <p className="text-xs text-gray-500">Diện tích (ha)</p>
          <p className="font-bold text-black">{totalArea.toFixed(1)}</p>
        </div>
        <div className="bg-secondary rounded-lg px-3 py-2">
          <p className="text-xs text-gray-500">Nhiều nhất</p>
          <p className="font-bold text-black">{topCrop.name}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[220px]">
        <Bar
          data={{
            labels: cropStats.map((i) => i.name),
            datasets: [
              {
                label: "Số hộ canh tác",
                data: cropStats.map((i) => i.count),
                backgroundColor: cropStats.map((i) => i.color),
                borderRadius: 6,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
          }}
        />
      </div>
    </div>
  );
}
