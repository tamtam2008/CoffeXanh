import { FontAwesomeType, IconType } from '../../../constants/Icon';
import Colors from '../../../constants/Colors';
import useRootNavigation from '../../../utils/useRootNavigation';

const navigation = useRootNavigation();
export default {
  menuList: [
    {
      isAuthRequired: true,
      icon: {
        name: 'user-alt',
        type: IconType.FONTAWESOME,
        other: FontAwesomeType.SOLID,
        color: Colors.tintColor,
      },
      title: 'SettingMenu.accountInfo',
      action: () => {
        navigation.navigate('accountInfo');
      },
    },
    {
      isAuthRequired: true,
      icon: {
        name: 'ticket-alt',
        type: IconType.FONTAWESOME,
        other: FontAwesomeType.SOLID,
        color: Colors.tintColor,
      },
      title: 'SettingMenu.rewards',
      action: () => {
        navigation.navigate('reward');
      },
    },
    {
      isAuthRequired: true,
      icon: {
        name: 'history',
        type: IconType.FONTAWESOME,
        other: FontAwesomeType.SOLID,
        color: Colors.tintColor,
      },
      title: 'SettingMenu.orderHistory',
      action: () => {
        navigation.navigate('orderHistory');
      },
    },
    {
      isAuthRequired: true,
      icon: {
        name: 'wallet',
        type: IconType.FONTAWESOME,
        other: FontAwesomeType.SOLID,
        color: Colors.tintColor,
      },
      title: 'SettingMenu.payment',
      action: () => {
        navigation.navigate('payment');
      },
    },
    {
      isAuthRequired: false,
      icon: {
        name: 'question',
        type: IconType.FONTAWESOME,
        other: FontAwesomeType.SOLID,
        color: Colors.tintColor,
      },
      title: 'SettingMenu.help',
      action: () => {
        navigation.navigate('help');
      },
    },
    {
      isAuthRequired: false,
      icon: {
        name: 'wrench',
        type: IconType.FONTAWESOME,
        other: FontAwesomeType.SOLID,
        color: Colors.tintColor,
      },
      title: 'SettingMenu.settings',
      action: () => {
        navigation.navigate('settings');
      },
    },
  ],
};
