import Actions from './BlogDetail.actions';

export default {
  initState: {
    isRequesting: true,
    isFail: false,
    title: '',
    content: '',
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
        return {
          ...state,
          isRequesting: false,
          isFail: false,
          title: payload.ten,
          content: payload.noidung,
        };
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
