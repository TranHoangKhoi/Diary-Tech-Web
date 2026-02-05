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
import { AiFillFilter, AiOutlineFilter } from "react-icons/ai";
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri";
import FarmSearchFilter from "./FarmSearchFilter";

interface Props {
  onChangeStyle: (styleId: number, styleUrl: string) => void;
  setSelectedFarmId: Dispatch<SetStateAction<string>>;
  selectedFarmId: string;
  mapRef: RefObject<Map>;
  setShowRiver: Dispatch<SetStateAction<boolean>>;
  showRiver: boolean;
}

const MapSideBar = (props: Props) => {
  const {
    onChangeStyle,
    selectedFarmId,
    setSelectedFarmId,
    mapRef,
    setShowRiver,
    showRiver,
  } = props;
  const [open, setOpen] = useState(false);
  const selectedFarm = FARM_FAKE_DATA.find((f) => f.id === selectedFarmId);
  const [openCate, setOpenCate] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    if (selectedFarm) setOpen(true);
  }, [selectedFarm]);

  return (
    <div className="">
      <div className="absolute bg-white top-0 left-0 bottom-0 w-20 z-50 py-4 gap-4 flex flex-col">
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
        farm={selectedFarm}
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
      />
      <FarmSearchFilter
        map={mapRef.current}
        open={openSearch}
        setSelectedFarmId={setSelectedFarmId}
        onClose={() => setOpenSearch(false)}
      />
    </div>
  );
};

export default MapSideBar;
