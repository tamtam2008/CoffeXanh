import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import Layout, { normalize } from '../../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: Layout.window.width * 0.37,
    resizeMode: 'cover',
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 24,
    paddingHorizontal: normalize(16),
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'stretch',
  },
  mTop: {
    marginTop: 16,
  },
  btnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  loginBtn: {
    width: normalize(216),
  },
  fbBtn: {
    marginTop: 16,
    width: normalize(126),
  },
  ignoreBtn: {
    paddingTop: 8,
    color: Colors.gray,
  },
  phoneErrorMsg: {
    color: Colors.red,
    textAlign: 'center',
  },
  noPhonePadding: {
    justifyContent: 'space-between',
  },
});

export default styles;
