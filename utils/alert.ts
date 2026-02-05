import Swal from "sweetalert2";

export const showError = (message: string) => {
  Swal.fire({
    icon: "error",
    title: "Có lỗi xảy ra",
    text: message,
    confirmButtonText: "Đã hiểu",
    confirmButtonColor: "#d33",
  });
};

export const showSuccess = (message: string) => {
  Swal.fire({
    icon: "success",
    title: "Thành công",
    text: message,
    confirmButtonText: "OK",
    confirmButtonColor: "#16a34a",
  });
};
