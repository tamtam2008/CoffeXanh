import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {
  BaseStyles,
  BaseFontStyles,
} from '../../../../../../constants/BaseStyles';
import { IconType } from '../../../../../../constants/Icon';
import CustomIcon from '../../../../../../components/CustomIcon';
import styles from './CouponItem.style';
import useRootNavigation from '../../../../../../utils/useRootNavigation';
import { useTranslation } from 'react-i18next';

export default function CouponItem({ coupon }) {
  const navigation = useRootNavigation();
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('yourCouponDetail', {
          id: coupon.id,
          name: coupon.couponName,
        });
      }}
      style={[BaseStyles.baseContainer, BaseStyles.flexRow, styles.container]}>
      <View style={[BaseStyles.mr_10]}>
        <CustomIcon
          name="ticket-alt"
          type={IconType.FONTAWESOME}
          size={24}
          focused
        />
      </View>
      <View style={[BaseStyles.flexColumn, styles.content]}>
        <Text
          style={[BaseFontStyles.menuOrBody2]}
          numberOfLines={1}
          lineBreakMode="tail">
          {coupon.couponName}
        </Text>
        <Text
          style={[BaseFontStyles.body1, styles.lightGrayText]}
          numberOfLines={2}
          lineBreakMode="tail">
          {coupon.description}
        </Text>
        <Text
          style={[BaseFontStyles.body1]}
          numberOfLines={1}
          lineBreakMode="tail">
          {`${t('YourCouponScreen.applyTo')} ${formatDate(coupon.to)}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const formatDate = date => {
  const _date = new Date(date.split(' ')[0]);
  // console.log('CouponItem', date, _date);
  return `${formatTime(_date.getDate())}/${formatTime(
    _date.getMonth() + 1,
  )}/${_date.getFullYear()}`;
};

const formatTime = time => (time > 9 ? `${time}` : `0${time}`);
