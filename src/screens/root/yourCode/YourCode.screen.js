import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Container from '../../../components/layout/Container';
import Barcode from 'react-native-barcode-builder';
import { BaseStyles, BaseFontStyles } from '../../../constants/BaseStyles';
import QRCode from 'react-native-qrcode-svg';
import Layout from '../../../constants/Layout';
import styles from './YourCode.style';
import { useTranslation } from 'react-i18next';

export default function YourCodeScreen() {
  const { t } = useTranslation();
  return (
    <Container isAuthRequired={true}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[BaseFontStyles.title, styles.title]}>
          {t('YourCodeScreen.UserCode')}
        </Text>
        <View style={[BaseStyles.baseContainer]}>
          <Barcode value="TEST_USER_ID" format="CODE128" />
        </View>
        <Text style={[BaseFontStyles.title, styles.title, BaseStyles.mt_16]}>
          {t('YourCodeScreen.TransactionCode')}
        </Text>
        <View style={[BaseStyles.baseContainer]}>
          <QRCode value="TEST_USER_ID" size={Layout.window.width - 64} />
        </View>
        <Text style={[BaseFontStyles.caption, styles.title, BaseStyles.mt_16]}>
          {t('YourCodeScreen.notes')}
        </Text>
      </ScrollView>
    </Container>
  );
}
