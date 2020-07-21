import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { BackHandler, Platform } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import actions from '../../redux/app.actions';
import { routes } from '../routes';
import store from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'react-native-flash-message';

const Root = createStackNavigator();

export default function RootScreen({ navigation, route }) {
  const [backCount, setBackCount] = React.useState(0);
  const [countDownHandler, setCountDownHandler] = React.useState(null);
  const { t } = useTranslation();
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      this.listener = BackHandler.addEventListener('hardwareBackPress', () => {
        console.log('back press');
        setBackCount(backCount + 1);
        if (backCount >= 1) {
          store.dispatch({ type: actions.EXIT_APP });
        } else {
          showMessage({
            message: 'Nhấp 1 lần nữa để thoát khỏi ứng dụng',
            type: 'info',
            position: 'center',
          });
        }
        if (countDownHandler != null) {
          TimerMixin.clearInterval(countDownHandler);
        }
        const handler = TimerMixin.setInterval(() => {
          console.log('down');
          if (backCount > 0) {
            setBackCount(backCount - 1);
          } else {
            TimerMixin.clearInterval(handler);
          }
        }, 200);
        setCountDownHandler(handler);
        return true;
      });
    }
    return () => {
      this.listener.remove();
      TimerMixin.clearInterval(countDownHandler);
    };
  }, [backCount, countDownHandler]);

  return (
    <Root.Navigator
    //initialRouteName="account-info-update"
    >
      <Root.Screen
        name="bottomTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      {routes.screens.map((val, idx) => {
        const options = val.title ? { title: t(val.title) } : {};
        return (
          <Root.Screen
            key={idx}
            name={val.name}
            component={val.component}
            options={options}
          />
        );
      })}
    </Root.Navigator>
  );
}
