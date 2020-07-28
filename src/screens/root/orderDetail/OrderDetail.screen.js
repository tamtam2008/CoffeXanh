import React, { useCallback, useLayoutEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../../components/layout/Container';
import OrderDetailReducer, { initialState } from './OrderDetail.reducer';
import Controller from './OrderDetail.controller';
import OrderInfoCover from './components/OrderInfoCover/OrderInfoCover';
import OrderStatus from './components/OrderStatus/OrderStatus';
import OrderDetail from './components/OrderDetail/OrderDetail';
import OrderReceiveInfo from './components/OrderReceiveInfo/OrderReceiveInfo';
import { BaseFontStyles, BaseStyles } from '../../../constants/BaseStyles';
import { StyleSheet, Text, View } from 'react-native';
import Layout from '../../../constants/Layout';
import SessionUtils from '../../../session/SessionUtils';
import moment from 'moment';
import Colors from '../../../constants/Colors';

const OrderDetailScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(OrderDetailReducer, initialState);
  const {
    params: { id, orderName, currentStatus, createdDate },
  } = route;
  const { userId } = SessionUtils.session();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <View
          {...props}
          style={[
            {
              width: Layout.window.width * 0.7,
            },
          ]}>
          <Text
            style={StyleSheet.flatten([
              BaseFontStyles.headline,
              {
                textAlign: 'center',
              },
            ])}
            numberOfLines={1}
            lineBreakMode={'tail'}>
            {t('OrderDetail.title', {
              orderName,
            })}
          </Text>
          <Text
            style={[
              BaseFontStyles.caption,
              StyleSheet.flatten({
                textAlign: 'center',
                color: Colors.lightGray,
              }),
            ]}>
            {moment(createdDate, 'DD-MM-YYYY hh:mm:ss').format(
              'HH:mm DD/MM/YYYY',
            )}
          </Text>
        </View>
      ),
    });
    Controller.getData(id, dispatch);
    return Controller.cleanUp;
  }, [createdDate, id, navigation, orderName, route, t, userId]);

  const onRefresh = useCallback(() => {
    Controller.getData(id, dispatch);
  }, [id]);

  return (
    <Container
      isLoading={state.isRequesting}
      onRefresh={onRefresh}
      isFail={state.isFail}
      failMsg={t(state.failMsg)}
      contentStyle={[BaseStyles.baseContent]}>
      <OrderInfoCover status={currentStatus} data={state.data} />
      <OrderStatus status={currentStatus} data={state.data} />
      <OrderDetail data={state.data} />
      <OrderReceiveInfo data={state.data} />
    </Container>
  );
};

export default OrderDetailScreen;
