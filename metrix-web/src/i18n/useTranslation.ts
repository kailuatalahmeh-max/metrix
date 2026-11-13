import { useLanguageStore } from "@/store/useLanguageStore";
import { LANGUAGES } from "./languages";

export function useTranslation() {
  const language = useLanguageStore((s) => s.language);
  const { dir, locale, translation } = LANGUAGES[language];

  return { t: translation, language, dir, locale };
}
