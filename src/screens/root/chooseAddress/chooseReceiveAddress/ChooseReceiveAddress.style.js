import { StyleSheet } from 'react-native';
import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import { BaseFontStyles } from '../../../../constants/BaseStyles';

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  addressInputLayout: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#fff',
    width: Layout.window.width - 32,
    // paddingHorizontal: 16,
    borderRadius: 8,
  },
  searchBarContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 8,
  },
  searchBarInputContainer: {
    borderRadius: 5,
    ...BaseFontStyles.body1,
  },
  findCurrentLocation: {
    paddingVertical: 6,
    paddingHorizontal: 7,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: Colors.lightGray,
    borderWidth: 1,
  },
  findCurrentLocationLayout: {
    position: 'absolute',
    top: 32 + 36 + 10,
    right: 16,
    width: 24 + 7 * 2,
  },
  chooseAddressBtnLayout: {
    position: 'absolute',
    bottom: 16,
    paddingHorizontal: 16,
    width: Layout.window.width,
  },
});
export default styles;
