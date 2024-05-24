import { Input as MuiInput, InputProps as MuiInputProps } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues = FieldValues> = MuiInputProps & {
  register?: UseFormRegister<T>;
};

const Input = forwardRef(function Input<T extends FieldValues = FieldValues>(
  { register, ...props }: InputProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className="relative">
      <MuiInput
        {...(register || {})}
        {...props}
        inputRef={ref}
        sx={{
          bgcolor: "#f9f9f9",
          borderRadius: "8px",
          outline: "none",
          borderColor: "#E0E0E0",
          overflow: "hidden",
          padding: "8px 14px",
          fontFamily: "Roboto",
          border: "1px solid #D0D5DD",
          "::before": {
            bgcolor: "transparent",
            display: "none !important",
            borderColor: "transparent",
            opacity: 0,
          },
          "&.Mui-focused": {
            borderColor: "primary.main",
          },
          "&.Mui-focused:after": {
            display: "none !important",
          },
          "& .MuiInputBase-input:placeholder": {
            color: "red",
          },
          ...props.sx,
        }}
      />
    </div>
  );
});

export default Input;
