import AppConfig from '../config/App.config';
import HttpClient from './utils/HttpClient';

export default {
  requestSendOTP: phone =>
    HttpClient.post(AppConfig.ServerAddress + '/api/system/login/' + phone),
  login: data =>
    HttpClient.post(
      AppConfig.ServerAddress + '/api/auth/sigin',
      JSON.stringify(data),
    ),
  register: data =>
    HttpClient.post(
      AppConfig.ServerAddress1 + '/general/account',
      JSON.stringify(data),
      {},
    ),
  forgotPass: data =>
    HttpClient.put(
      AppConfig.ServerAddress1 + '/login/resendPass/' + data,
      {},
      {},
    ),
};
