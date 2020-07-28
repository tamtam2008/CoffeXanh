import actions from '../app.actions';
import TopNotifyUtils from '../../utils/TopNotifyUtils';

const initialState = {
  info: {
    name: '',
    phone: '',
    address: '',
    position: {},
    distanceToShop: 0,
    extraGreater5km: 0,
    storeId: null,
  },
  time: {
    isEarlyReceive: true,
    date: 0,
  },
  items: [],
  payment: {
    code: 'CS',
    name: 'paymentType.CS',
  },
  coupon: null,
  notes: {
    store: '',
    driver: '',
  },
  totalAmount: 0,
  fees: 10000,
  promotion: 0,
  selectedItem: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CART_SELECT_ITEM:
      return { ...state, selectedItem: payload };
    case actions.CART_ADD_ITEM: {
      let newPromotion = state.promotion;
      let newFees = state.fees;
      let newItem = [...state.items];
      let isNew = true;
      state.items.forEach((val, idx) => {
        if (val.id === payload.id && val.sizeId === payload.sizeId) {
          newItem[idx].quantity += payload.quantity;
          isNew = false;
        }
      });
      if (isNew) {
        newItem.push(payload);
      }
      //remove item have zero quantity
      newItem = newItem.filter(val => val.quantity > 0);
      const newTotalAmount = newItem.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
      //check coupon
      let newCoupon = state.coupon;
      if (state.coupon) {
        if (couponInvalid(state.coupon, newItem)) {
          const { percentSaleOff } = state.coupon;
          if (percentSaleOff > 0) {
            newPromotion = newTotalAmount * percentSaleOff;
          }
        } else {
          newPromotion = 0;
          newCoupon = null;
          TopNotifyUtils.warn(
            `Đơn hàng hiện tại không đủ điều kiện dể sử dụng ưu đãi '${
              state.coupon.couponName
            }'!`,
          );
        }
      }
      //check ship fee
      const feeDistance =
        (state.info.distanceToShop - 5 > 0
          ? state.info.distanceToShop - 5
          : 0) * state.info.extraGreater5km;
      if (newTotalAmount <= 50000) {
        newFees = 10000 + feeDistance;
      } else {
        newFees = feeDistance;
      }
      return {
        ...state,
        items: newItem,
        totalAmount: newTotalAmount,
        selectedItem: null,
        fees: newFees,
        promotion: newPromotion,
        coupon: newCoupon,
      };
    }
    case actions.CART_UPDATE_PAYMENT:
      return {
        ...state,
        payment: payload,
      };
    case actions.CART_UPDATE_INFO: {
      let newFees = state.fees;
      const { distanceToShop, extraGreater5km } = payload;
      const _distanceToShop = distanceToShop
        ? Math.ceil(distanceToShop / 1000)
        : 0;
      if (distanceToShop) {
        if (_distanceToShop - 5 > 0) {
          newFees =
            (state.totalAmount <= 50000 ? 10000 : 0) +
            (_distanceToShop - 5) * extraGreater5km;
        }
      }
      return {
        ...state,
        info: {
          ...state.info,
          ...payload,
          distanceToShop: _distanceToShop,
        },
        fees: newFees,
      };
    }
    case actions.CART_UPDATE_TIME:
      return {
        ...state,
        time: payload,
      };
    case actions.CART_UPDATE_NOTE:
      return {
        ...state,
        notes: { ...state.notes, ...payload },
      };
    case actions.CART_UPDATE_COUPON: {
      let newPromotion = state.promotion;
      const { percentSaleOff, percentVnd, giamToiDa } = payload;
      if (percentSaleOff > 0) {
        newPromotion =
          giamToiDa && giamToiDa > 0
            ? Math.min(state.totalAmount * percentSaleOff, giamToiDa)
            : state.totalAmount * percentSaleOff;
      } else {
        newPromotion = percentVnd;
      }
      return {
        ...state,
        coupon: payload,
        promotion: newPromotion,
      };
    }
    case actions.CART_RENEW:
      return initialState;
    default:
      return state;
  }
};

const couponInvalid = (coupon, items) => {
  let invalid = true;
  const itemIds = items.map(val => val.id);
  if (
    coupon.excludeProduct.filter(val => itemIds.includes(val.id)).length > 0
  ) {
    invalid = false;
  }
  if (
    coupon.includeProduct.filter(val => itemIds.includes(val.id)).length < 1
  ) {
    invalid = false;
  }
  return invalid;
};
