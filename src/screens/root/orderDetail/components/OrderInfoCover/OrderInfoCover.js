import React from 'react';
import { Text, View } from 'react-native';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../constants/BaseStyles';
import { getContentData } from './OrderInfoCover.config';
import Colors from '../../../../../constants/Colors';
import AppConfig from '../../../../../config/App.config';

const OrderInfoCover = ({ data }) => {
  const { currentStatus, status } = data?.detailOrder[0] || {};
  const Content = getContentData(currentStatus);
  return data ? (
    <View style={[BaseStyles.baseContainer]}>
      <Text
        style={[
          BaseFontStyles.menuOrBody2,
          {
            color: AppConfig.ErrorOrderStatus.includes(currentStatus)
              ? Colors.red
              : Colors.tintColor,
            marginBottom: 16,
          },
        ]}>
        {status}
      </Text>
      <Content.content data={data} />
    </View>
  ) : null;
};

export default OrderInfoCover;
