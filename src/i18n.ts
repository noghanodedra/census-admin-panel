import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
// learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  .use(LanguageDetector)
// connect with React
  .use(initReactI18next)
// for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    lng: localStorage.getItem('locale') as string | 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'gu'],
    ns: ['common', 'login'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
    },
    react: {
      wait: true,
    },
  });

export default i18n;
