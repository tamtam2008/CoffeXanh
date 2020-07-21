import { StyleSheet } from 'react-native';
import { BaseFontStyles } from '../../../../../../constants/BaseStyles';
import Colors from '../../../../../../constants/Colors';

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
});

export default styles;
