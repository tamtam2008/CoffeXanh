import actions from '../app.actions';
import SessionUtils from '../../session/SessionUtils';

const initState = {
  isNew: false,
  isLogin: true,
  userInfo: {
    avatar: '',
    name: 'Demo',
    sex: '11',
    dob: 642211200000,
    role: 'staff',
    phone: '0000000000',
    email: 'demo@demo.com',
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
    case actions.u: {
      return {
        ...initState,
        isNew: true,
        isLogin: false,
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
    case actions.LOGOUT_SUCCESS: {
      return initState;
    }
    default:
      return state;
  }
};

export default authReducer;
