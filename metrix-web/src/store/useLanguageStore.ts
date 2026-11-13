import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from "@/i18n/languages";

type LanguageStore = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

function detectLanguage(): Language {
  return navigator.language?.toLowerCase().startsWith("ar")
    ? "ar"
    : DEFAULT_LANGUAGE;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: detectLanguage(),
      setLanguage: (language) => set({ language }),
      toggleLanguage: () =>
        set({ language: get().language === "ar" ? "en" : "ar" }),
    }),
    {
      name: "metrix-language",
      partialize: (state) => ({ language: state.language }),
    },
  ),
);

// For code outside React components (stores, handleError).
export function getTranslation() {
  return LANGUAGES[useLanguageStore.getState().language].translation;
}

function applyLanguage(language: Language) {
  document.documentElement.lang = language;
  document.documentElement.dir = LANGUAGES[language].dir;
}

applyLanguage(useLanguageStore.getState().language);
useLanguageStore.subscribe((state) => applyLanguage(state.language));
