import React, { useCallback, useState } from 'react';
import Container from '../../../components/layout/Container';
import { BaseFontStyles, BaseStyles } from '../../../constants/BaseStyles';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import styles from './ResetPassword.style';
import XTextBox from '../../../components/XTextBox';
import XButton from '../../../components/XButton';
import Layout from '../../../constants/Layout';
import useRootNavigation from '../../../utils/useRootNavigation';
import authService from '../../../services/AuthService';

const navigation = useRootNavigation();

const ResetPasswordScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const doReset = useCallback(() => {
    if (email) {
      authService.forgotPass(email).subscribe(data => {
        console.log(data.response);
        if (data.response.status === 200) {
          navigation.navigate('resetPasswordSuccess');
        } else {
          setError('Email hoặc số điện thoại không hợp lệ');
        }
      });
    } else {
      setError('Vui lòng nhập email hoặc số điện thoại');
    }
  }, [email]);
  return (
    <Container>
      <View style={[BaseStyles.baseContainer, styles.container]}>
        <Image
          style={styles.logo}
          source={require('../../../../assets/images/xanhcoffee-logo.png')}
        />
        <Text style={[BaseFontStyles.body1, BaseStyles.mt_10]}>
          {t('ResetPasswordScreen.title')}
        </Text>
        <XTextBox
          placeholder={t('ResetPasswordScreen.email')}
          onSubmit={doReset}
          onChange={setEmail}
          value={email}
          autoFocus={true}
          size={Layout.window.width * 0.7}
          style={[BaseStyles.mt_10]}
        />
        <Text
          style={[BaseFontStyles.caption, styles.errorMsg, BaseStyles.mb_16]}>
          {!!error && error}
        </Text>
        <XButton
          title={t('ResetPasswordScreen.resetPwdBtn')}
          style={styles.resetPwdBtn}
          onPress={doReset}
        />
      </View>
    </Container>
  );
};

export default ResetPasswordScreen;
