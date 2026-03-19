import { IActivities } from "@/types/TypeActitvities";

interface Props {
  activities: IActivities[];
  onSelect: (activity: any) => void;
}

const StepChooseActivity = (props: Props) => {
  const { activities, onSelect } = props;

  return (
    <div className="lg:col-span-3">
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
