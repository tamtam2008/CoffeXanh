import OrderInfoNE from './components/OrderInfo.NE';
import OrderInfoFD from './components/OrderInfo.FD';
import OrderInfoCO from './components/OrderInfo.CO';
import OrderInfoDL from './components/OrderInfo.DL';

const Config = [
  {
    status: 'NE',
    content: OrderInfoNE,
  },
  {
    status: 'CF',
    content: OrderInfoNE,
  },
  {
    status: 'PP',
    content: OrderInfoNE,
  },
  {
    status: 'PD',
    content: OrderInfoNE,
  },
  {
    status: 'DL',
    content: OrderInfoDL,
  },
  {
    status: 'SU',
    content: OrderInfoCO,
  },
  {
    status: 'CO',
    content: OrderInfoCO,
  },
  {
    status: 'FD',
    content: OrderInfoFD,
  },
  {
    status: 'CA',
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
