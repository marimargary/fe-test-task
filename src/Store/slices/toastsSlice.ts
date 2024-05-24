import { ToastProps } from "../../Components/UI/Toast";
import { generateRandomId } from "../../utils/helpers";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ToastsSliceState = {
  toasts: ToastProps[];
};

const initialState: ToastsSliceState = {
  toasts: [],
};

const toastsSlice = createSlice({
  name: "toasts_slice",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastProps>) => {
      const id = generateRandomId();

      state.toasts = [
        ...state.toasts,
        {
          ...action.payload,
          id,
        },
      ];
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastsSlice.actions;
export const toastsReducer = toastsSlice.reducer;
