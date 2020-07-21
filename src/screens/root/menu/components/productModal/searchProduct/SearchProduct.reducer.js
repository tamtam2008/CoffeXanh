import Actions from './SearchProduct.action';
import ProductUtils from '../../../util/ProductUtils';

export default {
  reducer: (state, { type, payload }) => {
    // console.log(type, payload);
    switch (type) {
      case Actions.GET_DATA:
        return {
          ...state,
          isRequesting: true,
          isFail: false,
          failMsg: '',
        };
      case Actions.GET_DATA_SUCCESS:
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
      case Actions.GET_DATA_FAIL:
        return {
          ...state,
          isRequesting: false,
          isFail: true,
          failMsg: payload,
        };
      default:
        return state;
    }
  },
  initState: {
    isRequesting: false,
    isFail: false,
    // items: { category: [], products: [], pathPhoto: '' },
    failMsg: '',
  },
};
