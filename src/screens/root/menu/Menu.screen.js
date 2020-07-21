import AsyncStorage from '@react-native-community/async-storage';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, PermissionsAndroid, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Container from '../../../components/layout/Container';
import { BaseStyles } from '../../../constants/BaseStyles';
import AppActions from '../../../redux/app.actions';
import AddressBar from './components/AddressBar';
import CartBar from './components/cartBar/CartBar';
import LocationPermissionPopup from './components/LocationPermissionPopup/LocationPermissionPopup';
import ChooseProductModal from './components/productModal/chooseProductModal/ChooseProductModal';
import SearchProductScreen from './components/productModal/searchProduct/SearchProduct.screen';
import ProductTabs from './components/tabs/ProductTabs';
import ReceiveAddressModal from './components/receiveAddressModal/ReceiveAddress.modal';
import styles from './Menu.style';

const cartHeight = 60;

const MenuScreen = ({
  haveItems,
  selectedItem,
  closeChooseProductModal,
  addChooseProduct,
  numberItems,
  totalAmount,
}) => {
  const translateY = useRef(new Animated.Value(cartHeight)).current;
  const { t } = useTranslation();
  const [permissionLocation, setPermissionLocation] = useState(false);
  const [permissionPopup, showPermissionsPopup] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [onRefresh, setOnRefresh] = useState(() => {});

  const requestLocationPermission = useCallback(async () => {
    showPermissionsPopup(true);
    try {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (status === 'granted') {
        console.warn('have permistion');
      }
      AsyncStorage.setItem(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        status,
      );
    } catch (err) {
      console.error('can not aprove permistion');
    }
  }, []);
  useEffect(() => {
    const checkLocationPermission = async () => {
      const status = await AsyncStorage.getItem(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (status) {
        const checkPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (checkPermission !== 'granted') {
          requestLocationPermission();
        }
        if (status === 'granted') {
          setPermissionLocation(true);
        }
      }
    };
    checkLocationPermission().then(() => {});
    const animation = async () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true, // <-- Add this
      }).start();
    };
    haveItems && animation();
  }, [haveItems, requestLocationPermission, t, translateY]);
  const refreshScreen = useCallback(() => {
    setShowSearchModal(false);
    setShowAddressModal(false);
    showPermissionsPopup(false);
  }, []);
  return (
    <Container>
      <ScrollView
        // refreshControl={
        //   <RefreshControl refreshing={false} onRefresh={onRefresh} />
        // }
        contentContainerStyle={styles.container}>
        <AddressBar
          permissionLocation={permissionLocation}
          onAction={() => {
            setShowAddressModal(true);
          }}
        />
        <View
          style={[
            BaseStyles.boxWithShadow2,
            styles.container,
            styles.productContainer,
            haveItems && StyleSheet.flatten({ paddingBottom: 50 }),
          ]}>
          <View style={[styles.container]}>
            <ProductTabs
              openSearch={() => {
                setShowSearchModal(true);
              }}
              setOnRefesh={setOnRefresh}
            />
          </View>
          {haveItems && (
            <Animated.View
              style={[
                BaseStyles.boxWithShadow2,
                styles.float,
                {
                  transform: [
                    {
                      translateY: translateY,
                    },
                  ],
                },
              ]}>
              <CartBar
                numberItems={numberItems}
                totalAmount={totalAmount}
                refreshScreen={refreshScreen}
              />
            </Animated.View>
          )}
        </View>
        <LocationPermissionPopup
          visible={permissionPopup}
          okAction={requestLocationPermission}
          cancleAction={() => showPermissionsPopup(false)}
        />
        <ChooseProductModal
          id={selectedItem}
          footerAction={{
            cancelAction: closeChooseProductModal,
            submitAction: product => addChooseProduct(product),
          }}
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
        <ReceiveAddressModal
          visible={showAddressModal}
          onClose={() => {
            setShowAddressModal(false);
          }}
        />
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = state => {
  const { cart } = state;
  return {
    haveItems: cart.items.length > 0,
    selectedItem: cart.selectedItem,
    numberItems:
      cart.items.length > 0
        ? cart.items.reduce(function(a, b) {
            return a + b.quantity;
          }, 0)
        : 0,
    totalAmount: cart.totalAmount + cart.fees - cart.promotion,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    closeChooseProductModal: () =>
      dispatch({ type: AppActions.CART_SELECT_ITEM, payload: null }),
    addChooseProduct: product =>
      dispatch({ type: AppActions.CART_ADD_ITEM, payload: product }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuScreen);
