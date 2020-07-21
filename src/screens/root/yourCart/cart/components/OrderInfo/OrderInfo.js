import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import CustomIcon from '../../../../../../components/CustomIcon';
import XIconButton from '../../../../../../components/XIconButton';
import XTextBox2 from '../../../../../../components/XTextBox2';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../constants/BaseStyles';
import Colors from '../../../../../../constants/Colors';
import { FontAwesomeType, IconType } from '../../../../../../constants/Icon';
import Layout from '../../../../../../constants/Layout';
import AppActions from '../../../../../../redux/app.actions';
import styles from './OrderInfo.style';

const OrderInfo = ({ info, updateInfo, userInfo, userPhone, isLogin }) => {
  const { address, position } = info;
  const [name, setName] = useState(info.name || userInfo.name);
  const [nameFocus, setNameFocus] = useState(false);
  const [phone, setPhone] = useState(info.phone || userPhone);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [error, setError] = useState({});
  const { t } = useTranslation();
  useEffect(() => {
    if (isLogin) {
      if (!info.name || !info.phone) {
        if (!info.name) {
          info.name = userInfo.name;
        }
        if (!info.phone) {
          info.phone = userPhone;
        }
        updateInfo(info);
      }
    }
  }, [name, info, updateInfo, userInfo.name, phone, userPhone, isLogin, error]);
  return (
    <View>
      <Text style={styles.title}>{t('CartScreen.OrderInfo.title')}</Text>
      <View style={[BaseStyles.baseContainer, styles.container]}>
        <View style={[BaseStyles.flexRow, styles.spaceBetween]}>
          <View style={[BaseStyles.flexRow, styles.centerItems]}>
            <CustomIcon
              name="user-alt"
              type={IconType.FONTAWESOME}
              size={19}
              focused={nameFocus}
            />
            <XTextBox2
              maxLength={50}
              size={Layout.window.width / 2 - 51 - 8}
              value={name}
              onChange={_name => {
                info.name = _name;
                setName(_name);
                updateInfo(info);
              }}
              onFocus={setNameFocus}
              isValid={error.name}
            />
          </View>
          <View style={[BaseStyles.flexRow, styles.centerItems]}>
            <CustomIcon
              name="phone"
              type={IconType.FONTAWESOME}
              size={19}
              focused={phoneFocus}
            />
            <XTextBox2
              maxLength={11}
              size={Layout.window.width / 2 - 51 - 19 - 8}
              value={phone}
              onChange={_phone => {
                info.phone = _phone;
                setPhone(_phone);
                updateInfo(info);
              }}
              onFocus={setPhoneFocus}
              keyboardType={'numeric'}
            />
            <XIconButton
              icon={{
                name: 'address-book',
                type: IconType.FONTAWESOME,
                size: 19,
                other: FontAwesomeType.SOLID,
              }}
            />
          </View>
        </View>
        <View
          style={[
            BaseStyles.flexRow,
            BaseStyles.mt_10,
            BaseStyles.boxWithShadow,
          ]}>
          <View style={[styles.miniMapView]}>
            {Object.keys(position) > 0 && (
              <MapView
                style={[StyleSheet.absoluteFillObject, styles.miniMapView]}
                initialRegion={{
                  ...position,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                showsUserLocation
                loadingEnabled
                loadingIndicatorColor={Colors.tintColor}
              />
            )}
          </View>
          <View
            style={[BaseStyles.flexColumn, BaseStyles.ml_10, BaseStyles.mr_10]}>
            <Text style={[BaseFontStyles.caption, styles.lightGrayText]}>
              {t('CartScreen.OrderInfo.shipTo')}
            </Text>
            <Text
              style={[BaseFontStyles.body1, styles.address]}
              lineBreakMode="tail"
              numberOfLines={3}>
              {address || t('CartScreen.OrderInfo.emptyAddress')}
            </Text>
          </View>
          <XIconButton
            icon={{
              name: 'edit',
              type: IconType.FONTAWESOME,
              size: 19,
              other: FontAwesomeType.SOLID,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  info: state.cart.info,
  userInfo: state.auth.userInfo,
  userPhone: state.auth.phone,
  isLogin: state.auth.isLogin,
});

const mapDispatchToProps = dispatch => ({
  updateInfo: info =>
    dispatch({ type: AppActions.CART_UPDATE_INFO, payload: info }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderInfo);
