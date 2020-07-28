import * as React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Layout, { normalize } from '../constants/Layout';
import { BaseFontStyles, BaseStyles } from '../constants/BaseStyles';
import Colors from '../constants/Colors';
import { useTranslation } from 'react-i18next';

export default function SplashScreen() {
  const { t } = useTranslation();
  return (
    <View style={[styles.container]}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={[styles.container]}
        imageStyle={styles.image}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/xanhcoffee-logo.png')}
        />
        <Text style={[BaseFontStyles.title, BaseStyles.mt_24, styles.title]}>
          {t('SplashScreen.name').toUpperCase()}
        </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    // marginTop: Layout.window.width * 0.15,
    // marginLeft: Layout.window.width * 0.2,
    width: Layout.window.width * 0.6,
    height: Layout.window.width * 0.6,
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
  title: {
    color: Colors.tintColor,
  },
});
