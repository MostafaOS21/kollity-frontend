import { useTranslation } from "@/app/i18n";
import { Params, fallbackLng } from "@/app/i18n/settings";
import Aside from "@/components/pages/dashboard/Aside";
import ApiError from "@/lib/ApiError";
import { axiosInstance } from "@/lib/features/api/axiosInstance";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params: { lng },
}: {
  params: Params;
}): Promise<Metadata> {
  const { t } = await useTranslation(lng || fallbackLng, "dashboard");

  return {
    title: t("mainLayoutTitle"),
    description: t("mainLayoutDescription"),
  };
}
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`grid grid-cols-[280px_1fr] gap-3`}>
      <Aside />
      <main className="py-8 px-6">{children}</main>
    </div>
  );
}
