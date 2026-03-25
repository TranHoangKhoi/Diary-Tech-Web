import { IActivities } from "@/types/TypeActitvities";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

interface Props {
  activities: IActivities[];
  onSelect: (activity: any) => void;
}

const StepChooseActivity = (props: Props) => {
  const { activities, onSelect } = props;
  const router = useRouter();
  return (
    <div className="lg:col-span-3 flex flex-col gap-3">
      <button
        onClick={() => router.back()}
        className={`flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-black transition cursor-pointer`}
      >
        <IoArrowBack size={18} />
        Quay lại
      </button>
      <div className="bg-white rounded-3xl overflow-hidden shadow drop-shadow-xl px-4 py-4">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div
              key={activity._id}
              onClick={() => onSelect(activity)}
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition p-4"
            >
              <img
                src={activity.image}
                className="h-32 w-full object-cover rounded-lg"
              />

              <h3 className="font-semibold mt-3">{activity.activity_name}</h3>

              <p className="text-sm text-gray-500">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepChooseActivity;
