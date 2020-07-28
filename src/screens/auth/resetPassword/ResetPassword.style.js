import { StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    width: Layout.window.width * 0.4,
    height: Layout.window.width * 0.4,
  },
  resetPwdBtn: {
    width: Math.max(200, Layout.window.width * 0.5),
    marginTop: 24,
  },
  errorMsg: {
    color: Colors.red,
    textAlign: 'center',
  },
});
export default styles;
