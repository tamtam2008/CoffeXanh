import { normalize } from '../../../../../../constants/Layout';
import Colors from '../../../../../../constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: normalize(166),
    height: normalize(233),
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 1,
    marginLeft: 7.5,
    marginRight: 7.5,
    marginBottom: 15,
  },
  imageContainer: {
    width: normalize(166),
    height: normalize(166),
    backgroundColor: 'rgba(194,194,194,0.5)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  imageBG: {
    width: normalize(126),
    height: normalize(126),
    margin: 20,
  },
  titleContainer: {
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    height: normalize(233) - normalize(166),
    paddingVertical: 5,
  },
  nameContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    overflow: 'hidden',
    width: normalize(166) - 20,
  },
  priceContainer: {
    // marginTop: 5,
  },
  displayPrice: {
    color: Colors.tintColor,
  },
  basePrice: {
    textDecorationLine: 'line-through',
    color: Colors.lightGray,
  },
});

export default styles;
