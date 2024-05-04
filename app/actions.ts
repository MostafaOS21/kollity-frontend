"use server";

import ApiError from "@/lib/ApiError";
import { axiosInstance } from "@/lib/features/api/axiosInstance";
import { IAuth } from "@/lib/features/auth/authSlice";
import { IReturnError } from "@/lib/interfaces/error-return";
import { cookies } from "next/headers";

export const getRefreshToken = async () => {
  const refreshToken = cookies().get("refreshToken")?.value;
  const id = cookies().get("id")?.value;

  console.log({ refreshToken, id });

  return { refreshToken, id };
};

export const signIn = async (
  username: string,
  password: string
): Promise<(IAuth & { status: number }) | IReturnError> => {
  try {
    const res = await axiosInstance.post("/user/login", { username, password });
    const data: IAuth = await res.data;
    // @ts-ignore
    const cookiesRes = res?.headers?.get?.("set-cookie");
    const refreshTokenPart = cookiesRes[0];
    const idPart = cookiesRes[1];

    const refreshToken = refreshTokenPart.split(";")[0].split("=")[1];
    const id = idPart.split(";")[0].split("=")[1];

    const expiresAt = 10 * 24 * 60 * 60;

    if (!refreshToken || !id) {
      throw new Error("Invalid response");
    }

    cookies().set("refreshToken", refreshToken, {
      maxAge: expiresAt,
      path: "/",
      secure: true,
      sameSite: "none",
      httpOnly: true,
    });

    cookies().set("id", id, {
      maxAge: expiresAt,
      path: "/",
      secure: true,
      sameSite: "none",
      httpOnly: true,
    });

    return {
      ...data,
      status: 200,
    };
  } catch (error) {
    return ApiError.generate(error);
  }
};

export const signOut = async () => {
  try {
    cookies().delete("refreshToken");
    cookies().delete("id");
  } catch (error) {}
};

export const refresh = async (): Promise<
  (IAuth & { status: number }) | IReturnError
> => {
  try {
    const { refreshToken, id } = await getRefreshToken();

    const res = await axiosInstance.post(
      "/user/refresh-token",
      {},
      {
        headers: {
          refreshToken: `${refreshToken}`,
          id: id,
        },
      }
    );

    const data = await res.data;

    return {
      ...data,
      status: 200,
    };
  } catch (error) {
    return ApiError.generate(error);
  }
};
