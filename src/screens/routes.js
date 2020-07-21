import loadable from '@loadable/component';
import { FontAwesomeType, IconType } from '../constants/Icon';
import AccountInfoScreen from './root/account/accountInfo/AccountInfo.screen';
import AccountInfoUpdateScreen from './root/account/accountInfoUpdate/AccountInfoUpdate.screen';
import BlogDetailScreen from './root/blogDetail/BlogDetail.screen';
import CartScreen from './root/yourCart/cart/Cart.screen';
import ChoosePaymentScreen from './root/yourCart/choosePayment/ChoosePayment.screen';
import MenuScreen from './root/menu/Menu.screen';
import YourCouponScreen from './root/coupon/yourCoupon/YourCoupon.screen';
import RewardScreen from './root/rewards/reward/Reward.screen';
import YourCouponDetailScreen from './root/coupon/couponDetail/YourCouponDetail.screen';
import NotiScreen from './root/noti/Noti.screen';
import OrderHistoryScreen from './root/orderHistory/OrderHistory.screen';
import AddressBookScreen from './root/addressBook/AddressBook.screen';
import HelpScreen from './root/help/Help.screen';
import PaymentScreen from './root/payment/Payment.screen';
import ChangeRewardScreen from './root/rewards/changeReward/ChangeReward.screen';
import YourCodeScreen from './root/yourCode/YourCode.screen';
import ChooseLanguageScreen from './root/settings/ChooseLanguage.screen';
import SettingsScreen from './root/settings/Settings.screen';
import ChooseReceiveAddressScreen from './root/chooseReceiveAddress/ChooseReceiveAddress.screen';

export const routes = {
  bottomTabs: [
    {
      name: 'home',
      title: 'routes.bottomTabs.home',
      icon: {
        type: IconType.FONTAWESOME,
        name: 'home',
      },
      component: loadable(() => import('./root/home/Home.screen')),
    },
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
      component: loadable(() => import('./root/store/StoreScreen')),
    },
    {
      name: 'account',
      title: 'routes.bottomTabs.account',
      icon: {
        type: IconType.FONTAWESOME,
        name: 'user',
        other: FontAwesomeType.SOLID,
      },
      component: loadable(() =>
        import('./root/settingMenu/SettingMenu.screen'),
      ),
    },
  ],
  screens: [
    {
      name: 'accountInfo',
      title: 'routes.screens.accountInfo',
      component: AccountInfoScreen,
    },
    {
      name: 'accountInfoUpdate',
      title: 'routes.screens.accountInfoUpdate',
      component: AccountInfoUpdateScreen,
    },
    {
      name: 'cart',
      title: 'routes.screens.cart',
      component: CartScreen,
    },
    {
      name: 'paymentType',
      title: 'routes.screens.paymentType',
      component: ChoosePaymentScreen,
    },
    {
      name: 'blogDetail',
      title: 'routes.screens.blogDetail',
      component: BlogDetailScreen,
    },
    {
      name: 'yourCoupon',
      title: 'routes.screens.yourCoupon',
      component: YourCouponScreen,
    },
    {
      name: 'yourCouponDetail',
      title: 'routes.screens.yourCouponDetail',
      component: YourCouponDetailScreen,
    },
    {
      name: 'reward',
      title: 'routes.screens.reward',
      component: RewardScreen,
    },
    {
      name: 'noti',
      title: 'routes.screens.noti',
      component: NotiScreen,
    },
    {
      name: 'orderHistory',
      title: 'routes.screens.orderHistory',
      component: OrderHistoryScreen,
    },
    {
      name: 'payment',
      title: 'routes.screens.payment',
      component: PaymentScreen,
    },
    {
      name: 'addressBook',
      title: 'routes.screens.addressBook',
      component: AddressBookScreen,
    },
    {
      name: 'help',
      title: 'routes.screens.help',
      component: HelpScreen,
    },
    {
      name: 'changeReward',
      title: 'routes.screens.changeReward',
      component: ChangeRewardScreen,
    },
    {
      name: 'yourCode',
      title: 'routes.screens.yourCode',
      component: YourCodeScreen,
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
      name: 'chooseReceiveAddress',
      title: 'routes.screens.chooseReceiveAddress',
      component: ChooseReceiveAddressScreen,
    },
  ],
};
