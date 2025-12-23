import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://noncircuitous-lauryn-pseudosocialistic.ngrok-free.dev/api",
    prepareHeaders: (headers, { endpoint }) => {
      headers.set("ngrok-skip-browser-warning", "true");

      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["profileInfo", "register", "simulation","updateData"],
  endpoints: (builder) => ({
   

    showProfileOverView: builder.query({
      query: () => "/accounts/profile-stats/",
      providesTags:["updateData"]
    }),
    // showProfileInformation
    showProfileInformation: builder.query({
      query: () => "/accounts/profile/",
      providesTags:["updateData"]
    }),


    showProfileLeaderBorad: builder.query({
      query: () => "/rankings/",
      providesTags:["updateData"]
    }),

    

    // show feed data
    showFeedData: builder.query({
      query: () => "/feed/",
      providesTags: ["feed"],
    }),
    // show feed list data
    showListFeedData: builder.query({
      query: () => "/feed/categories/",
      providesTags: ["feed"],
    }),
    // talk section recorded categroy
    showTalkRecordedCategary: builder.query({
      query: () => "/talks/categories/",
      providesTags: ["recorded"],
    }),
    // talk section show data
    showTalkRecordedData: builder.query({
      query: () => "/talks/archived/",
    }),

    // show upcomming Livestrems
    showUpcommingLivestremsAllData: builder.query({
      query: () => "/talks/upcoming/",
      providesTags: ["register"],
    }),
    // show filter data for date
    showFilterData: builder.query({
      query: (date) => `/talks/schedule/?date=${date}`,
      providesTags: ["register"],
    }),

    bookingUpCommingLiveStrim: builder.mutation({
      query: (id) => ({
        url: `/talks/upcoming/${id}/register/`,
        method: "POST",
      }),
      invalidatesTags: ["register"],
    }),

    cencelBookingUpCommingLiveStrim: builder.mutation({
      query: (id) => ({
        url: `/talks/upcoming/${id}/unregister/`,
        method: "DELETE",
      }),
      invalidatesTags: ["register"],
    }),

    // update profile
    updateProfileInpormation: builder.mutation({
      query: (data) => ({
        url: `/accounts/profile/`,
        method: "PUT",
        body:data
      }),
    }),

    // update password

    updatePassword:builder.mutation({
      query:(data) => ({
        url: `/accounts/password-change/`,
        method: "POST",
        body:data
      })
    }),

    showSimulation: builder.query({
      query: () => "/tasks/",
      providesTags: ["simulation"],
    }),
    showSimulationCategory: builder.query({
      query: (id) => `/tasks/${id}/categories/`,
      providesTags: ["simulation"],
    }),
    // show Simulation category mcq
    showSimulationCategoryQuestion: builder.query({
      query: ({ taskId, categoryId }) =>
        `/tasks/${taskId}/categories/${categoryId}/`,
      providesTags: ["simulation"],
    }),

    showSimulationCategoryAllQuestion: builder.query({
      query: ({ taskId, categoryId, simLevel }) =>
        `/tasks/${taskId}/categories/${categoryId}/sim/${simLevel}/`,
      providesTags: ["simulation"],
    }),

    simulationQuestionSubmit: builder.mutation({
      query: (data) => ({
        url: "/submit-answer/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["simulation"],
    }),


    showCompeted: builder.query({
      query: () => "/videos/completed/",
    }),

    showInProgress:builder.query({
      query:() =>"/videos/inprogress/",
    }),


    // video

    showVideoCategory: builder.query({
      query:() => "/videos/categories/"
    }),

    showVideoTopic:builder.query({
      query:(id) =>`/videos/categories/${id}/topics/`
    }),

    showVideoTopicData: builder.query({
      query:(id) =>`/videos/categories/${id}/playlists/`
    }),

    showAllVideoDetails:builder.query({
      query:(id) =>`/videos/playlists/${id}/`
    }),

    showSuggestedVide:builder.query({
      query: (id) =>`/videos/playlists/${id}/suggested/`
    })












  }),
});

export const {
  useShowProfileInformationQuery,
  useShowProfileOverViewQuery,
  useShowProfileLeaderBoradQuery,
  useShowFeedDataQuery,
  useShowListFeedDataQuery,
  useShowTalkRecordedCategaryQuery,
  useShowTalkRecordedDataQuery,

  useShowUpcommingLivestremsAllDataQuery,
  useShowFilterDataQuery,
  useBookingUpCommingLiveStrimMutation,
  useCencelBookingUpCommingLiveStrimMutation,
  useUpdateProfileInpormationMutation,
  useUpdatePasswordMutation,

  useShowSimulationQuery,
  useShowSimulationCategoryQuery,
  useShowSimulationCategoryQuestionQuery,
  useShowSimulationCategoryAllQuestionQuery,
  useSimulationQuestionSubmitMutation,

  useShowCompetedQuery,
  useShowInProgressQuery,


  useShowVideoCategoryQuery,
  useShowVideoTopicQuery,
  useShowVideoTopicDataQuery,
  useShowAllVideoDetailsQuery,
  useShowSuggestedVideQuery,
} = baseApi;
