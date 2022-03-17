import i18n from "i18next";
import * as translationEN from "./languages/en-US.json";
import * as translationTR from "./languages/tr-TR.json";
import * as translationRU from "./languages/ru-RU.json";
import * as translationCH from "./languages/zh-CN.json";
import * as translationNL from "./languages/nl-NL.json";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { formatDistanceToNowStrict, format } from "date-fns";
import { enUS, tr, zhCN, nl } from "date-fns/locale";

const locales = {
  "en-US": enUS,
  "tr-TR": tr,
  "zh-CN": zhCN,
  "nl-NL": nl,
};

export const resources = {
  "en-US": {
    translation: translationEN,
  },
  "tr-TR": {
    translation: translationTR,
  },
  // "ru-RU": {
  //   translation: translationRU,
  // },
  "zh-CN": {
    translation: translationCH,
  },
  "nl-NL": {
    translation: translationNL,
  },
} as const;

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default,
      format: function (value, fmt, lng) {
        if (!value || value === "" || value === undefined || value === null) {
          return "";
        }

        // format = date|mask
        const [type, mask] = fmt.split("|");
        if (type === "date") {
          return format(value, mask, { locale: locales[lng] });
        }
        if (type === "change") {
          return formatDistanceToNowStrict(value, { locale: locales[lng] });
        }
        return value;
      },
    },
  });

export const apiLanguage = {
  "zh-cn": "zh-tw",
};

export const getLanguage = (): string => {
  let language = window.localStorage.i18nextLng.toLowerCase();
  if (language in apiLanguage) {
    language = apiLanguage[language];
  }
  return language;
};
