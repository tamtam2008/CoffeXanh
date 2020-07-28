import React, { useCallback, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { formatCurrency } from '../../../../../../../utils/AppUtils';
import RadioChooseOptions from './RadioChooseOptions';
import { Divider } from 'react-native-elements';
import { useTranslation } from 'react-i18next';

const emptyFunc = () => {
};
const renderButton = (name, disabled, onPress) =>
  !disabled ? (
    <View>
      <TouchableOpacity
        style={[BaseStyles.flexRow, styles.button]}
        activeOpacity={0.6}
        onPressIn={onPress ? onPress : emptyFunc}>
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

const ChooseProductContent = ({
  style,
  showDetail,
  state,
  footerAction: { cancelAction },
}) => {
  const { detailProduct, photo, listSize } = state.data;
  const radio_props =
    listSize?.map(size => {
      return {
        label: size.kyHieu ? `${size.tenSize} (${size.kyHieu})` : size.tenSize,
        label2:
          size.giaban - detailProduct.giaban > 0
            ? formatCurrency(size.giaban - detailProduct.giaban)
            : '',
      };
    }) || [];
  const image = {
    url: !!photo && photo.length > 0 ? photo[0]?.thumb || '' : '',
  };
  const { t } = useTranslation();
  return (
    <View style={style}>
      <ScrollView>
        <View style={[styles.container]}>
          <View style={[BaseStyles.flexRow, styles.marginHorizontal]}>
            <ImageBackground
              source={require('./../../../../../../../../assets/images/1.png')}
              style={[styles.imageContainer, BaseStyles.boxWithShadow]}
              imageStyle={styles.imageBG}>
              {image ? (
                <LazyImage url={image || ''} style={styles.imageContainer}/>
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
                <XIconButton
                  icon={{
                    name: 'info-circle',
                    type: IconType.FONTAWESOME,
                    size: 24,
                    other: FontAwesomeType.SOLID,
                  }}
                  color={Colors.gray}
                  onPress={showDetail}
                  title={t('Menu.ChooseProductContent.detail')}
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
              <Text style={[BaseFontStyles.menuOrBody2]}>
                {t('Menu.ChooseProductContent.size')}
              </Text>
            </View>
            <View style={[BaseStyles.flexColumn, styles.sizeContainer]}>
              {radio_props.map((val, key) => (
                <View key={key} style={[BaseStyles.flexRow, styles.label]}>
                  <Text style={[BaseFontStyles.body1]}>{`- ${val.label}`}</Text>
                  {!!val.label2 && (
                    <Text style={[BaseFontStyles.body1]}>
                      {'+' + val.label2}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
          <Divider style={{ backgroundColor: Colors.gray }}/>
          <View
            style={[
              // BaseStyles.flexRow,
              BaseStyles.mt_10,
              styles.footerContainer,
              styles.marginHorizontal,
            ]}>
            <XButton
              title={'Đóng'}
              // style={styles.footerBtn}
              onPress={cancelAction}
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
  label: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
  },
  sizeContainer: {
    marginVertical: 10,
  },
});
