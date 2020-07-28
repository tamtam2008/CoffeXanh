/* eslint-disable no-unused-vars */
import React, { useCallback, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { connect } from 'react-redux';
import Container from '../../../components/layout/Container';
import XButton from '../../../components/XButton';
import XLabelButton from '../../../components/XLabelButton';
import XTextBox from '../../../components/XTextBox';
import { BaseFontStyles, BaseStyles } from '../../../constants/BaseStyles';
import { normalize } from '../../../constants/Layout';
import styles from './Login.style';
import loginReducer from './Login.reducer';
import useRootNavigation from '../../../utils/useRootNavigation';
import Colors from '../../../constants/Colors';

enableScreens();

const navigation = useRootNavigation();

const LoginScreen = props => {
  const [state, dispatch] = useReducer(
    loginReducer.reducer,
    loginReducer.initState,
  );
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const doLogin = useCallback(() => {
    //check error
    // setError({msg: ''})
    // todo some thing
    navigation.navigate('Root');
  }, []);
  const doResetPwd = useCallback(() => {
    navigation.navigate('resetPassword');
  }, []);

  const doSignUp = useCallback(() => {
    navigation.navigate('register');
  }, []);
  return (
    <Container isRequesting={state.isRequesting}>
      <Image
        style={styles.image}
        source={require('../../../../assets/images/6.png')}
      />
      <View style={styles.bodyWrapper}>
        <View style={[styles.bodyContainer]}>
          <XTextBox
            placeholder={t('login_screen.username')}
            onChange={setUsername}
            value={username}
            keyboardType="number-pad"
            maxLength={20}
            size={normalize(249)}
            isValid={error}
            style={[BaseFontStyles.subHeader, BaseStyles.mb_10]}
          />
          <XTextBox
            placeholder={t('login_screen.password')}
            onChange={setPassword}
            value={password}
            keyboardType="number-pad"
            maxLength={20}
            size={normalize(249)}
            isValid={error}
            style={[BaseFontStyles.subHeader, BaseStyles.mb_16]}
            secureTextEntry={true}
          />
          {!!error && (
            <Text
              style={[
                BaseFontStyles.caption,
                styles.errorMsg,
                BaseStyles.mt_16,
              ]}>
              {error}
            </Text>
          )}
          <XButton
            style={styles.loginBtn}
            title={t('login_screen.loginBtn')}
            onPress={doLogin}
          />
          <XLabelButton
            style={[BaseStyles.mt_10]}
            title={t('login_screen.resetPwdBtn')}
            onPress={doResetPwd}
            color={Colors.tintColor}
          />
          <Text style={[BaseStyles.mt_10]}>{t('login_screen.message')}</Text>
          <XLabelButton
            style={[BaseStyles.mt_10]}
            title={t('RegisterScreen.title')}
            onPress={doSignUp}
            color={Colors.tintColor}
          />
        </View>
      </View>
    </Container>
  );
};

const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps,
)(LoginScreen);
