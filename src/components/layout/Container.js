import React from 'react';
import {
  Image,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BaseFontStyles } from '../../constants/BaseStyles';
import Colors from '../../constants/Colors';
import Layout, { normalize } from '../../constants/Layout';
import LoadingPopup from '../utils/LoadingPopup';
import FallBack from '../utils/FallBack';
import XButton from '../XButton';
import useRootNavigation from '../../utils/useRootNavigation';
import { useTranslation } from 'react-i18next';

const navigation = useRootNavigation();

const Container = ({
  children,
  isLoading = false,
  isRequesting = false,
  containerStyle,
  contentStyle,
  isFail = false,
  failMsg = '',
  isAuthRequired = false,
  isLogin,
  authMsg = '',
  onRefresh,
  noBackground = false,
  loadingMsg,
  scrollEnabled = true,
}) => {
  let content;
  const { t } = useTranslation();

  if (!isAuthRequired || (isAuthRequired && isLogin)) {
    content = isLoading ? (
      <FallBack />
    ) : isFail ? (
      <View style={[styles.content]}>
        <Image
          source={require('../../../assets/images/1.png')}
          style={styles.icon}
        />
        <Text style={[BaseFontStyles.body1, styles.failMsg]}>{failMsg}</Text>
      </View>
    ) : (
      children
    );
  } else {
    content = <AuthRequiredContent t={t} authMsg={authMsg} />;
  }
  const _contentContainerStyle = [
    styles.baseContent,
    ...(contentStyle instanceof Array ? contentStyle : [contentStyle]),
  ];
  const wrapper = scrollEnabled ? (
    <ScrollView
      {...(onRefresh
        ? {
            refreshControl: (
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            ),
          }
        : {})}
      contentContainerStyle={_contentContainerStyle}>
      {content}
    </ScrollView>
  ) : (
    <View style={_contentContainerStyle}>{content}</View>
  );
  return (
    <SafeAreaView
      style={[styles.container, StyleSheet.flatten(containerStyle)]}>
      <ImageBackground
        {...(noBackground
          ? {}
          : {
              source: require('../../../assets/images/background.png'),
              imageStyle: styles.image,
            })}
        style={[styles.container, noBackground ? {} : styles.backgroundColor]}>
        {wrapper}
        <LoadingPopup msg={loadingMsg} visible={isRequesting} />
      </ImageBackground>
    </SafeAreaView>
  );
};

const AuthRequiredContent = ({ authMsg, t }) => {
  return (
    <View style={[styles.content]}>
      <Image
        source={require('../../../assets/images/1.png')}
        style={styles.icon}
      />
      <Text style={[BaseFontStyles.body1, styles.failMsg]}>
        {authMsg || t('common.Container.AuthRequiredMsgDefault')}
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
};

export default Container;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  backgroundColor: {
    backgroundColor: Colors.backgroundColor,
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  baseContent: {
    minWidth: '100%',
    minHeight: '100%',
  },
  image: {
    resizeMode: 'contain',
    right: 0,
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
