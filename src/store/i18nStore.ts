import { create } from "zustand";
import en from "../i18n/en.json";
import mm from "../i18n/mm.json";
import { persist } from "zustand/middleware";

const translations: { [key: string]: any } = { en, mm };

type Language = "en" | "mm";

interface I18nState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

export const useLanguage = create<I18nState>()(
  persist(
    (set, get) => ({
      language: "en", // Default language
      setLanguage: (lang) => set({ language: lang }),
      t: (key) => {
        const { language } = get();
        const translation = getNestedValue(translations[language], key);
        return translation || key;
      },
    }),
    {
      name: "lang-storage",
      partialize: (state) => ({
        language: state.language,
      }),
    }
  )
);
