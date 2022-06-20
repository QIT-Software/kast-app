import i18next from 'i18next';
import {logError} from 'utils/Logger';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export default {
  initAsync: async (resources: any) => {
    try {
      await i18next.use(LanguageDetector).use(initReactI18next).init({
        resources,
        fallbackLng: 'en',
        debug: true,
        keySeparator: false,
      });
    } catch (e) {
      logError(e);
    }
  },
};
