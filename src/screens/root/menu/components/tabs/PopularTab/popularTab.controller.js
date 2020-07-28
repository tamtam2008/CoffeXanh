import ProductService from '../../../../../../services/ProductService';
import popularTabAction from './reducer/popularTab.action';
import TopNotifyUtils from '../../../../../../utils/TopNotifyUtils';

export const callGetProducts = dispatch => {
  dispatch({
    type: popularTabAction.GET_DATA,
  });
  ProductService.getCommonProducts().subscribe(data => {
    const { status } = data.response;
    if (status === 200) {
      dispatch({
        type: popularTabAction.GET_DATA_SUCCESS,
        payload: data.response,
      });
    } else {
      const failMsg =
        status === 500 || status === 0
          ? `notify.code.${status}`
          : 'notify.failMsg';
      dispatch({
        type: popularTabAction.GET_DATA_FAIL,
        payload: failMsg,
      });
      TopNotifyUtils.fail(failMsg);
    }
  });
};
