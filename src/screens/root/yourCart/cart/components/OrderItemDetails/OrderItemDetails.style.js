import { StyleSheet } from 'react-native';
import { BaseFontStyles } from '../../../../../../constants/BaseStyles';
import Colors from '../../../../../../constants/Colors';

const styles = StyleSheet.create({
  title: {
    ...BaseFontStyles.title,
    marginBottom: 10,
  },
  container: {
    marginBottom: 16,
  },
  line: {
    width: '100%',
    borderTopColor: Colors.lightGray,
    borderTopWidth: 1,
    marginVertical: 10,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  lightGrayText: {
    color: Colors.lightGray,
  },
  totalPrice: {
    color: Colors.tintColor,
  },
});

export default styles;
