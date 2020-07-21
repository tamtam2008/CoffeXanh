import AppConfig from '../config/App.config';
import HttpClient from './utils/HttpClient';
import ServiceUtils from './utils/ServiceUtils';

export default {
  getProducts: () => {
    return HttpClient.get(
      AppConfig.ServerAddress +
        '/api/xanhcoffee/product/user/getProductByGroup' +
        `?${ServiceUtils.getLangCodeParam()}`,
      {},
    );
  },
  searchProduct: key => {
    return HttpClient.get(
      AppConfig.ServerAddress +
        `/api/xanhcoffee/product/user/getProductByKeywords?${ServiceUtils.getLangCodeParam()}&keywords=${encodeURI(
          key.trim(),
        )}`,
      {},
    );
  },
  getProductDetail: id => {
    return HttpClient.get(
      AppConfig.ServerAddress +
        '/api/xanhcoffee/product/user/getDetailProduct/' +
        id +
        `?${ServiceUtils.getLangCodeParam()}`,
      {},
    );
  },
};
