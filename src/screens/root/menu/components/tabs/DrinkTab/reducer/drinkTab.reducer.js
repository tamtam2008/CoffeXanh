import drinkTabAction from './drinkTab.action';
import ProductUtils from '../../../../util/ProductUtils';

const initState = {
  isRequesting: true,
  isFail: false,
  // items: { category: [], products: [], pathPhoto: '' },
  failMsg: '',
  productData: [],
};

export default {
  reducer: (state, { type, payload }) => {
    // console.log(type, payload);
    switch (type) {
      case drinkTabAction.GET_DATA:
        return {
          ...state,
          isRequesting: true,
          isFail: false,
          failMsg: '',
        };
      case drinkTabAction.GET_DATA_SUCCESS:
        return {
          ...state,
          isRequesting: false,
          isFail: false,
          failMsg: '',
          // items: {
          //   products: payload.products || [],
          //   category: payload.category || [],
          //   pathPhoto: payload.pathPhoto || '',
          // },
          productData: ProductUtils.mapProductToListViewData(payload),
        };
      case drinkTabAction.GET_DATA_FAIL:
        return {
          ...state,
          isRequesting: false,
          isFail: true,
          failMsg: payload,
          productData: [],
        };
      default:
        return state;
    }
  },
  initState,
};
