import { StyleSheet } from 'react-native';
import Layout from '../../../../../../../../constants/Layout';
import Colors from '../../../../../../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width * 0.9,
  },
  centerItems: {
    alignItems: 'center',
  },
  footerContainer: {
    justifyContent: 'space-between',
  },
  footerBtn: {
    width: Layout.window.width * 0.45 - 16 - 5,
  },
  dateTime: {
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  dateTimeItem: {
    paddingHorizontal: 10,
  },
  dateTimeDetail: {
    color: Colors.tintColor,
    textAlign: 'center',
  },
  dateTimeDetailDisable: {
    color: Colors.lightGray,
    textAlign: 'center',
  },
  checkBox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    padding: 0,
    marginLeft: -3,
  },
  redText: {
    color: Colors.errorText,
  },
});

export default styles;
