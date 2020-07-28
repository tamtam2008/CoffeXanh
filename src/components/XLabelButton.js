import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BaseFontStyles } from '../constants/BaseStyles';
import { normalize } from '../constants/Layout';
import Colors from '../constants/Colors';

const XLabelButton = ({
  title,
  onPress,
  style,
  color,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      //   style={[style, BaseStyles.boxWithShadow]}
      activeOpacity={0.5}
      onPress={onPress ? onPress : () => {}}
      style={style}
      disabled={disabled || !onPress}>
      <Text
        style={[
          styles.button,
          BaseFontStyles.menuOrBody2,
          color ? { color: color } : {},
          ...(textStyle instanceof Array ? textStyle : [textStyle]),
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default XLabelButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  button: {
    paddingTop: normalize(7),
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: normalize(7),
    width: '100%',
    textAlign: 'center',
    borderRadius: 5,
    color: Colors.gray,
  },
});
