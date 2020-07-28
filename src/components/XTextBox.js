import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import { normalize } from '../constants/Layout';
import { TextInputMask } from 'react-native-masked-text';

const XTextBox = ({
  value,
  placeholder,
  keyboardType = 'default',
  size,
  maxLength,
  onChange = () => {},
  onSubmit = () => {},
  onFocus = () => {},
  isError = false,
  disabled = false,
  textAlign = 'left',
  autoFocus = false,
  style = {},
  mask = '',
  maskType = 'custom',
  options,
  ref,
  secureTextEntry = false,
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
        isError ? styles.isError : focus ? styles.focus : {},
        size ? { width: size } : {},
        ...(style instanceof Array ? style : [style]),
      ]}
      placeholder={placeholder}
      onChangeText={onChange}
      onSubmitEditing={onSubmit}
      onEndEditing={() => {
        setFocus(false);
        onFocus(false);
      }}
      onFocus={(e) => {
        setFocus(true);
        onFocus(true);
      }}
      value={value}
      keyboardType={keyboardType}
      maxLength={maxLength}
      textAlign={textAlign ? textAlign : 'left'}
      editable={!disabled}
      autoFocus={focus}
      type={maskType}
      // mask={mask}
      options={
        options
          ? options
          : {
              /**
               * mask: (String | required | default '')
               * the mask pattern
               * 9 - accept digit.
               * A - accept alpha.
               * S - accept alphanumeric.
               * * - accept all, EXCEPT white space.
               */
              mask: mask,
            }
      }
      ref={ref}
      secureTextEntry={secureTextEntry}
    />
  ) : (
    <TextInput
      style={[
        styles.input,
        isError ? styles.isError : focus ? styles.focus : {},
        size ? { width: size } : {},
        ...(style instanceof Array ? style : [style]),
      ]}
      placeholder={placeholder}
      onChangeText={onChange}
      onSubmitEditing={onSubmit || (() => {})}
      onEndEditing={() => {
        setFocus(false);
        onFocus(false);
      }}
      onFocus={(e) => {
        setFocus(true);
        onFocus(true);
      }}
      value={value}
      keyboardType={keyboardType}
      maxLength={maxLength}
      textAlign={textAlign ? textAlign : 'left'}
      editable={!disabled}
      autoFocus={focus}
      secureTextEntry={secureTextEntry}
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
  isError: {
    borderColor: Colors.red,
  },
});
