import { StyleSheet } from 'react-native';
import Layout from '../../../../constants/Layout';

const styles = StyleSheet.create({
  selfCenter: {
    alignSelf: 'center',
  },
  paymentItem: {
    marginBottom: 10,
  },
  paymentItemDetail: {
    width: Layout.window.width - 64 - 24 - 32,
    marginRight: 16,
  },
});

export default styles;
