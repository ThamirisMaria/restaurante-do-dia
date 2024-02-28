import i18next from "i18next";

import { initReactI18next } from "react-i18next";

import enTranslations from "../locales/en.json";
import ptTranslations from "../locales/pt.json";

i18next.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  resources: {
    en: {
      translation: enTranslations,
    },
    pt: {
      translation: ptTranslations,
    },
  },
  lng: "en",
});
