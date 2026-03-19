"use client";

import React, { useEffect, useState } from "react";
import AsideStep from "./components/AsideStep";
import ContentRight from "./components/ContentRight";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getActivitiesByFarmTypeId } from "@/services/activities.service";
import { IActivities } from "@/types/TypeActitvities";
import { getBookByFarmId } from "@/services/productionBook.service";
import { IProductionBook } from "@/types/TypeBook";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AddNewDiaryPage = () => {
  const currentFarm = useSelector((state: RootState) => state.farm.currentFarm);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<IActivities[]>([]);
  const [productionBook, setProductionBook] = useState<IProductionBook[]>([]);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<IActivities | null>(
    null
  );
  const [selectedDiary, setSelectedDiary] = useState<any>(null);
  const addId = searchParams.get("addId");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (currentFarm?.farm_type_id?._id) {
      const handleGetActivities = async () => {
        setLoading(true);
        const res = await getActivitiesByFarmTypeId(
          currentFarm?.farm_type_id?._id
        );
        setActivities(res);
        setLoading(false);
      };

      handleGetActivities();
    }
  }, [currentFarm]);

  useEffect(() => {
    if (currentFarm?.farm_type_id?._id) {
      const handleGetBook = async () => {
        setLoading(true);
        const res = await getBookByFarmId(currentFarm?._id);
        setProductionBook(res.data);
        // setActivities(res);
        setLoading(false);
      };

      handleGetBook();
    }
  }, [currentFarm]);

  useEffect(() => {
    if (!addId || activities.length === 0) return;

    const activity = activities.find((item) => item._id === addId);

    if (activity) {
      setSelectedActivity(activity);
      setCurrentStep(2);
      router.replace(pathname);
    }
  }, [addId, activities]);

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
        farmId={currentFarm?._id}
      />
    </div>
  );
};

export default AddNewDiaryPage;
