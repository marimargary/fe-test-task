import { ButtonProps, Button as MuiButton } from "@mui/material";
import { ReactNode } from "react";

interface Props extends ButtonProps {
  children: ReactNode;
  theme?: "main" | "light";
}

const Button = ({ children, theme = "main", ...props }: Props) => {
  return (
    <MuiButton
      {...props}
      sx={{
        padding: "8px 15px",
        minWidth: "120px",
        maxWidth: "100%",
        bgcolor: theme === "light" ? "#eee" : "primary.main",
        color: theme === "light" ? "#181A20" : "#fff",
        fontFamily: "Roboto",
        fontWeight: 500,
        borderRadius: "8px",
        fontSize: "16px",
        textTransform: "none",
        ":hover": {
          bgcolor: theme === "light" ? "grey.400" : "primary.400",
        },
        ...props.sx,
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
