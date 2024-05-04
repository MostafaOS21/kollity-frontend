import ApiError from "@/lib/ApiError";
import { axiosInstance } from "./axiosInstance";
import type { BaseQueryApi, BaseQueryFn } from "@reduxjs/toolkit/query";
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { login, logout } from "../auth/authSlice";

export interface AxiosBaseQueryArgs<Meta, Response> {
  meta?: Meta;
  prepareHeaders?: (
    headers: AxiosRequestHeaders,
    api: BaseQueryApi
  ) => AxiosRequestHeaders;
  transformResponse?: (response: Response) => unknown;
}

export interface ServiceExtraOptions {
  authRequired?: boolean;
}

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    BaseQueryApi,
    { status: number; data: string }
  > =>
  async ({ url, method, data, params, headers }, api) => {
    // @ts-ignore
    let token = api?.getState()?.auth?.token;
    const authURLRegex = /^\/user\/([^\/]+)$/;
    const isAuthRoute = authURLRegex.test(url);

    try {
      if (!isAuthRoute) {
        try {
          const res = await axiosInstance.post("/user/refresh-token");
          const data = res.data;

          if (data.token) {
            console.log(`TOKEN CHANGED: ${data.token}`);
            api.dispatch(login(data));
            token = data.token;
          }

          axiosInstance.interceptors.request.use(async (config) => {
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
          });
        } catch (axiosError) {
          console.log(axiosError);
          api.dispatch(logout());
        }
      }

      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (axiosError) {
      console.log(`From Second Catch:`);
      console.log(axiosError);
      const err = ApiError.generate(axiosError);
      const error = {
        status: err.status,
        data: err.message,
      };

      return {
        error,
      };
    }
  };
