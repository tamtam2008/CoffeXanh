import { StyleSheet } from 'react-native';
import { BaseStyles } from '../../../../constants/BaseStyles';

const styles = StyleSheet.create({
  itemContainer: {
    // borderWidth: 1,
    ...BaseStyles.boxWithShadow,
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 1,
  },
});

export default styles;
