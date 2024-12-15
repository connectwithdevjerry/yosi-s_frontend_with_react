import { Slide, toast } from "react-toastify";

const myAlert = (message, error = false) => {
  if (error) {
    return toast.error(message, {
      position: "top-center",
      autoClose: 3000, //3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Slide,
    });
  }
  return toast.success(message, {
    position: "top-center",
    autoClose: 3000, //3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
  });
};

export default myAlert;
