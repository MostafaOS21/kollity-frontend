export const fallbackLng = "ar";
export type Lang = "ar" | "en";
export const languages: Lang[] = [fallbackLng, "en"];
export const langCookieName: string = "kollity-lang";
export const defaultNS = "translation";

export interface Params {
  lng: Lang;
}

export function getOptions(lng = fallbackLng, ns: any = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
