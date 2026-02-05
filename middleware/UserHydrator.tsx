// components/UserHydrator.tsx
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserProfile } from "@/store/slices/user.slice";

export default function UserHydrator({ user }: { user: any }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserProfile(user));
  }, [user]);

  return null;
}
