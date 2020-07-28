import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import CustomIcon from '../../../../components/CustomIcon';
import XIconButton from '../../../../components/XIconButton';
import { BaseFontStyles, BaseStyles } from '../../../../constants/BaseStyles';
import Colors from '../../../../constants/Colors';
import { FontAwesomeType, IconType } from '../../../../constants/Icon';
import Layout from '../../../../constants/Layout';
import Geolocation from 'react-native-geolocation-service';
import { useTranslation } from 'react-i18next';
import MapService from '../../../../services/MapService';
import AppActions from '../../../../redux/app.actions';
import { connect } from 'react-redux';
import useRootNavigation from '../../../../utils/useRootNavigation';

const navigation = useRootNavigation();
let subscription = null;
const AddressBar = ({ permissionLocation, info, updateAddress }) => {
  const [findAddressing, setFindAddressing] = useState(
    Object.keys(info.position).length === 0,
  );
  const { t } = useTranslation();
  const onAction = useCallback(() => {
    navigation.navigate('cacheAddressBook');
  }, []);
  useEffect(() => {
    if (info.address.trim().length === 0) {
      Geolocation.getCurrentPosition(
        pos => {
          console.log('MapStoreScreen', pos);
          subscription = MapService.getInfoEstimateOrderByGoogle({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          }).subscribe(
            data => {
              if (data.response.status === 200) {
                const {
                  data: { inMeter, addressUser, gpsUser, storeId },
                  extraGreater5km,
                } = data.response;
                const location = gpsUser
                  .split(',')
                  .map(val => Number.parseFloat(val));
                updateAddress({
                  address: addressUser,
                  position: {
                    latitude: location[0],
                    longitude: location[1],
                  },
                  distanceToShop: inMeter,
                  extraGreater5km: extraGreater5km,
                  storeId,
                });
              }
              setFindAddressing(false);
            },
            e => {
              console.log('MapStoreScreen', 'error ', e);
              setFindAddressing(false);
            },
          );
        },
        e => {
          console.log('MapStoreScreen', 'error', JSON.stringify(e));
          setFindAddressing(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 },
      );
    } else {
      setFindAddressing(false);
      subscription && subscription.unsubscribe();
      subscription = null;
    }
    return () => {
      subscription && subscription.unsubscribe();
      subscription = null;
    };
  }, [findAddressing, info.address, info.address.length, updateAddress]);
  const currentAddress = findAddressing
    ? 'Đang tìm vị trí cả bạn'
    : info.address || 'K thể tìm đc vị trí của bạn';
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
        <Text style={[BaseFontStyles.menuOrBody2]}>{currentAddress}</Text>
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
