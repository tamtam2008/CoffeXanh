import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import Layout, { normalize } from '../../../constants/Layout';

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
  },
  image: {
    marginTop: normalize(24),
    marginBottom: normalize(24),
    width: Layout.window.width / 2,
    height: Layout.window.width / 2,
  },
  message: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: normalize(16),
    textAlign: 'center',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bodyContainer: {
    paddingHorizontal: normalize(16),
    // justifyContent: 'center',
    alignItems: 'center',
    width: Layout.window.width,
  },
  signUpBtn: {
    width: normalize(249),
    marginBottom: normalize(16),
  },
  errorMsg: {
    color: Colors.red,
    textAlign: 'center',
  },
});

export default styles;
