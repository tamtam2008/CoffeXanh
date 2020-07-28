import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseFontStyles } from '../../../../../../constants/BaseStyles';
import XButton2 from '../../../../../../components/XButton2';
import Colors from '../../../../../../constants/Colors';
import { ListItem } from 'react-native-elements';

const OrderInfoFD = ({ data }) => {
  const { t } = useTranslation();
  const { currentStatus } = data?.detailOrder[0] || {};
  return (
    <View>
      <Text style={[BaseFontStyles.body1]}>
        {t(`OrderDetail.msg.${currentStatus}`)}
      </Text>
      <ListItem
        containerStyle={{ paddingHorizontal: 0, paddingBottom: 0 }}
        rightElement={<XButton2 title={'Đặt lại'} style={styles.btn} />}
      />
    </View>
  );
};

export default OrderInfoFD;

const styles = StyleSheet.create({
  detailContent: {
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  textLightGray: {
    color: Colors.lightGray,
  },
  btn: { width: 100 },
});
