import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../../../constants/Colors';
import CustomIcon from '../../../../components/CustomIcon';
import { FontAwesomeType, IconType } from '../../../../constants/Icon';
import { BaseFontStyles, BaseStyles } from '../../../../constants/BaseStyles';
import PointIcon from '../../../../components/PointIcon';
import NotifyIcon from './NotifyIcon';
import { connect } from 'react-redux';
import XButton2 from '../../../../components/XButton2';
import useRootNavigation from '../../../../utils/useRootNavigation';
import { useTranslation } from 'react-i18next';
import XIconButton from '../../../../components/XIconButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

const navigation = useRootNavigation();

function Header({ numNotify, isLogin, userInfo, phone }) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {renderUserInfo(isLogin, userInfo, phone, t)}
      <View style={BaseStyles.flexRow}>
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
        <View style={BaseStyles.ml_16}>
          <NotifyIcon number={numNotify} size={28} />
        </View>
      </View>
    </View>
  );
}

const renderUserInfo = (isLogin, userInfo, phone, t) =>
  isLogin ? (
    <TouchableOpacity
      style={[BaseStyles.flexRow, BaseStyles.alignItems]}
      onPress={() => {
        navigation.navigate('accountInfo');
      }}>
      <View style={[styles.avatarContainer]}>
        {renderAvatar(userInfo.avatar)}
      </View>
      <View style={styles.userInfoContainer}>
        <View style={BaseStyles.flexRow}>
          <Text style={[BaseFontStyles.menuOrBody2, BaseStyles.greenColor]}>
            {userInfo.name || phone}
          </Text>
          <View style={[BaseStyles.flexRow, BaseStyles.ml_10]}>
            <Text style={BaseFontStyles.body1}>{userInfo.point}</Text>
            <View style={StyleSheet.flatten({ marginLeft: 5 })}>
              <PointIcon size={14} focused={true} />
            </View>
          </View>
        </View>
        <Text style={BaseFontStyles.caption}>
          {t(userInfo.rank ? `rank.${userInfo.rank}` : 'rank.NC')}
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
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
        title={t('Home.header.loginBtn')}
        style={styles.loginBtn}
        onPress={() => {
          navigation.navigate('Auth', { screen: 'login' });
        }}
      />
    </View>
  );

const renderAvatar = avatar =>
  avatar ? (
    <Image style={styles.avatar} source={{ uri: avatar }} />
  ) : (
    <CustomIcon
      type={IconType.FONTAWESOME}
      size={36}
      name="user-circle"
      focused={true}
      other={FontAwesomeType.SOLID}
    />
  );

const mapStateToProps = state => {
  const { notify, auth } = state;
  return {
    isLogin: auth.isLogin,
    numNotify: notify.numNotify,
    userInfo: auth.userInfo,
    phone: auth.phone,
  };
};
export default connect(
  mapStateToProps,
  null,
)(Header);

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    ...BaseStyles.baseContainerWithoutTopBottomPadding,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    color: Colors.tintColor,
    alignItems: 'center',
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
  userInfoContainer: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  loginBtn: {
    width: 150,
  },
});
