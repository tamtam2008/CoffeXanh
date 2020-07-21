import Actions from './YourCouponDetail.actions';
import RewardService from '../../../../services/RewardService';
import TopNotifyUtils from '../../../../utils/TopNotifyUtils';

export default {
  getRewardDetail: async (id, dispatch) => {
    dispatch({
      type: Actions.GET_DATA,
    });
    const service = await RewardService.getCouponDetail(id);
    service.subscribe(
      reps => {
        if (reps.response.status === 200) {
          const { coupon, excludeProduct } = reps.response;
          dispatch({
            type: Actions.GET_DATA_SUCCESS,
            payload: {
              coupon: coupon.length > 0 ? coupon[0] : null,
              excludeProduct,
            },
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
        console.log('YourCouponDetail', e);
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
