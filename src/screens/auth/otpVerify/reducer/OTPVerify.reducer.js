import actions from '../../../../redux/app.actions';

const initState = { isRequesting: false };
const reducer = (state, action) => {
  switch (action.type) {
    case actions.LOGIN: {
      return { ...state, isRequesting: true };
    }
    case actions.LOGIN_FAIL: {
      return { ...state, isRequesting: false };
    }
    case actions.LOGIN_SUCCESS: {
      return { ...state, isRequesting: false };
    }
    default:
      return state;
  }
};

export default { initState, reducer };
