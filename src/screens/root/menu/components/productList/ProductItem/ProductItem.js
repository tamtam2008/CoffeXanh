import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import LazyImage from '../../../../../../components/LazyImage';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../constants/BaseStyles';
import actions from '../../../../../../redux/app.actions';
import store from '../../../../../../redux/store';
import { formatCurrency } from '../../../../../../utils/formatUtils';
import FavoriteButton from './FavoriteButton';
import styles from './ProductItem.style';

const ProductItem = ({
  id,
  name,
  image,
  price = { displayPrice: 0, basePrice: 0 },
  isFavorite = false,
}) => {
  const changeFavorite = () => {};
  // console.log(name);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        store.dispatch({ type: actions.CART_SELECT_ITEM, payload: id });
      }}
      style={[BaseStyles.boxWithShadow, styles.container]}>
      <View>
        <View>
          <ImageBackground
            source={require('../../../../../../../assets/images/1.png')}
            style={[styles.imageContainer]}
            imageStyle={styles.imageBG}>
            {image && (
              <LazyImage
                url={image.url || ''}
                headers={image.headers || {}}
                style={styles.imageContainer}
              />
            )}
          </ImageBackground>
        </View>
        <View style={[styles.titleContainer]}>
          <View style={[BaseStyles.flexRow, styles.nameContainer]}>
            <Text
              style={[BaseFontStyles.menuOrBody2, styles.name]}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {name}
            </Text>
            <View style={[styles.favoriteBtnContainer]}>
              <FavoriteButton
                isFavorite={isFavorite}
                onPress={changeFavorite}
              />
            </View>
          </View>
          <View style={[styles.priceContainer]}>
            <Text style={[BaseFontStyles.menuOrBody2, styles.displayPrice]}>
              {formatCurrency(price.displayPrice)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
