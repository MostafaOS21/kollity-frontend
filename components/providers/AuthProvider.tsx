"use client";
import { useTranslation } from "@/app/i18n/client";
import { Lang, fallbackLng, languages } from "@/app/i18n/settings";
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "@/constants";
import { login } from "@/lib/features/auth/authSlice";
import { useRefreshMutation } from "@/lib/features/services/auth/authService";
import { useAppDispatch } from "@/lib/hooks";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useEffect, useRef } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [refreshAuth] = useRefreshMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { i18n } = useTranslation("", "");
  const loaderRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let hideLoaderTimeout: NodeJS.Timeout;

    const startRefresh = async () => {
      const res = await refreshAuth();
      //@ts-ignore
      const data = res.data;
      const pathname = window.location.pathname;

      const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
      const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);
      const currentLang = languages.includes(i18n.language as Lang)
        ? i18n.language
        : fallbackLng;

      if (data) {
        dispatch(login(data));
      }

      if (!data && isProtectedRoute) {
        router.replace(`/${currentLang}/log-in`);
      }

      if (data && isPublicRoute) {
        router.replace(`/${currentLang}/dashboard`);
      }

      loaderRef.current?.classList.add("opacity-0");
      hideLoaderTimeout = setTimeout(() => {
        loaderRef.current?.classList.add("hidden");
      }, 1000);
    };

    startRefresh();

    return () => {
      clearTimeout(hideLoaderTimeout);
    };
  }, []);

  return (
    <>
      <span
        ref={loaderRef}
        className="fixed h-screen w-screen top-0 left-0 bg-white z-[999] flex justify-center items-center transition-opacity duration-700"
      >
        <Loader2 className="text-primary-200 animate-spin" size={38} />
      </span>
      {children}
    </>
  );
}
