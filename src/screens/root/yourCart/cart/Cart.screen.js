import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Container from '../../../../components/layout/Container';
import XButton from '../../../../components/XButton';
import { BaseStyles } from '../../../../constants/BaseStyles';
import styles from './Cart.style';
import OrderInfo from './components/OrderInfo/OrderInfo';
import OrderItemDetails from './components/OrderItemDetails/OrderItemDetails';
import OrderNotes from './components/OrderNotes/OrderNotes';
import OrderPaymentAndCoupon from './components/OrderPaymentAndCoupon/OrderPaymentAndCoupon';
import OrderReceiveTime from './components/OrderReceiveTime/OrderRecieveTime';

const CartScreen = ({ cartInfo }) => {
  const { t } = useTranslation();
  const createOrder = useCallback(() => {}, []);
  return (
    <Container>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={[BaseStyles.baseContent]}>
          <OrderInfo />
          <OrderReceiveTime />
          <OrderItemDetails />
          <OrderPaymentAndCoupon />
          <OrderNotes />
          <XButton title={t('CartScreen.orderBtn')} onPress={createOrder} />
        </View>
      </ScrollView>
    </Container>
  );
};
const mapStateToProps = state => ({
  cartInfo: state.cart,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartScreen);
