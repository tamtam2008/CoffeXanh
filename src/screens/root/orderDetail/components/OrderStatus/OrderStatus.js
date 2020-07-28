import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../constants/BaseStyles';
import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import { dynamicSort } from '../../../../../utils/AppUtils';
import { useTranslation } from 'react-i18next';
import AppConfig from '../../../../../config/App.config';
import moment from 'moment';

const OrderStatus = ({ data }) => {
  const { historyStatus } = data || {};
  const { t } = useTranslation();
  return (
    <View>
      <Text style={[BaseFontStyles.title, BaseStyles.mb_10, BaseStyles.mt_16]}>
        {t('OrderDetailScreen.OrderStatus.title')}
      </Text>
      <View style={[BaseStyles.baseContainer]}>
        <View style={[styles.line]}>
          <View style={[styles.content]}>
            {historyStatus?.sort(dynamicSort('actionTime')).map((val, key) => (
              <View style={[BaseStyles.flexRow, styles.row]} key={key}>
                <View
                  style={[
                    styles.point,
                    {
                      backgroundColor: AppConfig.ErrorOrderStatus.includes(
                        val.statusCode,
                      )
                        ? Colors.red
                        : Colors.tintColor,
                    },
                  ]}
                />
                <View style={[styles.contentRow]}>
                  <Text
                    style={[
                      BaseFontStyles.menuOrBody2,
                      AppConfig.ErrorOrderStatus.includes(val.statusCode)
                        ? styles.red
                        : styles.tintColor,
                    ]}>
                    {t(`OrderDetail.status.${val.statusCode}`)}
                  </Text>
                  <Text
                    style={[
                      BaseFontStyles.caption,
                      BaseStyles.alignSelfCenter,
                    ]}>
                    {moment(val.actionTime).fromNow()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  line: {
    borderColor: Colors.tintColor,
    borderLeftWidth: 2,
    marginLeft: 10,
    marginVertical: 10,
  },
  point: {
    width: 10,
    height: 10,
    backgroundColor: Colors.tintColor,
    alignSelf: 'center',
    borderRadius: 50,
    marginRight: 10,
  },
  content: {
    marginVertical: -10,
    width: '100%',
  },
  row: {
    marginLeft: -6,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Layout.window.width - 64 - 32,
    marginVertical: 2,
  },
  tintColor: {
    color: Colors.tintColor,
  },
  red: {
    color: Colors.red,
  },
});
