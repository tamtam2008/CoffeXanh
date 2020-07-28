import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BaseFontStyles, BaseStyles } from '../constants/BaseStyles';
import Colors from '../constants/Colors';

const XButton = ({ title, onPress, disabled = false, style, buttonColor }) => {
  const customStyle = {
    width: '100%',
    ...style,
  };
  const customColor = StyleSheet.flatten({
    backgroundColor: buttonColor,
  });
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      // underlayColor="#52ca75"
      style={[
        BaseStyles.boxWithShadow,
        styles.container,
        disabled ? styles.disabled : buttonColor ? customColor : styles.active,
        customStyle,
      ]}
      onPress={onPress ? onPress : () => {}}
      disabled={disabled}>
      <View style={styles.container2}>
        <Text
          style={[
            BaseFontStyles.menuOrBody2,
            styles.button,
            disabled ? styles.textDisabled : styles.textActive,
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
    paddingHorizontal: 16,
    paddingBottom: 1,
    borderRadius: 5,
  },
  button: {
    textAlign: 'center',
  },
  textActive: {
    color: '#fff',
  },
  active: {
    backgroundColor: Colors.tintColor,
  },
  textDisabled: {
    color: '#fff',
  },
  disabled: {
    backgroundColor: Colors.lightGray,
  },
});
