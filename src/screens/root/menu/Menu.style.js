import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  productContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.backgroundColor,
    position: 'relative',
  },
  float: {
    position: 'absolute',
    bottom: 0,
    zIndex: 500,
  },
  searchContainer: {
    width: Layout.window.width,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    height: 48,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
});
