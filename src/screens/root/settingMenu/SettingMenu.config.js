import { FontAwesomeType, IconType } from '../../../constants/Icon';
import Colors from '../../../constants/Colors';
import useRootNavigation from '../../../utils/useRootNavigation';

const navigation = useRootNavigation();
export default {
  menuList: [
    {
      isAuthRequired: false,
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
        name: 'bell',
        type: IconType.FONTAWESOME,
        other: FontAwesomeType.SOLID,
        color: Colors.tintColor,
      },
      title: 'SettingMenu.notifyReward',
      action: () => {
        navigation.navigate('orderHistory');
      },
    },
    {
      isAuthRequired: true,
      icon: {
        name: 'chart-line',
        type: IconType.FONTAWESOME,
        other: FontAwesomeType.SOLID,
        color: Colors.tintColor,
      },
      title: 'SettingMenu.report',
      action: () => {
        navigation.navigate('report');
      },
    },
    {
      isAuthRequired: false,
      icon: {
        name: 'users',
        type: IconType.FONTAWESOME,
        other: FontAwesomeType.SOLID,
        color: Colors.tintColor,
      },
      title: 'SettingMenu.users',
      action: () => {
        navigation.navigate('help');
      },
    },
    {
      isAuthRequired: false,
      icon: {
        name: 'user',
        type: IconType.FONTAWESOME,
        other: FontAwesomeType.SOLID,
        color: Colors.tintColor,
      },
      title: 'SettingMenu.createUser',
      action: () => {
        navigation.navigate('createUser');
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
