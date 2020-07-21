import Actions from './Reward.actions';

export const initialState = {
  isRequesting: false,
  isFail: false,
  failMsg: '',
  rewards: [],
};

export default (state, { type, payload }) => {
  switch (type) {
    case Actions.GET_DATA:
      return { ...state, isRequesting: true, isFail: false, failMsg: '' };
    case Actions.GET_DATA_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        isFail: false,
        failMsg: '',
        rewards: payload,
      };
    case Actions.GET_DATA_FAIL:
      return { ...state, isRequesting: false, isFail: true, failMsg: payload };

    default:
      return state;
  }
};
