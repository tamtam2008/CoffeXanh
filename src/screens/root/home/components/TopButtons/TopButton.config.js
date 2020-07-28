import Layout from '../../../../../constants/Layout';

const TopButtonConfig = {
  buttons: [
    {
      name: 'Home.TopButtons.yourCode',
      toScreen: 'yourCode',
      image: require('../../../../../../assets/images/5.png'),
    },
    {
      name: 'Home.TopButtons.orderNow',
      toScreen: 'menu',
      image: require('../../../../../../assets/images/2.png'),
    },
    {
      name: 'Home.TopButtons.rewards',
      toScreen: 'yourCoupon',
      image: require('../../../../../../assets/images/3.png'),
    },
  ],
  iconSize: () => Math.min(Layout.window.width * 0.2, 70),
};
export default TopButtonConfig;
