import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fi from '../i18n/fi.json';

const resources = { fi };

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'fi',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
