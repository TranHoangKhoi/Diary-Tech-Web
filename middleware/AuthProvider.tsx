// \middleware\AuthProvider.tsx

"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { getProfile } from "@/services/auth.service";
import { setUserProfile } from "@/store/slices/user.slice";
import { appRoute } from "@/configs/appRoute";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getProfile();
        dispatch(setUserProfile(res.data.user));

        if (pathname === appRoute.login) {
          router.replace(appRoute.home);
        }
      } catch (error) {
        if (pathname !== appRoute.login) {
          router.replace(appRoute.login);
        }
      }
    };

    checkAuth();
  }, [pathname]);

  return <>{children}</>;
}
