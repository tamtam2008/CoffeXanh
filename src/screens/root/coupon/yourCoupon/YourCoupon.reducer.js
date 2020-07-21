import Actions from './YourCoupon.actions';

export const initialState = {
  isRequesting: false,
  isFail: false,
  failMsg: 'YourCouponScreen.error.noCoupon',
  rewards: [
    {
      id: 9,
      couponName: 'NEW 06 ',
      description:
        'NOI DUNG AP DUNG CHO TOAN DON HÀNG, KO AP DUNG CUNG VOI COUPON KHAC.',
      to: '2020-06-29 00:00:00',
    },
    {
      id: 6,
      couponName: 'WEEKEND',
      description:
        'NOI DUNG AP DUNG CHO TOAN DON HÀNG, KO AP DUNG CUNG VOI COUPON KHAC.',
      to: '2021-05-29 00:00:00',
    },
    {
      id: 2,
      couponName: 'MUAHE 2 version',
      description:
        'NOI DUNG AP DUNG CHO TOAN DON HÀNG, KO AP DUNG CVOI COUPON KHAC.',
      to: '2022-05-29 00:00:00',
    },
    {
      id: 9,
      couponName: 'NEW 06 ',
      description:
        'NOI DUNG AP DUNG CHO TOAN DON HÀNG, KO AP DUNG CUNG VOI COUPON KHAC.',
      to: '2020-06-29 00:00:00',
    },
    {
      id: 6,
      couponName: 'WEEKEND',
      description:
        'NOI DUNG AP DUNG CHO TOAN DON HÀNG, KO AP DUNG CUNG VOI COUPON KHAC.',
      to: '2021-05-29 00:00:00',
    },
    {
      id: 2,
      couponName: 'MUAHE 2 version',
      description:
        'NOI DUNG AP DUNG CHO TOAN DON HÀNG, KO AP DUNG CVOI COUPON KHAC.',
      to: '2022-05-29 00:00:00',
    },
    {
      id: 9,
      couponName: 'NEW 06 ',
      description:
        'NOI DUNG AP DUNG CHO TOAN DON HÀNG, KO AP DUNG CUNG VOI COUPON KHAC.',
      to: '2020-06-29 00:00:00',
    },
    {
      id: 6,
      couponName: 'WEEKEND',
      description:
        'NOI DUNG AP DUNG CHO TOAN DON HÀNG, KO AP DUNG CUNG VOI COUPON KHAC.',
      to: '2021-05-29 00:00:00',
    },
    {
      id: 2,
      couponName: 'MUAHE 2 version',
      description:
        'NOI DUNG AP DUNG CHO TOAN DON HÀNG, KO AP DUNG CVOI COUPON KHAC.',
      to: '2022-05-29 00:00:00',
    },
    {
      id: 9,
      couponName: 'NEW 06 ',
      description:
        'NOI DUNG AP DUNG CHO TOAN DON HÀNG, KO AP DUNG CUNG VOI COUPON KHAC.',
      to: '2020-06-29 00:00:00',
    },
    {
      id: 6,
      couponName: 'WEEKEND',
      description:
        'NOI DUNG AP DUNG CHO TOAN DON HÀNG, KO AP DUNG CUNG VOI COUPON KHAC.',
      to: '2021-05-29 00:00:00',
    },
    {
      id: 2,
      couponName: 'MUAHE 2 version',
      description:
        'NOI DUNG AP DUNG CHO TOAN DON HÀNG, KO AP DUNG CVOI COUPON KHAC.',
      to: '2022-05-29 00:00:00',
    },
  ],
};

export default (state, { type, payload }) => {
  switch (type) {
    case Actions.GET_DATA:
      return { ...state, isRequesting: true, isFail: false, failMsg: '' };
    case Actions.GET_DATA_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        isFail: payload.length === 0,
        failMsg: payload.length === 0 ? 'YourCouponScreen.error.noCoupon' : '',
        rewards: payload,
      };
    case Actions.GET_DATA_FAIL:
      return { ...state, isRequesting: false, isFail: true, failMsg: payload };

    default:
      return state;
  }
};
