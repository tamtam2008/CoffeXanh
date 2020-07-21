import { BackHandler } from 'react-native';
import actions from '../app.actions';

export const exitApp = store => next => action => {
  if (action.type === actions.EXIT_APP) {
    BackHandler.exitApp();
  }
  next(action);
};
