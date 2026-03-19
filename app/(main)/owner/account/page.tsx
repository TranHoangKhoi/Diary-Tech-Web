import { BsFillHouseAddFill, BsFillTelephoneFill } from "react-icons/bs";
import { FaArrowRightLong, FaLock, FaUserLarge } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";
import UploadFileField from "./components/UploadFileField";
import FormAddAccount from "./components/FormAddAccount";

const AccountPage = () => {
  return (
    <div className="mx-auto container">
      <FormAddAccount />
    </div>
  );
};

export default AccountPage;
