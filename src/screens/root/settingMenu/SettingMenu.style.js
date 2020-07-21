import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

export default StyleSheet.create({
  item: {
    width: Layout.window.width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logout: {
    color: Colors.red,
  },
  container: {
    paddingBottom: 24,
  },
});
