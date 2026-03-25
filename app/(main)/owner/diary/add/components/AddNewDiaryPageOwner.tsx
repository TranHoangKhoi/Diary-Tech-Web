"use client";

import React, { useEffect, useState } from "react";
import AsideStep from "./AsideStep";
import ContentRight from "./ContentRight";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IActivities } from "@/types/TypeActitvities";
import { IProductionBook } from "@/types/TypeBook";
import { getFarmsByOwner } from "@/services/farm.service";
import { getActivitiesByFarmTypeId } from "@/services/activities.service";
import { getBookByFarmId } from "@/services/productionBook.service";

interface Props {}

const AddNewDiaryPageOwner = (props: Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<IActivities[]>([]);
  const [productionBook, setProductionBook] = useState<IProductionBook[]>([]);

  const [selectedActivity, setSelectedActivity] = useState<IActivities | null>(
    null,
  );
  const [selectedDiary, setSelectedDiary] = useState<any>(null);
  const [farms, setFarms] = useState<any[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<any>(null);
  const farmId = searchParams.get("farmId");
  const addId = searchParams.get("addId");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleGetListFarm = async () => {
      try {
        const res = await getFarmsByOwner();
        setFarms(res.data);
        console.log("handleGetListFarm: ", res);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    handleGetListFarm();
  }, []);

  useEffect(() => {
    if (selectedFarm?.farm_type_id?._id) {
      const handleGetBook = async () => {
        setLoading(true);
        const res = await getBookByFarmId(selectedFarm?._id);
        setProductionBook(res.data);
        // setActivities(res);
        setLoading(false);
      };

      handleGetBook();
    }
  }, [selectedFarm]);

  useEffect(() => {
    if (selectedFarm?.farm_type_id?._id) {
      const handleGetActivities = async () => {
        setLoading(true);
        const res = await getActivitiesByFarmTypeId(
          selectedFarm?.farm_type_id?._id,
        );
        setActivities(res);
        setLoading(false);
      };

      handleGetActivities();
    }
  }, [selectedFarm]);

  // Xử lý tự động chọn Farm khi có farmId từ params
  useEffect(() => {
    // Chỉ kích hoạt nếu có dữ liệu farms, có farmId và chưa có selectedFarm
    if (farms?.length > 0 && farmId && !selectedFarm) {
      const foundFarm = farms.find((f: any) => String(f._id) === farmId);
      
      if (foundFarm) {
        setSelectedFarm(foundFarm);
        // Nếu không có addId thì nhảy sang bước 2 (mặc định bước kế), 
        // Nếu có addId thì chờ logic bên dưới bắt và nhảy sang bước 3
        if (!addId) {
          setCurrentStep(2); // Giả sử Bước 2 là chọn hoạt động/nhật ký
        }
      }
    }
  }, [farms, farmId, selectedFarm, addId]);

  // Xử lý tự động chọn Activity khi có addId từ params
  useEffect(() => {
    // Chỉ kích hoạt nếu có dữ liệu activities, có addId và chưa có selectedActivity
    if (activities?.length > 0 && addId && !selectedActivity) {
      const foundActivity = activities.find(
        (a: IActivities) => String(a._id) === addId
      );
      
      if (foundActivity) {
        setSelectedActivity(foundActivity);
        // Tự động tiếp tục nhảy sang bước tiếp theo (Giả sử Bước 3 là nhập chi tiết)
        // Dùng Math.max để đảm bảo không bị lùi step nếu user đang ở step cao hơn
        setCurrentStep((prev) => Math.max(prev, 3)); 
      }
    }
  }, [activities, addId, selectedActivity]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <AsideStep currentStep={currentStep} />

      <ContentRight
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        activities={activities}
        selectedActivity={selectedActivity}
        setSelectedActivity={setSelectedActivity}
        selectedDiary={selectedDiary}
        setSelectedDiary={setSelectedDiary}
        productionBook={productionBook}
        farms={farms}
        selectedFarm={selectedFarm}
        setSelectedFarm={setSelectedFarm}
      />
    </div>
  );
};

export default AddNewDiaryPageOwner;
