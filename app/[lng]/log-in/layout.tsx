import { useTranslation } from "@/app/i18n";
import { Params, fallbackLng } from "@/app/i18n/settings";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
  params: { lng },
}: {
  params: Params;
}): Promise<Metadata> {
  const { t } = await useTranslation(lng || fallbackLng, "log-in");

  return {
    title: t("title"),
    description: t("description"),
  };
}

const Blobs = () => {
  return (
    <>
      <Image
        src={"/assets/svg/blob_1.svg"}
        width={350}
        height={350}
        alt=""
        className="absolute top-0 right-0 w-1/4 opacity-30"
      />
      <Image
        src={"/assets/svg/blob_2.svg"}
        width={350}
        height={350}
        alt=""
        className="absolute bottom-0 left-0 w-1/4 opacity-60"
      />
    </>
  );
};

export default function LogInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center items-center flex-col gap-5 center h-screen relative">
      {children}

      <Blobs />
    </main>
  );
}
