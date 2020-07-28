import AppConfig from '../config/App.config';
import SessionUtils from '../session/SessionUtils';
import HttpClient from './utils/HttpClient';
import ServiceUtils from './utils/ServiceUtils';

export default {
  getListCouponByUser: userId => {
    const authHeader = SessionUtils.buildAuthHeader();
    return HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/product/admin/getListCouponByUser`,
      authHeader,
      { id: userId, ...ServiceUtils.getLangCodeParam() },
    );
  },
  getCouponDetail: id => {
    const authHeader = SessionUtils.buildAuthHeader();
    return HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/product/admin/getDetailCoupon/${id}`,
      authHeader,
      { ...ServiceUtils.getLangCodeParam() },
    );
  },
  getYourCouponForCart: userId => {
    const authHeader = SessionUtils.buildAuthHeader();
    return HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/product/admin/getListSummaryCouponByUser/${userId}`,
      authHeader,
      { ...ServiceUtils.getLangCodeParam() },
    );
  },
};
