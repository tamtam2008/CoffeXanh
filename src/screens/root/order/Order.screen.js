import React from 'react';
import Container from '../../../components/layout/Container';
import { StyleSheet, View, Text } from 'react-native'
import Colors from '../../.././constants/Colors'
import { BaseFontStyles, BaseStyles } from '../../.././constants/BaseStyles'
import OrderMenuConfig from './Order.config'
import OrderItem from './components/OrderItem';
import SessionUtils from '../../../session/SessionUtils';
import Layout from '../../../constants/Layout';
import OrderHeader from './components/OrderHeader'

const OrderScreen = (props) => {
  return <>
    <Container
      isRequesting={props.isRequesting}
      contentStyle={styles.container}>
        <OrderHeader />
      <View style={styles.manageOrderTitle}>
        <Text style={[BaseFontStyles.headline, styles.title]}>Quản lý đơn hàng</Text>
      </View>
      {OrderMenuConfig.menuList
        .filter(
          (item) =>
            item.isAuthRequired === SessionUtils.session()?.isLogin ||
            !item.isAuthRequired,
        )
        .map((item, key) => (
          <OrderItem
            key={key}
            icon={item.icon}
            style={[styles.item]}
            title={item.title}
            onPress={item.action}
          />
        ))}
      {SessionUtils.session().isLogin && (
        <OrderItem
          icon={{
            name: 'sign-out-alt',
            type: IconType.FONTAWESOME,
            other: FontAwesomeType.SOLID,
            color: Colors.red,
          }}
          style={[styles.item, styles.logout]}
          title={t('SettingMenu.logout')}
          titleStyle={[styles.logout]}
          onPress={() => {
            SessionUtils.logout();
          }}
        />
      )}
    </Container>
  </>
}
export default OrderScreen

const styles = StyleSheet.create({
  item: {
    width: Layout.window.width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logout: {
    color: Colors.red,
  },
  container: {
    paddingBottom: 24,
  },
  manageOrderTitle: {
    alignSelf: 'stretch',
    backgroundColor: Colors.tintColor,
    color: '#FFF',
    alignItems: 'center',
    height: 64,
    justifyContent: 'center'
  },
  title: {
    color: '#FFF'
  }
});
