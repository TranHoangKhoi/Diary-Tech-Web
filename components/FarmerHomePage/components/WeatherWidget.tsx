"use client";

import { FaLightbulb } from "react-icons/fa6";
import { IoMdSunny } from "react-icons/io";
import { IoRainy, IoCloudyNight, IoCloud } from "react-icons/io5";
import "./sweatherStyle.css";

type WeatherType = "sunny" | "rain" | "cloud" | "night";

interface Props {
  temperature?: number;
  location?: string;
  weatherType?: WeatherType;
  suggestion?: string;
}

const RainEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <span
          key={i}
          className="absolute w-[2px] h-8 bg-white/60 animate-rain"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${0.5 + Math.random()}s`,
            animationDelay: `${Math.random()}s`,
          }}
        />
      ))}
    </div>
  );
};

const CloudEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-40 h-20 bg-white/40 rounded-full blur-xl animate-cloud"
          style={{
            top: `${10 + i * 20}%`,
            animationDuration: `${12 + i * 6}s`, // nhanh hơn → mượt hơn
          }}
        />
      ))}
    </div>
  );
};

const SunEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Sun */}
      <div className="absolute top-6 right-6 w-20 h-20 bg-yellow-300 rounded-full shadow-[0_0_80px_rgba(255,223,0,0.9)] animate-sun-move" />

      {/* Light glow sweep */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-yellow-300/20 blur-3xl animate-sun-move" />
    </div>
  );
};

const StarEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${1 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function WeatherWidget({
  temperature = 28,
  location = "Cần Thơ",
  weatherType = "sunny",
  suggestion = "Nhiệt độ đang cao, nên tưới nước vào sáng sớm hoặc chiều mát để tránh sốc nhiệt cho cây.",
}: Props) {
  const weatherMap = {
    sunny: {
      label: "Trời nắng",
      icon: IoMdSunny,
      bg: "from-[#00552D] to-[#558F73]",
    },
    rain: {
      label: "Trời mưa",
      icon: IoRainy,
      bg: "from-[#2C5364] to-[#203A43]",
    },
    cloud: {
      label: "Nhiều mây",
      icon: IoCloud,
      bg: "from-[#4B6CB7] to-[#182848]",
    },
    night: {
      label: "Ban đêm",
      icon: IoCloudyNight,
      bg: "from-[#0F2027] to-[#203A43]",
    },
  };

  const current = weatherMap[weatherType];
  const Icon = current.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* EFFECT */}
      {weatherType === "sunny" && <SunEffect />}
      {weatherType === "rain" && <RainEffect />}
      {weatherType === "cloud" && <CloudEffect />}
      {weatherType === "night" && <StarEffect />}

      {/* CARD */}
      <div
        className={`bg-linear-to-br ${current.bg} p-6 shadow-lg shadow-secondary/20 text-white`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <span className="text-4xl font-black">{temperature}°C</span>
            <span className="text-sm font-medium opacity-90">
              {current.label} • {location}
            </span>
          </div>

          <Icon size={42} className="opacity-95" />
        </div>

        {/* Suggestion */}
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/20">
          <p className="text-sm font-bold flex items-center gap-2 mb-1">
            <FaLightbulb size={16} />
            Gợi ý từ chuyên gia
          </p>
          <p className="text-xs opacity-90 leading-relaxed">{suggestion}</p>
        </div>
      </div>
    </div>
  );
}
