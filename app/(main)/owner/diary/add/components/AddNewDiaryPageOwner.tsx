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
    null
  );
  const [selectedDiary, setSelectedDiary] = useState<any>(null);
  const [farms, setFarms] = useState<any[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<any>(null);
  const farmId = searchParams.get("farmId");
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
          selectedFarm?.farm_type_id?._id
        );
        setActivities(res);
        setLoading(false);
      };

      handleGetActivities();
    }
  }, [selectedFarm]);

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
