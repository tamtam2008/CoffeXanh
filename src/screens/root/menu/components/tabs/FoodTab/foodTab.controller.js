import ProductService from '../../../../../../services/ProductService';
import foodTabAction from './reducer/foodTab.action';

export const callGetProducts = async dispatch => {
  const productService = await ProductService.getProducts();
  productService.subscribe(
    data => {
      console.log('FoodTab', data);
      if (data.response.status === 200) {
        dispatch({
          type: foodTabAction.GET_DATA_SUCCESS,
          payload: data.response,
        });
      } else {
        dispatch({
          type: foodTabAction.GET_DATA_FAIL,
        });
      }
    },
    e => {
      console.log('FoodTab', JSON.stringify(e));
      dispatch({
        type: foodTabAction.GET_DATA_FAIL,
      });
    },
  );
};
