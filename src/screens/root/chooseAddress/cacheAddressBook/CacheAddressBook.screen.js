import React, { useCallback } from 'react';
import Container from '../../../../components/layout/Container';
import { FlatList, TouchableOpacity } from 'react-native';
import XButton from '../../../../components/XButton';
import { BaseStyles } from '../../../../constants/BaseStyles';
import AppActions from '../../../../redux/app.actions';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import CustomIcon from '../../../../components/CustomIcon';
import { FontAwesomeType, IconType } from '../../../../constants/Icon';
import Colors from '../../../../constants/Colors';
import styles from './CacheAddressBook.style';
import AddressBookUtil from '../../../../session/AddressBookUtils';
import { useTranslation } from 'react-i18next';
import Layout from '../../../../constants/Layout';

const CacheAddressBookScreen = ({ info, updateAddress, navigation, route }) => {
  const { t } = useTranslation();
  const chooseFromMap = useCallback(() => {
    navigation.navigate('chooseReceiveAddress', { info });
  }, [info, navigation]);
  console.log('CacheAddressBookScreen', route);
  const onPress = useCallback(
    address => {
      updateAddress(address);
      navigation.goBack();
    },
    [navigation, updateAddress],
  );
  const data = [];
  if (info.address.length > 0) {
    data.push({
      address: info.address,
      position: info.position,
      distanceToShop: info.distanceToShop,
      extraGreater5km: info.extraGreater5km,
    });
  }
  data.push(
    ...AddressBookUtil.addressBook
      .map(val => ({ ...val, isStored: true }))
      .filter(val => val.address !== info.address),
  );
  return (
    <Container scrollEnabled={false}>
      <FlatList
        contentContainerStyle={[BaseStyles.baseContentNoBackground]}
        data={data}
        keyExtractor={({ item, index }) => index}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item)}>
            <ListItem
              containerStyle={[styles.itemContainer, BaseStyles.mb_10]}
              title={item.address}
              leftElement={
                <CustomIcon
                  name={item.isStored ? 'save' : 'map-marked-alt'}
                  size={24}
                  type={IconType.FONTAWESOME}
                  focused={item.address === info.address}
                  custom={{
                    color: Colors.tintColor,
                  }}
                  other={FontAwesomeType.SOLID}
                />
              }
              rightElement={
                item.address === info.address ? (
                  <CustomIcon
                    name={'check'}
                    size={24}
                    type={IconType.FONTAWESOME}
                    focused={true}
                    custom={{
                      color: Colors.tintColor,
                    }}
                  />
                ) : null
              }
            />
          </TouchableOpacity>
        )}
      />
      <XButton
        title={t('CacheAddressBookScreen.chooseFromMapBtn')}
        onPress={chooseFromMap}
        style={{
          ...BaseStyles.mb_16,
          ...BaseStyles.mt_16,
          ...BaseStyles.ml_16,
          width: Layout.window.width - 32,
        }}
      />
    </Container>
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
)(CacheAddressBookScreen);
