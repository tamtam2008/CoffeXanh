import AppConfig from '../config/App.config';
import HttpClient from './utils/HttpClient';

export default {
  requestSendOTP: phone =>
    HttpClient.post(
      AppConfig.ServerAddress + '/api/system/login/' + phone,
      null,
      {},
    ),
  login: data =>
    HttpClient.post(
      AppConfig.ServerAddress + '/api/auth/sigin',
      JSON.stringify(data),
      {},
    ),
};
