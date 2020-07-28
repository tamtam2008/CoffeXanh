import { StyleSheet } from 'react-native';
import { BaseStyles } from '../../../constants/BaseStyles';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  content: {
    padding: 10,
  },
  item: {
    ...BaseStyles.boxWithShadow,
    margin: 1,
    borderRadius: 5,
  },
  rightItem: {
    width: 100,
  },
  statusNormalize: {
    color: Colors.tintColor,
    textAlign: 'right',
  },
  statusCancel: {
    color: Colors.red,
    textAlign: 'right',
  },
  statusDone: {
    color: Colors.gray,
    textAlign: 'right',
  },
  textTintColor: {
    color: Colors.tintColor,
  },
  textLightGray: {
    color: Colors.lightGray,
  },
});
export default styles;
