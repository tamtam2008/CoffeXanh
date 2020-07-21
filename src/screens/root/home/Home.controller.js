import HomeService from '../../../services/HomeService';
import Actions from './Home.actions';
import TopNotifyUtils from '../../../utils/TopNotifyUtils';

const subscriptions = [];
const Controller = {
  getData: dispatch => {
    const subscription = HomeService.getHomeData().subscribe(
      data => {
        console.log('HomeScreen', data.response);
        if (data.response.status === 200) {
          dispatch({ type: Actions.GetData_success, payload: data.response });
        } else {
          dispatch({ type: Actions.GetData_fail });
        }
      },
      e => {
        console.log('HomeScreen', JSON.stringify(e));
        dispatch({ type: Actions.GetData_fail });
        TopNotifyUtils.fail(
          e.status === 500 ? 'notify.code.500' : 'notify.failMsg',
        );
      },
    );
    subscriptions.push(subscription);
  },
  clearAll: () => {
    const loopSize = subscriptions.length;
    for (let i = 0; i < loopSize; i++) {
      const subscription = subscriptions.pop();
      subscription.unsubscribe();
    }
  },
};

export default Controller;
