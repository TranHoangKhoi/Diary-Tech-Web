import { Toaster } from "sonner";
import AddNewDiaryPageOwner from "./components/AddNewDiaryPageOwner";

export const metadata = {
  title: "Thêm nhật ký mới",
  description: "Cập nhật hoạt động cho nông trại",
};

const AddNewDiaryLogsByOwner = () => {
  return (
    <div className="container mx-auto py-7">
      <Toaster position="top-right" richColors />
      <AddNewDiaryPageOwner />
    </div>
  );
};

export default AddNewDiaryLogsByOwner;
