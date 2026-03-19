import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { listStyleMapBox } from "../../styleMap/ListStyleMap";
import { FaLayerGroup } from "react-icons/fa";

interface Props {
  onChangeStyle: (styleId: number, styleUrl: string) => void;
}

const LayerComponent = (props: Props) => {
  const { onChangeStyle } = props;
  const [showLayer, setShowLayer] = useState(false);
  const [mapCurrent, setMapCurrent] = useState<{
    id: number;
    img: StaticImageData;
    style: string;
    title: string;
    name: string;
  }>(listStyleMapBox[0]);

  return (
    <div className="flex gap-4 items-end">
      <div
        className="border border-white overflow-hidden rounded-lg w-18 h-18 relative cursor-pointer"
        onClick={() => setShowLayer(!showLayer)}
      >
        <Image
          src={mapCurrent.img}
          alt="imageLayer"
          className="object-cover w-18 h-18 "
        />
        <div className="absolute bottom-1 left-0 right-0 z-1 flex gap-2 items-center justify-center ">
          <FaLayerGroup size={10} className="text-white" />
          <p className="text-[8px] text-white">{mapCurrent.name}</p>
        </div>
      </div>
      {showLayer && (
        <div className="flex gap-4 bg-white px-3 py-2 rounded shadow-lg drop-shadow-2xl">
          {listStyleMapBox.map((item, index) => (
            <div
              key={index}
              className="w-16 gap-2 flex flex-col items-center"
              onClick={() => {
                onChangeStyle(item.id, item.style);
                setShowLayer(false);
                setMapCurrent(item);
              }}
            >
              <Image
                src={item.img}
                alt="imageLayer"
                className="object-cover w-14 h-14 rounded-lg"
              />
              <p className="text-black font-medium text-xs line-clamp-2">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LayerComponent;
