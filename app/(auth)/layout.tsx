import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { appRoute } from "@/configs/appRoute";

const LoginLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (token) {
    redirect(appRoute.home);
  }

  return (
    <>
      <main className="">{children}</main>
    </>
  );
};

export default LoginLayout;
