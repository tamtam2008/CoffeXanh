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
  avatar: {
    position: 'absolute',
    top: -normalize(132 / 2),
  },
  avatarContainer: {
    marginTop: normalize(132 / 2),
    paddingTop: normalize(132 / 2),
    minHeight: normalize(132 / 2) + 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    backgroundColor: Colors.tintColor,
    color: '#fff',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: Layout.window.width / 2 - 16 - 5,
    borderRadius: 5,
  },
  rewardTxt: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    color: '#fff',
  },
  itemContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});
export default styles;
