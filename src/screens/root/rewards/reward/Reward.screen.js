import React, { useReducer, useLayoutEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './Reward.style';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import RewardConfig from './Reward.config';
import RewardReducer, { initialState } from './Reward.reducer';
import RewardController from './Reward.controller';
import useRootNavigation from '../../../../utils/useRootNavigation';
import Container from '../../../../components/layout/Container';
import { BaseStyles, BaseFontStyles } from '../../../../constants/BaseStyles';
import LazyImage from '../../../../components/LazyImage';
import { normalize } from '../../../../constants/Layout';
import CustomIcon from '../../../../components/CustomIcon';
import { IconType, FontAwesomeType } from '../../../../constants/Icon';
import PointIcon from '../../../../components/PointIcon';

const RewardScreen = ({ userInfo, userId }) => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(RewardReducer, initialState);
  const navigation = useRootNavigation();
  useLayoutEffect(() => {
    RewardController.getReward(userId, dispatch);
    return () => {};
  }, [userId]);
  return (
    <Container>
      <ScrollView
        style={[styles.flexContainer]}
        contentContainerStyle={styles.contentContainer}>
        <View style={[BaseStyles.baseContainer, styles.avatarContainer]}>
          <View style={[styles.avatar]}>
            {userInfo.avatar ? (
              <LazyImage
                url={userInfo.avatar}
                height={normalize(132)}
                width={normalize(132)}
                style={styles.avatarImage}
              />
            ) : (
              <CustomIcon
                name="user-circle"
                type={IconType.FONTAWESOME}
                size={normalize(132)}
                focused
                other={FontAwesomeType.SOLID}
                custom={{ style: BaseStyles.textShadow }}
              />
            )}
          </View>
          <Text style={[BaseFontStyles.headline]}>{userInfo.name}</Text>
          <Text style={[BaseFontStyles.body1]}>
            {t(userInfo.rank ? `rank.${userInfo.rank}` : 'rank.NC')}
          </Text>
        </View>
        <View style={[BaseStyles.flexRow, styles.buttonRow]}>
          <View
            style={[
              BaseStyles.flexRow,
              BaseStyles.boxWithShadow,
              styles.buttonContainer,
            ]}>
            <Text
              style={[
                BaseStyles.mr_10,
                BaseFontStyles.headline,
                styles.whiteText,
              ]}>
              {userInfo.point}
            </Text>
            <PointIcon size={28} />
          </View>

          <TouchableOpacity
            style={[
              BaseStyles.flexRow,
              BaseStyles.boxWithShadow,
              styles.buttonContainer,
            ]}
            disabled={state.isRequesting}
            onPress={() => {
              navigation.navigate('yourCoupon', { data: state.rewards });
            }}>
            <View style={[BaseStyles.mr_10]}>
              <CustomIcon
                name="ticket-alt"
                type={IconType.FONTAWESOME}
                size={32}
                custom={{
                  color: '#fff',
                }}
                focused
              />
            </View>
            {!state.isRequesting ? (
              <View style={[BaseStyles.flexColumn, styles.rewardTxt]}>
                <Text
                  style={[
                    BaseStyles.mr_10,
                    BaseFontStyles.menuOrBody2,
                    styles.whiteText,
                  ]}>
                  {t('Ưu đãi')}
                </Text>
                <Text
                  style={[
                    BaseStyles.mr_10,
                    BaseFontStyles.menuOrBody2,
                    styles.whiteText,
                  ]}>
                  {state.rewards.length}
                </Text>
              </View>
            ) : (
              <View style={[BaseStyles.flexColumn, styles.rewardTxt]}>
                <ActivityIndicator color={'#fff'} size={38.5} />
              </View>
            )}
          </TouchableOpacity>
        </View>
        {RewardConfig.items.map((item, key) => renderItem(item, key, t))}
      </ScrollView>
    </Container>
  );
};

const renderItem = (item, key, t) => (
  <TouchableOpacity
    key={key}
    onPress={item.action}
    style={[
      BaseStyles.baseContainer,
      BaseStyles.flexRow,
      styles.itemContainer,
    ]}>
    <View style={[BaseStyles.mr_10]}>
      <CustomIcon name={item.icon} type={item.iconType} size={24} focused />
    </View>
    <Text style={[BaseFontStyles.body1]}>{t(item.title)}</Text>
  </TouchableOpacity>
);

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  userId: state.auth.userId,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RewardScreen);
