import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { BaseStyles } from '../../constants/BaseStyles';
import Colors from '../../constants/Colors';
import { useTranslation } from 'react-i18next';
import XModal from '../layout/XModal';

const LoadingPopup = ({ msg, visible }) => {
  const { t } = useTranslation();
  return (
    <XModal visible={visible}>
      <View style={[BaseStyles.baseContainer, styles.popup]}>
        <ActivityIndicator
          style={styles.loadingIcon}
          color={Colors.tintColor}
        />
        <Text>{t(msg || 'LoadingPopup.isLoading')}</Text>
      </View>
    </XModal>
  );
};

export default LoadingPopup;

const styles = StyleSheet.create({
  popup: {
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
  },
  loadingIcon: { marginRight: 16 },
});
