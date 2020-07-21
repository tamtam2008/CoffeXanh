import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import CustomIcon from '../../../../components/CustomIcon';
import { BaseFontStyles, BaseStyles } from '../../../../constants/BaseStyles';
import { IconType } from '../../../../constants/Icon';
import paymentConfig from '../../../../config/Payment.config';
import actions from '../../../../redux/app.actions';
import useRootNavigation from '../../../../utils/useRootNavigation';
import styles from './ChoosePayment.style';

const ChoosePaymentScreen = props => {
  const navigation = useRootNavigation();
  const { t } = useTranslation();
  const {
    payment: { code },
    updatePayment,
  } = props;
  return (
    <View style={[BaseStyles.baseContent]}>
      {paymentConfig.map((item, key) =>
        itemRender(item, key, code, updatePayment, navigation, t),
      )}
    </View>
  );
};

const itemRender = (item, key, code, updatePayment, navigation, t) => {
  return (
    <TouchableOpacity
      onPressIn={() => {
        updatePayment({ code: item.code, name: item.name });
        navigation.navigate('cart');
      }}
      style={[BaseStyles.baseContainer, BaseStyles.flexRow, styles.paymentItem]}
      key={key}>
      <View style={[BaseStyles.flexRow, styles.paymentItemDetail]}>
        <CustomIcon {...item.icon} focused />
        <Text
          style={[BaseFontStyles.body1, BaseStyles.ml_16, styles.selfCenter]}
          lineBreakMode="tail"
          numberOfLines={1}>
          {t(item.name)}
        </Text>
      </View>
      {item.code === code && (
        <View style={[BaseStyles.ml_16]}>
          <CustomIcon
            name="check"
            type={IconType.FONTAWESOME}
            size={21}
            focused
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  payment: state.cart.payment,
});

const mapDispatchToProps = dispatch => ({
  updatePayment: payment =>
    dispatch({ type: actions.CART_UPDATE_PAYMENT, payload: payment }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChoosePaymentScreen);
