import actions from '../app.actions';

const initState = { numNotifies: 0, listNotifies: [], isNew: 0 };
const notifyReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.NOTIFIES_GET_SUCCESS: {
      return {
        ...state,
        numNotifies: action.payload.length,
        listNotifies: action.payload,
      };
    }
    default:
      return state;
  }
};

export default notifyReducer;
