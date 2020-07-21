import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import {
  BaseStyles,
  BaseFontStyles,
} from '../../../../../../constants/BaseStyles';
import styles from './OrderItemDetails.style';
import { formatCurrency } from '../../../../../../utils/formatUtils';
import { connect } from 'react-redux';
import OrderItem from './OrderItem';
import actions from '../../../../../../redux/app.actions';
import useRootNavigation from '../../../../../../utils/useRootNavigation';
import { useTranslation } from 'react-i18next';

const OrderItemDetails = ({
  items,
  totalAmount,
  fees,
  promotion,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const navigation = useRootNavigation();
  const { t } = useTranslation();
  useEffect(() => {
    console.log('OrderItemDetails', items.length);
    if (items.length === 0) {
      navigation.navigate('menu');
    }
  }, [items.length, navigation]);
  return (
    <View>
      <Text style={styles.title}>{t('CartScreen.OrderItemDetails.title')}</Text>
      <View style={[BaseStyles.baseContainer, styles.container]}>
        <View>
          {items.map(val => (
            <OrderItem
              data={val}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          ))}
        </View>
        <View style={[styles.line]} />
        <View style={[BaseStyles.flexRow, styles.spaceBetween]}>
          <Text style={[BaseFontStyles.menuOrBody2, styles.lightGrayText]}>
            {t('CartScreen.OrderItemDetails.provisionalSum')}
          </Text>
          <Text style={[BaseFontStyles.menuOrBody2]}>
            {formatCurrency(totalAmount)}
          </Text>
        </View>
        <View style={[BaseStyles.flexRow, styles.spaceBetween]}>
          <Text style={[BaseFontStyles.menuOrBody2, styles.lightGrayText]}>
            {t('CartScreen.OrderItemDetails.shippingFee')}
          </Text>
          <Text style={[BaseFontStyles.menuOrBody2]}>
            {formatCurrency(fees)}
          </Text>
        </View>
        {promotion > 0 && (
          <View style={[BaseStyles.flexRow, styles.spaceBetween]}>
            <Text style={[BaseFontStyles.menuOrBody2, styles.lightGrayText]}>
              {t('CartScreen.OrderItemDetails.promotion')}
            </Text>
            <Text style={[BaseFontStyles.menuOrBody2]}>
              -{formatCurrency(promotion)}
            </Text>
          </View>
        )}
        <View style={[styles.line]} />
        <View style={[BaseStyles.flexRow, styles.spaceBetween]}>
          <Text style={[BaseFontStyles.title]}>
            {t('CartScreen.OrderItemDetails.total')}
          </Text>
          <Text style={[BaseFontStyles.title, styles.totalPrice]}>
            {formatCurrency(totalAmount + fees - promotion)}
          </Text>
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  items: state.cart.items,
  totalAmount: state.cart.totalAmount,
  fees: state.cart.fees,
  promotion: state.cart.promotion,
});

const mapDispatchToProps = {
  decreaseQuantity: product => ({
    type: actions.CART_ADD_ITEM,
    payload: product,
  }),
  increaseQuantity: product => ({
    type: actions.CART_ADD_ITEM,
    payload: product,
  }),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderItemDetails);
