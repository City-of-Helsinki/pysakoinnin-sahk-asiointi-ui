import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fi from '../i18n/fi.json';
import en from '../i18n/en.json';
import sv from '../i18n/sv.json';

const resources = { fi, en, sv };

const lng = localStorage.getItem('lang');

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'fi',
  lng,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
