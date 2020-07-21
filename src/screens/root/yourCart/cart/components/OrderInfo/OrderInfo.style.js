import { StyleSheet } from 'react-native';
import { BaseFontStyles } from '../../../../../../constants/BaseStyles';
import Colors from '../../../../../../constants/Colors';
import Layout from '../../../../../../constants/Layout';

const styles = StyleSheet.create({
  spaceBetween: {
    justifyContent: 'space-between',
  },
  centerItems: {
    alignItems: 'center',
  },
  title: {
    ...BaseFontStyles.title,
    marginBottom: 10,
  },
  container: {
    marginBottom: 16,
  },
  miniMapView: {
    width: Layout.window.width * 0.2,
    height: Layout.window.width * 0.2,
    // backgroundColor: Colors.lightGray,
    borderRadius: 5,
  },
  lightGrayText: {
    color: Colors.lightGray,
  },
  address: {
    width: Layout.window.width * 0.8 - 32 - 32 - 10 - 29,
  },
});

export default styles;
