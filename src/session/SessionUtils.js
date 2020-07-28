import Base64 from '../utils/Base64';
import AsyncStorage from '@react-native-community/async-storage';
import { PermissionsAndroid, Platform } from 'react-native';
import AppConfig from '../config/App.config';
import RNRestart from "react-native-restart";
import useRootNavigation from "../utils/useRootNavigation";
import NoticeUtils from "./NoticeUtils";

const navigation = useRootNavigation();
function createSessionUtils() {
  let session = {
    isNew: true,
    isLogin: false,
    userId: null,
    phone: null,
  };
  let userInfo = {};
  let config = {
    locationPermission: false,
    language: AppConfig.defaultLanguage,
  };
  const buildAuthHeader = () => {
    const headers = {};
    if (session?.token) {
      headers.Authorization = Base64.atob(session.token);
    }
    return headers;
  };
  const init = async () => {
    // Load Cache
    const cacheData = await AsyncStorage.getItem('session');
    if (cacheData) {
      session = JSON.parse(cacheData);
    }
    const userCacheData = await AsyncStorage.getItem('userInfo');
    if (cacheData) {
      userInfo = JSON.parse(userCacheData);
    }
    if (Platform.OS === 'android') {
      config.locationPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
    const cacheLanguage = await AsyncStorage.getItem('language');
    config.language = cacheLanguage ?? AppConfig.defaultLanguage;
  };
  const updateSession = (sessionData, callback, callbackError) => {
    session = { ...session, ...sessionData };
    console.debug('SessionUtils', session);
    AsyncStorage.setItem('session', JSON.stringify(session))
      .then(() => {
        callback?.();
      })
      .catch(e => callback?.(e));
  };
  const updateUserInfo = (userInfoData, callback, callbackError) => {
    userInfo = userInfoData;
    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
      .then(() => {
        callback?.();
      })
      .catch(e => callback?.(e));
  };
  const clearAll = () => {
    session = {
      isNew: false,
      isLogin: false,
      userId: null,
      phone: null,
    };
    userInfo = {};
    AsyncStorage.removeItem('session').then();
    AsyncStorage.removeItem('userInfo').then();
  };
  const logout = () => {
    // AsyncStorage.clear().then(() => {
    //   // // Immediately reload the React Native Bundle
    //   // RNRestart.Restart();

    NoticeUtils.deleteAll();
    clearAll()
    AsyncStorage.setItem('language', config.language).then();
    navigation.navigate('Auth', { screen: 'login' });
    console.log('logout success');
    // });
  }
  return {
    config: () => config,
    userInfo: () => userInfo,
    session: () => session,
    init,
    updateSession,
    buildAuthHeader,
    setConfig: newConfig => {
      config = { ...config, ...newConfig };
    },
    updateUserInfo,
    clearAll,
    logout
  };
}

const SessionUtils = createSessionUtils();

export default SessionUtils;
