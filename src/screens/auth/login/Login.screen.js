import React, { useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { connect } from 'react-redux';
import Container from '../../../components/layout/Container';
import XButton from '../../../components/XButton';
import XLabelButon from '../../../components/XLabelButon';
import XTextBox from '../../../components/XTextBox';
import { BaseFontStyles } from '../../../constants/BaseStyles';
import Colors from '../../../constants/Colors';
import { normalize } from '../../../constants/Layout';
import actions from '../../../redux/app.actions';
import VietNamPhonePrefix from '../VietNamePhonePrefix';
import CountryPicker from './components/countryPicker/CountryPicker';
import Controller from './Login.controller';
import styles from './Login.style';
import loginReducer from './Login.reducer';

enableScreens();

const CountryCodeDefault = 'VN';

const LoginScreen = props => {
  const [state, dispatch] = useReducer(
    loginReducer.reducer,
    loginReducer.initState,
  );
  const [countryCode, setCountryCode] = useState(CountryCodeDefault);
  const [callingCode, setCallingCode] = useState('+84');
  const [phoneNumber, setPhoneNumber] = useState('0342387350');
  const [phoneValid, setPhoneValid] = useState({ isValid: false, error: '' });
  const { t } = useTranslation();

  const onChangeText = text => {
    text = text.trim();
    setPhoneNumber(text);
  };

  const checkVNPhone = phone => {
    let isValid = false;
    let error = '';
    if (countryCode === CountryCodeDefault) {
      if (
        !phone.match(/(0)+([35789])+([0-9]{0,8})/g) ||
        !VietNamPhonePrefix.includes(phone.trim().substr(0, 3)) ||
        phone.trim() === ''
      ) {
        isValid = true;
        error = t('login_screen.error.phoneNumber');
      }
    }
    return { isValid, error };
  };

  const doGetOTP = () => {
    const check = checkVNPhone(phoneNumber);
    if (!check.isValid) {
      dispatch({ type: actions.REQUEST_OTP });
      Controller.getOTP(
        phoneNumber,
        () => {
          dispatch({ type: actions.REQUEST_OTP_SUCCESS });
          props.getOTPSuccess(phoneNumber);
          Controller.getOTPSuccess();
        },
        () => {
          dispatch({ type: actions.REQUEST_OTP_FAIL });
        },
      );
    }
    setPhoneValid(check);
  };

  return (
    <Container isRequesting={state.isRequesting}>
      <Image
        style={styles.image}
        source={require('../../../../assets/images/6.png')}
      />
      <View
        style={[
          styles.bodyContainer,
          phoneNumber === '' ? styles.noPhonePadding : null,
        ]}>
        <View>
          <Text style={BaseFontStyles.headline}>
            {t('login_screen.title1')}
          </Text>
          <Text style={BaseFontStyles.menuOrBody2}>
            {t('login_screen.title2')}
          </Text>
          <View style={[styles.phoneNumberContainer, styles.mTop]}>
            <CountryPicker
              countryCode={countryCode}
              onSelect={code => {
                setCountryCode(code.code);
                setCallingCode(code.callingCode);
              }}
            />
            <XTextBox
              placeholder={t('login_screen.phoneNumber')}
              onChange={text => onChangeText(text)}
              value={phoneNumber}
              keyboardType="number-pad"
              maxLength={10}
              size={normalize(249)}
              isValid={phoneValid.isValid}
              style={BaseFontStyles.subHeader}
              onSubmit={doGetOTP}
            />
          </View>
          {phoneValid.isValid && phoneNumber !== '' && (
            <Text
              style={[
                BaseFontStyles.caption,
                styles.phoneErrorMsg,
                styles.mTop,
              ]}>
              {phoneValid.error}
            </Text>
          )}
        </View>
        <View style={[styles.mTop, styles.btnContainer]}>
          {phoneNumber !== '' ? (
            <XButton
              style={styles.loginBtn}
              title={t('login_screen.loginBtn')}
              onPress={doGetOTP}
            />
          ) : (
            <View style={[styles.btnContainer]}>
              <Text style={[BaseFontStyles.body1]}>
                {t('login_screen.otherLoginTypeTitle')}
              </Text>
              <XButton
                style={styles.fbBtn}
                title={'Facebook'}
                onPress={() => {}}
                buttonColor={Colors.facebook}
                disabled
              />
            </View>
          )}
          <XLabelButon
            style={[styles.ignoreBtn, BaseFontStyles.menuOrBody2]}
            title={t('login_screen.ignoreBtn')}
            color={phoneNumber === '' ? Colors.tintColor : Colors.gray}
            onPress={() => {
              Controller.ignoreLogin(dispatch, props.ignoreLogin);
            }}
          />
        </View>
      </View>
    </Container>
  );
};

const mapDispatchToProps = {
  getOTPSuccess: phone => ({
    type: actions.REQUEST_OTP_SUCCESS,
    payload: { phone },
  }),
  ignoreLogin: () => ({
    type: actions.IGNORE_LOGIN,
  }),
};

export default connect(
  null,
  mapDispatchToProps,
)(LoginScreen);
