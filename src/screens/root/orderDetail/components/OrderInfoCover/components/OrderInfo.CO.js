import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseFontStyles } from '../../../../../../constants/BaseStyles';
import XButton2 from '../../../../../../components/XButton2';
import { ListItem } from 'react-native-elements';

const OrderInfoCO = ({ data }) => {
  const { t } = useTranslation();
  const { currentStatus } = data?.detailOrder[0] || {};
  return (
    <View>
      <Text style={[BaseFontStyles.body1]}>
        {t(`OrderDetail.msg.${currentStatus}`)}
      </Text>
      <ListItem
        containerStyle={{ paddingHorizontal: 0, paddingBottom: 0 }}
        rightElement={
          <XButton2
            title={t('OrderDetailScreen.OrderInfoCover.reorder')}
            style={styles.btn}
          />
        }
      />
    </View>
  );
};
export default OrderInfoCO;

const styles = StyleSheet.create({
  detailContent: {
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  btn: { width: 100 },
});
