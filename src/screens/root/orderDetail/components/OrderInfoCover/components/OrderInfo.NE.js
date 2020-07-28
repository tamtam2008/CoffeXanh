import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../constants/BaseStyles';
import XLabelButton from '../../../../../../components/XLabelButton';
import XButton2 from '../../../../../../components/XButton2';
import Colors from '../../../../../../constants/Colors';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

const OrderInfoNE = ({ data }) => {
  const { t } = useTranslation();
  const { receiveTime, receiveAddress, currentStatus } =
    data?.detailOrder[0] || {};
  return (
    <View>
      <Text style={[BaseFontStyles.body1]}>
        {t(`OrderDetail.msg.${currentStatus}`)}
      </Text>
      <View style={[BaseStyles.flexRow]}>
        <View style={[BaseStyles.flexColumn, { width: '60%' }]}>
          <Text style={[BaseFontStyles.body1, styles.textLightGray]}>
            {t('OrderDetailScreen.OrderInfoCover.shipTo')}
          </Text>
          <Text
            style={[BaseFontStyles.body1]}
            numberOfLines={3}
            lineBreakMode={'tail'}>
            {receiveAddress}
          </Text>
        </View>
        <View style={[BaseStyles.flexColumn, { width: '40%' }]}>
          <Text
            style={[
              BaseFontStyles.body1,
              styles.textLightGray,
              { textAlign: 'right' },
            ]}>
            {t('OrderDetailScreen.OrderInfoCover.receiverTime')}
          </Text>
          <Text
            style={[BaseFontStyles.body1, { textAlign: 'right' }]}
            numberOfLines={3}
            lineBreakMode={'tail'}>
            {moment().to(receiveTime)}
          </Text>
        </View>
      </View>
      <ListItem
        containerStyle={{ paddingHorizontal: 0, paddingBottom: 0 }}
        leftElement={
          <XLabelButton
            title={t('OrderDetailScreen.OrderInfoCover.cancelOrder')}
            textStyle={[BaseFontStyles.body1, styles.textLightGray]}
          />
        }
        rightElement={
          <XButton2
            title={t('OrderDetailScreen.OrderInfoCover.reorder')}
            style={{ width: 100 }}
          />
        }
      />
    </View>
  );
};

export default OrderInfoNE;

const styles = StyleSheet.create({
  detailContent: {
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  textLightGray: {
    color: Colors.lightGray,
  },
});
