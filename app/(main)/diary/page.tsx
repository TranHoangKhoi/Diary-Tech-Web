import DiaryPage from "./components/Diarypage";

export const metadata = {
  title: "Danh sách hoạt động nhật ký",
  description: "Danh sách hoạt động được ghi lại của nông trại",
};

export default function Diary() {
  return (
    <div className="">
      <main className="py-7">
        <DiaryPage />
      </main>
    </div>
  );
}
