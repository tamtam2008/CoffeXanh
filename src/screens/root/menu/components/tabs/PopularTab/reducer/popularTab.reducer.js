import Actions from './popularTab.action';
import ProductUtils from '../../../../util/ProductUtils';

const initState = {
  isRequesting: false,
  isFail: false,
  // items: { category: [], products: [], pathPhoto: '' },
  productData: [],
};

export default {
  reducer: (state, { type, payload }) => {
    switch (type) {
      case Actions.GET_DATA:
        return {
          ...state,
          isRequesting: true,
          isFail: false,
        };
      case Actions.GET_DATA_SUCCESS:
        return {
          ...state,
          isRequesting: false,
          isFail: false,
          // items: {
          //   products: payload.products || [],
          //   category: payload.category || [],
          //   pathPhoto: payload.pathPhoto || '',
          // },
          productData: ProductUtils.mapProductToListViewData(payload),
        };
      case Actions.GET_DATA_FAIL:
        return {
          ...state,
          isRequesting: false,
          isFail: true,
          productData: [],
        };
      default:
        return state;
    }
  },
  initState,
};
