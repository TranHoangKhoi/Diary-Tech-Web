import { cookies, headers } from "next/headers";
import MapRender from "./components/MapRender";
import { getMapInfo } from "@/services/map.service";
import { IMapItem } from "@/types/MapType";
import MapRenderDemo from "./components/MapRenderDemo";
import "./map.css";

export interface GetMapInfoResponse {
  data: IMapItem[];
  success: boolean;
  total: number;
}

const MapPages = async () => {
  // const cookieStore = cookies();
  // const token = (await cookieStore).get("token")?.value;
  // const data: GetMapInfoResponse = await getMapInfo(token);
  const data: any = [];

  return (
    <div className="">
      <MapRenderDemo dataMap={data.data} />
    </div>
  );
};

export default MapPages;
