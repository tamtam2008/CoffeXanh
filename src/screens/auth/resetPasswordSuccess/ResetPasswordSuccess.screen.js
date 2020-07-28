import React, { useCallback, useEffect } from 'react';
import Container from '../../../components/layout/Container';
import { BaseFontStyles, BaseStyles } from '../../../constants/BaseStyles';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import styles from './ResetPasswordSuccess.style';
import XButton from '../../../components/XButton';
import AppActions from '../../../redux/app.actions';
import store from '../../../redux/store';
import { HeaderBackButton } from '@react-navigation/stack';

const ResetPasswordSuccessScreen = ({ navigation }) => {
  const { t } = useTranslation();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: props => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            navigation.navigate('login');
          }}
        />
      ),
    });
  });
  const doCloseApp = useCallback(() => {
    store.dispatch({ type: AppActions.EXIT_APP });
  }, []);
  return (
    <Container>
      <View style={[BaseStyles.baseContainer, styles.container]}>
        <Image
          style={styles.logo}
          source={require('../../../../assets/images/1.png')}
        />
        <Text style={[BaseFontStyles.title, BaseStyles.mt_10]}>
          {t('ResetPasswordSuccessScreen.title')}
        </Text>
        <Text style={[BaseFontStyles.body1, BaseStyles.mt_10]}>
          {t('ResetPasswordSuccessScreen.title2')}
        </Text>
        <XButton
          title={t('ResetPasswordSuccessScreen.closeApp')}
          style={styles.closeAppBtn}
          onPress={doCloseApp}
        />
      </View>
    </Container>
  );
};

export default ResetPasswordSuccessScreen;
