import AuthService from '../../../services/AuthService';
import useRootNavigation from '../../../utils/useRootNavigation';
import { showMessage } from 'react-native-flash-message';
import actions from '../../../redux/app.actions';
import store from '../../../redux/store';
import AsyncStorage from '@react-native-community/async-storage';
import Base64 from '../../../utils/Base64';
import UserService from '../../../services/UserService';
import TopNotifyUtils from '../../../utils/TopNotifyUtils';
import SessionUtils from '../../../session/SessionUtils';

const navigation = useRootNavigation();
const Controller = {
  getNewOTP: ({ phone, t, onSuccess }, dispatch) => {
    dispatch({ type: actions.LOGIN });
    AuthService.requestSendOTP(phone).subscribe(
      data => {
        console.log(data.response);
        const { lockedYn } = data.response;
        if (lockedYn && lockedYn === 'Y') {
          navigation.navigate('phoneLocked');
        } else {
          dispatch({ type: actions.LOGIN_SUCCESS });
          onSuccess();
        }
      },
      e => {
        console.log('Sign in', JSON.stringify(e));
        showMessage({
          message: 'Thất bại',
          description:
            e.status === 500
              ? 'Máy chủ gặp sự cố, vui lòng thực hiện lại sau!'
              : 'Yêu cầu của bạn đã thất bại',
          type: 'danger',
          icon: 'danger',
        });
        dispatch({ type: actions.LOGIN_FAIL });
      },
    );
  },
  login: ({ phone, otp }, dispatch) => {
    dispatch({ type: actions.LOGIN });
    AuthService.login({
      username: phone,
      password: otp,
    }).subscribe(
      reps => {
        console.log('Sign in', reps.xhr.responseHeaders);
        const data = {
          isNew: false,
          isLogin: true,
          phone: phone,
          token: Base64.btoa(reps.xhr.responseHeaders.Authorization),
          userId: reps.xhr.responseHeaders.userId,
        };
        console.log('AsyncStorage - session', JSON.stringify(data));
        AsyncStorage.setItem('session', JSON.stringify(data)).then(() => {
          SessionUtils.setToken(data.token);
          delete data.token;
          const { newUser } = reps.xhr.responseHeaders;
          console.log('reps.xhr.responseHeaders.newUser', newUser);
          if (newUser && newUser === '1') {
            dispatch({ type: actions.LOGIN_SUCCESS });
            navigation.navigate('Root', {
              screen: 'accountInfoUpdate',
            });
            store.dispatch({ type: actions.LOGIN_SUCCESS, payload: data });
          } else {
            UserService.getUserInfo(data.userId).subscribe(
              resp => {
                const {
                  gradeGbn,
                  rewardPoint,
                  lastName,
                  firstName,
                  gender,
                  birthday,
                } = resp.response.data;
                const userInfo = {
                  avatar: '',
                  name: `${lastName} ${firstName}`.trim(),
                  sex: gender,
                  dob: new Date(birthday).getTime(),
                  rank: gradeGbn,
                  point: rewardPoint,
                };
                console.log(
                  'AsyncStorage - resp.response.data',
                  resp.response.data,
                );
                console.log('AsyncStorage - userInfo', userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo)).then(
                  () => {
                    dispatch({ type: actions.LOGIN_SUCCESS });
                    navigation.navigate('Root', {
                      screen: 'bottomTabs',
                      params: { screen: 'home' },
                    });
                    store.dispatch({
                      type: actions.LOGIN_SUCCESS,
                      payload: { ...data, userInfo },
                    });
                  },
                );
              },
              e => {
                TopNotifyUtils.fail(
                  e.status === 500 ? 'notify.code.500' : 'notify.failMsg',
                );
                dispatch({ type: actions.LOGIN_FAIL });
              },
            );
          }
        });
      },
      e => {
        console.log('Sign in', JSON.stringify(e));
        TopNotifyUtils.fail(
          e.status === 500 ? 'notify.code.500' : 'notify.failMsg',
        );
        dispatch({ type: actions.LOGIN_FAIL });
      },
    );
  },
};

export default Controller;
