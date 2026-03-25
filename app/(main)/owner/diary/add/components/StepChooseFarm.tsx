import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

interface Props {
  farms: any[];
  onSelect: (farm: any) => void;
}

const StepChooseFarm = ({ farms, onSelect }: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-col col-span-3 gap-4">
      <button
        onClick={() => router.back()}
        className={`flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-black transition cursor-pointer`}
      >
        <IoArrowBack size={18} />
        Quay lại
      </button>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 col-span-3">
        {farms.map((farm) => (
          <div
            key={farm._id}
            onClick={() => onSelect(farm)}
            className="bg-white rounded-2xl shadow cursor-pointer hover:shadow-lg transition p-4"
          >
            <img
              src={farm.avatar}
              className="h-40 w-full object-cover rounded-xl mb-3"
            />

            <h3 className="font-bold text-sm">{farm?.farm_name}</h3>
            <div className="flex flex-col pt-1 gap-0.5">
              <p className="text-xs text-black m-0">
                Người đại diện: {farm?.user_id?.name}
              </p>
              <p className="text-xs text-gray-500 m-0">
                {farm.ward.name}, {farm?.province?.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepChooseFarm;
