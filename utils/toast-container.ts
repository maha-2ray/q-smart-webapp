import { lazy } from "react";

export const ToastContainer = lazy(() =>
  import("react-toastify").then((module) => {
    return { default: module.ToastContainer };
  }),
);
