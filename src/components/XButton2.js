import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { BaseFontStyles, BaseStyles } from '../constants/BaseStyles';
import Colors from '../constants/Colors';

const XButton2 = ({ title, onPress, disabled = false, style, buttonColor }) => {
  const customStyle = { width: '100%', ...style };
  const customColor = StyleSheet.create({
    actived: {
      backgroundColor: buttonColor,
    },
  });
  return (
    // <View
    //   style={[
    //     BaseStyles.boxWithShadow,
    //     styles.container,
    //     disabled
    //       ? styles.disabed
    //       : buttonColor
    //       ? customColor.actived
    //       : styles.actived,
    //     customStyle,
    //   ]}>
    //   {ButtonComponent}
    // </View>
    <TouchableHighlight
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
      activeOpacity={0.6}
      underlayColor={'#baddbf'}
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
    </TouchableHighlight>
  );
};

export default XButton2;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    height: 36,
    borderWidth: 1,
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
    color: Colors.tintColor,
  },
  actived: {
    backgroundColor: '#fff',
    borderColor: Colors.tintColor,
  },
  textDisabled: {
    color: Colors.gray,
  },
  disabed: {
    backgroundColor: Colors.lightGray,
    borderColor: Colors.gray,
  },
});
