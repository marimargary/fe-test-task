import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../Types/main";

export const MainApis = createApi({
  reducerPath: "mainApis",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (build) => ({
    getUsers: build.query<User[], string>({
      query: () => `/users`,
    }),
    getAllergies: build.query<string[], string>({
      query: (search) => (search ? `/allergies?search=${search}` : `/allergies`),
    }),
  }),
});

export const { useGetUsersQuery, useGetAllergiesQuery } = MainApis;
