import React, { useCallback } from 'react';
import XModal from '../../../../../../components/layout/XModal';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../constants/BaseStyles';
import { Text, View } from 'react-native';
import useRootNavigation from '../../../../../../utils/useRootNavigation';
import XButton2 from '../../../../../../components/XButton2';
import XButton from '../../../../../../components/XButton';
import styles from './StoreAddress.style';
import { useTranslation } from 'react-i18next';
import AddressBookUtil from '../../../../../../session/AddressBookUtils';

const navigation = useRootNavigation();
const StoreAddressModal = ({
  visible,
  onClose,
  addressData,
  updateAddress,
}) => {
  const { t } = useTranslation();
  const skipAction = useCallback(() => {
    updateAddress(addressData);
    onClose();
    navigation.navigate('cacheAddressBook');
  }, [addressData, onClose, updateAddress]);
  const storeAction = useCallback(() => {
    AddressBookUtil.storeNewAddress(addressData, skipAction);
  }, [addressData, skipAction]);
  return (
    <XModal visible={visible} onClose={onClose}>
      <View style={[BaseStyles.baseContainer, styles.popupContainer]}>
        <Text
          style={[BaseFontStyles.title, styles.textCenter, BaseStyles.mb_16]}>
          {t('ChooseReceiveAddressScreen.StoreAddressModal.title')}
        </Text>
        <Text style={[BaseFontStyles.body1, styles.textCenter]}>
          {/*Bạn có muốn lưu địa chỉ "{addressData.address}" không?*/}
          {t('ChooseReceiveAddressScreen.StoreAddressModal.body', {
            address: addressData.address,
          })}
        </Text>
        <View style={[BaseStyles.flexRow, BaseStyles.mt_16]}>
          <XButton
            style={{ ...BaseStyles.mr_5, ...styles.w50percent }}
            title={t('ChooseReceiveAddressScreen.StoreAddressModal.storeBtn')}
            onPress={storeAction}
          />
          <XButton2
            style={{ ...BaseStyles.ml_5, ...styles.w50percent }}
            title={t('ChooseReceiveAddressScreen.StoreAddressModal.skipBtn')}
            onPress={skipAction}
          />
        </View>
      </View>
    </XModal>
  );
};

export default StoreAddressModal;
