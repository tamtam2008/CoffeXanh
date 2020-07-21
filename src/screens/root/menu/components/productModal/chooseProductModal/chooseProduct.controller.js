import ProductService from '../../../../../../services/ProductService';
import Actions from './chooseProduct.actions';

export default {
  getProductData: (dispatch, id) => {
    dispatch({ type: Actions.GET_DATA });
    ProductService.getProductDetail(id).subscribe(
      data => {
        console.log('ChooseProductModal', data.response);
        if (data.response.status === 200) {
          dispatch({
            type: Actions.GET_DATA_SUCCESS,
            payload: data.response,
          });
        } else {
          dispatch({
            type: Actions.GET_DATA_FAIL,
          });
        }
      },
      error => {
        console.log('ChooseProductModal', JSON.stringify(error));
        dispatch({ type: Actions.GET_DATA_FAIL });
      },
    );
  },
};
