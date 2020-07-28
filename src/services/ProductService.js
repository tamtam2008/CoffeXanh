import AppConfig from '../config/App.config';
import HttpClient from './utils/HttpClient';
import ServiceUtils from './utils/ServiceUtils';

export default {
  getCommonProducts: () => {
    return HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/product/user/getProductListOncommon`,
      {},
      { ...ServiceUtils.getLangCodeParam() },
    );
  },
  getProducts: () => {
    return HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/product/user/getProductByGroup`,
      {},
      { ...ServiceUtils.getLangCodeParam() },
    );
  },
  searchProduct: key => {
    return HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/product/user/getProductByKeywords`,
      {},
      {
        keywords: encodeURI(key.trim()),
        ...ServiceUtils.getLangCodeParam(),
      },
    );
  },
  getProductDetail: id => {
    return HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/product/user/getDetailProduct/${id}`,
      {},
      { ...ServiceUtils.getLangCodeParam() },
    );
  },
};
