import AppConfig from '../config/App.config';
import SessionUtils from '../session/SessionUtils';
import HttpClient from './utils/HttpClient';

export default {
  getUserInfo: userId => {
    const authHeader = SessionUtils.buildAuthHeader();
    return HttpClient.get(
      AppConfig.ServerAddress + '/api/customer/user/getCustomerById/' + userId,
      authHeader,
    );
  },
  updateUserInfo: (userId, data) => {
    const authHeader = SessionUtils.buildAuthHeader();
    return HttpClient.put(
      AppConfig.ServerAddress + '/api/customer/user/updateCustomer/' + userId,
      data,
      authHeader,
    );
  },
};
