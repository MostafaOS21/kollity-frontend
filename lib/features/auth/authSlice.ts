import { createSlice } from "@reduxjs/toolkit";
import profileImgSrc from "@/public/assets/images/default_user.png";
import { authService } from "../services/auth/authService";

export type roles = "Student" | "Assistant" | "Doctor";

export interface IAuth {
  roles: roles[];
  id: string;
  token: string;
  expiry: string;
  userName: string;
  email: string;
  profileImage: string;
  isAuth: boolean;
  isAdmin?: boolean;
}

const initialState: IAuth = {
  roles: [],
  id: "",
  token: "",
  expiry: "",
  userName: "",
  email: "",
  profileImage: "",
  isAuth: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.roles = action.payload.roles;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.expiry = action.payload.expiry;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.profileImage = action.payload.profileImage || profileImgSrc;
      state.isAuth = true;

      if (
        action.payload.roles.includes("Doctor") ||
        action.payload.roles.includes("Admin")
      ) {
        state.isAdmin = true;
      }
    },
    logout(state) {
      state.roles = [];
      state.id = "";
      state.token = "";
      state.expiry = "";
      state.userName = "";
      state.email = "";
      state.profileImage = "";
      state.isAuth = false;
    },
  },
  extraReducers(builder) {
    // builder.addMatcher(
    //   authService.endpoints.refresh.matchFulfilled,
    //   (state, action) => {
    //     makeStore().d
    //   }
    // );
    builder.addMatcher(
      authService.endpoints.logIn.matchFulfilled,
      (state, action) => {
        state = action.payload;
      }
    );
    builder.addMatcher(
      authService.endpoints.logOut.matchFulfilled,
      (state, action) => {
        state = initialState;
      }
    );
  },
});

export const selectAuth = (state: { auth: IAuth }) => state.auth;
export const selectIsAdmin = (state: { auth: IAuth }) => state.auth.isAdmin;
export const selectToken = (state: { auth: IAuth }) => state.auth.token;
export const selectIsAuth = (state: { auth: IAuth }) => state.auth.isAuth;
export const { login, logout } = authSlice.actions;
export default authSlice;
