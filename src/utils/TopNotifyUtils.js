import { showMessage } from 'react-native-flash-message';
import i18n from '../languages/i18n.config';

export default {
  fail: msg => {
    showMessage({
      message: i18n.t('notify.status.fail'),
      description: i18n.t(msg),
      type: 'danger',
      icon: 'danger',
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
