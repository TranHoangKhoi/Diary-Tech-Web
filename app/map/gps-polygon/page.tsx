"use client";

import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  FaPlay,
  FaPlus,
  FaCheck,
  FaTrash,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { TbCurrentLocation } from "react-icons/tb";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

const getGpsStatus = (accuracy: number) => {
  if (accuracy < 10) return { label: "Rất tốt", color: "text-green-400" };

  if (accuracy < 30) return { label: "Tốt", color: "text-blue-400" };

  if (accuracy < 80) return { label: "Trung bình", color: "text-yellow-400" };
  if (accuracy > 100) {
    return { label: "Đang tìm GPS...", color: "text-gray-400" };
  }
  return { label: "Yếu", color: "text-red-400" };
};

export default function GpsPolygonPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const watchId = useRef<number | null>(null);

  const [points, setPoints] = useState<[number, number][]>([]);
  const [currentLocation, setCurrentLocation] = useState<
    [number, number] | null
  >(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [area, setArea] = useState<number>(0);

  const hasCentered = useRef(false);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [followUser, setFollowUser] = useState(true);
  const currentLocationRef = useRef<[number, number] | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const lastAccuracyRef = useRef<number | null>(null);
  const [isFollowingUser, setIsFollowingUser] = useState(true);

  const [gpsStatus, setGpsStatus] = useState({
    label: "",
    color: "text-white",
  });

  const handleFlyToUser = () => {
    if (!mapRef.current || !currentLocationRef.current) return;

    setIsFollowingUser(true);
    setFollowUser(true);

    mapRef.current.easeTo({
      center: currentLocationRef.current,
      zoom: 17,
      duration: 1000,
    });
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [106.6297, 10.8231], // Vietnam default
      zoom: 15,
    });

    mapRef.current = map;

    map.on("load", () => {
      // Add Sources
      map.addSource("gps-data", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      // Add Layers
      // 1. Polygon Fill
      map.addLayer({
        id: "gps-polygon-fill",
        type: "fill",
        source: "gps-data",
        paint: {
          "fill-color": "#2ecc71",
          "fill-opacity": 0.3,
        },
        filter: ["==", "$type", "Polygon"],
      });

      // 2. Line String
      map.addLayer({
        id: "gps-line",
        type: "line",
        source: "gps-data",
        paint: {
          "line-color": "#2ecc71",
          "line-width": 3,
        },
        filter: ["==", "$type", "LineString"],
      });

      // 3. Points
      map.addLayer({
        id: "gps-points",
        type: "circle",
        source: "gps-data",
        paint: {
          "circle-radius": 6,
          "circle-color": "#e74c3c",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
        filter: ["==", "$type", "Point"],
      });
    });

    // Watch Position for "You are here" marker
    if ("geolocation" in navigator) {
      watchId.current = navigator.geolocation.watchPosition(
        (pos) => {
          const loc: [number, number] = [
            pos.coords.longitude,
            pos.coords.latitude,
          ];

          setCurrentLocation(loc);
          if (
            !lastAccuracyRef.current ||
            Math.abs(lastAccuracyRef.current - pos.coords.accuracy) > 10
          ) {
            lastAccuracyRef.current = pos.coords.accuracy;

            setAccuracy(pos.coords.accuracy);

            if (pos.coords.accuracy > 200) {
              const status = getGpsStatus(pos.coords.accuracy);
              setGpsStatus(status);
            } else {
              setGpsStatus(getGpsStatus(pos.coords.accuracy));
            }
          }

          currentLocationRef.current = loc;

          if (followUser && mapRef.current) {
            mapRef.current.easeTo({
              center: loc,
              duration: 1000,
            });
          }

          // 👉 Nếu chưa có marker → tạo mới
          if (!userMarkerRef.current && mapRef.current) {
            const el = document.createElement("div");
            el.innerHTML = `
  <div style="position: relative; width:16px; height:16px;">
    <div style="width:16px; height:16px; background:#3b82f6; border-radius:9999px; border:2px solid white;"></div>
    <div style="position:absolute; inset:0; width:16px; height:16px; background:#60a5fa; border-radius:9999px; animation: ping 1.5s infinite;"></div>
  </div>
`;

            userMarkerRef.current = new mapboxgl.Marker(el)
              .setLngLat(loc)
              .addTo(mapRef.current);
          } else {
            // 👉 Update vị trí realtime
            userMarkerRef.current?.setLngLat(loc);
          }

          if (!hasCentered.current && mapRef.current) {
            mapRef.current.flyTo({
              center: loc,
              zoom: 17,
              duration: 3500,
            });

            hasCentered.current = true; // chỉ chạy 1 lần
          }
        },
        (err) => {
          console.error("GPS Error:", err);

          alert("Không thể lấy vị trí GPS. Vui lòng bật định vị.");
        },
        {
          enableHighAccuracy: true,
          maximumAge: 1000, // cache 1s
          timeout: 10000,
        },
      );
    }

    return () => {
      if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.on("dragstart", () => {
      setFollowUser(false);
      setIsFollowingUser(false);
    });
  }, []);

  // Update Map Data when points change
  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    const source = mapRef.current.getSource(
      "gps-data",
    ) as mapboxgl.GeoJSONSource;
    if (!source) return;

    const features: GeoJSON.Feature[] = [];

    // Points
    points.forEach((p, i) => {
      features.push({
        type: "Feature",
        id: `point-${i}`,
        properties: { index: i },
        geometry: { type: "Point", coordinates: p },
      });
    });

    // Line
    if (points.length >= 2) {
      features.push({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: isComplete ? [...points, points[0]] : points,
        },
      });
    }

    // Polygon
    if (isComplete && points.length >= 3) {
      const polygonPoints = [...points, points[0]];
      const polygonFeature: GeoJSON.Feature<GeoJSON.Polygon> = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [polygonPoints],
        },
      };
      features.push(polygonFeature);

      // Calculate Area
      const calculatedArea = turf.area(polygonFeature);
      setArea(calculatedArea);
    }

    source.setData({
      type: "FeatureCollection",
      features: features,
    });

    // Auto fit bounds if complete
    if (isComplete && points.length >= 3) {
      const bbox = turf.bbox({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [[...points, points[0]]],
            },
          },
        ],
      });
      mapRef.current.fitBounds(
        [
          [bbox[0], bbox[1]],
          [bbox[2], bbox[3]],
        ],
        { padding: 50 },
      );
    }
  }, [points, isComplete]);

  const addPoint = () => {
    if (currentLocation) {
      setPoints((prev) => [...prev, currentLocation]);
      if (mapRef.current) {
        mapRef.current.flyTo({ center: currentLocation, zoom: 18 });
      }
    }
  };

  const handleFinish = () => {
    if (points.length < 3) {
      alert("Bạn cần ít nhất 3 điểm để tạo vùng đất!");
      return;
    }
    setIsComplete(true);
    setIsRecording(false);
  };

  const handleReset = () => {
    setPoints([]);
    setIsComplete(false);
    setIsRecording(false);
    setArea(0);
  };

  return (
    <div className="relative w-full h-dvh bg-gray-900 border-none!">
      <div ref={mapContainer} className="w-full h-full" />

      {/* Control Panel & Stats (Mobile: Bottom, Desktop: Top-Left) */}
      <div className="absolute bottom-0 left-0 right-0 md:top-6 md:left-6 md:bottom-auto md:right-auto z-10 flex flex-col gap-3 md:gap-4 p-4 md:p-0">
        {/* Stats Panel (Mobile: Above Controls, Desktop: Below Controls) */}
        {(points.length > 0 || area > 0) && (
          <div className="bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 order-1 md:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                  Số điểm lưu
                </span>
                <span className="text-xl md:text-2xl font-black text-gray-800">
                  {points.length}
                </span>
              </div>
              <div className="flex flex-col border-l border-gray-100 pl-4">
                <span className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                  Diện tích
                </span>
                <span className="text-xl md:text-2xl font-black text-primary">
                  {area > 10000
                    ? `${(area / 10000).toFixed(2)} ha`
                    : `${Math.round(area)} m²`}
                </span>
              </div>
            </div>

            {points.length > 0 && !isComplete && (
              <div className="mt-3 pt-3 border-t border-gray-100 hidden md:block">
                <p className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold mb-1">
                  Tọa độ cuối
                </p>
                <p className="text-[10px] text-gray-600 font-mono">
                  {points[points.length - 1][0].toFixed(6)},{" "}
                  {points[points.length - 1][1].toFixed(6)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Main Action Panel */}
        <div className="bg-white/95 backdrop-blur-md p-5 md:p-6 rounded-3xl shadow-2xl border border-white/20 min-w-full md:min-w-[300px] order-2 md:order-1">
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              Đo vẽ GPS Real-time
            </h1>
            <p className="text-gray-500 text-xs mb-5">
              Lưu tọa độ thực của bạn khi di chuyển
            </p>
          </div>

          {/* Mobile Handle cue */}
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 md:hidden" />

          <div className="flex flex-col gap-3">
            {!isRecording && !isComplete && (
              <button
                onClick={() => setIsRecording(true)}
                className="w-full bg-primary hover:bg-green-600 active:scale-95 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-100"
              >
                <FaPlay size={16} />
                Bắt đầu đo đạc
              </button>
            )}

            {isRecording && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={addPoint}
                  className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold py-4 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all shadow-lg shadow-blue-100"
                >
                  <FaPlus size={18} />
                  <span className="text-xs">Thêm điểm</span>
                </button>
                <button
                  onClick={handleFinish}
                  disabled={points.length < 3}
                  className={`font-bold py-4 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all shadow-lg 
                    ${points.length < 3 ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" : "bg-primary hover:bg-green-600 active:scale-95 text-white shadow-green-100"}`}
                >
                  <FaCheck size={18} />
                  <span className="text-xs">Hoàn tất</span>
                </button>
              </div>
            )}

            {(isComplete || points.length > 0) && (
              <button
                onClick={handleReset}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all border border-red-100"
              >
                <FaTrash size={14} />
                <span className="text-sm">Xóa & Làm lại</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons (Right Side) */}
      <div className="absolute right-4 bottom-auto top-1/2 -translate-y-1/2 md:bottom-32 md:top-auto md:translate-y-0 z-10 flex flex-col gap-3">
        {currentLocation && (
          <button
            onClick={handleFlyToUser}
            className={`w-14 h-14 rounded-2xl shadow-xl border flex items-center justify-center transition-all active:scale-90
              ${isFollowingUser ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-100"}`}
          >
            <TbCurrentLocation size={28} />
          </button>
        )}
      </div>

      {/* GPS Status Indicator (Top Center on Mobile) */}
      {currentLocation && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 flex items-center gap-3">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </div>
          <p className="text-[10px] text-white font-bold tracking-widest uppercase flex items-center gap-2">
            GPS Signal:{" "}
            <span className={gpsStatus.color}>
              {gpsStatus.label}
              {accuracy && ` (${Math.round(accuracy)}m)`}
            </span>
          </p>
        </div>
      )}

      {/* Map Hint / Guidance */}
      {!isRecording && !isComplete && !points.length && (
        <div className="hidden md:block absolute bottom-10 right-10 z-10 bg-black/70 backdrop-blur-md text-white px-6 py-5 rounded-3xl max-w-xs shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-sm font-medium leading-relaxed">
            Để bắt đầu, hãy di chuyển đến góc thửa đất và nhấn
            <span className="text-primary font-bold mx-1">Bắt đầu đo đạc</span>.
          </p>
        </div>
      )}
    </div>
  );
}
