import Actions from './chooseProduct.actions';

const initialState = {
  isRequesting: true,
  isFail: false,
  data: {},
  quantity: 1,
};

export default {
  reducer: (state, { type, payload }) => {
    switch (type) {
      case Actions.GET_DATA:
        return { ...state, isRequesting: true };
      case Actions.GET_DATA_SUCCESS:
        return {
          ...state,
          isRequesting: false,
          isFail: false,
          data: {
            photo: payload.listPhoto.map(val => ({
              image: payload.pathPhoto + '/' + val.photo,
              thumb: payload.pathPhoto + '/' + val.thumb,
            })),
            listSize: payload.listSize,
            detailProduct: payload.detailProduct[0] || {},
          },
        };
      case Actions.GET_DATA_FAIL:
        return { ...state, isRequesting: false, isFail: true };
      case Actions.INCREASE_QUANTITY:
        return {
          ...state,
          quantity: state.quantity + 1,
        };
      case Actions.DECREASE_QUANTITY:
        return {
          ...state,
          quantity: state.quantity - 1,
        };
      default:
        return state;
    }
  },
  initialState,
};
