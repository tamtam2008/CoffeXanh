import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-svg';
import { connect } from 'react-redux';
import PointIcon from '../../../../components/PointIcon';
import CustomIcon from '../../../../components/CustomIcon';
import XButton2 from '../../../../components/XButton2';
import { BaseFontStyles, BaseStyles } from '../../../../constants/BaseStyles';
import Colors from '../../../../constants/Colors';
import { FontAwesomeType, IconType } from '../../../../constants/Icon';
import useRootNavigation from '../../../../utils/useRootNavigation';

const SettingHeader = ({ userInfo, islogin, phone }) => {
  const { t } = useTranslation();
  const navigation = useRootNavigation();
  console.log('SettingHeader', islogin);
  return islogin ? (
    <View style={styles.container}>
      <View style={[BaseStyles.flexRow, BaseStyles.alignItems]}>
        <View style={[styles.avatarContainer, BaseStyles.boxWithShadow]}>
          {userInfo.avatar ? (
            <Image style={styles.avatar} source={{ url: userInfo.avatar }} />
          ) : (
            <CustomIcon
              type={IconType.FONTAWESOME}
              size={64}
              name="user-circle"
              focused={true}
              other={FontAwesomeType.SOLID}
              custom={{ style: BaseStyles.textShadow }}
            />
          )}
        </View>
        <View style={styles.userInfoContainer}>
          <View style={BaseStyles.flexRow}>
            <Text style={[BaseFontStyles.title, BaseStyles.greenColor]}>
              {userInfo.name || phone}
            </Text>
          </View>
          <Text style={BaseFontStyles.caption}>
            {t(userInfo.rank ? `rank.${userInfo.rank}` : 'rank.NC')}
          </Text>
        </View>
      </View>
      <View style={BaseStyles.flexRow}>
        <View style={[BaseStyles.flexRow, styles.point]}>
          <Text style={BaseFontStyles.menuOrBody2}>66</Text>
          <View style={StyleSheet.create({ marginLeft: 5 })}>
            <PointIcon size={16} focused={true} />
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={[BaseStyles.flexRow, BaseStyles.alignItems]}>
        <View style={[BaseStyles.mr_10]}>
          <CustomIcon
            type={IconType.FONTAWESOME}
            size={28}
            name="user"
            focused={true}
            other={FontAwesomeType.SOLID}
            custom={{ style: BaseStyles.textShadow }}
          />
        </View>
        <XButton2
          title={t('SettingMenu.SettingHeader.loginBtn')}
          style={styles.loginBtn}
          onPress={() => {
            navigation.navigate('Auth', { screen: 'login' });
          }}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  const { auth } = state;
  console.log('SettingHeader', auth);
  return {
    islogin: auth.isLogin,
    userInfo: auth.userInfo,
    phone: auth.phone,
  };
};
export default connect(
  mapStateToProps,
  null,
)(SettingHeader);

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // zIndex: 1,
    ...BaseStyles.baseContainerWithoutTopBottomPadding,
    paddingTop: 10,
    paddingBottom: 10,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    color: Colors.tintColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
  userInfoContainer: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  point: {
    alignItems: 'center',
  },
  loginBtn: {
    width: 150,
  },
});
