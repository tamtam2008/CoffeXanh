import ProductService from '../../../../../../services/ProductService';
import drinkTabAction from './reducer/drinkTab.action';
import TopNotifyUtils from '../../../../../../utils/TopNotifyUtils';

export const callGetProducts = dispatch => {
  dispatch({
    type: drinkTabAction.GET_DATA,
  });
  ProductService.getProducts().subscribe(data => {
    const { status } = data.response;
    if (status === 200) {
      dispatch({
        type: drinkTabAction.GET_DATA_SUCCESS,
        payload: data.response,
      });
    } else {
      const failMsg =
        status === 500 || status === 0
          ? `notify.code.${status}`
          : 'notify.failMsg';
      dispatch({
        type: drinkTabAction.GET_DATA_FAIL,
        payload: failMsg,
      });
      TopNotifyUtils.fail(failMsg);
    }
  });
};
