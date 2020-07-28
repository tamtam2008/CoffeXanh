import AppConfig from '../config/App.config';
import HttpClient from './utils/HttpClient';
import ServiceUtils from './utils/ServiceUtils';
import SessionUtils from '../session/SessionUtils';

export default {
  getHomeData: () =>
    HttpClient.get(
      `${AppConfig.ServerAddress}/api/xanhcoffee/home/user/getHomeNoAuth`,
      {},
      { ...ServiceUtils.getLangCodeParam() },
    ),
  getBlogDetail: id =>
    HttpClient.get(
      `${AppConfig.ServerAddress}/api/xanhcoffee/home/user/getDetailBlog/${id}`,
      {},
      { ...ServiceUtils.getLangCodeParam() },
    ),
  getOrdersStatus: userId => {
    return HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/home/admin/getListOrderForHome/${userId}`,
      SessionUtils.buildAuthHeader(),
      { ...ServiceUtils.getLangCodeParam() },
    );
  },
};
