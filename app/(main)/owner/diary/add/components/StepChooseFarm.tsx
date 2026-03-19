interface Props {
  farms: any[];
  onSelect: (farm: any) => void;
}

const StepChooseFarm = ({ farms, onSelect }: Props) => {
  return (
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
  );
};

export default StepChooseFarm;
