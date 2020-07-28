import AppConfig from '../config/App.config';
import {BackHandler, Platform} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {BaseFontStyles} from '../constants/BaseStyles';
import TimerMixin from 'react-timer-mixin';
import i18n from 'i18next';
import Layout from '../constants/Layout';

export const formatCurrency = amount =>
  Number(amount.toFixed(0))
    .toLocaleString()
    .replace(/\d(?=(\d{3})+$)/g, '$&,') + ` ${AppConfig.CurrencyUnit}`;

export function dynamicSort(property, order) {
  let sort_order = 1;
  if (order === 'desc') {
    sort_order = -1;
  }
  return function(a, b) {
    // a should come before b in the sorted order
    if (a[property] < b[property]) {
      return -1 * sort_order;
      // a should come after b in the sorted order
    } else if (a[property] > b[property]) {
      return sort_order;
      // a and b are the same
    } else {
      return 0;
    }
  };
}

export function backButtonHandler() {
  let count = 0;
  let handler = null;
  return function() {
    if (Platform.OS === 'android') {
      const listener = BackHandler.addEventListener('hardwareBackPress', () => {
        // console.log(count, 'press', count + 1, route);
        count = count + 1;
        if (count > 1) {
          ExitApp();
        } else {
          showMessage({
            message: i18n.t('common.backNoti'),
            position: 'bottom',
            duration: 1000,
            titleStyle: {
              ...BaseFontStyles.body1,
              color: '#fff',
            },
            style: {
              marginBottom: 10,
              marginHorizontal: Layout.window.width * 0.1,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              paddingVertical: 0,
            },
          });
        }
        if (handler != null) {
          TimerMixin.clearInterval(handler);
        }
        handler = TimerMixin.setInterval(() => {
          if (count > 0) {
            // console.log(count, 'down', count - 1);
            count = count - 1;
          } else {
            TimerMixin.clearInterval(handler);
          }
        }, 1000);
        return true;
      });
      return () => {
        listener.remove();
      };
    }
  };
}

export function ExitApp() {
  BackHandler.exitApp();
}