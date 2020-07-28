import React from 'react';

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../constants/BaseStyles';
import { Divider, Image, ListItem } from 'react-native-elements';
import { formatCurrency } from '../../../../../utils/AppUtils';
import Colors from '../../../../../constants/Colors';
import { useTranslation } from 'react-i18next';

const OrderDetail = ({ data }) => {
  const { listProduct, detailOrder, pathPhoto } = data || { detailOrder: [{}] };
  const { sumPaidMoney, feeShip, promotionMoney, payment } = detailOrder[0];
  const { t } = useTranslation();
  return (
    <View>
      <Text style={[BaseFontStyles.title, BaseStyles.mb_10, BaseStyles.mt_16]}>
        {t('OrderDetailScreen.OrderDetail.title')}
      </Text>
      <View style={[BaseStyles.baseContainer]}>
        {listProduct?.map((val, key) => (
          <ListItem
            key={key}
            title={
              <View style={[BaseStyles.flexColumn]}>
                <Text style={[BaseFontStyles.menuOrBody2]}>{val.name}</Text>
                <Text
                  style={[
                    BaseFontStyles.caption,
                    styles.lightGray,
                  ]}>{`${formatCurrency(val.price)} x ${val.quantity}`}</Text>
                <Text style={[BaseFontStyles.caption, styles.lightGray]}>
                  {val.sizeName}
                </Text>
              </View>
            }
            containerStyle={styles.itemContainer}
            leftElement={
              <Image
                source={{ uri: `${pathPhoto}/${val.thumb}` }}
                style={StyleSheet.flatten({
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  ...BaseStyles.boxWithShadow,
                  margin: 2,
                  marginBottom: 5,
                })}
                PlaceholderContent={<ActivityIndicator />}
              />
            }
            rightElement={
              <Text style={[BaseFontStyles.menuOrBody2]}>
                {formatCurrency(val.price * val.quantity)}
              </Text>
            }
          />
        ))}
        <Divider />
        <ListItem
          leftElement={
            <Text style={[BaseFontStyles.body1, styles.lightGray]}>
              {t('OrderDetailScreen.OrderDetail.rawAmount')}
            </Text>
          }
          rightElement={
            <Text style={[BaseFontStyles.menuOrBody2]}>
              {formatCurrency(sumPaidMoney)}
            </Text>
          }
          containerStyle={styles.itemContainer}
        />
        <ListItem
          leftElement={
            <Text style={[BaseFontStyles.body1, styles.lightGray]}>
              {t('OrderDetailScreen.OrderDetail.feeShip')}
            </Text>
          }
          rightElement={
            <Text style={[BaseFontStyles.menuOrBody2]}>
              {feeShip === 0
                ? formatCurrency(feeShip)
                : t('OrderDetailScreen.OrderDetail.freeShip')}
            </Text>
          }
          containerStyle={styles.itemContainer}
        />
        {promotionMoney > 0 && (
          <ListItem
            leftElement={
              <Text style={[BaseFontStyles.body1, styles.lightGray]}>
                {t('OrderDetailScreen.OrderDetail.promotion')}
              </Text>
            }
            rightElement={
              <Text style={[BaseFontStyles.menuOrBody2]}>{`- ${formatCurrency(
                promotionMoney,
              )}`}</Text>
            }
            containerStyle={styles.itemContainer}
          />
        )}
        <Divider />
        <ListItem
          leftElement={
            <Text style={[BaseFontStyles.body1, styles.lightGray]}>
              {t('OrderDetailScreen.OrderDetail.paymentType')}
            </Text>
          }
          rightElement={<Text style={[BaseFontStyles.body1]}>{payment}</Text>}
          containerStyle={styles.itemContainer}
        />
        <ListItem
          leftElement={
            <Text style={[BaseFontStyles.title]}>
              {t('OrderDetailScreen.OrderDetail.totalSum')}
            </Text>
          }
          rightElement={
            <Text style={[BaseFontStyles.title]}>{`${formatCurrency(
              sumPaidMoney + feeShip - promotionMoney,
            )}`}</Text>
          }
          containerStyle={styles.itemContainer}
        />
      </View>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  lightGray: {
    color: Colors.lightGray,
  },
  itemContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
});
