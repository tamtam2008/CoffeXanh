import { StyleSheet } from 'react-native';
import Layout from '../../../../../../constants/Layout';

const styles = StyleSheet.create({
  popupContainer: {
    width: Layout.window.width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  w50percent: {
    width: '50%',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default styles;
