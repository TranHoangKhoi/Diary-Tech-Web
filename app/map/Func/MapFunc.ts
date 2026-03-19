import * as turf from "@turf/turf";
import { Popup } from "mapbox-gl";
import { RefObject } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

const handleDraw = (
  e: any,
  draw: MapboxDraw,
  areaPopupRef: RefObject<Popup>,
  mapRef
) => {
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

export const initDraw = (
  map: mapboxgl.Map,
  areaPopupRef: RefObject<Popup>,
  drawRef: RefObject<any>,
  mapRef: RefObject<any>
) => {
  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
  });

  map.addControl(draw, "top-right");
  drawRef.current = draw;

  // đảm bảo draw layer render đúng
  requestAnimationFrame(() => {
    const drawLayers = map
      .getStyle()
      .layers?.filter((l) => l.id.startsWith("gl-draw"))
      .map((l) => l.id);

    drawLayers?.forEach((id) => {
      if (map.getLayer(id)) {
        map.moveLayer(id);
      }
    });
  });

  // DRAW EVENTS
  map.on("draw.create", (e) => handleDraw(e, draw, areaPopupRef, mapRef));
  map.on("draw.update", (e) => handleDraw(e, draw, areaPopupRef, mapRef));
  map.on("draw.delete", () => {
    areaPopupRef.current?.remove();
  });
};
