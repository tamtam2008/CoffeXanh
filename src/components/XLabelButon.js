import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BaseFontStyles } from '../constants/BaseStyles';
import { normalize } from '../constants/Layout';
import Colors from '../constants/Colors';

const XLabelButon = ({ title, onPress, style, color }) => {
  return (
    <View style={style}>
      <TouchableOpacity
        //   style={[style, BaseStyles.boxWithShadow]}
        activeOpacity={0.5}
        onPress={onPress ? onPress : () => {}}>
        <Text
          style={[
            styles.button,
            BaseFontStyles.menuOrBody2,
            color ? { color: color } : {},
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default XLabelButon;

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
