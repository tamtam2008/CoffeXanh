import { FontAwesomeType, IconType } from '../../../constants/Icon';
import Colors from '../../../constants/Colors';
import useRootNavigation from '../../../utils/useRootNavigation';

const navigation = useRootNavigation();
export default {
  menuList: [
    {
      isAuthRequired: false,
      icon: {
        name: 'receipt',
        type: IconType.FONTAWESOME,
        other: FontAwesomeType.SOLID,
        color: Colors.tintColor,
      },
      title: 'Đơn hàng đang xử lý (6)',
      action: () => {
        navigation.navigate('orderDetail');
      },
    },
    {
      isAuthRequired: false,
      icon: {
        name: 'history',
        type: IconType.FONTAWESOME,
        other: FontAwesomeType.SOLID,
        color: Colors.tintColor,
      },
      title: 'Lịch sử đơn hàng',
      action: () => {
        navigation.navigate('orderHistory');
      },
    },
  ],
};
