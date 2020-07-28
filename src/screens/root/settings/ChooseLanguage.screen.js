import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'react-native-elements';
import { BaseFontStyles, BaseStyles } from '../../../constants/BaseStyles';
import CustomIcon from '../../../components/CustomIcon';
import { IconType } from '../../../constants/Icon';
import Layout from '../../../constants/Layout';
import i18n from '../../../languages/i18n.config';
import useRootNavigation from '../../../utils/useRootNavigation';
import Container from '../../../components/layout/Container';
import LanguagesConfig from '../../../config/Languages.config';
import RNRestart from 'react-native-restart';

// const navigation = useRootNavigation();
export default function ChooseLanguageScreen() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  return (
    <Container isRequesting={loading} contentStyle={BaseStyles.baseContent}>
      {LanguagesConfig.map((i, k) =>
        itemRender(i, i18n.language, k, t, l => {
          setLoading(true);
          AsyncStorage.setItem('language', l, () => {
            // Immediately reload the React Native Bundle
            RNRestart.Restart();
          });
        }),
      )}
    </Container>
  );
}

const itemRender = (item, code, key, t, onPress) => {
  return (
    <TouchableOpacity
      onPress={() => {
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
