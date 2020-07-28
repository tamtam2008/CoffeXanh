import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import { routes } from '../routes';
import { useTranslation } from 'react-i18next';
import { BaseFontStyles } from '../../constants/BaseStyles';
import { StyleSheet, Text } from 'react-native';
import FirebaseUtil from '../../session/FirebaseUtil';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import Layout from '../../constants/Layout';
import messaging from '@react-native-firebase/messaging';
import NoticeUtils from '../../session/NoticeUtils';
import SplashScreen from '../Splash.screen';
import UserService from '../../services/UserService';
import SessionUtils from '../../session/SessionUtils';
import Container from '../../components/layout/Container';
import TopNotifyUtils from '../../utils/TopNotifyUtils';
import { forkJoin } from 'rxjs';
import moment from 'moment';
import 'moment/locale/vi';
import i18next from 'i18next';

moment.locale(i18next.language);
// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
  NoticeUtils.addNotice(remoteMessage);
});
const Root = createStackNavigator();
export default function RootScreen({ navigation, route }) {
  const [isFail, setFail] = React.useState({ value: false, msgErr: '' });
  const { t } = useTranslation();
  const userId = SessionUtils.session().userId;
  React.useEffect(() => {
    inAppMessaging().setMessagesDisplaySuppressed(false);
  });
  React.useEffect(() => FirebaseUtil.handleToken(), [userId]);
  // receive msg
  React.useEffect(FirebaseUtil.onMessage, []);
  React.useEffect(() => {
    const loadingActions = async () => {
      await NoticeUtils.init();
      await FirebaseUtil.init();
      if (SessionUtils.session().isLogin) {
        onLoadCommonConfig();
      } else {
        navigation.navigate('bottomTabs');
      }
    };
    loadingActions().then();
  }, [navigation, onLoadCommonConfig]);
  const onLoadCommonConfig = React.useCallback(() => {
    forkJoin({
      config: UserService.getCommon(userId),
      profile: UserService.getUserInfo(userId),
    }).subscribe((data) => {
      const {
        status: configStatus,
        hotline,
        data: rank,
        notes: rankInfo,
      } = data.config.response;
      const {
        data: profile,
        status: profileStatus,
        pathHelpLink,
      } = data.profile.response;
      if (configStatus === 200 && profileStatus === 200) {
        SessionUtils.setConfig({ hotline, rank, rankInfo, pathHelpLink });
        SessionUtils.updateUserInfo(profile);
      } else {
        const failMsg =
          configStatus === 500 ||
          configStatus === 0 ||
          profileStatus === 500 ||
          profileStatus === 0
            ? `notify.code.${
                configStatus === 500 || profileStatus === 500 ? 500 : 0
              }`
            : 'notify.failMsg';
        setFail({ value: true, msgErr: failMsg });
        TopNotifyUtils.fail(failMsg);
      }
      // console.log('Root', JSON.stringify(data));
      navigation.navigate('bottomTabs');
    });
  }, [navigation, userId]);
  return (
    <Container
      onRefresh={onLoadCommonConfig}
      scrollEnabled={false}
      isFail={isFail.value}
      failMsg={isFail.msgErr}
      noBackground={true}>
      <Root.Navigator initialRouteName={'Splash'}>
        <Root.Screen
          name={'Splash'}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Root.Screen
          name="bottomTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        {routes.screens.map((val, idx) => {
          return (
            <Root.Screen
              key={idx}
              name={val.name}
              component={val.component}
              options={
                val.title
                  ? {
                      headerTitle: (props) => (
                        <Text
                          {...props}
                          style={StyleSheet.flatten([
                            BaseFontStyles.headline,
                            {
                              width: Layout.window.width * 0.7,
                              textAlign: 'center',
                              paddingRight: 15,
                            },
                          ])}
                          numberOfLines={1}
                          lineBreakMode={'tail'}>
                          {t(val.title)}
                        </Text>
                      ),
                    }
                  : {}
              }
            />
          );
        })}
      </Root.Navigator>
    </Container>
  );
}
