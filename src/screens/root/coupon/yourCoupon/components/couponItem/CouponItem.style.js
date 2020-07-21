import { StyleSheet } from 'react-native';
import Layout from '../../../../../../constants/Layout';
import Colors from '../../../../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width - 32,
    marginHorizontal: 16,
    marginVertical: 5,
    alignItems: 'center',
  },
  content: {
    width: Layout.window.width - 98,
  },
  lightGrayText: {
    color: Colors.lightGray,
  },
});
export default styles;
