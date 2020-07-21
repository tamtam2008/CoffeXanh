import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import CustomIcon from '../../../../components/CustomIcon';
import XIconButton from '../../../../components/XIconButton';
import { BaseFontStyles, BaseStyles } from '../../../../constants/BaseStyles';
import Colors from '../../../../constants/Colors';
import { FontAwesomeType, IconType } from '../../../../constants/Icon';
import Layout from '../../../../constants/Layout';
import Geolocation from '@react-native-community/geolocation';
import { useTranslation } from 'react-i18next';
import MapService from '../../../../services/MapService';
import AppActions from '../../../../redux/app.actions';
import { connect } from 'react-redux';

const AddressBar = ({ permissionLocation, info, updateAddress, onAction }) => {
  const [position, setPosition] = useState(
    Object.keys(info.position) > 0 ? info.position : null,
  );
  const [findAddressing, setFindAddressing] = useState(true);
  const [address, setAddress] = useState(info.address);
  const { t } = useTranslation();
  useLayoutEffect(() => {
    console.log('MapStoreScreen', !position);
    if (!position) {
      Geolocation.getCurrentPosition(
        pos => {
          console.log('MapStoreScreen', pos);
          MapService.getAddressFromLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          }).subscribe(
            data => {
              const { display_name } = data.response;
              console.log('MapStoreScreen', data.response, display_name);
              setAddress(display_name);
              updateAddress({
                address: display_name,
                position: {
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                },
              });
              setPosition({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              });
              setFindAddressing(false);
            },
            e => {
              console.log('MapStoreScreen', 'error ', e);
              updateAddress({
                address: JSON.stringify({
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                }),
                position: {
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                },
              });
              setPosition({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              });
              setFindAddressing(false);
            },
          );
        },
        e => {
          console.log('MapStoreScreen', 'error', JSON.stringify(e));
          setFindAddressing(false);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }
  });
  const _address = findAddressing
    ? 'Đang tìm vị trí cả bạn'
    : address || 'K thể tìm đc vị trí của bạn';
  return (
    <View
      style={[BaseStyles.baseContainer, BaseStyles.flexRow, styles.container]}>
      <CustomIcon
        name={'motorcycle'}
        type={IconType.FONTAWESOME}
        other={FontAwesomeType.SOLID}
        size={24}
        focused
      />
      <View style={[styles.titleContainer]}>
        <Text style={styles.title}>{t('Menu.AddressBar.shipTo')}</Text>
        <Text style={[BaseFontStyles.menuOrBody2]}>{_address}</Text>
      </View>
      <View style={[BaseStyles.flexRow, styles.buttonContainer]}>
        {findAddressing ? (
          <ActivityIndicator size={24} color={Colors.tintColor} />
        ) : (
          <XIconButton
            icon={{
              name: 'edit',
              type: IconType.FONTAWESOME,
              size: 24,
              other: FontAwesomeType.SOLID,
            }}
            onPress={onAction}
          />
        )}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  info: state.cart.info,
});

const mapDispatchToProps = {
  updateAddress: data => ({ type: AppActions.CART_UPDATE_INFO, payload: data }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressBar);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: Layout.window.width,
    flexWrap: 'nowrap',
    borderRadius: 0,
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    color: Colors.lightGray,
    // marginBottom: 5,
  },
  buttonContainer: {
    width: 30,
    alignItems: 'center',
  },
});
