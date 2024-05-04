import apiSlice from "../../api/apiSlice";
import { IAuth } from "../../auth/authSlice";

// POST /user/login  --- interface
export interface ILogin {
  username: string;
  password: string;
}

export const authService = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation<IAuth, ILogin>({
      query: ({ username, password }) => ({
        url: "/user/login",
        method: "POST",
        data: { username, password },
      }),
    }),
    refresh: build.mutation<IAuth, void>({
      query: () => ({
        url: "/user/refresh-token",
        method: "POST",
      }),
    }),
    logOut: build.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "DELETE",
      }),
    }),
  }),
});

export const { useLogInMutation, useRefreshMutation, useLogOutMutation } =
  authService;
