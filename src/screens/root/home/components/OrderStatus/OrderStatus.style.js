import { StyleSheet } from 'react-native';
import Colors from '../../../../../constants/Colors';

const styles = StyleSheet.create({
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
  containerDotStyle: {
    paddingVertical: 0,
    paddingTop: 5,
    paddingBottom: 16,
    marginBottom: -16,
  },
});

export default styles;
