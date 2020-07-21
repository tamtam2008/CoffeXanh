import RewardService from '../../../../services/RewardService';
import Actions from './YourCoupon.actions';
import TopNotifyUtils from '../../../../utils/TopNotifyUtils';

export default {
  getReward: (userId, dispatch) => {
    dispatch({
      type: Actions.GET_DATA,
    });
    RewardService.getListCouponByUser(userId).subscribe(
      reps => {
        if (reps.status === 200) {
          dispatch({
            type: Actions.GET_DATA_SUCCESS,
            payload: reps.response.data,
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
  },
};
