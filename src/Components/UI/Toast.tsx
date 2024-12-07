import React, { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeToast } from "../../Store/slices/toastsSlice";

export type ToastProps = {
  id?: string;
  message: string;
  variant: "standard" | "filled" | "outlined";
  info: "success" | "info" | "warning" | "error";
  timeout?: number;
};

const Toast: React.FC<ToastProps> = ({ id, message, variant, info, timeout = 3000 }) => {
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const hideTimeout = setTimeout(() => {
      setVisible(false);
    }, timeout - 300);

    const removeTimeout = setTimeout(() => {
      dispatch(removeToast(id || ""));
    }, timeout);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(removeTimeout);
    };
  }, [dispatch, id, timeout]);

  return (
    <div className={`toast ${visible ? "toast-enter" : "toast-exit"}`} data-testid="success-toast">
      <Alert
        variant={variant}
        severity={info}
        sx={{
          fontFamily: "Roboto",
          fontWeight: 500,
          transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {message}
      </Alert>
    </div>
  );
};

export default Toast;
