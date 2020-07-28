import { showMessage } from 'react-native-flash-message';
import i18n from '../languages/i18n.config';
import Colors from '../constants/Colors';

export default {
  fail: msg => {
    showMessage({
      message: i18n.t('notify.status.fail'),
      description: i18n.t(msg),
      type: 'danger',
      icon: 'danger',
      backgroundColor: Colors.red,
    });
  },
  warn: msg => {
    showMessage({
      message: i18n.t('notify.status.warning'),
      description: i18n.t(msg),
      type: 'warning',
      icon: 'warning',
      backgroundColor: Colors.red,
    });
  },
  success: msg => {
    showMessage({
      message: i18n.t('notify.status.success'),
      description: i18n.t(msg),
      type: 'success',
      icon: 'success',
    });
  },
};
