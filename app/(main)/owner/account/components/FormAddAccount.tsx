"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsFillHouseAddFill, BsFillTelephoneFill } from "react-icons/bs";
import UploadFileField from "./UploadFileField";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaArrowRightLong, FaLock, FaUserLarge, FaEye, FaEyeSlash } from "react-icons/fa6";
import MapPicker from "./MapPicker";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { farmSchema } from "./validateFormAdd";
import { getFarmType } from "@/services/farmType.service";
import { IFarmType } from "@/types/TypeFarmTypes";
import { getProvince, getWards } from "@/services/map.service";
import { IProvince, IWard } from "@/types/TypeFarm";
import Select from "react-select";
import { createNewAccountFarm } from "@/services/farm.service";
import LoadingOverlay from "./LoadingCreateAcc";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { Cloudinary } from "@/configs/appConfig";
import CreateFarmSuccessDialog from "./CreateFarmSuccess";
import { useRouter } from "next/navigation";
import { getCrops } from "@/services/cropCate.service";

const areaValue = [
  { value: "ha", label: "Hectare (ha)" },
  { value: "m²", label: "Mét vuông (m²)" },
];

interface FormAddAccountProps {
  initialProvinces: IProvince[];
  initialFarmTypes: IFarmType[];
}

const FormAddAccount = ({ initialProvinces, initialFarmTypes }: FormAddAccountProps) => {
  const router = useRouter();
  const [geoLocation, setGeoLocation] = useState<[number, number] | null>(null);
  const [polygon, setPolygon] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [wards, setWards] = useState<IWard[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [crops, setCrops] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const mapRef = useRef<any>(null);
  const { setFocus } = useForm();

  const uploadRef = useRef<any>(null);

  const onError = (errors: any) => {
    const firstError = Object.keys(errors)[0];

    if (firstError) {
      setFocus(firstError);
    }
  };

  const { uploadImages, progress, uploaded, total, uploading, error } =
    useCloudinaryUpload({
      uploadPreset: Cloudinary.PRESET,
    });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(farmSchema),
  });

  const optionsProvince = initialProvinces.map((p) => ({
    value: p.province_code,
    label: p.name,
    data: p,
  }));

  const optionsFarmType = initialFarmTypes.map((p) => ({
    value: p._id,
    label: p.type_name,
  }));

  const optionsWard = wards.map((w) => ({
    value: w.ward_code,
    label: w.name,
    data: w,
  }));

  const optionsCrops = crops.map((c) => ({
    value: c._id,
    label: c.name,
    data: c,
  }));

  const handleGetWards = async (provinceCode) => {
    try {
      const res = await getWards(provinceCode);
      setWards(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetFarmCrops = async (farmTypeId: string) => {
    try {
      // setLoading(true);
      const res = await getCrops(farmTypeId);
      // setFarmTypes(res);
      console.log("handleGetFarmCrops: ", res);
      setCrops(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  const handleContinue = () => {
    reset();

    setAvatarFile(null);
    setPolygon(null);
    setGeoLocation(null);
    setServerError(null);

    mapRef.current?.resetMap();
    uploadRef.current?.reset(); // 👈 reset preview

    setShowSuccessDialog(false);
  };

  const handleGeneratePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setValue("password", password, { shouldValidate: true });
    setShowPassword(true);
  };

  const handleBack = () => {
    router.push("/owner/farms"); // trang danh sách bạn muốn
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      setServerError(null);

      let avatarUrl = "";

      // nếu user chọn file
      if (avatarFile instanceof File) {
        const urls = await uploadImages([avatarFile]);
        avatarUrl = urls[0];
      }

      const formData = new FormData();

      formData.append("farm_name", data.farm_name);
      formData.append("farm_type_id", data.farm_type_id);
      formData.append("location", data.location);
      formData.append("description", data.description || "");
      formData.append("area", data.area);
      formData.append("unit", data.unit || "ha");

      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      formData.append("crop_id", data.crop_id);

      console.log("data.crop_id: ", data.crop_id);

      if (geoLocation) {
        formData.append("geo_location", geoLocation.join(","));
      }

      if (polygon) {
        formData.append("polygon", JSON.stringify(polygon));
      }

      const provData = optionsProvince.find(p => p.value === data.province_code)?.data;
      const wardData = optionsWard.find(w => w.value === data.ward_code)?.data;
      if (provData) formData.append("province", JSON.stringify(provData));
      if (wardData) formData.append("ward", JSON.stringify(wardData));

      // gửi URL thay vì file
      formData.append("avatar", avatarUrl);

      const res = await createNewAccountFarm(formData);

      if (!res.success) {
        setServerError(res.message);
      }

      setShowSuccessDialog(true);
    } catch (error: any) {
      setServerError(error.message || "Có lỗi xảy ra khi tạo tài khoản");
    } finally {
      setLoading(false);
    }
  };

  // Bỏ hẳn useEffect gọi Tỉnh và FarmType đi, nó đã được Server lo!

  return (
    <main className="w-full py-7">
      {/* Page Header */}
      <CreateFarmSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        onContinue={handleContinue}
        onBack={handleBack}
      />
      <div className="mb-10">
        <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight">
          Thêm tài khoản mới
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base mt-2">
          Tạo tài khoản và quản lý hoạt động trang trại nhanh chỉ với vài thao
          tác.
        </p>
      </div>

      <LoadingOverlay show={loading} />

      <form
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {/* Section 1: Farm Information (Left Column) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white dark:bg-slate-900/40 rounded-xl shadow-sm border border-primary/5 overflow-hidden">
            <div className="bg-primary px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-white flex items-center justify-center rounded-full shadow drop-shadow-2xl">
                  <BsFillHouseAddFill className="text-primary " size={20} />
                </div>
                <h2 className=" font-bold flex items-center gap-2 text-white">
                  Thông tin hộ kinh doanh
                </h2>
              </div>
            </div>
            <div className="space-y-6 px-6 py-6">
              {/* Image Upload */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-black dark:text-slate-300">
                  Hình ảnh đại diện
                </label>
                <div className="">
                  <UploadFileField
                    ref={uploadRef}
                    onChange={(file) => {
                      setAvatarFile(file);

                      setValue("avatar", file, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Farm Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black dark:text-slate-300">
                    Tên hộ kinh doanh
                  </label>
                  <div>
                    <input
                      {...register("farm_name")}
                      className="w-full rounded-lg shadow py-2 px-4 text-sm text-black outline-none border border-gray-200 bg-secondary/50"
                      placeholder="Tên hộ kinh doanh"
                      type="text"
                    />
                  </div>
                  {errors.farm_name && (
                    <p className="text-red-500 text-xs">
                      {errors.farm_name.message}
                    </p>
                  )}
                </div>
                {/* Farm Type */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black dark:text-slate-300">
                    Kiểu hộ
                  </label>
                  <Controller
                    name="farm_type_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsFarmType}
                        className="bg-secondary text-sm"
                        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                        placeholder="Chọn kiểu hộ kinh doanh"
                        value={optionsFarmType.find(c => c.value === field.value)}
                        onChange={(val) => {
                          field.onChange(val?.value);
                          handleGetFarmCrops(val?.value as string);
                          setCrops([]);
                          setValue("crop_id", "");
                        }}
                      />
                    )}
                  />
                  {errors.farm_type_id && (
                    <p className="text-red-500 text-xs">
                      {errors.farm_type_id.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black dark:text-slate-300">
                    Loại hình
                  </label>
                  <Controller
                    name="crop_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsCrops}
                        isDisabled={!crops.length}
                        className="bg-secondary text-sm"
                        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                        placeholder="Chọn loại hình"
                        value={optionsCrops.find(c => c.value === field.value) || null}
                        onChange={(val) => field.onChange(val?.value)}
                      />
                    )}
                  />
                  {errors.crop_id && (
                    <p className="text-red-500 text-xs">
                      {errors.crop_id.message}
                    </p>
                  )}
                </div>

                {/* Farm Area */}
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black dark:text-slate-300">
                    Diện tích
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1 gap-2 flex flex-col">
                      <input
                        {...register("area")}
                        className="w-full rounded-lg shadow py-2 px-4 text-sm text-black outline-none border border-gray-200 bg-secondary/50"
                        placeholder="Diện tích (số)"
                        type="number"
                      />
                      {errors.area && (
                        <p className="text-red-500 text-xs">
                          {errors.area.message}
                        </p>
                      )}
                    </div>

                    <select
                      {...register("unit")}
                      defaultValue="ha"
                      className="rounded-lg shadow py-2 px-4 text-sm text-black outline-none border border-gray-200 bg-secondary/50 h-9.5"
                    >
                      {areaValue.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black dark:text-slate-300">
                    Tỉnh / Thành phố
                  </label>
                  <Controller
                    name="province_code"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsProvince}
                        placeholder="Chọn tỉnh thành..."
                        menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                        value={optionsProvince.find(c => c.value === field.value)}
                        onChange={(val) => {
                          field.onChange(val?.value);
                          setValue("ward_code", "");
                          handleGetWards(val?.value);
                        }}
                      />
                    )}
                  />

                  {errors.province_code && (
                    <p className="text-red-500 text-xs">
                      {errors.province_code.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black dark:text-slate-300">
                    Quận / Huyện
                  </label>
                  <Controller
                    name="ward_code"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsWard}
                        placeholder="Chọn phường/xã..."
                        isDisabled={!wards.length}
                        menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                        value={optionsWard.find(c => c.value === field.value) || null}
                        onChange={(val) => field.onChange(val?.value)}
                      />
                    )}
                  />
                  {errors.ward_code && (
                    <p className="text-red-500 text-xs">
                      {errors.ward_code.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black dark:text-slate-300">
                    Địa chỉ
                  </label>
                  <input
                    {...register("location")}
                    className="rounded-lg shadow py-2 px-4 text-sm text-black outline-none border border-gray-200 bg-secondary/50"
                    placeholder="Địa chỉ chi tiết"
                    type="text"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Map Picker */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-black dark:text-slate-300">
                  Tọa độ
                </label>
                <div className={`relative w-full h-100 rounded-xl overflow-hidden border ${errors.geo_location || errors.polygon ? "border-red-500" : "border-primary/20"} map-placeholder`}>
                  <MapPicker
                    ref={mapRef}
                    onChange={(data) => {
                      if (data.point) {
                        setGeoLocation(data.point);
                        setValue("geo_location", data.point, { shouldValidate: true });
                      }
                      if (data.polygon) {
                        setPolygon(data.polygon);
                        setValue("polygon", data.polygon, { shouldValidate: true });
                      }
                    }}
                  />

                  <div className="absolute bottom-4 left-4 right-4 bg-white/50 backdrop-blur py-2 px-3 rounded-lg flex justify-between items-center text-xs font-mono shadow-lg border border-primary/10">
                    <div className="flex gap-4">
                      <span>
                        LAT:{" "}
                        {geoLocation?.length > 0
                          ? geoLocation[1]
                          : "Đang xác định vị trí"}
                      </span>
                      <span>
                        LONG:{" "}
                        {geoLocation?.length > 0
                          ? geoLocation[0]
                          : "Đang xác định vị trí"}
                      </span>
                    </div>
                    <button
                      className="bg-primary font-bold py-2 px-6 rounded-2xl text-white hover:opacity-70 cursor-pointer"
                      type="button"
                    >
                      Tọa độ của tôi
                    </button>
                  </div>
                </div>
                <div className="flex gap-4 px-2">
                  {errors.geo_location && (
                    <p className="text-red-500 text-xs">
                      {errors.geo_location.message as string}
                    </p>
                  )}
                  {errors.polygon && (
                    <p className="text-red-500 text-xs">
                      {errors.polygon.message as string}
                    </p>
                  )}
                </div>
              </div>
              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-black dark:text-slate-300">
                  Mô tả
                </label>
                <textarea
                  {...register("description")}
                  className="rounded-lg shadow py-2 px-4 text-sm text-black outline-none border border-gray-200 bg-secondary/50"
                  placeholder="Mô tả ngắn gọn bố cục trang trại, các loại cây trồng chính và điều kiện đất đai..."
                  rows={4}
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Farm Manager Account (Right Column) */}

        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-primary/5 sticky top-24 overflow-hidden">
            <div className="bg-primary px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-white flex items-center justify-center rounded-full shadow drop-shadow-2xl">
                  <RiAccountCircleFill className="text-primary " size={20} />
                </div>
                <h2 className=" font-bold flex items-center gap-2 text-white">
                  Thông tin tài khoản
                </h2>
              </div>
            </div>
            <div className="space-y-6 p-6">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-black dark:text-slate-300">
                  Họ và tên
                </label>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-3 items-center justify-center flex">
                    <FaUserLarge className="text-gray-500" size={14} />
                  </div>

                  <input
                    {...register("name")}
                    className="rounded-lg shadow py-2 px-4 text-sm text-black outline-none border border-gray-200 bg-secondary/50 w-full pl-10"
                    placeholder="Họ và tên"
                    type="text"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs pt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-black dark:text-slate-300">
                  Số điện thoại
                </label>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-3 items-center justify-center flex">
                    <BsFillTelephoneFill className="text-gray-500" size={14} />
                  </div>
                  <input
                    {...register("phone")}
                    className="rounded-lg shadow py-2 px-4 text-sm text-black outline-none border border-gray-200 bg-secondary/50 w-full pl-10"
                    placeholder="0932 123 456"
                    type="tel"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs pt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              {/* Password */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-black dark:text-slate-300">
                    Mật khẩu
                  </label>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    className="text-xs text-primary cursor-pointer hover:underline font-medium"
                  >
                    Tạo mật khẩu ngẫu nhiên
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-3 items-center justify-center flex">
                    <FaLock className="text-gray-500" size={14} />
                  </div>
                  <input
                    {...register("password")}
                    className="rounded-lg shadow py-2 px-4 text-sm text-black outline-none border border-gray-200 bg-secondary/50 w-full pl-10 pr-10"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-0 bottom-0 text-sm right-3 flex items-center justify-center text-gray-500 hover:text-primary cursor-pointer"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs pt-1">
                    {errors.password.message}
                  </p>
                )}
                <p className="text-[10px] text-slate-400 font-medium italic">
                  Mật khẩu ít nhất 6 ký tự
                </p>
              </div>

              <div className="flex items-center justify-end gap-4 px-4 lg:px-0">
                <button
                  onClick={handleContinue}
                  className="px-6 py-3 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  type="button"
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                  type="submit"
                >
                  <span>Tạo tài khoản</span>
                  <FaArrowRightLong className="text-white" size={14} />
                </button>
              </div>
              {serverError && (
                <p className="text-red-400 text-sm font-medium text-center">
                  {serverError}
                </p>
              )}
            </div>
          </div>
          {/* Actions */}
        </div>
      </form>
    </main>
  );
};

export default FormAddAccount;
