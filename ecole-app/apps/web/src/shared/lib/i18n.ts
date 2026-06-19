import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import frJson from '../../locales/fr.json';
import enJson from '../../locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: frJson },
      en: { translation: enJson },
    },
    lng: localStorage.getItem('ecole-app-lang') || undefined, // Respect saved preference
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'ecole-app-lang',
      caches: ['localStorage'],
    },
  });

// Persist language changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('ecole-app-lang', lng);
  document.documentElement.lang = lng;
});

// Set initial html lang attribute
document.documentElement.lang = i18n.language;

export default i18n;
