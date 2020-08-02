import actions from '../../../redux/app.actions';

const initState = { isRequesting: false };
const registerReducer = (state, action) => {
  switch (action.type) {
    case actions.REQUEST_OTP_SUCCESS:
    case actions.REQUEST_OTP_FAIL: {
      return {
        ...state,
        isRequesting: false,
      };
    }
    case actions.REQUEST_OTP: {
      return {
        ...state,
        isRequesting: true,
      };
    }
    default:
      return state;
  }
};

export default { initState, reducer: registerReducer };
