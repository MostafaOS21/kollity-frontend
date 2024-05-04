import { configureStore } from "@reduxjs/toolkit";
import { langSlice } from "./features/lang/langSlice";
import authSlice from "./features/auth/authSlice";
import apiSlice from "./features/api/apiSlice";
import { coursesSlice } from "./features/courses/coursesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      api: apiSlice.reducer,
      lang: langSlice.reducer,
      auth: authSlice.reducer,
      courses: coursesSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
