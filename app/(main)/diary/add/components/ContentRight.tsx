"use client";

import { IActivities } from "@/types/TypeActitvities";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiImagesDuotone } from "react-icons/pi";
import StepChooseActivity from "./StepChooseActivity";
import StepBackButton from "./StepBackButton";
import { IProductionBook } from "@/types/TypeBook";
import { generateSchema } from "./validateForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DynamicField } from "@/components/forms/DynamicField";
import { Cloudinary } from "@/configs/appConfig";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import z from "zod";
import { crateProductionLogs } from "@/services/diary.service";
import { toast } from "sonner";
import CreateLogSuccessDialog from "./CreateLogSuccessDialog";

interface Props {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  activities: IActivities[];
  selectedActivity: IActivities;
  setSelectedActivity: React.Dispatch<React.SetStateAction<IActivities>>;
  selectedDiary: any;
  setSelectedDiary: React.Dispatch<any>;
  productionBook: IProductionBook[];
  farmId: string;
}

const transformData = (formData: any, fields: any[] = []) => {
  const result: Record<string, any> = {};

  fields.forEach((field) => {
    const value = formData?.[field._id];

    if (value !== undefined) {
      result[field.field_name] = value;
    }

    if (field.field_type === "date" && value) {
      result[field.field_name] = new Date(value).toISOString();
    } else {
      result[field.field_name] = value;
    }
  });

  return result;
};

const today = new Date().toISOString().split("T")[0];

const ContentRight = (props: Props) => {
  const {
    activities,
    currentStep,
    selectedActivity,
    selectedDiary,
    productionBook,
    setCurrentStep,
    setSelectedActivity,
    setSelectedDiary,
    farmId,
  } = props;

  if (currentStep === 1) {
    return (
      <StepChooseActivity
        activities={activities}
        onSelect={(activity) => {
          setSelectedActivity(activity);
          setCurrentStep(2);
        }}
      />
    );
  } else {
    const [submitting, setSubmitting] = useState(false);
    const [submitProgress, setSubmitProgress] = useState(0);
    const [submitStage, setSubmitStage] = useState("");
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const schema = generateSchema(selectedActivity.fields).extend({
      date: z.string(),
      notes: z.string().optional(),
    });
    const userData = useSelector(
      (state: RootState) => state.userProfile.profile,
    );

    const { uploadImages, progress, uploaded, total, uploading, error } =
      useCloudinaryUpload({
        uploadPreset: Cloudinary.PRESET,
      });

    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      reset,
      watch,
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        date: today,
      },
    });

    const normalFields = selectedActivity?.fields?.filter(
      (f) => f.field_type !== "image",
    );

    const imageFields = selectedActivity?.fields?.filter(
      (f) => f.field_type === "image",
    );

    const resetValues: any = {
      date: today,
      notes: "",
    };

    selectedActivity.fields.forEach((f) => {
      resetValues[f._id] = f.field_type === "image" ? [] : "";
    });

    const onSubmit = async (formData: any) => {
      setSubmitting(true);
      setSubmitStage("Đang tải ảnh lên");

      const { date, notes, ...dynamicFields } = formData;

      const transformed = transformData(dynamicFields, selectedActivity.fields);

      const newData: any = { ...transformed };

      // Upload image
      for (const key in newData) {
        const value = newData[key];

        if (
          Array.isArray(value) &&
          value.length > 0 &&
          value[0] instanceof File
        ) {
          const urls = [];

          for (let i = 0; i < value.length; i++) {
            const url = await uploadImages([value[i]]);
            urls.push(url[0]);

            // progress 0 → 80
            const percent = Math.round(((i + 1) / value.length) * 80);
            setSubmitProgress(percent);
          }

          newData[key] = urls;
        }
      }

      setSubmitStage("Đang gửi dữ liệu");

      const payload = {
        activity_id: selectedActivity._id,
        data: newData,
        created_by: userData?._id,
        farm_id: farmId,
        book_id: selectedDiary,
        date: date
          ? new Date(date).toISOString()
          : new Date(today).toISOString(),
        notes: notes || "",
      };

      try {
        setSubmitProgress(90);

        await crateProductionLogs(payload);

        setShowSuccessDialog(true);

        setSubmitProgress(100);

        setTimeout(() => {
          setSubmitting(false);
        }, 500);
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        setSubmitProgress(0);
        toast.error("Lỗi", {
          description: "Thêm nhật ký thất bại",
        });
      }
    };

    const onError = (errors: any) => {
      const firstError = Object.keys(errors)[0];

      document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };

    return (
      <div className="lg:col-span-3">
        <StepBackButton
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          className="mb-6"
        />

        <CreateLogSuccessDialog
          open={showSuccessDialog}
          activityName={selectedActivity?.activity_name}
          onOpenChange={setShowSuccessDialog}
          onContinue={() => {
            setShowSuccessDialog(false);
            reset(resetValues);
          }}
          onBack={() => {
            setShowSuccessDialog(false);
            setCurrentStep(1);
          }}
        />

        {submitting && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-80">
              <h3 className="font-semibold mb-4">{submitStage}</h3>

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-primary h-3 transition-all duration-300"
                  style={{ width: `${submitProgress}%` }}
                />
              </div>

              <p className="text-sm mt-3 text-gray-600">{submitProgress}%</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl overflow-hidden shadow drop-shadow-xl">
          {/* Activities */}
          <div className="bg-primary px-6 py-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-20 bg-white/20 rounded-xl overflow-hidden shrink-0 border border-white/30">
              <img
                alt="Cánh đồng cây giống"
                className="w-full h-full object-cover"
                src={selectedActivity?.image}
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold text-white mb-1">
                {selectedActivity.activity_name}
              </h2>
              <p className="text-white text-sm opacity-90 leading-relaxed">
                {selectedActivity.description}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 md:p-10 space-y-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Production Book */}
                <div className="space-y-2 flex flex-col gap-1">
                  <label className="block text-sm font-semibold text-black">
                    Chọn cuốn nhật ký <span className="text-red-500">*</span>
                  </label>

                  <div className="relative w-full">
                    <select
                      value={selectedDiary}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedDiary(value);

                        if (value) {
                          setCurrentStep(3);
                        } else {
                          setCurrentStep(2);
                        }
                      }}
                      className="w-full bg-secondary border border-gray-200 rounded-xl py-3.5 pl-4 pr-10 text-black outline-none text-sm appearance-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Chọn nhật ký canh tác</option>

                      {productionBook.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>

                    <IoIosArrowDown
                      size={18}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    />
                  </div>
                </div>

                {currentStep === 3 && (
                  <>
                    {normalFields?.map((field) => (
                      <div
                        key={field._id}
                        className="space-y-2 flex flex-col gap-1"
                      >
                        <label className="text-sm font-semibold">
                          {field.field_name}

                          {field.is_required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>

                        <DynamicField
                          field={field}
                          register={register}
                          setValue={setValue}
                          watch={watch}
                        />

                        {errors[field._id] && (
                          <p className="text-red-500 text-xs">
                            {errors[field._id]?.message as string}
                          </p>
                        )}
                      </div>
                    ))}

                    {/* DATE FIELD */}
                    <div className="space-y-2 flex flex-col gap-1">
                      <label className="text-sm font-semibold">
                        Ngày ghi nhận
                        <span className="text-red-500 ml-1">*</span>
                      </label>

                      <input
                        type="date"
                        readOnly
                        className="w-full bg-secondary rounded-xl py-3.5 px-4 border border-gray-300 text-sm outline-none focus:border-primary"
                        {...register("date", { required: "Ngày là bắt buộc" })}
                      />

                      {errors.date && (
                        <p className="text-red-500 text-xs">
                          {errors.date.message as string}
                        </p>
                      )}
                    </div>

                    {/* NOTES FIELD */}
                    <div className="space-y-2 flex flex-col gap-1">
                      <label className="text-sm font-semibold">Ghi chú</label>

                      <textarea
                        rows={3}
                        className="w-full bg-secondary rounded-xl py-3.5 px-4 border border-gray-300 text-sm outline-none focus:border-primary"
                        placeholder="Nhập ghi chú..."
                        {...register("notes")}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {currentStep === 3 && (
              <>
                {imageFields?.map((field) => (
                  <div key={field._id} className="space-y-3 pt-4">
                    <label className="block text-sm font-semibold text-black">
                      {field.field_name}

                      {field.is_required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>

                    <DynamicField
                      field={field}
                      register={register}
                      setValue={setValue}
                      watch={watch}
                    />

                    {errors[field._id] && (
                      <p className="text-red-500 text-xs">
                        {errors[field._id]?.message as string}
                      </p>
                    )}
                  </div>
                ))}
              </>
            )}

            {currentStep === 3 && (
              <>
                <hr className="border-slate-100 " />
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
                  <button className="w-full sm:w-auto cursor-pointer px-8 py-3 text-black hover:opacity-70  font-semibold bg-secondary shadow drop-shadow  rounded-xl transition-colors text-sm hover:-translate-y-0.5 active:translate-y-0">
                    Hủy bỏ
                  </button>
                  <button
                    disabled={isSubmitting}
                    onClick={handleSubmit(onSubmit, onError)}
                    className="w-full sm:w-auto px-12 cursor-pointer py-3 bg-primary hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-700/20 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                  >
                    {isSubmitting ? "Đang lưu..." : "Lưu nhật ký"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ContentRight;
