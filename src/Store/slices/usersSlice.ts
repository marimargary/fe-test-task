import { User } from "../../Types/main";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UsersSliceState = {
  users: User[];
};

const initialState: UsersSliceState = {
  users: [],
};

const usersSlice = createSlice({
  name: "user_slice",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
