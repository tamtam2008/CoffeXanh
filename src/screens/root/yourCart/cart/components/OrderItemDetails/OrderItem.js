import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LazyImage from '../../../../../../components/LazyImage';
import CustomIcon from '../../../../../../components/CustomIcon';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../constants/BaseStyles';
import Colors from '../../../../../../constants/Colors';
import { IconType } from '../../../../../../constants/Icon';
import { formatCurrency } from '../../../../../../utils/formatUtils';

export default function OrderItem(props) {
  const { data, decreaseQuantity, increaseQuantity } = props;
  const { image, name, sizeName, quantity, price } = data;
  return (
    <View style={[BaseStyles.flexRow, styles.container]}>
      <View style={[BaseStyles.flexRow, styles.container1]}>
        <ImageBackground
          source={require('./../../../../../../../assets/images/1.png')}
          style={[styles.imageContainer]}
          imageStyle={styles.imageBG}>
          {!!image && (
            <LazyImage
              url={image.url || ''}
              headers={image.headers || {}}
              style={styles.imageContainer}
            />
          )}
        </ImageBackground>
        <View style={[BaseStyles.flexColumn]}>
          <Text
            style={[BaseFontStyles.menuOrBody2]}
            numberOfLines={1}
            lineBreakMode="tail">
            {name}
          </Text>
          <Text style={[BaseFontStyles.caption, styles.ligthGray]}>
            {formatCurrency(price)}
          </Text>
          <Text style={[BaseFontStyles.caption, styles.ligthGray]}>
            {`${sizeName} x ${quantity}`}
          </Text>
        </View>
      </View>
      <View style={[BaseStyles.flexColumn, styles.container2]}>
        <View style={[BaseStyles.flexRow]}>
          {renderButton('minus', false, () => {
            decreaseQuantity({ ...data, quantity: -1 });
          })}
          <Text style={[BaseFontStyles.subHeader, styles.quantityText]}>
            {quantity}
          </Text>
          {renderButton('plus', false, () => {
            increaseQuantity({ ...data, quantity: 1 });
          })}
        </View>
        <Text style={[BaseFontStyles.menuOrBody2, styles.total]}>
          {formatCurrency(price * quantity)}
        </Text>
      </View>
    </View>
  );
}

const renderButton = (name, disabled, onPress) =>
  !disabled ? (
    <View>
      <TouchableOpacity
        style={[BaseStyles.flexRow, styles.button]}
        activeOpacity={0.6}
        onPressIn={onPress ? onPress : () => {}}>
        <CustomIcon
          name={name}
          type={IconType.FONTAWESOME}
          size={17}
          custom={{ color: !disabled ? '#fff' : Colors.gray }}
          focused
        />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={[BaseStyles.flexRow, styles.button, styles.buttonDisabled]}>
      <CustomIcon
        name={name}
        type={IconType.FONTAWESOME}
        size={17}
        custom={{ color: !disabled ? '#fff' : Colors.gray }}
        focused
      />
    </View>
  );
const imageSize = 50;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  container1: {
    width: '70%',
  },
  container2: {
    width: '30%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    backgroundColor: 'rgba(194,194,194,0.5)',
    borderRadius: 5,
    marginRight: 10,
  },
  imageBG: {
    width: imageSize - 10,
    height: imageSize - 10,
    margin: 5,
  },
  ligthGray: {
    color: Colors.ligthGray,
  },
  button: {
    backgroundColor: Colors.tintColor,
    borderRadius: 50,
    padding: 3,
    paddingHorizontal: 5,
    // margin: 10,
    marginLeft: 0,
  },
  buttonDisabled: {
    backgroundColor: Colors.lightGray,
  },
  quantityText: {
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  total: {
    textAlign: 'right',
  },
});
