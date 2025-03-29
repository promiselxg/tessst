import Swal from "sweetalert2";
import { apiCall } from "./api";

export const handleDeleteBtn = (url, onSuccess) => {
  Swal.fire({
    title: "Please confirm action.",
    text: "Do you want to delete this item?",
    showCancelButton: true,
    confirmButtonText: "Delete",
    showLoaderOnConfirm: true,
    confirmButtonColor: "#d33",
    preConfirm: async () => {
      try {
        const response = await apiCall("delete", url);
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
        title: "Deleted successfully.",
        text: "",
        icon: "success",
        confirmButtonText: "Ok",
        showCancelButton: false,
      }).then((status) => {
        if (status.isConfirmed) {
          onSuccess();
        }
      });
    }
  });
};
