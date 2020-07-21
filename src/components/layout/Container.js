import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { BaseFontStyles } from '../../constants/BaseStyles';
import Colors from '../../constants/Colors';
import Layout, { normalize } from '../../constants/Layout';
import LoadingPopup from '../utils/LoadingPopup';
import FallBack from '../utils/FallBack';
import { connect } from 'react-redux';
import XButton from '../XButton';
import useRootNavigation from '../../utils/useRootNavigation';
import { useTranslation } from 'react-i18next';

const navigation = useRootNavigation();

const Container = ({
  children,
  isLoading = false,
  isRequesting = false,
  style,
  isFail = false,
  failMsg = '',
  isAuthRequired = false,
  isLogin,
  authMsg = '',
}) => {
  let Child;
  const { t } = useTranslation();
  const authRequiredComponent = (
    <View style={[styles.content]}>
      <Image
        source={require('../../../assets/images/1.png')}
        style={styles.icon}
      />
      <Text style={[BaseFontStyles.body1, styles.failMsg]}>
        {authMsg || t('common.Container.AuthRequiredMsgDefalt')}
      </Text>
      <XButton
        title={t('common.Container.loginRequired')}
        style={styles.loginBtn}
        onPress={() => {
          navigation.navigate('Auth', { screen: 'login' });
        }}
      />
    </View>
  );
  const mainComponent = !isFail ? (
    isLoading ? (
      <FallBack />
    ) : (
      children
    )
  ) : (
    <View style={[styles.content]}>
      <Image
        source={require('../../../assets/images/1.png')}
        style={styles.icon}
      />
      <Text style={[BaseFontStyles.body1, styles.failMsg]}>{failMsg}</Text>
    </View>
  );
  if (isAuthRequired) {
    if (isLogin) {
      Child = mainComponent;
    } else {
      Child = authRequiredComponent;
    }
  } else {
    Child = mainComponent;
  }
  return (
    <View style={[styles.container]}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={[styles.container, style]}
        imageStyle={styles.image}>
        {Child}
      </ImageBackground>
      {isRequesting && <LoadingPopup />}
    </View>
  );
};

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
});

export default connect(
  mapStateToProps,
  null,
)(Container);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  content: {
    // justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    resizeMode: 'contain',
    right: normalize(-14),
    bottom: 0,
    left: 'auto',
    top: 'auto',
    width: normalize(244),
    height: normalize(267),
  },
  icon: {
    marginTop: 30,
    width: Layout.window.width * 0.4,
    height: Layout.window.width * 0.4,
    opacity: 0.75,
  },
  failMsg: {
    width: Layout.window.width - 32,
    textAlign: 'center',
    marginTop: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
  loginBtn: {
    width: Math.min(Layout.window.width * 0.7, 200),
    marginTop: 16,
  },
});
