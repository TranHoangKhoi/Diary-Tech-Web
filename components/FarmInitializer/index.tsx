"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setFarms, setFarmLoading } from "@/store/slices/farm.slice";
import { getMyFarms } from "@/services/farm.service";

export default function FarmInitializer() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userProfile.profile);

  useEffect(() => {
    if (!user) return;

    console.log("Get My Farm !");

    const fetchFarm = async () => {
      dispatch(setFarmLoading(true));

      try {
        const data = await getMyFarms();
        dispatch(setFarms(Array.isArray(data) ? data : [data]));

        console.log("My Farm: ", data);
      } catch (err) {
        console.error("Farm load error", err);
      } finally {
        dispatch(setFarmLoading(false));
      }
    };

    fetchFarm();
  }, [user]);

  return null;
}
