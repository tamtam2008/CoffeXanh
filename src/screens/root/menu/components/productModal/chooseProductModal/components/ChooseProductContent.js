import React, { useCallback, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LazyImage from '../../../../../../../components/LazyImage';
import CustomIcon from '../../../../../../../components/CustomIcon';
import XButton from '../../../../../../../components/XButton';
import XButton2 from '../../../../../../../components/XButton2';
import XIconButton from '../../../../../../../components/XIconButton';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../../constants/BaseStyles';
import Colors from '../../../../../../../constants/Colors';
import { FontAwesomeType, IconType } from '../../../../../../../constants/Icon';
import Layout from '../../../../../../../constants/Layout';
import { formatCurrency } from '../../../../../../../utils/formatUtils';
import FavoriteButton from '../../../productList/ProductItem/FavoriteButton';
import RadioChooseOptions from './RadioChooseOptions';

const emptyFunc = () => {};
const renderButton = (name, disabled, onPress) =>
  !disabled ? (
    <View>
      <TouchableOpacity
        style={[BaseStyles.flexRow, styles.button]}
        activeOpacity={0.6}
        onPressIn={onPress ? onPress : emptyFunc()}>
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

const ChooseProductContent = props => {
  const {
    style,
    showDetail,
    decreaseQuantity,
    increaseQuantity,
    state,
    footerAction: { cancelAction, submitAction },
  } = props;
  const { detailProduct, photo, listSize } = state.data;
  const radio_props =
    listSize?.map(size => {
      return {
        label: size.tenSize,
        label2:
          size.giaban - detailProduct.giaban > 0
            ? formatCurrency(size.giaban - detailProduct.giaban)
            : '',
        value: size,
      };
    }) || [];
  const image = {
    url: !!photo && photo.length > 0 ? photo[0]?.thumb || '' : '',
  };
  const [sizeChoosed, setSizeChoosed] = useState(
    listSize?.length > 0 ? listSize[0] : null,
  );

  const addProductToCart = useCallback(() => {
    const { id, tenSp, giaban } = detailProduct;
    const product = sizeChoosed
      ? {
          id: id,
          name: tenSp,
          sizeId: sizeChoosed.id,
          sizeName: sizeChoosed.tenSize,
          quantity: state.quantity,
          price: sizeChoosed.giaban,
          image: image,
        }
      : {
          id: id,
          name: tenSp,
          sizeId: null,
          sizeName: null,
          quantity: state.quantity,
          price: giaban,
          image: image,
        };
    submitAction(product);
  }, [detailProduct, image, sizeChoosed, state.quantity, submitAction]);
  return (
    <View style={style}>
      <ScrollView>
        <View style={[styles.container]}>
          <View style={[BaseStyles.flexRow, styles.marginHorizontal]}>
            <ImageBackground
              source={require('./../../../../../../../../assets/images/1.png')}
              style={[styles.imageContainer]}
              imageStyle={styles.imageBG}>
              {!!image && image.url ? (
                <LazyImage
                  url={image.url || ''}
                  headers={image.headers || {}}
                  style={styles.imageContainer}
                />
              ) : null}
            </ImageBackground>
            <View style={[BaseStyles.flexColumn, styles.container1]}>
              <Text style={[BaseFontStyles.title]}>
                {detailProduct?.tenSp || ''}
              </Text>
              <Text style={[BaseFontStyles.subHeader, styles.price]}>
                {formatCurrency(detailProduct?.giaban || 0)}
              </Text>
              <View style={[BaseStyles.flexRow, styles.buttonContainer]}>
                <FavoriteButton haveTitle={true} />
                <XIconButton
                  icon={{
                    name: 'info-circle',
                    type: IconType.FONTAWESOME,
                    size: 24,
                    other: FontAwesomeType.SOLID,
                  }}
                  color={Colors.gray}
                  onPress={showDetail}
                  title={'Chi tiết'}
                />
              </View>
            </View>
          </View>
          <View style={[styles.marginHorizontal]}>
            <View
              style={[
                BaseStyles.boxWithShadow,
                BaseStyles.mt_16,
                styles.titleContainer,
              ]}>
              <Text style={[BaseFontStyles.menuOrBody2]}>Kích thước</Text>
            </View>
            <View style={[BaseStyles.mt_16, styles.sizeChoosedContainer]}>
              <RadioChooseOptions
                data={radio_props}
                selectedIdx={0}
                onPress={val => setSizeChoosed(val)}
              />
            </View>
          </View>
          <View style={[styles.marginHorizontal]}>
            <View
              style={[
                BaseStyles.boxWithShadow,
                BaseStyles.mt_16,
                styles.titleContainer,
              ]}>
              <Text style={[BaseFontStyles.menuOrBody2]}>Số lượng</Text>
            </View>
            <View style={[BaseStyles.flexRow, styles.quantityContainer]}>
              <View style={[BaseStyles.flexRow]}>
                {renderButton('minus', state.quantity === 1, decreaseQuantity)}
                <Text style={[BaseFontStyles.subHeader, styles.quantityText]}>
                  {state.quantity}
                </Text>
                {renderButton('plus', false, increaseQuantity)}
              </View>
              <Text style={[BaseFontStyles.subHeader]}>
                {formatCurrency(
                  (sizeChoosed?.giaban || detailProduct?.giaban || 0) *
                    state.quantity,
                )}
              </Text>
            </View>
          </View>
          <View
            style={[
              BaseStyles.flexRow,
              BaseStyles.mt_10,
              styles.footerContainer,
              styles.marginHorizontal,
            ]}>
            <XButton2
              title={'Huỷ'}
              style={styles.footerBtn}
              onPress={cancelAction}
            />
            <XButton
              title={'Thêm vào giỏ'}
              style={styles.footerBtn}
              onPress={addProductToCart}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChooseProductContent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  imageContainer: {
    width: Layout.window.width * 0.25,
    height: Layout.window.width * 0.25,
    backgroundColor: 'rgba(194,194,194,0.5)',
    borderRadius: 5,
    marginRight: 10,
  },
  imageBG: {
    width: Layout.window.width * 0.25 - 10,
    height: Layout.window.width * 0.25 - 10,
    margin: 5,
  },
  container1: {
    width: Layout.window.width * 0.65 - 42,
    justifyContent: 'space-around',
  },
  buttonContainer: {
    justifyContent: 'space-between',
  },
  titleContainer: {
    backgroundColor: Colors.backgroundColor,
    padding: 16,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: -16,
    marginLeft: -16,
  },
  price: {
    color: Colors.tintColor,
  },
  footerContainer: {
    justifyContent: 'space-between',
  },
  sizeChoosedContainer: {
    marginBottom: -10,
  },
  footerBtn: {
    width: (Layout.window.width * 0.9) / 2 - 24,
  },
  button: {
    backgroundColor: Colors.tintColor,
    borderRadius: 50,
    padding: 3,
    paddingHorizontal: 5,
    margin: 10,
    marginLeft: 0,
  },
  buttonDisabled: {
    backgroundColor: Colors.lightGray,
  },
  quantityText: {
    alignSelf: 'center',
    marginRight: 10,
  },
  quantityContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  marginHorizontal: {
    paddingHorizontal: 16,
  },
});
