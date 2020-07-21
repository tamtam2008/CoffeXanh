import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { Image, ListItem } from 'react-native-elements';
import Container from '../../../components/layout/Container';
import { BaseFontStyles, BaseStyles } from '../../../constants/BaseStyles';
import Colors from '../../../constants/Colors';
import i18n from '../../../languages/i18n.config';
import useRootNavigation from '../../../utils/useRootNavigation';
import LanguagesConfig from '../../../config/Languages.config';

export default function SettingsScreen(props) {
  const [flag, setFlag] = useState('');
  const navigation = useRootNavigation();
  const { t } = useTranslation();

  useFocusEffect(() => {
    console.log('SettingsScreen', i18n.language);
    if (i18n.language === 'en-EN') {
      setFlag('https://image.flaticon.com/icons/png/512/555/555417.png');
    } else {
      setFlag('https://image.flaticon.com/icons/png/512/555/555515.png');
    }
  });
  const i18nCodes = LanguagesConfig.filter(item => item.code === i18n.language);
  const currentLanguage =
    i18nCodes.length > 0 ? i18nCodes[0].name : 'Language.vi_VN';
  return (
    <Container>
      <View style={[BaseStyles.mt_10]}>
        <ListItem
          title={t('SettingsScreen.addressBook')}
          leftIcon={{
            name: 'map-marker-alt',
            type: 'font-awesome-5',
            color: Colors.tintColor,
          }}
          containerStyle={[BaseStyles.baseContainer, styles.itemContainer]}
          bottomDivider
          chevron
          onPress={() => {
            navigation.navigate('addressBook');
          }}
        />
      </View>
      <View style={[BaseStyles.mt_10]}>
        <ListItem
          title={t('SettingsScreen.noti')}
          leftIcon={{
            name: 'bell',
            type: 'font-awesome',
            color: Colors.tintColor,
          }}
          containerStyle={[BaseStyles.baseContainer, styles.itemContainer]}
          rightTitle={<Switch value={false} disabled />}
          bottomDivider
        />
      </View>
      <View style={[BaseStyles.mt_10]}>
        <ListItem
          title={t('SettingsScreen.language')}
          leftIcon={{
            name: 'globe',
            type: 'font-awesome',
            color: Colors.tintColor,
          }}
          containerStyle={[BaseStyles.baseContainer, styles.itemContainer]}
          rightTitle={
            flag ? (
              <View style={[BaseStyles.flexRow]}>
                <Image
                  source={{
                    uri: flag,
                  }}
                  style={[styles.flag]}
                  PlaceholderContent={<ActivityIndicator />}
                />
                <Text style={[BaseFontStyles.body1, BaseStyles.ml_10]}>
                  {t(currentLanguage)}
                </Text>
              </View>
            ) : (
              <ActivityIndicator size={'small'} />
            )
          }
          onPress={() => {
            navigation.navigate('chooseLanguageScreen');
          }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  flag: { width: 30, height: 20 },
  itemContainer: {
    borderRadius: 0,
  },
});
