import UserHydrator from "@/middleware/UserHydrator";
import { getProfileServer } from "@/services/auth.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Bản đồ nông nghiệp",
  description: "Quan sát phân bố nông nghiệp trục quan dưới dạng bản đồ số.",
};

const MapLayout = async ({ children }: { children: React.ReactNode }) => {
  // const cookieStore = cookies();
  // const token = (await cookieStore).get("token")?.value;

  // if (!token) {
  //   redirect("/login");
  // }

  // const profile = await getProfileServer(token);

  return (
    <>
      {/* <UserHydrator user={profile.data.user} /> */}
      <main className="">{children}</main>
    </>
  );
};

export default MapLayout;
