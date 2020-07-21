import ProductService from '../../../../../../services/ProductService';
import popularTabAction from './reducer/popularTab.action';

export const callGetProducts = async dispatch => {
  const productService = await ProductService.getProducts();
  productService.subscribe(
    data => {
      if (data.response.status === 200) {
        dispatch({
          type: popularTabAction.GET_DATA_SUCCESS,
          payload: data.response,
        });
      } else {
        dispatch({
          type: popularTabAction.GET_DATA_FAIL,
        });
      }
    },
    e =>
      dispatch({
        type: popularTabAction.GET_DATA_FAIL,
      }),
  );
};
