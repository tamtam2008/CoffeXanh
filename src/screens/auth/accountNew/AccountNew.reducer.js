import Actions from './AccountNew.actions';

export default {
  initState: {
    isRequesting: false,
    isFail: false,
  },
  reducer: (state, { type, payload }) => {
    switch (type) {
      case Actions.GetData_request: {
        return {
          ...state,
          isRequesting: true,
          isFail: false,
        };
      }
      case Actions.GetData_success: {
        const newState = {
          ...state,
          isRequesting: false,
          isFail: false,
        };
        // console.log(newState);
        return newState;
      }
      case Actions.GetData_fail: {
        return {
          ...state,
          isRequesting: false,
          isFail: true,
        };
      }
      default:
        return state;
    }
  },
};
