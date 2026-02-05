import administrative from "@/assets/StyleMap/administrative.png";
import mapNavigationNight from "@/assets/StyleMap/mapNavigationNight.png";
import mapOutdoors from "@/assets/StyleMap/mapOutdoors.png";
import mapStreet from "@/assets/StyleMap/mapstreets.png";
import quyHoach from "@/assets/StyleMap/quyhoach.png";

export const listStyleMapBox = [
  {
    id: 1,
    img: administrative,
    style: "mapbox://styles/mapbox/standard-satellite",
    title: "Map Navigation Night",
    name: "Địa phận",
  },
  {
    id: 2,
    img: mapStreet,
    style: "mapbox://styles/mapbox/satellite-streets-v12",
    title: "Map Streets",
    name: "Vùng Trồng",
  },
  {
    id: 3,
    img: mapOutdoors,
    style: "mapbox://styles/mapbox/outdoors-v12",
    title: "Map Outdoors",
    name: "Sông ngòi",
  },
  {
    id: 4,
    img: quyHoach,
    style: "mapbox://styles/mapbox/satellite-streets-v12",
    title: "Map Dark",
    name: "Quy hoạch",
  },
  {
    id: 5,
    img: mapNavigationNight,
    style: "mapbox://styles/mapbox/navigation-night-v1",
    title: "Map Navigation Night",
    name: "Ban đêm",
  },
];
