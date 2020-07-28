import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { IconType } from '../constants/Icon';
import CustomIcon from './CustomIcon';
import { BaseFontStyles, BaseStyles } from '../constants/BaseStyles';

const XIconButton = ({
  icon = { name: '', type: IconType.FONTAWESOME, size: 24 },
  onPress = () => {},
  onPressIn = () => {},
  style = {},
  color = Colors.tintColor,
  iconStyle = {},
  title = '',
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        BaseStyles.flexRow,
        styles.container,
        ...(style instanceof Array ? style : [style]),
      ]}
      onPress={onPress}
      onPressIn={onPressIn}
      disabled={disabled}>
      <CustomIcon
        name={icon.name}
        type={icon.type}
        size={icon.size}
        other={icon.other}
        custom={
          disabled ? { style: iconStyle } : { color: color, style: iconStyle }
        }
        focused={!disabled}
      />
      {!!title && (
        <Text
          style={[
            BaseFontStyles.body1,
            BaseStyles.ml_5,
            styles.title,
            StyleSheet.flatten({ color: color }),
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default XIconButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'center',
  },
});
