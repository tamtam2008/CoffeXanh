import React, {
  useLayoutEffect,
  useReducer,
  useCallback,
  useState,
} from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import Container from '../../../../components/layout/Container';
import YourCouponDetailController from './YourCouponDetail.controller';
import YourCouponDetailReducer, {
  initialState,
} from './YourCouponDetail.reducer';
import { useTranslation } from 'react-i18next';
import { BaseStyles, BaseFontStyles } from '../../../../constants/BaseStyles';
import styles from './YourCouponDetail.style';
import { IconType } from '../../../../constants/Icon';
import CustomIcon from '../../../../components/CustomIcon';

export default function YourCouponDetailScreen({ route, navigation }) {
  const [state, dispatch] = useReducer(YourCouponDetailReducer, initialState);
  const [id, setId] = useState(null);
  const { t } = useTranslation();
  const { params } = route;
  const onRefresh = useCallback(() => {
    console.log('YourCouponDetailScreen', 'id', id);
    id && YourCouponDetailController.getRewardDetail(id, dispatch);
  }, [id]);
  useLayoutEffect(() => {
    if (params) {
      const { id: _id, name } = params;
      navigation.setOptions({
        title: name,
      });
      if (_id) {
        setId(_id);
        onRefresh();
      }
    } else {
    }
  }, [navigation, onRefresh, params]);
  return (
    <ScrollView
      contentContainerStyle={styles.flexContainer}
      refreshControl={
        <RefreshControl refreshing={state.isRequesting} onRefresh={onRefresh} />
      }>
      <Container
        isLoading={state.isRequesting}
        isFail={state.isFail}
        failMsg={t(state.failMsg)}
        style={styles.contentContainer}>
        <View style={[BaseStyles.baseContainer, styles.topContainer]}>
          <View
            style={[
              BaseStyles.baseContainer,
              BaseStyles.flexColumn,
              styles.couponItemContainer,
            ]}>
            <CustomIcon
              name="ticket-alt"
              type={IconType.FONTAWESOME}
              size={30}
              custom={{ color: '#fff' }}
              focused
            />
            <Text
              style={[BaseFontStyles.menuOrBody2, styles.whiteText]}
              numberOfLines={1}
              lineBreakMode="tail">
              {state.coupon.couponName}
            </Text>
          </View>
          <Text style={[BaseFontStyles.menuOrBody2]}>
            {t('YourCouponDetailScreen.description')}
          </Text>
          <Text style={[BaseFontStyles.body1, BaseStyles.mt_10]}>
            {state.coupon.description}
          </Text>
        </View>
        <View style={[BaseStyles.baseContainer, BaseStyles.mt_10]}>
          <Text style={[BaseFontStyles.menuOrBody2]}>
            {`${t('YourCouponDetailScreen.numberUse')}: ${
              state.coupon.totalTimes
            }`}
          </Text>
        </View>
        <View style={[BaseStyles.baseContainer, BaseStyles.mt_10]}>
          <Text style={[BaseFontStyles.menuOrBody2]}>
            {t('YourCouponDetailScreen.conditionApply')}
          </Text>
          <Text style={[BaseFontStyles.body1, BaseStyles.mt_10]}>
            {t(
              state.excludeProduct.length === 0
                ? 'YourCouponDetailScreen.applyAllOrder'
                : 'YourCouponDetailScreen.excludeProducts',
            )}
          </Text>
        </View>
        <View style={[BaseStyles.baseContainer, BaseStyles.mt_10]}>
          <Text style={[BaseFontStyles.menuOrBody2]}>
            {t('YourCouponDetailScreen.apply')}
          </Text>
          <Text style={[BaseFontStyles.body1, BaseStyles.mt_10]}>
            {`${t('YourCouponDetailScreen.applyTo')} ${formatDate(
              state.coupon.to,
            )}.`}
          </Text>
        </View>
      </Container>
    </ScrollView>
  );
}

const formatDate = date => {
  const _date = new Date(date.split(' ')[0]);
  // console.log('CouponItem', date, _date);
  return `${formatTime(_date.getDate())}/${formatTime(
    _date.getMonth() + 1,
  )}/${_date.getFullYear()}`;
};

const formatTime = time => (time > 9 ? `${time}` : `0${time}`);
