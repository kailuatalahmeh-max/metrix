import en from "./locales/en";
import ar from "./locales/ar";

export const LANGUAGES = {
  en: { dir: "ltr", locale: "en-US", translation: en },
  // "nu-latn" = use 0-9 digits, the same digits the user types in the forms.
  ar: { dir: "rtl", locale: "ar-u-nu-latn", translation: ar },
} as const;

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_LANGUAGE: Language = "en";
