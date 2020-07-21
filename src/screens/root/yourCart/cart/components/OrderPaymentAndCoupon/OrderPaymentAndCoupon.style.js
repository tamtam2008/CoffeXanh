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
  lightGrayText: {
    color: Colors.lightGray,
  },
  containerItem: {
    width: Layout.window.width * 0.5 - 32 - 16,
  },
  line: {
    borderRightWidth: 1,
    borderRightColor: Colors.lightGray,
    height: '100%',
    marginHorizontal: 16,
  },
});

export default styles;
