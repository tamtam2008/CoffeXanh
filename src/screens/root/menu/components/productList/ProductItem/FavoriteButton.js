import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import XIconButton from '../../../../../../components/XIconButton';
import Colors from '../../../../../../constants/Colors';
import { FontAwesomeType, IconType } from '../../../../../../constants/Icon';
import {
  BaseStyles,
  BaseFontStyles,
} from '../../../../../../constants/BaseStyles';
import { useTranslation } from 'react-i18next';

const FavoriteButton = ({
  isFavorite,
  haveTitle = false,
  onPress = () => {},
}) => {
  const [onClick, setOnClick] = useState(false);
  const { t } = useTranslation();
  return !onClick ? (
    <View style={[styles.container, BaseStyles.flexRow]}>
      <XIconButton
        icon={{
          name: 'heart',
          type: isFavorite ? IconType.FONTAWESOME : IconType.FEATHER,
          size: isFavorite ? 23.5 : 24,
          other: isFavorite ? FontAwesomeType.SOLID : null,
        }}
        color={isFavorite ? Colors.tintColor : Colors.gray}
        onPress={() => {
          setOnClick(true);
          onPress();
          of({ data: true })
            .pipe(delay(2000))
            .subscribe(() => {
              isFavorite = !isFavorite;
              setOnClick(false);
              console.log('ok na');
            });
        }}
        title={haveTitle ? t('Menu.FavoriteButton.favorite') : ''}
      />
    </View>
  ) : (
    <View style={[styles.container, BaseStyles.flexRow]}>
      <ActivityIndicator size={24} color={Colors.tintColor} />
      {haveTitle && (
        <Text
          style={[
            BaseFontStyles.body1,
            BaseStyles.ml_5,
            styles.title,
            StyleSheet.flatten({
              color: isFavorite ? Colors.tintColor : Colors.gray,
            }),
          ]}>
          {t('Menu.FavoriteButton.favorite')}
        </Text>
      )}
    </View>
  );
};

export default FavoriteButton;

const styles = StyleSheet.create({
  container: {
    height: 25,
    // width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  title: {
    alignSelf: 'center',
  },
});
