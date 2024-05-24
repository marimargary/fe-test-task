import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { MainApis } from "./apis/main";
import { UserApis } from "./apis/user";
import { UsersSliceState, usersReducer } from "./slices/usersSlice";
import { ToastsSliceState, toastsReducer } from "./slices/toastsSlice";

export interface RootState {
  main: {
    users: UsersSliceState;
    toasts: ToastsSliceState;
  };
  [MainApis.reducerPath]: ReturnType<typeof MainApis.reducer>;
  [UserApis.reducerPath]: ReturnType<typeof UserApis.reducer>;
}

const rootReducer = combineReducers({
  main: combineReducers({
    users: usersReducer,
    toasts: toastsReducer,
  }),
  [MainApis.reducerPath]: MainApis.reducer,
  [UserApis.reducerPath]: UserApis.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat([MainApis.middleware, UserApis.middleware]),
});

export default store;
