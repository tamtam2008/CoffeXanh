import HttpClient from './utils/HttpClient';
import AppConfig from '../config/App.config';
import ServiceUtils from './utils/ServiceUtils';

export default {
  getInfoEstimateOrderByGoogle: ({ lat, lon }) =>
    HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/product/user/getInfoEstimateOrderByGoogle`,
      {},
      { lat: lat, lng: lon, ...ServiceUtils.getLangCodeParam() },
    ),
  getAddressFromLocation: ({ lat, lon }) =>
    HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/product/user/getListAddressByLatLng`,
      {},
      { lat: lat, lng: lon, ...ServiceUtils.getLangCodeParam() },
    ),
  findLocationFromAddress: address =>
    HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/product/user/getLatLngFromAddress`,
      {},
      { address: encodeURI(address), ...ServiceUtils.getLangCodeParam() },
    ),
  getProvinceAndDistMap: () =>
    HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/store/user/getProvinceAndDistMap`,
      {},
      { ...ServiceUtils.getLangCodeParam() },
    ),
  loadStoreByLatLng: ({ lat, lon }) =>
    HttpClient.get(
      `${AppConfig.ServerAddress}/api/xanhcoffee/store/user/loadStoreByLatlng`,
      {},
      { lat: lat, lng: lon, ...ServiceUtils.getLangCodeParam() },
    ),
  getStoreByDistId: distId =>
    HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/store/user/getStoreByDist/${distId}`,
      {},
      { ...ServiceUtils.getLangCodeParam() },
    ),
};
