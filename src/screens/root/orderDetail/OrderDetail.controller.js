import OrderService from '../../../services/OrderService';
import TopNotifyUtils from '../../../utils/TopNotifyUtils';
import Actions from './OrderDetail.actions';

let subscription = null;
const cleanUp = () => {
  subscription && subscription.unsubscribe();
  subscription = null;
};
const Controller = {
  getData: (id, dispatch) => {
    cleanUp();
    dispatch({
      type: Actions.GET_DATA,
    });
    OrderService.getOrderDetail(id).subscribe(reps => {
      const { status } = reps.response;
      if (status === 200) {
        dispatch({
          type: Actions.GET_DATA_SUCCESS,
          payload: reps.response,
        });
      } else {
        const failMsg =
          status === 500 || status === 0
            ? `notify.code.${status}`
            : 'notify.failMsg';
        dispatch({
          type: Actions.GET_DATA_FAIL,
          payload: failMsg,
        });
        TopNotifyUtils.fail(failMsg);
      }
    });
  },
  cleanUp,
};

export default Controller;
