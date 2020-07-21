import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../constants/BaseStyles';
import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import { formatCurrency } from '../../../../../utils/formatUtils';
import useRootNavigation from '../../../../../utils/useRootNavigation';
import CartIcon from './CartIcon';

const navigation = useRootNavigation();
const CartBar = ({ numberItems = 0, totalAmount = 0, refreshScreen }) => {
  const { t } = useTranslation();
  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor="#fcfcfc"
      onPress={() => {
        refreshScreen();
        navigation.navigate('cart');
      }}>
      <View
        style={[
          BaseStyles.baseContainerWithoutTopBottomPadding,
          BaseStyles.flexRow,
          styles.container,
        ]}>
        <CartIcon number={numberItems} />
        <Text style={[BaseFontStyles.menuOrBody2, styles.text]}>
          {t('Menu.CartBar.viewYourCart')}
        </Text>
        <Text style={[BaseFontStyles.menuOrBody2, styles.text]}>
          {formatCurrency(totalAmount)}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default CartBar;

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.tintColor,
    zIndex: 200,
    height: 50,
  },
  text: {
    color: '#fff',
  },
});
