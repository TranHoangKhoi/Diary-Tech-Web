"use client";

import VietNamGeo from "@/assets/LocationJson/vietnamGeoJson.json";
import { LogoWeb } from "@/configs/appInfo";
import { RootState } from "@/store";
import { IMapItem } from "@/types/MapType";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MapSideBar from "./MapSideBar";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Props {
  dataMap: IMapItem[];
}

const MapRender = (props: Props) => {
  const { dataMap } = props;
  const userData = useSelector((state: RootState) => state.userProfile.profile);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const avatarMarkers = useRef<mapboxgl.Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);

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

  const renderAvatars = (map: mapboxgl.Map) => {
    const zoom = map.getZoom();
    console.log("zoom: ", zoom);

    if (zoom < 8) {
      avatarMarkers.current.forEach((m) => m.remove());
      avatarMarkers.current = [];
      return;
    }

    if (avatarMarkers.current.length) return; // ĐÃ RENDER → KHÔNG RENDER LẠI

    dataMap.forEach((item) => {
      if (!item.geo_location) return;

      const lng = Number(item.geo_location[0]);
      const lat = Number(item.geo_location[1]);

      const el = document.createElement("div");
      el.style.width = "42px";
      el.style.height = "42px";
      el.style.borderRadius = "50%";
      el.style.backgroundImage = `url(${
        item.farm_type_id?.image || "https://i.pravatar.cc/150"
      })`;
      el.style.backgroundSize = "cover";
      el.style.border = "2px solid white";
      el.style.cursor = "pointer";

      // ✅ CLICK AVATAR → FOCUS MAP
      el.addEventListener("click", (e) => {
        e.stopPropagation(); // tránh trigger click map bên dưới

        map.flyTo({
          center: [lng, lat],
          zoom: 10,
          speed: 1.2,
          curve: 1.4,
          essential: true,
        });
      });

      const marker = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);

      avatarMarkers.current.push(marker);
    });
  };

  // useEffect(() => {
  //   if (!mapReady || !mapRef.current || !dataMap.length) return;

  //   const map = mapRef.current;
  //   const onZoom = () => renderAvatars(map);

  //   renderAvatars(map);
  //   map.on("zoomend", onZoom);

  //   return () => map.off("zoomend", onZoom);
  // }, [mapReady, dataMap]);

  useEffect(() => {
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

      console.log("FARM:", feature.properties);
    });

    map.on("load", () => {
      map.addSource("vietnam-boundary", {
        type: "geojson",
        data: VietNamGeo as GeoJSON.FeatureCollection,
      });

      map.addLayer({
        id: "vietnam-outline",
        type: "line",
        source: "vietnam-boundary",
        paint: {
          "line-color": "#CD201F",
          "line-width": ["interpolate", ["linear"], ["zoom"], 4, 1, 8, 3],
        },
      });

      map.addControl(geolocate, "top-right");

      geolocate.on("geolocate", (e) => {
        map.flyTo({
          center: [e.coords.longitude, e.coords.latitude],
          zoom: 14,
        });
      });

      map.addSource("farms", {
        type: "geojson",
        data: farmGeoJson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.addLayer({
        id: "farm-clusters",
        type: "circle",
        source: "farms",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#2ecc71",
          "circle-radius": [
            "step",
            ["get", "point_count"],
            18, // < 10
            10,
            22,
            50,
            28,
          ],
        },
      });

      map.addLayer({
        id: "farm-cluster-count",
        type: "symbol",
        source: "farms",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-size": 12,
        },
      });

      map.addLayer({
        id: "farm-point",
        type: "symbol",
        source: "farms",
        filter: ["!", ["has", "point_count"]],
        layout: {
          "icon-image": "marker-15",
          "icon-size": 1.3,
        },
      });

      map.on("click", "farm-clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["farm-clusters"],
        });

        const clusterId = features[0].properties?.cluster_id;
        const source = map.getSource("farms") as mapboxgl.GeoJSONSource;

        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;

          map.easeTo({
            center: (features[0].geometry as any).coordinates,
            zoom,
          });
        });
      });

      // geolocate.on("geolocate", (e) => {
      //   console.log("USER LOCATION:", e.coords);
      // });

      // geolocate.on("error", (err) => {
      //   console.log("GEO ERROR:", err);
      // });

      geolocate.trigger();

      setTimeout(() => {
        geolocate.trigger();
      }, 500);
    });

    map.once("idle", () => {
      console.log("MAP READY (ONCE)");
      setMapReady(true);
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

  return (
    <div ref={mapContainer} className="w-full rounded-lg h-dvh" style={{}}>
      {/* <MapSideBar /> */}

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

export default MapRender;
