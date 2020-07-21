import { StyleSheet } from 'react-native';
import { BaseFontStyles } from '../../../../../../constants/BaseStyles';

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
});

export default styles;
