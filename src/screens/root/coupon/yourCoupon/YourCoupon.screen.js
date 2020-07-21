import React, { useLayoutEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Container from '../../../../components/layout/Container';
import XButton from '../../../../components/XButton';
import XIconButton from '../../../../components/XIconButton';
import XTextBox from '../../../../components/XTextBox';
import { BaseStyles } from '../../../../constants/BaseStyles';
import { FontAwesomeType, IconType } from '../../../../constants/Icon';
import Layout from '../../../../constants/Layout';
import CouponItem from './components/couponItem/CouponItem';
import Actions from './YourCoupon.actions';
import YourCouponController from './YourCoupon.controller';
import YourCouponReducer, { initialState } from './YourCoupon.reducer';
import styles from './YourCoupon.style';

function YourCouponScreen({ route, navigation, userId }) {
  const [state, dispatch] = useReducer(YourCouponReducer, initialState);
  const { t } = useTranslation();
  // console.log('YourCouponScreen', route);
  const { params } = route;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[BaseStyles.mr_16]}>
          <XIconButton
            icon={{
              name: 'qrcode',
              type: IconType.FONTAWESOME,
              size: 28,
              other: FontAwesomeType.SOLID,
            }}
            custom={{ style: BaseStyles.textShadow }}
            onPress={() => {}}
            disabled={true}
          />
        </View>
      ),
    });
    if (params) {
      const { data } = params;
      if (data) {
        dispatch({ type: Actions.GET_DATA_SUCCESS, payload: data });
      }
    } else {
      YourCouponController.getReward(userId, dispatch);
    }
  }, [navigation, params, userId]);
  return (
    <Container
      isAuthRequired={true}
      authMsg={t('YourCouponScreen.AuthRequiredMsg')}>
      <View
        style={[
          BaseStyles.baseContainer,
          BaseStyles.flexRow,
          styles.addCouponContainer,
        ]}>
        <XTextBox
          placeholder={t('YourCouponScreen.couponCode')}
          size={Layout.window.width - 32 - 90}
        />
        <XButton
          title={t('YourCouponScreen.addCouponBtn')}
          style={styles.addCouponBtn}
          disabled={true}
        />
      </View>
      <Container
        isFail={state.isFail}
        failMsg={t(state.failMsg)}
        isLoading={state.isRequesting}
        style={StyleSheet.flatten({ paddingVertical: 5 })}>
        <FlatList
          data={state.rewards}
          renderItem={({ item }) => <CouponItem coupon={item} />}
          keyExtractor={item => item.id}
          initialNumToRender={5}
        />
      </Container>
    </Container>
  );
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
});

export default connect(
  mapStateToProps,
  null,
)(YourCouponScreen);
