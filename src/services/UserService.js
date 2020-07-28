import AppConfig from '../config/App.config';
import SessionUtils from '../session/SessionUtils';
import HttpClient from './utils/HttpClient';
import ServiceUtils from './utils/ServiceUtils';

export default {
  getUserInfo: userId => {
    const authHeader = SessionUtils.buildAuthHeader();
    return HttpClient.get(
      `${AppConfig.ServerAddress}/api/customer/user/getCustomerById/${userId}`,
      authHeader,
      { ...ServiceUtils.getLangCodeParam() },
    );
  },
  updateUserInfo: (userId, data) => {
    const authHeader = SessionUtils.buildAuthHeader();
    return HttpClient.put(
      `${AppConfig.ServerAddress}/api/customer/user/updateCustomer/${userId}`,
      data,
      authHeader,
      { ...ServiceUtils.getLangCodeParam() },
    );
  },
  updateFireBase: (userId, firebaseKey) => {
    const authHeader = SessionUtils.buildAuthHeader();
    return HttpClient.put(
      `${
        AppConfig.ServerAddress
      }/api/system/user/updateFirebaseKeyUser/${userId}`,
      { firebaseKey: firebaseKey, customerId: userId },
      authHeader,
      { ...ServiceUtils.getLangCodeParam() },
    );
  },
  getCommon: userId => {
    const authHeader = SessionUtils.buildAuthHeader();
    return HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/product/admin/getProfilebyUser/${userId}`,
      authHeader,
      { ...ServiceUtils.getLangCodeParam() },
    );
  },
};
