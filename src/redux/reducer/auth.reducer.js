import actions from '../app.actions';
import SessionUtils from '../../session/SessionUtils';

const initState = {
  isNew: false,
  isLogin: false,
  userInfo: {
    avatar: '',
    name: '',
    sex: '11',
    dob: 642211200000,
    rank: 'NC',
    point: 0,
  },
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.APP_STARTED: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case actions.LOGIN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case actions.IGNORE_LOGIN: {
      return {
        ...state,
        isNew: false,
        isLogin: false,
      };
    }
    case actions.LOGOUT_SUCCESS: {
      return {
        isNew: true,
        isLogin: false,
        ...action.payload,
      };
    }
    case actions.REQUEST_OTP_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case actions.USER_INFO_UPDATE: {
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    }
    default:
      return state;
  }
};

export default authReducer;
