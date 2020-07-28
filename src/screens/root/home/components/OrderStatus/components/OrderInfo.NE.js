import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../constants/BaseStyles';
import XButton2 from '../../../../../../components/XButton2';
import Colors from '../../../../../../constants/Colors';
import { ListItem } from 'react-native-elements';
import i18next from 'i18next';
import moment from 'moment';
import 'moment/locale/vi';
import useRootNavigation from '../../../../../../utils/useRootNavigation';

moment.locale(i18next.language);
const navigation = useRootNavigation();
const OrderInfoNE = ({ data }) => {
  const { t } = useTranslation();
  const { receiveTime, receiveAddress, currentStatus } = data || {};
  return (
    <View>
      <Text style={[BaseFontStyles.body1]}>
        {t(`OrderDetail.msg.${currentStatus}`)}
      </Text>
      <View style={[BaseStyles.flexRow]}>
        <View style={[BaseStyles.flexColumn, { width: '60%' }]}>
          <Text style={[BaseFontStyles.body1, styles.textLightGray]}>
            Giao Hàng đến
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
            Dự kiến giao hàng
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
        rightElement={
          <XButton2
            title={'Chi tiết'}
            style={{ width: 100 }}
            onPress={() => {
              navigation.navigate('orderDetail', { ...data });
            }}
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
