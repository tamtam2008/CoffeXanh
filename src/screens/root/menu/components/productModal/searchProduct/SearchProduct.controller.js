import ProductService from '../../../../../../services/ProductService';
import TimerMixin from 'react-timer-mixin';
import Actions from './SearchProduct.action';
import TopNotifyUtils from '../../../../../../utils/TopNotifyUtils';

const IDs = {
  subscription: null,
  timer: null,
};
export default {
  search: (term, dispatch) => {
    dispatch({ type: Actions.GET_DATA });
    if (IDs.timer) {
      console.log('Cancel timer');
      TimerMixin.clearTimeout(IDs.timer);
      if (IDs.subscription) {
        console.log('Cancel subscription');
        IDs.subscription.unsubscribe();
      }
    }
    IDs.timer = TimerMixin.setTimeout(() => {
      console.log('Call request');
      dispatch({ type: Actions.GET_DATA });
      IDs.subscription = ProductService.searchProduct(term).subscribe(
        data => {
          if (data.response.status === 200) {
            dispatch({
              type: Actions.GET_DATA_SUCCESS,
              payload: data.response,
            });
          } else {
            TopNotifyUtils.fail('notify.failMsg');
            dispatch({
              type: Actions.GET_DATA_FAIL,
              payload: 'notify.failMsg',
            });
          }
        },
        e => {
          dispatch({
            type: Actions.GET_DATA_FAIL,
            payload: e.status === 500 ? 'notify.code.500' : 'notify.failMsg',
          });
          TopNotifyUtils.fail(
            e.status === 500 ? 'notify.code.500' : 'notify.failMsg',
          );
        },
      );
    }, 200);
  },
};
