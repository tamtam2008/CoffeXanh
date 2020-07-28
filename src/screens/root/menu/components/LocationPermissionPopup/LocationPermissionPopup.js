import React, { useCallback } from 'react';
import { PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import XModal from '../../../../../components/layout/XModal';
import XButton from '../../../../../components/XButton';
import XButton2 from '../../../../../components/XButton2';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../constants/BaseStyles';
import Layout from '../../../../../constants/Layout';
import AsyncStorage from '@react-native-community/async-storage';
import SessionUtils from '../../../../../session/SessionUtils';

const LocationPermissionPopup = ({ visible, cancelAction }) => {
  const requestLocationPermission = useCallback(async () => {
    try {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (status === 'granted') {
        console.warn('have permission');
      }
      AsyncStorage.setItem(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        status,
      ).then(() => {
        SessionUtils.setConfig({ locationPermission: status === 'granted' });
      });
    } catch (err) {
      console.log('LocationPermissionPopup', JSON.stringify(err));
      // console.error('can not approve permission');
    }
  }, []);
  return (
    <XModal visible={visible} onClose={cancelAction}>
      <View
        style={[BaseStyles.baseContainer, BaseStyles.flexColumn, styles.popup]}>
        <Text style={[BaseFontStyles.title, styles.body]}>Thông báo</Text>
        <Text style={[BaseFontStyles.body1, BaseStyles.mt_16, styles.body]}>
          Để trải nghiệm của bạn trên sản phẩm của chúng tôi được tốt hơn. Chúng
          tôi cần bạn cấp phép cho sử dụng quyền truy cập vị trí trên thiết bị
          của bạn.
        </Text>
        <View
          style={[
            BaseStyles.flexRow,
            BaseStyles.mt_24,
            styles.buttonContainer,
          ]}>
          <XButton2
            onPress={() => {
              cancelAction();
              AsyncStorage.setItem(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                'denied',
              );
            }}
            style={styles.button}
            title={'Đóng'}
          />
          <XButton
            onPress={() => {
              cancelAction();
              requestLocationPermission();
            }}
            style={styles.button}
            title={'Đồng ý'}
          />
        </View>
      </View>
    </XModal>
  );
};

export default LocationPermissionPopup;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(83,82,82,0.9)',
  },
  popup: {
    width: Layout.window.width - 32,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  body: {
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: '40%',
  },
});
