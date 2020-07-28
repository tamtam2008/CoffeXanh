import RewardService from '../../../../../../services/RewardService';
import TopNotifyUtils from '../../../../../../utils/TopNotifyUtils';
import Actions from './Coupon.actions';

const Controller = {
  getReward: (userId, items, dispatch) => {
    dispatch({
      type: Actions.GET_DATA,
    });
    RewardService.getYourCouponForCart(userId).subscribe(
      reps => {
        const { status, data } = reps.response;
        if (status === 200) {
          dispatch({
            type: Actions.GET_DATA_SUCCESS,
            payload: data,
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

export default Controller;
