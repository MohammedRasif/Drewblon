import { configureStore } from "@reduxjs/toolkit";
import { authentication } from "./features/authentication";
import { baseApi } from "./features/baseApi";

export const store = configureStore({
  reducer: {
    [authentication.reducerPath]: authentication.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authentication.middleware)
      .concat(baseApi.middleware),
});
