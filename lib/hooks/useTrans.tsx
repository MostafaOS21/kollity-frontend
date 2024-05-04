"use client";

import { useAppSelector } from "../hooks";
import { selectLang, selectLoading } from "../features/lang/langSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Lang, langCookieName } from "@/app/i18n/settings";
import { useCookies } from "react-cookie";

export default function useTrans({ path }: { path: string }) {
  const pathname = window.location.pathname;
  const lng = pathname.split("/")[1] as Lang;
  const { t, i18n } = useTranslation(lng, path);
  const [isClient, setIsClient] = useState(false);
  const isLoading = useAppSelector(selectLoading);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const translator = (text: string, { loader = true, w = 150, h = 18 }) => {
    const loaderFunc = (): any =>
      loader ? (
        <Skeleton
          style={{
            width: `${w}px`,
            height: `${h}px`,
            display: "inline-block",
          }}
        />
      ) : (
        "..."
      );

    if (!isClient) {
      return loaderFunc();
    }
    return t(text);
  };

  return { t: translator, isLoading, lng: i18n.language as Lang };
}
