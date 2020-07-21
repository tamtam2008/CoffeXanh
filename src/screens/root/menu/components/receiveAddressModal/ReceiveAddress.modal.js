import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import XModal from '../../../../../components/layout/XModal';
import Container from '../../../../../components/layout/Container';
import styles from './ReceiveAddress.style';
import {
  BaseStyles,
  BaseFontStyles,
} from '../../../../../constants/BaseStyles';
import XIconButton from '../../../../../components/XIconButton';
import { IconType } from '../../../../../constants/Icon';
import Layout from '../../../../../constants/Layout';
import Colors from '../../../../../constants/Colors';
import XButton from '../../../../../components/XButton';
import useRootNavigation from '../../../../../utils/useRootNavigation';

const navigation = useRootNavigation();
const ReceiveAddressModal = ({ visible, onClose }) => {
  return (
    <XModal visible={visible} onClose={onClose}>
      <View style={[styles.popupContainer]}>
        <View style={[BaseStyles.boxWithShadow, styles.headerContainer]}>
          <XIconButton
            icon={{
              name: 'arrow-back',
              type: IconType.MATERIAL,
              size: 24,
            }}
            color={Colors.gray}
            style={[styles.buttonLeft]}
            onPress={onClose}
          />
          <View
            style={[
              styles.titleContainer,
              StyleSheet.flatten({
                width: Layout.window.width - 64,
              }),
            ]}>
            <Text style={BaseFontStyles.title}>Giao hàng đến</Text>
          </View>
        </View>
        <Container style={BaseStyles.baseContainer}>
          <ScrollView>
            <XButton
              title={'Chọn từ bản đồ'}
              onPress={() => {
                onClose();
                navigation.navigate('chooseReceiveAddress');
              }}
            />
          </ScrollView>
        </Container>
      </View>
    </XModal>
  );
};

export default ReceiveAddressModal;
