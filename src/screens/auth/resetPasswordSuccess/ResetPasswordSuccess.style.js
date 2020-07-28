import { StyleSheet } from 'react-native';
import Layout from '../../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  logo: {
    width: Layout.window.width * 0.4,
    height: Layout.window.width * 0.4,
  },
  closeAppBtn: {
    position: 'absolute',
    bottom: 24,
  },
});
export default styles;
