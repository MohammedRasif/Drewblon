import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.13.60:8002/api",
    prepareHeaders: (headers, { endpoint }) => {
      headers.set("ngrok-skip-browser-warning", "true");

      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: [
    "profileInfo",
    "earnings",
    "rentals",
    "manageRentalsDetails",
    "profileInfo",
  ],
  endpoints: (builder) => ({
    showProfileInformation: builder.query({
      query: () => "/accounts/profile/",
      providesTags: ["profileInfo"],
    }),

    // show feed data 
    showFeedData: builder.query({
      query:() => "/feed/",
      providesTags:["feed"]
    }),
    // show feed list data 
    showListFeedData: builder.query({
      query:() => "/feed/categories/",
      providesTags:["feed"]
    }),

  }),
});

export const {
  useShowProfileInformationQuery,
  useShowFeedDataQuery,
  useShowListFeedDataQuery,
  
} = baseApi;