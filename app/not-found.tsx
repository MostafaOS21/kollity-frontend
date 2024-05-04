"use client";

import { useCookies } from "react-cookie";
import { fallbackLng, langCookieName } from "./i18n/settings";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [cookies] = useCookies([langCookieName]);
  const currentLang =
    cookies[langCookieName] || navigator.language.split("-")[0] || fallbackLng;
  const router = useRouter();

  useEffect(() => {
    router.push(`/${currentLang}`);
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      <div>
        <Loader className="animate-spin text-primary-200" size={35} />
      </div>
    </div>
  );
}
