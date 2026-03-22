"use client";

import { HiHome } from "react-icons/hi";
import { IoMenu, IoSearch } from "react-icons/io5";
import LayerComponent from "./Demo/Layer";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import FarmDetailSlide from "./FarmDetailSlide";
import { FARM_FAKE_DATA } from "./Demo/farmDetails";
import FarmCategorySlide from "./FarmCategorySlide";
import { Map } from "mapbox-gl";
import WardDetailSlide from "./WardDetailSlide";
import { AiFillFilter, AiOutlineFilter } from "react-icons/ai";
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri";
import FarmSearchFilter from "./FarmSearchFilter";
import { IFarmMapGeomeTry } from "@/types/MapType";
import { getCrops } from "@/services/cropCate.service";
import { ICrop } from "@/types/CropType";
import { FaHouseChimney } from "react-icons/fa6";
import Link from "next/link";
import { appRoute } from "@/configs/appRoute";
import { usePathname } from "next/navigation";

interface Props {
  onChangeStyle: (styleId: number, styleUrl: string) => void;
  setSelectedFarmId: Dispatch<SetStateAction<string>>;
  selectedFarmId: string;
  mapRef: RefObject<Map>;
  setShowRiver: Dispatch<SetStateAction<boolean>>;
  showRiver: boolean;
  farms: IFarmMapGeomeTry;
  selectedWardName: string;
  setSelectedWardName: Dispatch<SetStateAction<string>>;
  currentStyleId: number;
}

const MapSideBar = (props: Props) => {
  const {
    onChangeStyle,
    selectedFarmId,
    setSelectedFarmId,
    mapRef,
    setShowRiver,
    showRiver,
    farms,
    selectedWardName,
    setSelectedWardName,
    currentStyleId,
  } = props;
  const [open, setOpen] = useState(false);
  const selectedFarm = FARM_FAKE_DATA.find((f) => f.id === selectedFarmId);
  const [openCate, setOpenCate] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openWardSlide, setOpenWardSlide] = useState(false);
  const [crops, setCrops] = useState<ICrop[]>([]);

  const pathname = usePathname();

  const isActive = (path: string) => {
    if (pathname === path || pathname.startsWith(path + "/")) {
      return "text-primary font-medium border-b-2 border-b-primary";
    }

    return "";
  };

  useEffect(() => {
    if (selectedFarmId) setOpen(true);
  }, [selectedFarmId]);

  useEffect(() => {
    if (selectedWardName && currentStyleId === 1) {
      setOpenWardSlide(true);
    }
  }, [selectedWardName, currentStyleId]);

  useEffect(() => {
    const handleGetCrops = async () => {
      try {
        const res = await getCrops();
        setCrops(res.data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    handleGetCrops();
  }, []);

  return (
    <div className="">
      <div className="absolute bg-white top-0 left-0 bottom-0 w-20 z-50 py-4 gap-3 flex flex-col">
        {!isActive(appRoute.home) && (
          <>
            <Link
              href={appRoute.home}
              className="flex flex-col items-center justify-center py-1 cursor-pointer gap-1 "
            >
              <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center shadow-xl drop-shadow-2xl">
                <FaHouseChimney size={16} className="text-white" />
              </div>
              <p className="text-xs font-medium text-black">Trang chủ</p>
            </Link>
            <div className="w-full h-px bg-gray-300" />
          </>
        )}
        <div
          className="flex flex-col items-center justify-center py-1 cursor-pointer"
          onClick={() => setOpenCate(!openCate)}
        >
          {openCate ? (
            <AiFillFilter size={24} className="text-primary" />
          ) : (
            <AiOutlineFilter size={24} className="text-black" />
          )}
          <p className="text-xs font-medium text-black">Bộ lọc</p>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-1 py-1"
          onClick={() => setOpenSearch(!openSearch)}
        >
          {openSearch ? (
            <RiSearch2Fill size={24} className="text-primary" />
          ) : (
            <RiSearch2Line size={20} className="text-black" />
          )}
          <p className="text-xs font-medium text-black">Tìm kiếm</p>
        </div>
      </div>
      <div className="absolute top-4 left-24 w-90 z-40 shadow-lg drop-shadow-2xl ">
        <div className="relative h-12 bg-white w-full rounded-full">
          <input
            type="text"
            name=""
            id=""
            placeholder="Tìm kiếm..."
            className=" h-12 w-full px-6 pr-10 text-sm outline-none text-black"
          />
          <div className="absolute top-0 bottom-0 right-4 flex items-center z-20">
            <IoSearch size={20} className="text-black" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-24 z-40">
        <LayerComponent onChangeStyle={onChangeStyle} />
      </div>
      <FarmDetailSlide
        farmId={selectedFarmId}
        open={open}
        onClose={() => {
          setOpen(false);
          setTimeout(() => setSelectedFarmId(""), 300); // đợi animation xong
        }}
      />
      <FarmCategorySlide
        open={openCate}
        onClose={() => setOpenCate(false)}
        map={mapRef.current}
        setShowRiver={setShowRiver}
        showRiver={showRiver}
        crops={crops}
      />
      <FarmSearchFilter
        farms={farms}
        map={mapRef.current}
        open={openSearch}
        crops={crops}
        setSelectedFarmId={setSelectedFarmId}
        onClose={() => setOpenSearch(false)}
      />
      <WardDetailSlide
        wardName={selectedWardName}
        open={openWardSlide}
        onClose={() => {
          setOpenWardSlide(false);
          setTimeout(() => setSelectedWardName(""), 300);
        }}
      />
    </div>
  );
};

export default MapSideBar;
