import * as React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import Layout from '../constants/Layout';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.splashImage}
        source={require('../../assets/images/splash-xanh-cf-app.jpg')}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/xanhcoffee-logo.png')}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Layout.window.width,
    height: Layout.window.height,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logo: {
    marginTop: Layout.window.width * 0.15,
    marginLeft: Layout.window.width * 0.2,
    width: Layout.window.width * 0.6,
    height: Layout.window.width * 0.6,
  },
});
