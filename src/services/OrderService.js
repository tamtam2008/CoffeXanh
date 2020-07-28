import HttpClient from './utils/HttpClient';
import AppConfig from '../config/App.config';
import SessionUtils from '../session/SessionUtils';
import ServiceUtils from './utils/ServiceUtils';

const OrderService = {
  createOrder: order => {
    return HttpClient.post(
      `${AppConfig.ServerAddress}/api/xanhcoffee/product/admin/saveNewOrder`,
      JSON.stringify(order),
      SessionUtils.buildAuthHeader(),
    );
  },
  getOrderDetail: orderId => {
    return HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/product/admin/getDetailOrder/${orderId}`,
      SessionUtils.buildAuthHeader(),
      { ...ServiceUtils.getLangCodeParam() },
    );
  },
  getShortDetailList: (userId, pagination = { size: 20, start: 0 }) => {
    return HttpClient.get(
      `${
        AppConfig.ServerAddress
      }/api/xanhcoffee/product/admin/getOrdersByUser/${userId}`,
      SessionUtils.buildAuthHeader(),
      { ...pagination, ...ServiceUtils.getLangCodeParam() },
    );
  },
};

export default OrderService;
