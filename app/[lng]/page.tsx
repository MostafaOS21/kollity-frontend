import Image from "next/image";
import { LanguageSelector } from "@/components/shared/language-selector";
import { useTranslation } from "../i18n";
import { Metadata } from "next";
import MainButton from "@/components/pages/home/main-btn";

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: string };
}): Promise<Metadata> {
  const { t } = await useTranslation(lng, "index");

  return {
    title: t("title"),
    description: "Welcome to our university",
  };
}

export default async function Page({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng, "index");

  return (
    <main className="h-screen relative p-5 flex flex-col justify-center gap-36">
      <div>
        <LanguageSelector defaultLang={lng} />
      </div>

      <div className="h-full text-white text-center flex flex-col gap-3">
        <Image
          alt="Logo"
          width={250}
          height={250}
          src={"/assets/images/logo.png"}
          className="w-40 h-40 mx-auto"
        />

        <h1>{t("welcome")}</h1>

        <MainButton />
      </div>

      <div className="absolute bottom-0 left-0 w-full -z-10">
        <Image
          width={1050}
          height={250}
          alt="Wave"
          src={"/assets/svg/wave.svg"}
          className="w-full"
        />
      </div>

      <Image
        width={1920}
        height={1080}
        alt="University background"
        src={"/assets/images/university.jpg"}
        className="absolute -z-20 w-full h-full object-cover left-0 top-0 brightness-50"
      />
    </main>
  );
}
