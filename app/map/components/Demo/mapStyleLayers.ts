import mapboxgl from "mapbox-gl";
import { CROP_CATEGORIES } from "./Data/cropCategories";
import { Dispatch, SetStateAction } from "react";
import phongDienOverlayJson from "@/assets/LocationJson/features.json";

export type MapLayerContext = {
  phongDienMask?: GeoJSON.FeatureCollection;
  phongDienGeoJson?: GeoJSON.FeatureCollection;
  farmGeoJson?: GeoJSON.FeatureCollection;
  phongDienWardsGeoJson?: GeoJSON.FeatureCollection;
  farmHouseGeoJson?: GeoJSON.FeatureCollection;
  phongDienRiver?: any;
  setSelectedFarmId: Dispatch<SetStateAction<string>>;
};

const renderFarmHouseLayer = (map: mapboxgl.Map, ctx: MapLayerContext) => {
  if (!ctx.farmHouseGeoJson) return;

  // ===== SOURCE =====
  if (!map.getSource("farm-house-polygons")) {
    const polygonGeoJson: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: ctx.farmHouseGeoJson.features.filter(
        (f) => f.geometry.type === "Polygon"
      ),
    };

    const pointGeoJson: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: ctx.farmHouseGeoJson.features
        .filter((f) => f.geometry.type === "Point")
        .map((f) => {
          const crop = CROP_CATEGORIES[f.properties?.cropId];
          return {
            ...f,
            properties: {
              ...f.properties,
              id: f.id,
              icon: crop?.icon,
              cropName: crop?.name,
              image: crop?.image,
            },
          };
        }),
    };

    map.addSource("farm-house-polygons", {
      type: "geojson",
      data: polygonGeoJson,
    });

    map.addSource("farm-house-points", {
      type: "geojson",
      data: pointGeoJson,
    });
  }

  // ===== POLYGON =====
  if (!map.getLayer("farm-house-fill")) {
    map.addLayer({
      id: "farm-house-fill",
      type: "fill",
      source: "farm-house-polygons",
      paint: {
        "fill-color": [
          "match",
          ["get", "cropId"],
          "dau",
          "#FFEB3B",
          "sau-rieng",
          "#8BC34A",
          "mang-cut",
          "#9C27B0",
          "chom-chom",
          "#F44336",
          "xoai",
          "#FF9800",
          "#BDBDBD",
        ],
        "fill-opacity": 0.6,
      },
    });
  }

  if (!map.getLayer("farm-house-outline")) {
    map.addLayer({
      id: "farm-house-outline",
      type: "line",
      source: "farm-house-polygons",
      paint: {
        "line-color": "#fff",
        "line-width": 1.5,
      },
    });
  }

  // ===== POINT =====
  if (!map.getLayer("farm-house-point")) {
    map.addLayer({
      id: "farm-house-point",
      type: "symbol",
      source: "farm-house-points",
      layout: {
        "icon-image": ["get", "icon"],

        "icon-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          6,
          0.04,
          10,
          0.06,
          13,
          0.08,
          16,
          0.12,
        ],

        //  TEXT chỉ hiện khi zoom ≥ 8
        "text-field": ["step", ["zoom"], "", 14, ["get", "owner"]],

        "text-size": 12,
        "text-offset": [0, 1.6],
        "text-anchor": "top",

        //  CHO PHÉP CHỒNG
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "text-allow-overlap": false,
        "text-ignore-placement": false,
      },
      paint: {
        "text-color": "#000",
        "text-halo-color": "#fff",
        "text-halo-width": 1,
      },
    });
  }

  // ===== CLICK =====
  map.on("click", "farm-house-point", (e) => {
    if (!e.features?.length) return;

    const feature: any = e.features[0];
    const farmId = feature.properties?.id;
    const [lng, lat] = feature.geometry.coordinates as [number, number];

    map.flyTo({
      center: [lng, lat],
      zoom: 16,
      offset: [200, -80],
      speed: 1.2,
      essential: true,
    });

    ctx.setSelectedFarmId(farmId);
  });

  // ===== RIVERS =====
  if (!map.getSource("vietnam-rivers")) {
    map.addSource("vietnam-rivers", {
      type: "geojson",
      data: ctx.phongDienRiver as GeoJSON.FeatureCollection,
    });
  }

  if (!map.getLayer("vietnam-rivers-line")) {
    map.addLayer(
      {
        id: "vietnam-rivers-line",
        type: "line",
        source: "vietnam-rivers",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#0099FF",
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            6,
            1.2, // ⬅️ trước: 0.5
            10,
            2.4, // ⬅️ trước: 1.2
            14,
            4.5, // ⬅️ trước: 2.5
          ],
        },
      },
      "mask-outside" // 👈 QUAN TRỌNG: add BEFORE mask
    );
  }

  map.setPaintProperty("vietnam-rivers-line", "line-color", [
    "case",
    ["boolean", ["feature-state", "hover"], false],
    "#00FFFF", // hover sáng
    "#0099FF",
  ]);

  map.setPaintProperty("vietnam-rivers-line", "line-width", [
    "case",
    ["boolean", ["feature-state", "hover"], false],
    ["interpolate", ["linear"], ["zoom"], 6, 4, 10, 8, 14, 14],
    ["interpolate", ["linear"], ["zoom"], 6, 1.5, 10, 3, 14, 5],
  ]);

  map.addLayer({
    id: "vietnam-rivers-hover-hitbox",
    type: "line",
    source: "vietnam-rivers",
    paint: {
      "line-width": 20, // HITBOX
      "line-opacity": 0,
    },
  });

  let hoveredRiverId: string | null = null;

  map.on("mousemove", "vietnam-rivers-line", (e) => {
    if (!e.features?.length) return;

    const feature = e.features[0];
    const id = feature.id as string;

    if (hoveredRiverId && hoveredRiverId !== id) {
      map.setFeatureState(
        { source: "vietnam-rivers", id: hoveredRiverId },
        { hover: false }
      );
    }

    hoveredRiverId = id;

    map.setFeatureState({ source: "vietnam-rivers", id }, { hover: true });

    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "vietnam-rivers-line", () => {
    if (hoveredRiverId) {
      map.setFeatureState(
        { source: "vietnam-rivers", id: hoveredRiverId },
        { hover: false }
      );
    }

    hoveredRiverId = null;
    map.getCanvas().style.cursor = "";
  });

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  map.on("mousemove", "vietnam-rivers-line", (e) => {
    const props = e.features?.[0]?.properties;
    popup
      .setLngLat(e.lngLat)
      .setHTML(
        `
      <div>
        <b>${props?.name ?? "Kênh / Rạch"}</b><br/>
        Loại: ${props?.waterway}
      </div>
    `
      )
      .addTo(map);
  });

  map.on("mouseleave", "vietnam-rivers-line", () => {
    popup.remove();
  });
};

export const MAP_STYLE_LAYERS: Record<
  number,
  (map: mapboxgl.Map, ctx: MapLayerContext) => void
> = {
  1: (map, ctx) => {
    if (!ctx.farmGeoJson) return;
    addFarmLayer(map, ctx.farmGeoJson);

    // ===== WARDS =====
    if (!map.getSource("phongdien-wards")) {
      map.addSource("phongdien-wards", {
        type: "geojson",
        data: ctx.phongDienWardsGeoJson,
        generateId: true,
      });
    }

    if (!map.getLayer("phongdien-ward-fill")) {
      map.addLayer({
        id: "phongdien-ward-fill",
        type: "fill",
        source: "phongdien-wards",
        paint: {
          "fill-color": [
            "match",
            ["get", "NAME_3"],
            "NhơnÁi",
            "#FFCDD2",
            "GiaiXuân",
            "#BBDEFB",
            "MỹKhánh",
            "#C8E6C9",
            "NhơnNghĩa",
            "#FFF9C4",
            "TânThới",
            "#D1C4E9",
            "#E0E0E0",
          ],
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1,
            0.8,
          ],
        },
      });
    }
  },

  2: (map, ctx) => {
    renderFarmHouseLayer(map, ctx);
  },

  3: (map, ctx) => {
    if (!ctx.farmGeoJson) return;

    addFarmLayer(map, ctx.farmGeoJson);
    renderFarmHouseLayer(map, ctx);
  },
  4: (map, ctx) => {
    renderPhongDienOverlay(map, phongDienOverlayJson);
  },
};

const addFarmLayer = (
  map: mapboxgl.Map,
  farmGeoJson: GeoJSON.FeatureCollection
) => {
  if (!map.getSource("farms")) {
    map.addSource("farms", {
      type: "geojson",
      data: farmGeoJson,
      cluster: true,
      clusterRadius: 50,
    });
  }

  if (!map.getLayer("farm-point")) {
    map.addLayer({
      id: "farm-point",
      type: "symbol",
      source: "farms",
      layout: {
        "icon-image": "marker-15",
        "icon-size": 1.3,
      },
    });
  }
};

const attachWardHover = (map: mapboxgl.Map) => {
  let hoveredWardId: string | number | null = null;
  let popup: mapboxgl.Popup | null = null;

  // tránh bị bind trùng
  (map as any).off("mousemove", "phongdien-ward-fill");
  (map as any).off("mouseleave", "phongdien-ward-fill");

  map.on("mousemove", "phongdien-ward-fill", (e) => {
    if (!e.features?.length) return;
    const feature = e.features[0];

    if (hoveredWardId !== null) {
      map.setFeatureState(
        { source: "phongdien-wards", id: hoveredWardId },
        { hover: false }
      );
    }

    hoveredWardId = feature.id as any;

    map.setFeatureState(
      { source: "phongdien-wards", id: hoveredWardId },
      { hover: true }
    );

    if (!popup) {
      popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 10,
      });
    }

    popup
      .setLngLat(e.lngLat)
      .setHTML(
        `<div style="font-weight:600;font-size:13px">
          ${feature.properties?.NAME_3}
        </div>`
      )
      .addTo(map);
  });

  map.on("mouseleave", "phongdien-ward-fill", () => {
    if (hoveredWardId !== null) {
      map.setFeatureState(
        { source: "phongdien-wards", id: hoveredWardId },
        { hover: false }
      );
    }

    hoveredWardId = null;
    popup?.remove();
  });
};

export const applyBaseLayers = (map: mapboxgl.Map, ctx: MapLayerContext) => {
  if (!ctx.phongDienMask || !ctx.phongDienGeoJson || !ctx.phongDienWardsGeoJson)
    return;

  // ===== MASK =====
  if (!map.getSource("phongdien-mask")) {
    map.addSource("phongdien-mask", {
      type: "geojson",
      data: ctx.phongDienMask,
    });
  }

  if (!map.getLayer("mask-outside")) {
    map.addLayer({
      id: "mask-outside",
      type: "fill",
      source: "phongdien-mask",
      paint: {
        "fill-color": "#000",
        "fill-opacity": 0.6,
      },
    });
  }

  // ===== BOUNDARY =====
  if (!map.getSource("phongdien-boundary")) {
    map.addSource("phongdien-boundary", {
      type: "geojson",
      data: ctx.phongDienGeoJson,
    });
  }

  if (!map.getLayer("phongdien-outline")) {
    map.addLayer({
      id: "phongdien-outline",
      type: "line",
      source: "phongdien-boundary",
      paint: {
        "line-color": "#00C300",
        "line-width": 3,
      },
    });
  }

  if (!map.getLayer("phongdien-ward-outline")) {
    // map.addLayer({
    //   id: "phongdien-ward-outline",
    //   type: "line",
    //   source: "phongdien-wards",
    //   paint: {
    //     "line-color": "#fff",
    //     "line-width": 1,
    //   },
    // });
  }

  attachWardHover(map);
};

export const loadCropImages = async (map: mapboxgl.Map) => {
  for (const crop of Object.values(CROP_CATEGORIES)) {
    if (map.hasImage(crop.icon)) continue;

    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();

      i.crossOrigin = "anonymous";
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = crop.image;
    });
    console.log("img: ", img);
    map.addImage(crop.icon, img);
  }
};
const renderPhongDienOverlay = (map: mapboxgl.Map, overlayJson: any) => {
  const [minLng, minLat, maxLng, maxLat] = getUnionBBox(overlayJson.features);

  const sourceId = "phongdien-overlay";
  const layerId = "phongdien-overlay-layer";

  if (!map.getSource(sourceId)) {
    map.addSource(sourceId, {
      type: "image",
      url: "/overlay/bdhh.png",
      coordinates: [
        [minLng, maxLat], // top-left
        [maxLng, maxLat], // top-right
        [maxLng, minLat], // bottom-right
        [minLng, minLat], // bottom-left
      ],
    });
  }

  if (!map.getLayer(layerId)) {
    map.addLayer({
      id: layerId,
      type: "raster",
      source: sourceId,
      paint: {
        "raster-opacity": 0.8,
      },
    });
  }
};

const getUnionBBox = (features: any[]) => {
  let minLng = Infinity,
    minLat = Infinity,
    maxLng = -Infinity,
    maxLat = -Infinity;

  features.forEach((f) => {
    const [a, b, c, d] = f.bbox;
    minLng = Math.min(minLng, a);
    minLat = Math.min(minLat, b);
    maxLng = Math.max(maxLng, c);
    maxLat = Math.max(maxLat, d);
  });

  return [minLng, minLat, maxLng, maxLat];
};
