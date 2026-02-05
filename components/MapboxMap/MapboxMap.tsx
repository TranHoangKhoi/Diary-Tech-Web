"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { LogoWeb } from "@/configs/appInfo";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Props {
  height: number;
}

const MapboxMap = (props: Props) => {
  const { height } = props;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/standard-satellite",
      center: [106.6297, 10.8231],
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-left");
    map.addControl(new mapboxgl.FullscreenControl(), "top-right");
    map.addControl(
      new mapboxgl.GeolocateControl({
        trackUserLocation: true,
      }),
      "top-right"
    );
    map.addControl(new mapboxgl.ScaleControl(), "bottom-right");

    mapRef.current = map;

    return () => map.remove();
  }, []);

  return (
    <div ref={mapContainer} className="w-full rounded-lg" style={{ height }}>
      <div className="absolute bottom-2 left-2 z-10">
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

export default MapboxMap;
