import { StyleSheet } from 'react-native';
import Layout from '../../../../../constants/Layout';
import Colors from '../../../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: Colors.tintColor,
  },
  inactiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    paddingVertical: 0,
    paddingTop: 10,
  },
  imageContainer: {
    width: Layout.window.width - 32,
    backgroundColor: 'rgba(194,194,194,0.5)',
    borderRadius: 5,
    marginBottom: 10,
  },
  carouselContainer: {
    height: 200,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  imageBG: {
    width: Layout.window.width * 0.1,
    height: Layout.window.width * 0.1,
    margin: 5,
  },
});

export default styles;
