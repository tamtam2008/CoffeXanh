import actions from '../app.actions';

const initialState = {
  info: {
    address: '',
    position: {},
    name: '',
    phone: '',
  },
  time: {
    date: 0,
    isEarlyReceive: true,
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
  fees: 0,
  promotion: 0,
  selectedItem: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CART_SELECT_ITEM:
      return { ...state, selectedItem: payload };
    case actions.CART_ADD_ITEM:
      const newItem = [...state.items];
      var isNew = true;
      state.items.forEach((val, idx) => {
        if (val.id === payload.id && val.sizeId === payload.sizeId) {
          newItem[idx].quantity += payload.quantity;
          isNew = false;
        }
      });
      if (isNew) {
        newItem.push(payload);
      }
      var newTotalAmount = newItem.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
      //rule fees
      var newFees = 0;
      if (newTotalAmount < 50000 && newTotalAmount > 0) {
        newFees = 50000;
      }
      return {
        ...state,
        items: newItem.filter(val => val.quantity > 0),
        totalAmount: newTotalAmount,
        fees: newFees,
        selectedItem: null,
      };
    case actions.CART_REMOVE_ITEM: {
      return state;
    }
    case actions.CART_UPDATE_PAYMENT:
      return {
        ...state,
        payment: payload,
      };
    case actions.CART_UPDATE_INFO:
      return {
        ...state,
        info: { ...state.info, ...payload },
      };
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
    default:
      return state;
  }
};
