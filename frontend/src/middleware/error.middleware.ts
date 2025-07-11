import toast from "react-hot-toast";

let activeToastId: string | null = null;

export const showErrorToast = (
  err: any,
  fallbackMessage = "Something went wrong"
) => {
  const errors = err?.response?.data?.errors;

  const message =
    (Array.isArray(errors) && errors.length > 0 && errors[0].msg) ||
    err?.response?.data?.message ||
    fallbackMessage;

  if (activeToastId) {
    toast.dismiss(activeToastId);
  }

  activeToastId = toast.error(message, {
    id: "error-toast",
    duration: 2000,
  });

  setTimeout(() => {
    activeToastId = null;
  }, 2000);
};
