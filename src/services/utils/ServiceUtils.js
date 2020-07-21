import i18n from '../../languages/i18n.config';

export default {
  getLangCodeParam: () => `langCode=${i18n.language === 'en-EN' ? 'EN' : 'VI'}`,
};
