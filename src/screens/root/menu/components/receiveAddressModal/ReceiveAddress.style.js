import { StyleSheet } from 'react-native';
import Layout from '../../../../../constants/Layout';

const styles = StyleSheet.create({
  popupContainer: { flex: 1, width: Layout.window.width },
  headerContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    width: Layout.window.width,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  titleContainer: {
    marginLeft: 20,
  },
});

export default styles;
