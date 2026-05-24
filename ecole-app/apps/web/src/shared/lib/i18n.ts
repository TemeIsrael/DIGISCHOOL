import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Lazy load translation file schemas later
import frJson from '../../locales/fr.json';
import enJson from '../../locales/en.json';

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: frJson },
    en: { translation: enJson }
  },
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
