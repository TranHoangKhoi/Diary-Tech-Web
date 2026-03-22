import UserHydrator from "@/middleware/UserHydrator";
import { getProfileServer } from "@/services/auth.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Bản đồ nông nghiệp",
  description: "Quan sát phân bố nông nghiệp trục quan dưới dạng bản đồ số.",
};

const MapLayout = async ({ children }: { children: React.ReactNode }) => {
  // Lấy token và profile (Middleware đã đảm nhiệm việc điều hướng nếu mất token)
  // const cookieStore = cookies();
  // const token = (await cookieStore).get("token")?.value;
  // const profile = await getProfileServer(token);

  return (
    <>
      {/* <UserHydrator user={profile.data.user} /> */}
      <main className="">{children}</main>
    </>
  );
};

export default MapLayout;
