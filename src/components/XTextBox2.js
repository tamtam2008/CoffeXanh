import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TextInput } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import Colors from '../constants/Colors';

const XTextBox2 = ({
  value,
  placeholder,
  keyboardType = 'default',
  size,
  maxLength,
  onChange = () => {},
  onSubmit = () => {},
  onFocus = () => {},
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
      onEndEditing={() => {
        setFocus(false);
        onFocus(false);
      }}
      onFocus={e => {
        setFocus(true);
        onFocus(true);
      }}
      value={value}
      keyboardType={keyboardType}
      maxLength={maxLength}
      textAlign={textAlign}
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
      onEndEditing={() => {
        setFocus(false);
        onFocus(false);
      }}
      onFocus={e => {
        setFocus(true);
        onFocus(true);
      }}
      value={value}
      keyboardType={keyboardType}
      maxLength={maxLength}
      textAlign={textAlign}
      editable={!disabled}
      autoFocus={focus}
    />
  );
};

export default XTextBox2;

const styles = StyleSheet.create({
  input: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    paddingTop: 2,
    paddingBottom: 3,
    backgroundColor: '#fff',
  },
  focus: {
    borderColor: Colors.tintColor,
  },
  isValid: {
    borderColor: Colors.red,
  },
});
