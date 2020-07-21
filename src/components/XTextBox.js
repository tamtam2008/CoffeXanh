import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import { normalize } from '../constants/Layout';
import TextInputMask from 'react-native-text-input-mask';

const XTextBox = ({
  value,
  placeholder,
  keyboardType = 'default',
  size,
  maxLength,
  onChange,
  onSubmit,
  isValid = false,
  disabled = false,
  textAlign = 'left',
  autoFocus = false,
  style = {},
  mask = '',
}) => {
  const [focus, setFocus] = useState(autoFocus);
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setFocus(false);
        Keyboard.dismiss();
      },
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  return mask ? (
    <TextInputMask
      style={[
        styles.input,
        !isValid ? (focus ? styles.focus : {}) : styles.isValid,
        size ? { width: size } : {},
        style,
      ]}
      placeholder={placeholder}
      onChangeText={onChange}
      onSubmitEditing={onSubmit || (() => {})}
      onEndEditing={() => setFocus(false)}
      onFocus={e => setFocus(true)}
      value={value}
      keyboardType={keyboardType}
      maxLength={maxLength}
      textAlign={textAlign ? textAlign : 'left'}
      editable={!disabled}
      autoFocus={focus}
      mask={mask}
    />
  ) : (
    <TextInput
      style={[
        styles.input,
        !isValid ? (focus ? styles.focus : {}) : styles.isValid,
        size ? { width: size } : {},
        style,
      ]}
      placeholder={placeholder}
      onChangeText={onChange}
      onSubmitEditing={onSubmit || (() => {})}
      onEndEditing={() => setFocus(false)}
      onFocus={e => setFocus(true)}
      value={value}
      keyboardType={keyboardType}
      maxLength={maxLength}
      textAlign={textAlign ? textAlign : 'left'}
      editable={!disabled}
      autoFocus={focus}
    />
  );
};

export default XTextBox;

const styles = StyleSheet.create({
  input: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.lightGray,
    paddingTop: normalize(2.5),
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: normalize(3),
    backgroundColor: '#fff',
  },
  focus: {
    borderColor: Colors.tintColor,
  },
  isValid: {
    borderColor: Colors.red,
  },
});
