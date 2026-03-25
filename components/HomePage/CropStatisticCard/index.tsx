"use client";

import { TypeCropStructure } from "@/types/TypeStatistics";
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

interface Props {
  cropStructure?: TypeCropStructure[];
  totalFarms?: number;
  totalArea?: { value: number; unit: string };
}

// Fallback colors nếu BE chưa trả về color
const DEFAULT_COLORS = [
  "#4CAF50",
  "#FF9800",
  "#2196F3",
  "#9C27B0",
  "#F44336",
  "#00BCD4",
  "#FFEB3B",
  "#795548",
  "#607D8B",
  "#E91E63",
];

export default function CropStatisticCard({
  cropStructure = [],
  totalFarms = 0,
  totalArea,
}: Props) {
  const topCrop =
    cropStructure.length > 0
      ? cropStructure.reduce((a, b) => (b.percentage > a.percentage ? b : a))
      : null;

  const chartData = {
    labels: cropStructure.map((i) => i.cropName),
    datasets: [
      {
        label: "Số hộ canh tác",
        data: cropStructure.map((i) => i.totalFarmsCount),
        backgroundColor: cropStructure.map(
          (i, idx) => i.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
        ),
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="bg-background shadow-xl drop-shadow rounded-xl px-4 py-4 flex flex-col gap-8 h-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
            <FaSeedling className="text-primary" />
          </div>
          <p className="text-black font-medium">Thống kê cây trồng</p>
        </div>
        <p className="text-xs text-gray-500">Theo API thực tế</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-secondary rounded-lg px-3 py-2">
          <p className="text-xs text-gray-500">Số hộ</p>
          <p className="font-bold text-black">{totalFarms}</p>
        </div>
        <div className="bg-secondary rounded-lg px-3 py-2">
          <p className="text-xs text-gray-500">
            Diện tích ({totalArea?.unit || "ha"})
          </p>
          <p className="font-bold text-black">
            {totalArea?.value ? totalArea.value.toLocaleString("vi-VN") : 0}
          </p>
        </div>
        <div className="bg-secondary rounded-lg px-3 py-2">
          <p className="text-xs text-gray-500">Nhiều nhất</p>
          <p className="font-bold text-black">{topCrop?.cropName || "—"}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[220px]">
        {cropStructure.length > 0 ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { precision: 0 },
                },
              },
            }}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            Chưa có dữ liệu cây trồng
          </div>
        )}
      </div>
    </div>
  );
}
