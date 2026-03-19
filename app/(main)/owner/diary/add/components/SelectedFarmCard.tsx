interface Props {
  farm: any;
  onChange?: () => void;
}

const SelectedFarmCard = ({ farm, onChange }: Props) => {
  return (
    <div className="bg-white shadow rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
      <img src={farm.avatar} className="w-14 h-14 rounded-xl object-cover" />

      <div className="flex-1">
        <h3 className="font-semibold text-black text-sm">{farm.farm_name}</h3>

        <p className="text-xs text-black pt-1">
          Người đại diện: {farm.user_id?.name}
        </p>

        <p className="text-xs text-gray-600 ">
          {farm?.ward?.name}, {farm.province?.name}
        </p>
      </div>

      {onChange && (
        <button
          onClick={onChange}
          className="text-sm text-primary font-semibold hover:underline cursor-pointer "
        >
          Đổi hộ
        </button>
      )}
    </div>
  );
};

export default SelectedFarmCard;
