import ProductService from '../../../../../../services/ProductService';
import drinkTabAction from './reducer/drinkTab.action';
import TopNotifyUtils from '../../../../../../utils/TopNotifyUtils';

export const callGetProducts = dispatch => {
  ProductService.getProducts().subscribe(
    data => {
      console.log('DrinkTab', data);
      if (data.response.status === 200) {
        dispatch({
          type: drinkTabAction.GET_DATA_SUCCESS,
          payload: data.response,
        });
      } else {
        TopNotifyUtils.fail('notify.failMsg');
        dispatch({
          type: drinkTabAction.GET_DATA_FAIL,
          payload: 'notify.failMsg',
        });
      }
    },
    e => {
      console.log('DrinkTab', JSON.stringify(e));
      dispatch({
        type: drinkTabAction.GET_DATA_FAIL,
        payload: e.status === 500 ? 'notify.code.500' : 'notify.failMsg',
      });
      TopNotifyUtils.fail(
        e.status === 500 ? 'notify.code.500' : 'notify.failMsg',
      );
    },
  );
};
