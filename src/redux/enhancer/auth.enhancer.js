import AsyncStorage from '@react-native-community/async-storage';
import actions from '../app.actions';
import useRootNavigation from '../../utils/useRootNavigation';

const navigation = useRootNavigation();

export const logout = store => next => action => {
  if (action.type === actions.LOGOUT) {
    AsyncStorage.clear().then(() => {
      store.dispatch({ type: actions.LOGOUT_SUCCESS });
      navigation.navigate('Auth', { screen: 'login' });
      console.log('logout success');
    });
  }
  next(action);
};
