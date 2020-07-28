import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import Layout, { normalize } from '../../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: Layout.window.height * 0.4,
    resizeMode: 'cover',
  },
  bodyWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bodyContainer: {
    paddingVertical: 24,
    paddingHorizontal: normalize(16),
    justifyContent: 'center',
    alignItems: 'center',
    width: Layout.window.width,
  },
  loginBtn: {
    width: normalize(120),
    borderRadius: 10,
  },
  errorMsg: {
    color: Colors.red,
    textAlign: 'center',
  },
});

export default styles;
