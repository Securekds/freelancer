// Import necessary modules
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en.json'; // English translation
import frTranslation from '../locales/fr.json'; // French translation
import arTranslation from '../locales/ar.json'; // Arabic translation

// Initialize i18n
const storedLanguage = localStorage.getItem('language');
const defaultLanguage = storedLanguage || 'en'; // Default to Arabic if no language preference is stored
i18n
  .use(initReactI18next) // Use the react-i18next plugin
  .init({
    lng: defaultLanguage, // Set default language
    fallbackLng: 'en', // Fallback language in case translation is missing
    resources: {
      en: { translation: enTranslation }, // English translations
      fr: { translation: frTranslation }, // French translations
      ar: { translation: arTranslation }, // Arabic translations
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;