import React from 'react';

import { Text, View } from 'react-native';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../constants/BaseStyles';
import { ListItem } from 'react-native-elements';
import CustomIcon from '../../../../../components/CustomIcon';
import { IconType } from '../../../../../constants/Icon';
import Colors from '../../../../../constants/Colors';
import { useTranslation } from 'react-i18next';
import Layout from '../../../../../constants/Layout';

const OrderReceiveInfo = ({ data }) => {
  const { detailOrder } = data || { detailOrder: [{}] };
  const { receiveName, receivePhone, receiveAddress } = detailOrder[0];
  const { t } = useTranslation();
  return (
    <View>
      <Text style={[BaseFontStyles.title, BaseStyles.mb_10, BaseStyles.mt_16]}>
        {t('OrderDetailScreen.OrderReceiveInfo.title')}
      </Text>
      <View style={[BaseStyles.baseContainer]}>
        <ListItem
          leftElement={
            <View style={[BaseStyles.flexRow]}>
              <CustomIcon
                name={'user-alt'}
                size={19}
                type={IconType.FONTAWESOME}
                focused={true}
                custom={{ color: Colors.lightGray }}
              />
              <Text
                style={[
                  BaseFontStyles.body1,
                  BaseStyles.alignSelfCenter,
                  BaseStyles.ml_10,
                ]}>
                {receiveName}
              </Text>
            </View>
          }
          rightElement={
            <View style={[BaseStyles.flexRow]}>
              <CustomIcon
                name={'phone'}
                size={19}
                type={IconType.FONTAWESOME}
                focused={true}
                custom={{ color: Colors.lightGray }}
              />
              <Text
                style={[
                  BaseFontStyles.body1,
                  BaseStyles.alignSelfCenter,
                  BaseStyles.ml_10,
                ]}>
                {receivePhone}
              </Text>
            </View>
          }
          containerStyle={{
            paddingHorizontal: 0,
          }}
        />
        <View style={[BaseStyles.flexRow]}>
          <CustomIcon
            name={'map-marker-alt'}
            size={19}
            type={IconType.FONTAWESOME}
            focused={true}
            custom={{ color: Colors.lightGray }}
          />
          <Text
            style={[
              BaseFontStyles.body1,
              BaseStyles.alignSelfCenter,
              BaseStyles.ml_10,
              { width: Layout.window.width - 98 },
            ]}>
            {receiveAddress}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderReceiveInfo;
