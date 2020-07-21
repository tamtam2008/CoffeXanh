import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import XModal from '../../../../../components/layout/XModal';
import XButton from '../../../../../components/XButton';
import XButton2 from '../../../../../components/XButton2';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../constants/BaseStyles';

const LocationPermissionPopup = ({ visible, okAction, cancelAction }) => {
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
            onPress={cancelAction}
            style={styles.button}
            title={'Đóng'}
          />
          <XButton onPress={okAction} style={styles.button} title={'Đồng ý'} />
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
    // marginTop: 22,
    backgroundColor: 'rgba(83,82,82,0.9)',
  },
  popup: {
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
