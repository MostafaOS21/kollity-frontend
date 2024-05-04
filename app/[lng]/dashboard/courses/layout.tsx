import { useTranslation } from "@/app/i18n";
import { Params } from "@/app/i18n/settings";
import { Metadata } from "next";

export async function generateParams({
  params: { lng },
}: {
  params: Params;
}): Promise<Metadata> {
  const { t } = await useTranslation(lng, "courses");

  return {
    title: t("mainLayoutTitle"),
    description: t("mainLayoutDescription"),
  };
}

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
