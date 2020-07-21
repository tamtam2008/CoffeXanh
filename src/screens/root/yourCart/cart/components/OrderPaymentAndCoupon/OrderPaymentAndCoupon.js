import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import CustomIcon from '../../../../../../components/CustomIcon';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../constants/BaseStyles';
import { IconType } from '../../../../../../constants/Icon';
import useRootNavigation from '../../../../../../utils/useRootNavigation';
import styles from './OrderPaymentAndCoupon.style';
import CouponModal from '../couponModal/Coupon.modal';

const navigation = useRootNavigation();
const OrderPaymentAndCoupon = ({ payment }) => {
  const [couponModal, showCouponModal] = useState(false);
  const { t } = useTranslation();
  const openCouponModal = useCallback(() => {
    showCouponModal(true);
  }, []);
  const closeCouponModal = useCallback(() => {
    showCouponModal(false);
  }, []);
  return (
    <View>
      <Text style={styles.title}>
        {t('CartScreen.OrderPaymentAndCoupon.title')}
      </Text>
      <View
        style={[
          BaseStyles.baseContainer,
          BaseStyles.flexRow,
          styles.centerItems,
          styles.container,
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('paymentType');
          }}
          containerStyle={[BaseStyles.flexColumn, styles.containerItem]}>
          <View style={[BaseStyles.flexRow]}>
            <CustomIcon
              name="wallet"
              type={IconType.FONTAWESOME}
              size={21}
              focused
            />
            <Text
              style={[
                BaseFontStyles.menuOrBody2,
                styles.lightGrayText,
                BaseStyles.ml_10,
              ]}>
              {t('CartScreen.OrderPaymentAndCoupon.payment')}
            </Text>
          </View>
          <Text style={[BaseFontStyles.menuOrBody2, BaseStyles.mt_10]}>
            {t(payment.name)}
          </Text>
        </TouchableOpacity>
        <View style={[styles.line]} />
        <TouchableOpacity
          containerStyle={[BaseStyles.flexColumn, styles.containerItem]}
          onPress={openCouponModal}>
          <View style={[BaseStyles.flexRow]}>
            <CustomIcon
              name="ticket-alt"
              type={IconType.FONTAWESOME}
              size={21}
              focused
            />
            <Text
              style={[
                BaseFontStyles.menuOrBody2,
                styles.lightGrayText,
                BaseStyles.ml_10,
              ]}>
              {t('CartScreen.OrderPaymentAndCoupon.promotion')}
            </Text>
          </View>
          <Text style={[BaseFontStyles.menuOrBody2, BaseStyles.mt_10]}>
            {t('CartScreen.OrderPaymentAndCoupon.noPromotion')}
          </Text>
        </TouchableOpacity>
      </View>
      <CouponModal visible={couponModal} onClose={closeCouponModal} />
    </View>
  );
};

const mapStateToProps = state => ({
  payment: state.cart.payment,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderPaymentAndCoupon);
