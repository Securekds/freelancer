// utils/i18next.js
import i18next from 'i18next';
import Backend from 'i18next-fs-backend'; // for loading translations from files
import i18nextMiddleware from 'i18next-express-middleware';

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'ar', // default language is Arabic
    lng: 'ar', // initial language is Arabic
    ns: ['translation'], // namespaces
    defaultNS: 'translation',
    backend: {
      loadPath: 'locales/ar.json', // load the Arabic translations directly
    },
  });

export default i18next;
