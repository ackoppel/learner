import { toast } from "react-toastify";

interface IUseMessage {
  success: (message: string) => void;
  error: (message: string) => void;
}

export const useMessage = (): IUseMessage => {
  const success = (message: string) => {
    return toast.dark(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const error = (message: string) => {
    return toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return {
    success,
    error,
  };
};
