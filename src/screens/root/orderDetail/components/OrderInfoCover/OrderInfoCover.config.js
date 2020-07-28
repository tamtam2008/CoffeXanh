import OrderInfoNE from './components/OrderInfo.NE';
import OrderInfoFD from './components/OrderInfo.FD';
import OrderInfoCO from './components/OrderInfo.CO';
import OrderInfoDL from './components/OrderInfo.DL';

const Config = [
  {
    status: 'NE',
    title: 'OrderDetail.status.NE',
    content: OrderInfoNE,
  },
  {
    status: 'CF',
    title: 'OrderDetail.status.CF',
    content: OrderInfoNE,
  },
  {
    status: 'PP',
    title: 'OrderDetail.status.PP',
    content: OrderInfoNE,
  },
  {
    status: 'PD',
    title: 'OrderDetail.status.PD',
    content: OrderInfoNE,
  },
  {
    status: 'DL',
    title: 'OrderDetail.status.DL',
    content: OrderInfoDL,
  },
  {
    status: 'SU',
    title: 'OrderDetail.status.SU',
    content: OrderInfoCO,
  },
  {
    status: 'CO',
    title: 'OrderDetail.status.CO',
    content: OrderInfoCO,
  },
  {
    status: 'FD',
    title: 'OrderDetail.status.FD',
    content: OrderInfoFD,
  },
  {
    status: 'CA',
    title: 'OrderDetail.status.CA',
    content: OrderInfoFD,
  },
];

export const getContentData = status => {
  console.log('getContentData', status);
  const filter = Config.filter(value => value.status === status);
  return filter.length > 0
    ? filter[0]
    : {
        status: 'UNKNOWN',
        title: 'OrderDetail.status.UNKNOWN',
        content: OrderInfoFD,
      };
};
