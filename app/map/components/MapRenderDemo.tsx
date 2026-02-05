"use client";

import VietNamDistrict from "@/assets/LocationJson/vietnamDisttric.json";
import PhongDienWardRaw from "@/assets/LocationJson/vietnamWard.json";
import phongDienRiver from "@/assets/LocationJson/vietNamRiver.json";
import { LogoWeb } from "@/configs/appInfo";
import { RootState } from "@/store";
import { IMapItem } from "@/types/MapType";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { farmHouseGeoJson } from "./Demo/Data/FakeData";
import {
  applyBaseLayers,
  loadCropImages,
  MAP_STYLE_LAYERS,
} from "./Demo/mapStyleLayers";
import MapSideBar from "./MapSideBar";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Props {
  dataMap: IMapItem[];
  height?: number;
}

const MapRenderDemo = (props: Props) => {
  const { dataMap, height } = props;
  const userData = useSelector((state: RootState) => state.userProfile.profile);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const [showRiver, setShowRiver] = useState(true);
  const areaPopupRef = useRef<mapboxgl.Popup | null>(null);

  // const handleDraw = (e: any, draw: MapboxDraw) => {
  //   const data = draw.getAll();
  //   if (!data.features.length) return;

  //   const polygon = data.features[0];

  //   // 1️⃣ Toạ độ polygon
  //   const coordinates = polygon.geometry.coordinates;

  //   // 2️⃣ Tâm polygon (centroid)
  //   const centroid = turf.centroid(polygon);
  //   const centerCoord = centroid.geometry.coordinates; // [lng, lat]

  //   // 3️⃣ Diện tích
  //   const area = turf.area(polygon);

  //   console.log("=== POLYGON DATA ===");
  //   console.log(
  //     JSON.stringify(
  //       {
  //         polygon: {
  //           type: "Feature",
  //           geometry: {
  //             type: "Polygon",
  //             coordinates,
  //           },
  //         },
  //         centerPoint: {
  //           type: "Feature",
  //           geometry: {
  //             type: "Point",
  //             coordinates: centerCoord,
  //           },
  //         },
  //         area: Math.round(area),
  //       },
  //       null,
  //       2
  //     )
  //   );
  // };

  const farmGeoJson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: dataMap?.map((item) => ({
      type: "Feature",
      properties: {
        id: item._id,
        farm_name: item.farm_name,
        avatar: item.avatar,
      },
      geometry: {
        type: "Point",
        coordinates: item.geo_location, // [lng, lat]
      },
    })),
  };

  const phongDienGeoJson: GeoJSON.FeatureCollection | any = {
    type: "FeatureCollection",
    features: (VietNamDistrict as GeoJSON.FeatureCollection).features.filter(
      (f: any) =>
        f.properties?.NAME_1 === "CầnThơ" &&
        f.properties?.NAME_2 === "PhongĐiền"
    ),
  };

  const phongDienMask: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {}, // 👈 BẮT BUỘC
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [102, 8],
              [110, 8],
              [110, 24],
              [102, 24],
              [102, 8],
            ],
            ...(phongDienGeoJson.features[0].geometry.coordinates as any)[0],
          ],
        },
      },
    ],
  };

  const phongDienWardsGeoJson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: (PhongDienWardRaw as GeoJSON.FeatureCollection).features
      .filter(
        (f: any) =>
          f.properties?.NAME_1 === "CầnThơ" &&
          f.properties?.NAME_2 === "PhongĐiền"
      )
      .map((f: any, idx: number) => ({
        type: "Feature",
        id: String(f.properties?.GID_3 ?? idx), // 👈 ÉP STRING
        properties: f.properties,
        geometry: f.geometry,
      })),
  };

  const handleDraw = (e: any, draw: MapboxDraw) => {
    const data = draw.getAll();
    if (!data.features.length) return;

    const polygon = data.features[data.features.length - 1];

    // 1️⃣ Diện tích (m²)
    const area = turf.area(polygon);

    // 2️⃣ Tâm polygon
    const center = turf.centroid(polygon).geometry.coordinates as [
      number,
      number
    ];

    // 3️⃣ Format diện tích
    const areaText =
      area > 1_000_000
        ? `${(area / 1_000_000).toFixed(2)} km²`
        : `${Math.round(area)} m²`;

    // 4️⃣ Init popup
    if (!areaPopupRef.current) {
      areaPopupRef.current = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 8,
      });
    }

    // 5️⃣ Show popup
    areaPopupRef.current
      .setLngLat(center)
      .setHTML(
        `<div style="font-weight:600;font-size:13px">
        Diện tích: ${areaText}
      </div>`
      )
      .addTo(mapRef.current!);
  };

  const applyStyleLayers = (styleId: number) => {
    if (!mapRef.current) return;

    const ctx = {
      phongDienMask,
      phongDienGeoJson,
      phongDienWardsGeoJson,
      farmGeoJson,
      farmHouseGeoJson, // ✅ THÊM DÒNG NÀY
      phongDienRiver,
      setSelectedFarmId,
    };

    applyBaseLayers(mapRef.current, ctx);

    MAP_STYLE_LAYERS[styleId]?.(mapRef.current, ctx);
  };

  const changeMapStyle = async (styleId: number, styleUrl: string) => {
    if (!mapRef.current) return;

    mapRef.current.setStyle(styleUrl);

    mapRef.current.once("style.load", async () => {
      // 1️⃣ Sync UI state
      const forceShowRiver = styleId === 3;
      setShowRiver(forceShowRiver);

      // 2️⃣ Load icon nếu cần
      if (styleId === 2 || styleId === 3) {
        await loadCropImages(mapRef.current);
      }

      // 3️⃣ Add lại source + layer
      applyStyleLayers(styleId);

      // 4️⃣ ÉP VISIBILITY SAU KHI LAYER ĐÃ CÓ
      const riverLayerId = "vietnam-rivers-line";
      if (mapRef.current.getLayer(riverLayerId)) {
        mapRef.current.setLayoutProperty(
          riverLayerId,
          "visibility",
          forceShowRiver ? "visible" : "none"
        );
      }
    });
  };

  useLayoutEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    console.log("mapRef: ", mapRef.current, mapContainer.current);

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/standard-satellite",
      center: [106.6297, 10.8231],
      zoom: 5,
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: false,
      showUserLocation: true,
    });

    map.on("click", "farm-point", (e) => {
      const feature = e.features?.[0];
      if (!feature) return;
    });

    map.on("load", async () => {
      map.addSource("phongdien-boundary", {
        type: "geojson",
        data: phongDienGeoJson,
      });

      map.resize();

      map.addControl(geolocate, "top-right");
      map.addControl(new mapboxgl.FullscreenControl(), "top-right");

      // ✅ INIT DRAW
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true, // 👈 BẬT
          trash: true, // 👈 BẬT
        },
      });

      map.addControl(draw, "top-right");

      drawRef.current = draw;

      // ✅ EVENT DRAW
      map.on("draw.create", (e) => handleDraw(e, draw));
      map.on("draw.update", (e) => handleDraw(e, draw));
      map.on("draw.delete", () => {
        areaPopupRef.current?.remove();
      });

      applyStyleLayers(1); // 👈 CHỈ DÒNG NÀY

      map.setMaxBounds([
        [102.0, 8.0],
        [110.0, 24.0],
      ]);

      map.setMinZoom(7);

      map.fitBounds(
        [
          [105.58, 9.94],
          [105.74, 10.06],
        ],
        { padding: 40 }
      );
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null; // 👈 BẮT BUỘC
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-full rounded-lg relative"
      style={{
        height: height ? `${height}px` : "100vh",
      }}
    >
      <MapSideBar
        onChangeStyle={changeMapStyle}
        selectedFarmId={selectedFarmId}
        setSelectedFarmId={setSelectedFarmId}
        mapRef={mapRef}
        setShowRiver={setShowRiver}
        showRiver={showRiver}
      />

      <div className="absolute bottom-2 right-2 z-10">
        <div className="bg-white px-2 py-1 rounded">
          <Image
            src={LogoWeb.LogoHorizontalGreen}
            alt="logoBittech"
            width={60}
            height={20}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default MapRenderDemo;
