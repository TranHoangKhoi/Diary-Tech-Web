import { Toaster } from "sonner";
import AddNewDiaryPage from "./AddNewDiaryPage";

export const metadata = {
  title: "Thêm nhật ký mới",
  description: "Cập nhật hoạt động cho nông trại",
};

const AddNewDiaryLogs = () => {
  return (
    <div className="container mx-auto py-7">
      <Toaster position="top-right" richColors />
      <AddNewDiaryPage />
    </div>
  );
};

export default AddNewDiaryLogs;
