"use client";

import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import * as turf from "@turf/turf";
import { useEffect, useRef, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./mapPicker.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Props {
  onChange: (data: {
    point: [number, number] | null;
    polygon: GeoJSON.FeatureCollection | null;
    area: number;
    centroid: [number, number] | null;
  }) => void;
}

const MapPicker = forwardRef(function MapPicker({ onChange }: Props, ref) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  const fallbackLocation: [number, number] = [
    105.74622701229065, 10.035370419028588,
  ];

  const [areaText, setAreaText] = useState("");

  useImperativeHandle(ref, () => ({
    clearPolygon() {
      drawRef.current?.deleteAll();
      setAreaText("");
    },

    resetMap() {
      drawRef.current?.deleteAll();
      markerRef.current?.setLngLat(fallbackLocation);
      mapRef.current?.flyTo({
        center: fallbackLocation,
        zoom: 12,
      });
      setAreaText("");
    },
  }));

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: fallbackLocation,
      zoom: 12,
    });

    mapRef.current = map;

    // search địa chỉ
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken!,
      mapboxgl,
      placeholder: "Tìm địa chỉ...",
      marker: false,
    });

    map.addControl(geocoder, "top-left");

    // draw polygon
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });

    map.addControl(draw, "top-right");
    drawRef.current = draw;

    // marker vị trí farm
    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat(fallbackLocation)
      .addTo(map);

    markerRef.current = marker;

    // drag marker
    marker.on("dragend", () => {
      const lngLat = marker.getLngLat();
      const point: [number, number] = [lngLat.lng, lngLat.lat];

      onChange({
        point,
        polygon: draw.getAll(),
        area: 0,
        centroid: null,
      });
    });

    // click map
    map.on("click", (e) => {
      const point: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      marker.setLngLat(point);

      onChange({
        point,
        polygon: draw.getAll(),
        area: 0,
        centroid: null,
      });
    });

    // xử lý polygon
    const updatePolygon = () => {
      const data = draw.getAll();

      if (!data.features.length) {
        setAreaText("");
        return;
      }

      // chỉ giữ polygon cuối cùng
      if (data.features.length > 1) {
        const lastPolygon = data.features[data.features.length - 1];

        draw.deleteAll();
        draw.add(lastPolygon);

        data.features = [lastPolygon];
      }

      const polygon = data.features[0];

      const area = turf.area(polygon);
      const areaHa = area / 10000;

      const centroid = turf.centroid(polygon).geometry.coordinates as [
        number,
        number
      ];

      setAreaText(areaHa.toFixed(2) + " ha");

      // fit bounds
      const bbox = turf.bbox(polygon);

      map.fitBounds(
        [
          [bbox[0], bbox[1]],
          [bbox[2], bbox[3]],
        ],
        { padding: 40 }
      );

      onChange({
        point: marker.getLngLat().toArray() as [number, number],
        polygon: data,
        area: areaHa,
        centroid,
      });
    };

    map.on("draw.create", updatePolygon);
    map.on("draw.update", updatePolygon);
    map.on("draw.delete", () => {
      setAreaText("");

      onChange({
        point: marker.getLngLat().toArray() as [number, number],
        polygon: null,
        area: 0,
        centroid: null,
      });
    });

    // lấy GPS user
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const userLocation: [number, number] = [
          pos.coords.longitude,
          pos.coords.latitude,
        ];

        map.flyTo({
          center: userLocation,
          zoom: 16,
        });

        marker.setLngLat(userLocation);

        // cập nhật form ngay
        onChange({
          point: userLocation,
          polygon: draw.getAll(),
          area: 0,
          centroid: null,
        });
      });
    }

    return () => map.remove();
  }, []);

  return (
    <div className="relative w-full h-112.5 rounded-xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      <div
        onClick={() => {
          if (!drawRef.current) return;
          drawRef.current.deleteAll();
        }}
        className="absolute top-3 right-16 bg-white px-3 py-1 rounded shadow text-sm cursor-pointer hover:bg-primary drop-shadow-xl hover:text-white"
      >
        Xóa vùng đất
      </div>

      {areaText && (
        <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded shadow text-sm font-semibold">
          Diện tích: {areaText}
        </div>
      )}
    </div>
  );
});

export default MapPicker;
