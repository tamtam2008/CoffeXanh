import i18n from '../../languages/i18n.config';

export default {
  getLangCodeParam: () => ({
    langCode: i18n.language === 'en-EN' ? 'EN' : 'VI',
  }),
  buildParams: params =>
    params
      ? Object.keys(params)
          .reduce(
            (paramsStr, param) => `${paramsStr}&${param}=${params[param]}`,
            '',
          )
          .replace('&', '?')
          .trim()
      : '',
};
