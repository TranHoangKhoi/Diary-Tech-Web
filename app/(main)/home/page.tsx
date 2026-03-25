"use client";

import FarmerHomePage from "@/components/FarmerHomePage";
import HomePage from "@/components/HomePage";
import { ROLE } from "@/configs/appConfig";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function HomePageRouter() {
  const userProfile = useSelector(
    (state: RootState) => state.userProfile.profile,
  );

  const isFarmer = userProfile?.role === ROLE.SubAccount;

  return (
    <main className="py-7">{isFarmer ? <FarmerHomePage /> : <HomePage />}</main>
  );
}
