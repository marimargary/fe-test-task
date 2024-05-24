import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../Types/main";
import { UserFormSchema } from "../../Components/User/UserForm";

type VerifyRes = { verificationCode: string };

export const UserApis = createApi({
  reducerPath: "userApis",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (build) => ({
    addUser: build.mutation<User, { data: UserFormSchema }>({
      query: ({ data }) => ({
        url: `/addUser`,
        method: "Post",
        body: {
          ...data,
        },
      }),
    }),
    updateEmail: build.mutation<VerifyRes, { id: number; email: string }>({
      query: ({ id, email }) => ({
        url: `/updateUserEmail/${id}`,
        method: "PUT",
        body: {
          email,
        },
      }),
    }),
    verifyUpdateEmail: build.mutation<
      VerifyRes,
      { id: number; email: string; verificationCode: string }
    >({
      query: ({ id, email, verificationCode }) => ({
        url: `/verifyAndUpdateEmail/${id}`,
        method: "PUT",
        body: {
          email,
          verificationCode,
        },
      }),
    }),
    updatePhone: build.mutation<VerifyRes, { id: number; phone: string }>({
      query: ({ id, phone }) => ({
        url: `/updateUserPhone/${id}`,
        method: "PUT",
        body: {
          phone,
        },
      }),
    }),
    verifyUpdatePhone: build.mutation<
      VerifyRes,
      { id: number; phone: string; verificationCode: string }
    >({
      query: ({ id, phone, verificationCode }) => ({
        url: `/verifyAndUpdatePhone/${id}`,
        method: "PUT",
        body: {
          phone,
          verificationCode,
        },
      }),
    }),
    updateUserAllergies: build.mutation<
      { message: string; user: User },
      { id: number; allergies: string[] }
    >({
      query: ({ id, allergies }) => ({
        url: `/updateUserAllergies/${id}`,
        method: "PUT",
        body: {
          allergies,
        },
      }),
    }),
  }),
});

export const {
  useUpdateEmailMutation,
  useVerifyUpdateEmailMutation,
  useUpdatePhoneMutation,
  useVerifyUpdatePhoneMutation,
  useUpdateUserAllergiesMutation,
  useAddUserMutation,
} = UserApis;
