import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BaseFontStyles, BaseStyles } from '../../../constants/BaseStyles';
import CustomIcon from '../../../components/CustomIcon';
import { IconType } from '../../../constants/Icon';
import Layout from '../../../constants/Layout';
import i18n from '../../../languages/i18n.config';
import useRootNavigation from '../../../utils/useRootNavigation';
import Container from '../../../components/layout/Container';
import LanguagesConfig from '../../../config/Languages.config';

export default function ChooseLanguageScreen() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigation = useRootNavigation();

  return (
    <Container isRequesting={loading} style={BaseStyles.baseContainer}>
      {LanguagesConfig.map((i, k) =>
        itemRender(i, i18n.language, k, t, l => {
          setLoading(true);
          AsyncStorage.setItem('languages', l, error => {
            i18n.changeLanguage(l, e => {
              if (e) {
                console.log(
                  'ChooseLanguageScreen',
                  'change language error.',
                  e,
                );
              }
            });
            setLoading(false);
            navigation.navigate('settings', { isUpdate: true });
          });
        }),
      )}
    </Container>
  );
}

const itemRender = (item, code, key, t, onPress) => {
  return (
    <TouchableOpacity
      onPressIn={() => {
        onPress(item.code);
      }}
      style={[BaseStyles.baseContainer, BaseStyles.flexRow, styles.item]}
      key={key}>
      <View style={[BaseStyles.flexRow, styles.itemDetail]}>
        <Image
          source={{
            uri: item.flag,
          }}
          style={styles.flag}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text
          style={[BaseFontStyles.body1, BaseStyles.ml_16, styles.selfCenter]}
          lineBreakMode="tail"
          numberOfLines={1}>
          {t(item.name)}
        </Text>
      </View>
      {item.code === code && (
        <View style={[BaseStyles.ml_16]}>
          <CustomIcon
            name="check"
            type={IconType.FONTAWESOME}
            size={21}
            focused
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flag: { width: 30, height: 20 },
  item: {
    marginBottom: 10,
  },
  itemDetail: {
    width: Layout.window.width - 64 - 24 - 32,
    marginRight: 16,
  },
});
