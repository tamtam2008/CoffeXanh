import AsyncStorage from '@react-native-community/async-storage';
import actions from '../../../redux/app.actions';
import AuthService from '../../../services/AuthService';
import TopNotifyUtils from '../../../utils/TopNotifyUtils';
import useRootNavigation from '../../../utils/useRootNavigation';

const navigation = useRootNavigation();

const Controller = {
  getOTP: (phone, onSuccess, onFail) => {
    AuthService.requestSendOTP(phone).subscribe(
      data => {
        console.log('Login', data.response);
        if (data.status === 200) {
          const { lockedYn, sentSms } = data.response;
          if (lockedYn && lockedYn === 'Y') {
            navigation.navigate('phoneLocked');
          } else if (sentSms && sentSms !== 'Y') {
            onFail();
            TopNotifyUtils.fail('otp_screen.notify.smsFail');
          } else {
            onSuccess();
          }
        } else {
          onFail();
          TopNotifyUtils.fail('otp_screen.notify.smsFail');
        }
      },
      e => {
        console.log('Login', JSON.stringify(e));
        onFail();
        TopNotifyUtils.fail(
          e.status === 500 ? 'notify.code.500' : 'notify.failMsg',
        );
      },
    );
  },
  getOTPSuccess: () => {
    TopNotifyUtils.success('login_screen.notify.otp_success');
    navigation.navigate('OTPVerify');
  },
  ignoreLogin: (dispatch, ignoreLogin) => {
    dispatch({ type: actions.REQUEST_OTP });
    AsyncStorage.setItem(
      'session',
      JSON.stringify({ isNew: false, isLogin: false }),
    ).then(() => {
      dispatch({ type: actions.REQUEST_OTP_SUCCESS });
      ignoreLogin();
      navigation.navigate('Root', {
        screen: 'bottomTabs',
        params: { screen: 'home' },
      });
    });
  },
};

export default Controller;
