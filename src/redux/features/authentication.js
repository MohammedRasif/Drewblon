import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authentication = createApi({
  reducerPath: "authentication",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://noncircuitous-lauryn-pseudosocialistic.ngrok-free.dev/api",
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "true");
      return headers;
    },
  }),
  tagTypes: ["User", "Agency", "TourPlan"],
  endpoints: (builder) => ({

    logIn: builder.mutation({
      query: (loginData) => ({
        url: "/accounts/login/",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["User"], 
    }),

    forgetPassword: builder.mutation({
      query: (forgetPassword) => ({
        url: "/accounts/password-reset/request/",
        method: "POST",
        body: forgetPassword,
      }),
      invalidatesTags: ["User"],
    }),

    otpVerify: builder.mutation({
      query: (otpData) => ({
        url: "/accounts/password-reset/verify/",
        method: "POST",
        body: otpData,
      }),
      invalidatesTags: ["User"], 
    }),

    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/accounts/password-reset/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"], 
    }),

  }),
});

export const {
  useLogInMutation,
  useForgetPasswordMutation,
  useOtpVerifyMutation,
  useUpdatePasswordMutation,
} = authentication;