import AppConfig from '../config/App.config';
import SessionUtils from '../session/SessionUtils';
import HttpClient from './utils/HttpClient';
import ServiceUtils from './utils/ServiceUtils';

export default {
  getListCouponByUser: userId => {
    const authHeader = SessionUtils.buildAuthHeader();
    return HttpClient.get(
      AppConfig.ServerAddress +
        `/api/xanhcoffee/product/admin/getListCouponByUser?id=${userId}&${ServiceUtils.getLangCodeParam()}`,
      authHeader,
    );
  },
  getCouponDetail: id => {
    const authHeader = SessionUtils.buildAuthHeader();
    return HttpClient.get(
      AppConfig.ServerAddress +
        `/api/xanhcoffee/product/admin/getDetailCoupon/${id}?${ServiceUtils.getLangCodeParam()}`,
      authHeader,
    );
  },
};
