import FormAddAccount from "./components/FormAddAccount";
import { fetchServer } from "@/lib/fetchServer";
import { API_URL } from "@/configs/appRoute";

const AccountPage = async () => {
  // Thực hiện lấy dữ liệu song song trên Server cực nhanh
  const [provincesRes, farmTypesRes] = await Promise.all([
    fetchServer(API_URL.getProvince),
    fetchServer(API_URL.getFarmType),
  ]);

  const provincesData = provincesRes.ok
    ? await provincesRes.json()
    : { data: [] };
  const farmTypesData = farmTypesRes.ok ? await farmTypesRes.json() : [];

  return (
    <div className="mx-auto container">
      <FormAddAccount
        initialProvinces={provincesData?.data || []}
        initialFarmTypes={farmTypesData || []}
      />
    </div>
  );
};

export default AccountPage;
