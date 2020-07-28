import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import Container from '../../../components/layout/Container';
import XButton from '../../../components/XButton';
import useRootNavigation from '../../../utils/useRootNavigation';
import styles from './Register.style';

enableScreens();

const navigation = useRootNavigation();

const RegisterSuccessScreen = props => {
  const { t } = useTranslation();
  return (
    <Container>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require('../../../../assets/images/xanhcoffee-logo.png')}
        />
      </View>
      <View
        style={[
          styles.bodyContainer,
          { justifyContent: 'space-between', flex: 1 },
        ]}>
        <View>
          <Text style={[styles.message, styles.successTitle]}>
            {t('RegisterScreen.successMessage')}
          </Text>
          <Text style={[styles.message, { textAlign: 'center' }]}>
            {t('RegisterScreen.successAlert')}
          </Text>
        </View>
        <XButton
          style={styles.signUpBtn}
          title={t('RegisterScreen.title')}
          onPress={() => {
            navigation.navigate('login');
          }}
        />
      </View>
    </Container>
  );
};

export default RegisterSuccessScreen;
