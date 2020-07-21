import { StyleSheet } from 'react-native';
import Colors from '../../../../constants/Colors';
import { normalize } from '../../../../constants/Layout';

const avatarMargin = normalize(132 / 2);

export default StyleSheet.create({
  flexContainer: {
    flex: 1,
    // backgroundColor: Colors.backgroundColor,
  },
  container: {
    padding: 16,
  },
  borderRadius: {
    borderRadius: 5,
  },
  shortInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: avatarMargin + 10,
    position: 'relative',
    marginTop: avatarMargin,
  },
  row: {
    marginBottom: 10,
  },
  radioContainer: {
    justifyContent: 'space-between',
    width: '100%',
  },
  saveBtnContainer: {
    width: '100%',
    padding: 16,
    // zIndex: 300,
    // position: 'absolute',
  },
  errorMsg: {
    color: Colors.red,
    marginTop: 10,
  },
});
