import i18n from 'i18next';
// import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import i18nResources from './i18n.resources';

// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  //   .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: 'vi-VN',
    fallbackLng: 'vn',
    debug: false,
    saveMissing: true, // send not translated keys to endpoint
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: i18nResources,
  })
  .then(() => {});

export default i18n;
