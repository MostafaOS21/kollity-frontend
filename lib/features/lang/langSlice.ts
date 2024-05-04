import { createSlice } from "@reduxjs/toolkit";
import { Lang, fallbackLng } from "@/app/i18n/settings";

interface LangState {
  lang: Lang;
  pathname: string;
  pathWithoutLang: string;
  loading: boolean;
}

const initialState: LangState = {
  lang: fallbackLng,
  pathname: "",
  pathWithoutLang: "",
  loading: true,
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang(state, action) {
      state.lang = action.payload.lang;
      state.pathname = action.payload.pathname;
      state.pathWithoutLang = action.payload.pathWithoutLang;
      state.loading = false;
    },
  },
});

export const selectLang = (state: { lang: LangState }) => state.lang.lang;
export const selectPathname = (state: { lang: LangState }) =>
  state.lang.pathname;
export const selectPathWithoutLang = (state: { lang: LangState }) =>
  state.lang.pathWithoutLang;
export const selectLoading = (state: { lang: LangState }) => state.lang.loading;

export const { setLang } = langSlice.actions;
