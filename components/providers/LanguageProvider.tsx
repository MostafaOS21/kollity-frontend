"use client";

import {
  Lang,
  fallbackLng,
  langCookieName,
  languages,
} from "@/app/i18n/settings";
import { setLang } from "@/lib/features/lang/langSlice";
import { useAppDispatch } from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  const dispatch = useAppDispatch();
  const [cookies, setCookie] = useCookies([langCookieName]);
  const router = useRouter();

  const langDispatcher = () => {
    const pathWithoutLang = pathname.replace(`/${lang}`, "");

    window.document.documentElement.lang = lang;
    window.document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    dispatch(setLang({ lang, pathname, pathWithoutLang }));

    // Cookie Way
    const cookieLang = cookies[langCookieName];
    let currentLang = cookieLang;

    if (!languages.includes(currentLang as Lang)) {
      setCookie(langCookieName, fallbackLng);
      currentLang = fallbackLng;
    } else {
      setCookie(langCookieName, lang);
    }

    if (!languages.includes(lang as Lang)) {
      router.replace(`/${currentLang}/${pathWithoutLang}`);
    }
  };

  useEffect(() => {
    langDispatcher();
  }, [pathname]);

  return <>{children}</>;
}
