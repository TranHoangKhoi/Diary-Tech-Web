import { PiImagesDuotone } from "react-icons/pi";
import ImageUploadField from "./ImageUploadField";
import { UseFormWatch } from "react-hook-form";

interface Props {
  field: any;
  register: any;
  setValue: any;
  watch: UseFormWatch<Record<string, unknown>>;
}

export const DynamicField = ({ field, register, setValue, watch }: Props) => {
  const base =
    "w-full bg-secondary rounded-xl py-3.5 px-4 border border-gray-300 text-sm outline-none focus:border-primary";

  switch (field.field_type) {
    case "text":
      return (
        <input
          className={base}
          {...register(field._id)}
          placeholder={field.field_name}
        />
      );

    case "number":
      return <input type="number" className={base} {...register(field._id)} />;

    case "date":
      const today = new Date().toISOString().split("T")[0];
      return (
        <input
          defaultValue={today}
          type="date"
          className={base}
          {...register(field._id)}
        />
      );

    case "image":
      return (
        <ImageUploadField
          field={field}
          register={register}
          setValue={setValue}
          watch={watch}
        />
      );

    default:
      return null;
  }
};
