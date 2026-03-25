"use client";

import { IActivities } from "@/types/TypeActitvities";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiImagesDuotone } from "react-icons/pi";
import { IProductionBook } from "@/types/TypeBook";
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
import StepChooseActivity from "@/app/(main)/diary/add/components/StepChooseActivity";
import StepBackButton from "@/app/(main)/diary/add/components/StepBackButton";
import CreateLogSuccessDialog from "@/app/(main)/diary/add/components/CreateLogSuccessDialog";
import { generateSchema } from "@/app/(main)/diary/add/components/validateForm";
import StepChooseFarm from "./StepChooseFarm";
import StepAddForm from "./StepAddForm";
import SelectedFarmCard from "./SelectedFarmCard";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface Props {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  activities: IActivities[];
  selectedActivity: IActivities;
  setSelectedActivity: React.Dispatch<React.SetStateAction<IActivities>>;
  selectedDiary: any;
  setSelectedDiary: React.Dispatch<any>;
  productionBook: IProductionBook[];
  selectedFarm: any;
  farms: any[];
  setSelectedFarm: React.Dispatch<any>;
}

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
    farms,
    selectedFarm,
    setSelectedFarm,
  } = props;

  if (currentStep === 1) {
    return (
      <>
        <StepChooseFarm
          farms={farms}
          onSelect={(farm) => {
            setSelectedFarm(farm);
            setCurrentStep(2);
          }}
        />
      </>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="flex flex-col col-span-3 gap-4">
        <StepBackButton
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />

        <SelectedFarmCard
          farm={selectedFarm}
          onChange={() => {
            setCurrentStep(1);
          }}
        />

        <StepChooseActivity
          activities={activities}
          onSelect={(activity) => {
            setSelectedActivity(activity);
            setCurrentStep(3);
          }}
        />
      </div>
    );
  }

  if (currentStep >= 3) {
    return (
      <StepAddForm
        selectedActivity={selectedActivity}
        farmId={selectedFarm._id}
        selectedDiary={selectedDiary}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setSelectedDiary={setSelectedDiary}
        productionBook={productionBook}
        selectedFarm={selectedFarm}
      />
    );
  }
};

export default ContentRight;
