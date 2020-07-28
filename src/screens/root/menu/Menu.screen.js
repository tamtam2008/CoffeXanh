import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PermissionsAndroid, View } from 'react-native';
import { connect } from 'react-redux';
import Container from '../../../components/layout/Container';
import { BaseStyles } from '../../../constants/BaseStyles';
import LocationPermissionPopup from './components/LocationPermissionPopup/LocationPermissionPopup';
import SearchProductScreen from './components/productModal/searchProduct/SearchProduct.screen';
import ProductTabs from './components/tabs/ProductTabs';
import styles from './Menu.style';
import { useFocusEffect } from '@react-navigation/native';
import SessionUtils from '../../../session/SessionUtils';

const MenuScreen = ({ haveItems, numberItems, totalAmount }) => {
  const { t } = useTranslation();
  const [permissionLocation, setPermissionLocation] = useState(false);
  const [permissionPopup, showPermissionsPopup] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useFocusEffect(() => {
    const checkLocationPermission = async () => {
      if (SessionUtils.config().locationPermission) {
        const checkPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (!checkPermission) {
          showPermissionsPopup(true);
        }
      }
    };
    checkLocationPermission();
  });
  const refreshScreen = useCallback(() => {
    setShowSearchModal(false);
    showPermissionsPopup(false);
  }, []);
  return (
    <Container style={styles.container} scrollEnabled={false}>
      <View
        style={[
          BaseStyles.boxWithShadow2,
          styles.container,
          styles.productContainer,
        ]}>
        <View style={[styles.container]}>
          <ProductTabs
            openSearch={() => {
              setShowSearchModal(true);
            }}
          />
        </View>
      </View>
      <LocationPermissionPopup
        visible={permissionPopup}
        cancelAction={() => showPermissionsPopup(false)}
      />
      <SearchProductScreen
        visible={showSearchModal}
        onClose={() => {
          setShowSearchModal(false);
        }}
        refreshScreen={refreshScreen}
        haveItems={haveItems}
        numberItems={numberItems}
        totalAmount={totalAmount}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { cart } = state;
  return {
    haveItems: cart.items.length > 0,
    numberItems:
      cart.items.length > 0
        ? cart.items.reduce(function (a, b) {
            return a + b.quantity;
          }, 0)
        : 0,
    totalAmount: cart.totalAmount + cart.fees - cart.promotion,
  };
};

export default connect(mapStateToProps, null)(MenuScreen);
