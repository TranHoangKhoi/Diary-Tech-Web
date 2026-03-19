"use client";

import React from "react";
import { IoArrowBack } from "react-icons/io5";

interface Props {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
}

const StepBackButton = ({ currentStep, setCurrentStep, className }: Props) => {
  if (currentStep <= 1) return null;

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-black transition ${className} cursor-pointer`}
    >
      <IoArrowBack size={18} />
      Quay lại
    </button>
  );
};

export default StepBackButton;
