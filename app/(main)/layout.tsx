import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UserHydrator from "@/middleware/UserHydrator";
import { getProfile, getProfileServer } from "@/services/auth.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const profile = await getProfileServer(token);

  return (
    <>
      <UserHydrator user={profile.data.user} />
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
