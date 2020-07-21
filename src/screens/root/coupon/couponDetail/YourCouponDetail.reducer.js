import Actions from './YourCouponDetail.actions';

export const initialState = {
  isRequesting: true,
  isFail: false,
  failMsg: '',
  coupon: {
    couponName: '',
    description: '',
    to: '2020-01-01 00:00:00',
    qrCode: '',
    imagePath: '',
    totalTimes: 0,
  },
  excludeProduct: [],
};

export default (state, { type, payload }) => {
  switch (type) {
    case Actions.GET_DATA:
      return { ...state, isRequesting: true, isFail: false, failMsg: '' };
    case Actions.GET_DATA_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        isFail: false,
        failMsg: '',
        ...payload,
      };
    case Actions.GET_DATA_FAIL:
      return { ...state, isRequesting: false, isFail: true, failMsg: payload };

    default:
      return state;
  }
};
