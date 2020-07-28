import React, { useCallback, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import Container from '../../../components/layout/Container';
import XButton from '../../../components/XButton';
import XTextBox from '../../../components/XTextBox';
import { BaseFontStyles, BaseStyles } from '../../../constants/BaseStyles';
import { normalize } from '../../../constants/Layout';
import useRootNavigation from '../../../utils/useRootNavigation';
import loginReducer from './Register.reducer';
import styles from './Register.style';
import { isEmail, isPhoneNumber } from '../../../utils/validate';
import authServices from '../../../services/AuthService';

enableScreens();

const navigation = useRootNavigation();

const RegisterScreen = props => {
  const [state, dispatch] = useReducer(
    loginReducer.reducer,
    loginReducer.initState,
  );
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [inputs, setInputs] = useReducer(
    (inputsState, newState) => ({ ...inputsState, ...newState }),
    {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      phonenumber: '',
    },
  );

  const handleInputs = (value, name) => {
    setInputs({ [name]: value });
  };

  const errorHandle = obj => {
    if (!obj.username) {
      setError('Vui lòng điền họ và tên');
      return false;
    }
    if (!isEmail(obj.email) && !isPhoneNumber(obj.phonenumber)) {
      setError('Bạn cần nhập email hoặc số điện thoại');
      return false;
    }
    if (obj.password.length < 8) {
      setError('Mật khẩu tối thiểu 8 ký tự');
      return false;
    }
    if (obj.password !== obj.confirmPassword) {
      setError('Xác nhận mật khẩu không hợp lệ');
      return false;
    }
    return true;
  };

  const doSignUp = useCallback(() => {
    if (errorHandle(inputs)) {
      const { email, username: fullName, password, phonenumber } = inputs;
      authServices
        .register({
          email,
          fullName,
          password,
          phonenumber,
        })
        .subscribe(data => {
          console.log(data.response.status);
          if (data.response.status === 200) {
            navigation.navigate('registerSuccess');
          } else {
            setError(data.response.message);
          }
        });
    }
  }, [inputs]);

  return (
    <Container scrollEnabled isRequesting={state.isRequesting}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require('../../../../assets/images/xanhcoffee-logo.png')}
        />
      </View>
      <View style={styles.bodyContainer}>
        <View>
          <Text style={styles.message}>{t('RegisterScreen.message')}</Text>
          <XTextBox
            placeholder={t('RegisterScreen.username')}
            onChange={text => handleInputs(text, 'username')}
            value={inputs.username}
            maxLength={20}
            size={normalize(249)}
            isValid={error}
            style={[BaseFontStyles.subHeader, BaseStyles.mb_10]}
          />
          <XTextBox
            placeholder={t('RegisterScreen.email')}
            onChange={text => handleInputs(text, 'email')}
            value={inputs.email}
            maxLength={20}
            size={normalize(249)}
            isValid={error}
            style={[BaseFontStyles.subHeader, BaseStyles.mb_16]}
          />
          <XTextBox
            placeholder={t('RegisterScreen.phonenumber')}
            onChange={text => handleInputs(text, 'phonenumber')}
            value={inputs.phonenumber}
            maxLength={20}
            size={normalize(249)}
            isValid={error}
            style={[BaseFontStyles.subHeader, BaseStyles.mb_16]}
            keyboardType="numeric"
          />
          <XTextBox
            placeholder={t('RegisterScreen.password')}
            onChange={text => handleInputs(text, 'password')}
            value={inputs.password}
            maxLength={20}
            size={normalize(249)}
            isValid={error}
            style={[BaseFontStyles.subHeader, BaseStyles.mb_16]}
            secureTextEntry={true}
          />
          <XTextBox
            placeholder={t('RegisterScreen.confirmPassword')}
            onChange={text => handleInputs(text, 'confirmPassword')}
            value={inputs.confirmPassword}
            maxLength={20}
            size={normalize(249)}
            isValid={error}
            style={[BaseFontStyles.subHeader]}
            secureTextEntry={true}
          />
          <Text
            style={[BaseFontStyles.caption, styles.errorMsg, BaseStyles.mb_16]}>
            {!!error && error}
          </Text>
        </View>
        <XButton
          style={styles.signUpBtn}
          title={t('RegisterScreen.title')}
          onPress={doSignUp}
        />
      </View>
    </Container>
  );
};

export default RegisterScreen;
