import { FontAwesomeType, IconType } from '../constants/Icon';
import AccountInfoScreen from './root/account/accountInfo/AccountInfo.screen';
import AccountInfoUpdateScreen from './root/account/accountInfoUpdate/AccountInfoUpdate.screen';
import MenuScreen from './root/menu/Menu.screen';
import HelpScreen from './root/help/Help.screen';
import ChooseLanguageScreen from './root/settings/ChooseLanguage.screen';
import SettingsScreen from './root/settings/Settings.screen';
import StoreScreens from './root/store/StoreScreen';
import OrderScreen from './root/order/Order.screen';
import SettingMenuScreen from './root/settingMenu/SettingMenu.screen';
import OrderHistoryScreen from './root/orderHistory/OrderHistory.screen';
import OrderDetailScreen from './root/orderDetail/OrderDetail.screen';
import ChangePasswordScreen from './root/changePassword/ChangePassword.screen'

export const routes = {
  bottomTabs: [
    {
      name: 'menu',
      title: 'routes.bottomTabs.menu',
      icon: {
        type: IconType.FONTAWESOME,
        name: 'coffee',
      },
      component: MenuScreen,
    },
    {
      name: 'store',
      title: 'routes.bottomTabs.store',
      icon: {
        type: IconType.IMAGE,
        name: {
          active: require('../../assets/images/tabIconActive.png'),
          inactive: require('../../assets/images/tabIconDefault.png'),
        },
      },
      component: StoreScreens,
    },
    {
      name: 'order',
      title: 'routes.bottomTabs.order',
      icon: {
        type: IconType.FONTAWESOME,
        name: 'receipt',
        other: FontAwesomeType.SOLID,
      },
      component: OrderScreen,
    },
    {
      name: 'account',
      title: 'routes.bottomTabs.account',
      icon: {
        type: IconType.FONTAWESOME,
        name: 'user',
        other: FontAwesomeType.SOLID,
      },
      component: SettingMenuScreen,
    },
  ],
  screens: [
    {
      name: 'accountInfo',
      title: 'routes.screens.accountInfo',
      component: AccountInfoScreen,
    },
    {
      name: 'changePassword',
      title: 'routes.screens.changePassword',
      component: ChangePasswordScreen,
    },
    {
      name: 'accountInfoUpdate',
      title: 'routes.screens.accountInfoUpdate',
      component: AccountInfoUpdateScreen,
    },
    {
      name: 'help',
      title: 'routes.screens.help',
      component: HelpScreen,
    },
    {
      name: 'settings',
      title: 'routes.screens.settings',
      component: SettingsScreen,
    },
    {
      name: 'chooseLanguageScreen',
      title: 'routes.screens.chooseLanguageScreen',
      component: ChooseLanguageScreen,
    },
    {
      name:'orderDetail',
      title: 'Đơn hàng đang xử lý',
      component: OrderDetailScreen
    },
    {
      name:'orderHistory',
      title: 'Lịch sử đơn hàng',
      component: OrderHistoryScreen
    }
  ],
};
