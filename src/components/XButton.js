import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BaseFontStyles, BaseStyles } from '../constants/BaseStyles';
import Colors from '../constants/Colors';

const XButton = ({ title, onPress, disabled = false, style, buttonColor }) => {
  const customStyle = { width: '100%', ...style };
  const customColor = StyleSheet.create({
    actived: {
      backgroundColor: buttonColor,
    },
  });
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      // underlayColor="#52ca75"
      style={[
        BaseStyles.boxWithShadow,
        styles.container,
        disabled
          ? styles.disabed
          : buttonColor
          ? customColor.actived
          : styles.actived,
        customStyle,
      ]}
      onPress={onPress ? onPress : () => {}}
      disabled={disabled}>
      <View style={styles.container2}>
        <Text
          style={[
            BaseFontStyles.menuOrBody2,
            styles.button,
            disabled ? styles.textDisabled : styles.textActivied,
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default XButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    height: 36,
  },
  container2: {
    height: 36,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 1,
    borderRadius: 5,
  },
  button: {
    textAlign: 'center',
  },
  textActivied: {
    color: '#fff',
  },
  actived: {
    backgroundColor: Colors.tintColor,
  },
  textDisabled: {
    color: '#fff',
  },
  disabed: {
    backgroundColor: Colors.lightGray,
  },
});
