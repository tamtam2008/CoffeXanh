import { StyleSheet } from 'react-native';
import Layout, { normalize } from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  topContainer: {
    marginTop: 45,
    paddingTop: 55,
  },
  couponItemContainer: {
    width: normalize(213),
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tintColor,
    position: 'absolute',
    top: -45,
    left: (Layout.window.width - normalize(213) - 32) / 2,
  },
  whiteText: {
    color: '#fff',
  },
});
export default styles;
