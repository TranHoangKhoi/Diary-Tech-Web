"use client";

import VietNamDistrict from "@/assets/LocationJson/vietnamDisttric.json";
import phongDienRiver from "@/assets/LocationJson/vietNamRiver.json";
import PhongDienWardRaw from "@/assets/LocationJson/vietnamWard.json";
import { LogoWeb } from "@/configs/appInfo";
import { RootState } from "@/store";
import { IFarmMapGeomeTry, IMapItem } from "@/types/MapType";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { farmHouseGeoJson } from "./Demo/Data/FakeData";
import {
  applyBaseLayers,
  loadCropImages,
  loadFarmImages,
  MAP_STYLE_LAYERS,
} from "./Demo/mapStyleLayers";
import MapSideBar from "./MapSideBar";
import { initDraw } from "../Func/MapFunc";
import { getMapInfo } from "@/services/map.service";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Props {
  dataMap: IMapItem[];
  height?: number;
  focusLocation?: [number, number];
}

const MapRenderDemo = (props: Props) => {
  const { dataMap, height, focusLocation } = props;
  const userData = useSelector((state: RootState) => state.userProfile.profile);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const [selectedWardName, setSelectedWardName] = useState("");
  const [currentStyleId, setCurrentStyleId] = useState(1);
  const [showRiver, setShowRiver] = useState(true);
  const [farms, setFarms] = useState<IFarmMapGeomeTry | undefined>(undefined);
  const areaPopupRef = useRef<mapboxgl.Popup | null>(null);

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
        f.properties?.NAME_2 === "PhongĐiền",
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
          f.properties?.NAME_2 === "PhongĐiền",
      )
      .map((f: any, idx: number) => ({
        type: "Feature",
        id: String(f.properties?.GID_3 ?? idx), // 👈 ÉP STRING
        properties: f.properties,
        geometry: f.geometry,
      })),
  };

  const applyStyleLayers = (styleId: number) => {
    if (!mapRef.current) return;

    const ctx = {
      phongDienMask,
      phongDienGeoJson,
      phongDienWardsGeoJson,
      farmGeoJson,
      // farmHouseGeoJson,
      farmHouseGeoJson: farms,
      phongDienRiver,
      setSelectedFarmId,
      setSelectedWardName,
    };

    applyBaseLayers(mapRef.current, ctx);

    MAP_STYLE_LAYERS[styleId]?.(mapRef.current, ctx);
  };

  const changeMapStyle = async (styleId: number, styleUrl: string) => {
    if (!mapRef.current) return;

    setCurrentStyleId(styleId);
    mapRef.current.setStyle(styleUrl, { diff: false } as any);

    mapRef.current.once("style.load", async () => {
      // 1️⃣ Sync UI state
      const forceShowRiver = styleId === 3;
      setShowRiver(forceShowRiver);

      // 2️⃣ Load icon nếu cần
      if (styleId === 2 || styleId === 3) {
        // await loadCropImages(mapRef.current);

        if (farms) {
          await loadFarmImages(mapRef.current, farms);
        }
      }

      // 3️⃣ Add lại source + layer

      applyStyleLayers(styleId);

      // 4️⃣ ÉP VISIBILITY SAU KHI LAYER ĐÃ CÓ
      const riverLayerId = "vietnam-rivers-line";
      if (mapRef.current.getLayer(riverLayerId)) {
        mapRef.current.setLayoutProperty(
          riverLayerId,
          "visibility",
          forceShowRiver ? "visible" : "none",
        );
      }
    });
  };

  useEffect(() => {
    const handleGetFarm = async () => {
      try {
        const res = await getMapInfo();
        setFarms(res);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    handleGetFarm();
  }, []);

  useLayoutEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

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

      applyStyleLayers(1);

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
        { padding: 40 },
      );
    });

    mapRef.current = map;

    // ✅ CHỜ MAP ỔN ĐỊNH HOÀN TOÀN
    map.once("idle", () => {
      initDraw(map, areaPopupRef, drawRef, mapRef);
    });

    return () => {
      map.remove();
      mapRef.current = null; // 👈 BẮT BUỘC
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !focusLocation) return;

    const map = mapRef.current;

    map.flyTo({
      center: focusLocation,
      zoom: 15,
      essential: true,
    });

    changeMapStyle(2, "mapbox://styles/mapbox/satellite-streets-v12");
  }, [focusLocation]);

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
        selectedWardName={selectedWardName}
        setSelectedWardName={setSelectedWardName}
        currentStyleId={currentStyleId}
        mapRef={mapRef}
        setShowRiver={setShowRiver}
        showRiver={showRiver}
        farms={farms}
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
