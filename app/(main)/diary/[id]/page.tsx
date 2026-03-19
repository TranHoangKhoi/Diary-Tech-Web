import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

import DetailsDiaryContent from "./DetailsDiaryContent";

export const metadata = {
  title: "Chi tiết hoạt động",
  description: "Chi tiết hoạt động được ghi lại của nhật ký",
};

const DetailsDiary = () => {
  return (
    <div className="">
      <main className="py-7">
        <DetailsDiaryContent />
      </main>
    </div>
  );
};

export default DetailsDiary;
