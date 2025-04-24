import Swal from "sweetalert2";
import { apiCall } from "./api";

export const handleDeleteBtn = (
  url,
  onSuccess,
  redirect,
  router,
  text = "Do you want to delete this item?",
  confirmText = "Delete",
  method = "delete",
  buttonColor = "#d33",
  successTitle = "Deleted successfully"
) => {
  Swal.fire({
    title: "Please confirm action.",
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    showLoaderOnConfirm: true,
    confirmButtonColor: buttonColor,
    preConfirm: async () => {
      try {
        const response = await apiCall(method, url);
        if (!response) {
          Swal.showValidationMessage("Error occures, try again");
        }
      } catch (error) {
        Swal.showValidationMessage("Request failed");
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: successTitle,
        icon: "success",
        confirmButtonText: "Ok",
        showCancelButton: false,
      }).then((status) => {
        if (status.isConfirmed) {
          if (redirect) {
            router.replace(redirect);
          } else {
            onSuccess();
          }
        }
      });
    }
  });
};
