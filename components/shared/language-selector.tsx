"use client";
import { languages } from "@/app/i18n/settings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";

export const LanguageSelector = ({ defaultLang }: { defaultLang: string }) => {
  const allLanguages = languages;
  const pathname = usePathname();
  const router = useRouter();
  let pathnameWithoutLan = pathname.replace(`/${defaultLang}`, "");

  const handleLangChange = (lang: string) => {
    router.push(`/${lang}${pathnameWithoutLan}`);
  };

  return (
    <>
      <Select defaultValue={defaultLang} onValueChange={handleLangChange}>
        <SelectTrigger className="w-[180px] bg-white/80">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {allLanguages.map((lang) => (
            <SelectItem key={lang} value={lang} className="text-right">
              {lang === "ar" ? "العربية" : lang === "en" ? "English" : lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
