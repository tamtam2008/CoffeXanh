import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Container from '../../../../components/layout/Container';
import styles from './ChooseReceiveAddress.style';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Colors from '../../../../constants/Colors';
import { Platform, TouchableOpacity, View } from 'react-native';
import { FontAwesomeType, IconType } from '../../../../constants/Icon';
import { BaseFontStyles, BaseStyles } from '../../../../constants/BaseStyles';
import CustomIcon from '../../../../components/CustomIcon';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import XButton from '../../../../components/XButton';
import TimerMixin from 'react-timer-mixin';
import { SearchBar } from 'react-native-elements';
import MapService from '../../../../services/MapService';
import AppActions from '../../../../redux/app.actions';
import StoreAddressModal from './components/StoreAddressModal/StoreAddress.modal';
import MapUtils from '../../../../utils/MapUtils';
import Geolocation from 'react-native-geolocation-service';

const LATITUDE_DELTA = 0.005;
const MAP_ICON = 32;
const TIMEOUT_GET_LOCATION_INFO = 2000;
let getAddressHandler = null;
let subscription = null;
const cleanRequest = () => {
  if (getAddressHandler) {
    TimerMixin.clearTimeout(getAddressHandler);
    getAddressHandler = null;
  }
  if (subscription) {
    subscription && subscription.unsubscribe();
    subscription = null;
  }
};
const ChooseReceiveAddressScreen = ({ info, updateAddress }) => {
  const { t } = useTranslation();
  const [isStoreAddressModal, showStoreAddressModal] = useState(false);
  const [foundUserLocation, setFoundUserLocation] = useState(false);
  const [findingAddress, setFindingAddress] = useState(false);
  const [isMoving, setMoving] = useState(false);
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState({
    address: info.address,
    position: info.position,
  });

  const mapRef = useRef();
  const searchBarRef = useRef();
  useEffect(() => {
    region && mapRef.current?.animateToRegion(region);
    return () => {
      getAddressHandler && TimerMixin.clearTimeout(getAddressHandler);
      getAddressHandler = null;
    };
  }, [region]);
  const onMapReady = useCallback(() => {
    setFindingAddress(true);
    if (info.address.length === 0) {
      if (Platform.OS === 'android') {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then((data) => {
            findGPS();
          })
          .catch((err) => {
            console.log(err);
            setFindingAddress(false);
            setFoundUserLocation(false);
          });
      } else {
        findGPS();
      }
    } else {
      setRegion({
        ...info.position,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: MapUtils.getLongitudeDelta(LATITUDE_DELTA),
      });
    }
  }, [info.address, info.position]);
  const findGPS = () => {
    setFoundUserLocation(true);
    Geolocation.getCurrentPosition(
      (pos) => {
        setRegion({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: MapUtils.getLongitudeDelta(LATITUDE_DELTA),
        });
      },
      (e) => {
        console.log('ChooseReceiveAddressScreen', e);
        setRegion(MapUtils.DEFAULT_LOCATION);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 },
    );
  };
  const onRegionChangeComplete = useCallback(
    (_region) => {
      console.log('map', _region, isMoving, findingAddress);
      if (isMoving || findingAddress) {
        cleanRequest();
        getAddressHandler = TimerMixin.setTimeout(() => {
          subscription = MapService.getInfoEstimateOrderByGoogle({
            lat: _region.latitude,
            lon: _region.longitude,
          }).subscribe((_data) => {
            if (_data.response.status === 200) {
              console.log(
                'ChooseReceiveAddressScreen',
                'response',
                _data.response,
              );
              const {
                data: { addressUser, gpsUser, inMeter, storeId },
                extraGreater5km,
              } = _data.response;
              const location = gpsUser
                .split(',')
                .map((val) => Number.parseFloat(val));
              setAddress({
                address: addressUser,
                position: { latitude: location[0], longitude: location[1] },
                distanceToShop: inMeter,
                extraGreater5km: extraGreater5km,
                storeId,
              });
            }
            setFindingAddress(false);
            setMoving(false);
            cleanRequest();
          });
        }, TIMEOUT_GET_LOCATION_INFO);
      } else {
        setFindingAddress(false);
        setMoving(false);
      }
    },
    [findingAddress, isMoving],
  );
  const onRegionChange = useCallback((_region) => {
    // setFindingAddress(true);
    setMoving(true);
    cleanRequest();
  }, []);

  const onChangeText = useCallback((text) => {
    setAddress({ address: text });
    if (text.trim().length > 0) {
      cleanRequest();
      getAddressHandler = TimerMixin.setTimeout(() => {
        setFindingAddress(true);
        subscription = MapService.findLocationFromAddress(
          text.trim(),
        ).subscribe((_data) => {
          if (_data.response.status === 200) {
            const { data } = _data.response;
            console.log(
              'ChooseReceiveAddressScreen',
              'data',
              _data.response.data,
            );
            setRegion({
              ...MapUtils.DEFAULT_LOCATION,
              latitude: data.lat,
              longitude: data.lng,
            });
          } else {
            setFindingAddress(false);
          }
          cleanRequest();
        });
      }, 500);
    }
  }, []);
  return (
    <Container scrollEnabled={false}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.flexContainer}
        initialRegion={MapUtils.DEFAULT_LOCATION}
        showsUserLocation={foundUserLocation}
        showsMyLocationButton={false}
        rotateEnabled={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        scrollEnabled={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        loadingEnabled={true}
        loadingIndicatorColor={Colors.tintColor}
        onMapReady={onMapReady}
        onRegionChange={onRegionChange}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <View style={[BaseStyles.boxWithShadow, styles.addressInputLayout]}>
        <SearchBar
          platform={Platform.OS}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          placeholder={
            findingAddress || isMoving
              ? t('ChooseReceiveAddressScreen.findingAddress')
              : t('ChooseReceiveAddressScreen.receiveAddress')
          }
          value={address.address}
          showLoading={findingAddress || isMoving}
          onChangeText={onChangeText}
          searchIcon={null}
          cancelIcon={null}
          showCancel={false}
          ref={searchBarRef}
          numberOfLines={1}
          autoCompleteType={'street-address'}
          inputStyle={BaseFontStyles.body1}
        />
      </View>
      {foundUserLocation && (
        <View style={[styles.findCurrentLocationLayout]}>
          <TouchableOpacity
            style={[BaseStyles.boxWithShadow, styles.findCurrentLocation]}
            onPress={onMapReady}>
            <CustomIcon
              name={'locate'}
              type={IconType.IONICON}
              size={24}
              custom={{
                color: Colors.tintColor,
                style: [BaseStyles.textShadow],
              }}
              focused={true}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={[styles.chooseAddressBtnLayout]}>
        <XButton
          title={t('ChooseReceiveAddressScreen.updateAddressBtn')}
          disabled={
            !region ||
            findingAddress ||
            address.address.trim().length === 0 ||
            (address.position && Object.keys(address.position).length === 0)
          }
          onPress={() => {
            showStoreAddressModal(true);
          }}
        />
      </View>
      {region && (
        <CustomIcon
          name={'map-marker-alt'}
          type={IconType.FONTAWESOME}
          size={MAP_ICON}
          custom={{
            color: findingAddress || isMoving ? Colors.gray : Colors.tintColor,
            style: [
              {
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -MAP_ICON,
                marginLeft: -((MAP_ICON / 2) * 0.78),
              },
              BaseStyles.textShadow,
            ],
          }}
          focused={true}
          other={FontAwesomeType.SOLID}
        />
      )}
      <StoreAddressModal
        visible={isStoreAddressModal}
        onClose={() => {
          showStoreAddressModal(false);
        }}
        addressData={address}
        updateAddress={updateAddress}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  info: state.cart.info,
});

const mapDispatchToProps = {
  updateAddress: (data) => ({
    type: AppActions.CART_UPDATE_INFO,
    payload: data,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseReceiveAddressScreen);
