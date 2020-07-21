import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RadioButtonInput } from 'react-native-simple-radio-button';
import Colors from '../../../../../../../constants/Colors';
import {
  BaseStyles,
  BaseFontStyles,
} from '../../../../../../../constants/BaseStyles';
import Layout from '../../../../../../../constants/Layout';

const RenderRadioChoose = props => {
  const isSelected = props.isSelected || false;
  return (
    <View style={[BaseStyles.flexRow, styles.radioRow]}>
      <RadioButtonInput
        index={props.index}
        isSelected={isSelected}
        buttonColor={isSelected ? Colors.tintColor : Colors.gray}
        buttonSize={10}
        buttonOuterSize={22}
        obj={props.obj}
        onPress={props.onPress}
      />
      <View style={[BaseStyles.flexRow, BaseStyles.ml_10, styles.label]}>
        <Text
          style={[
            BaseFontStyles.body1,
            isSelected ? StyleSheet.flatten({ color: Colors.tintColor }) : {},
          ]}>
          {props.label}
        </Text>
        {!!props.label2 && (
          <Text
            style={[
              BaseFontStyles.body1,
              isSelected ? StyleSheet.flatten({ color: Colors.tintColor }) : {},
            ]}>
            {'+' + props.label2}
          </Text>
        )}
      </View>
    </View>
  );
};

const RadioChooseOptions = ({
  data,
  selectedIdx,
  onPress = (val, idx) => {},
}) => {
  const [seleted, setSeleted] = useState(selectedIdx);
  return (
    <View style={[BaseStyles.flexColumn]}>
      {data.map((val, idx) => (
        <RenderRadioChoose
          {...{
            index: idx,
            label: val.label,
            label2: val.label2,
            isSelected: idx === seleted,
            obj: val,
            onPress: (value, index) => {
              setSeleted(index);
              onPress(value, index);
              // console.log(value, index);
            },
          }}
          key={idx}
        />
      ))}
    </View>
  );
};

export default RadioChooseOptions;

const styles = StyleSheet.create({
  label: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: Layout.window.width * 0.9 - 32 - 24 - 10,
  },
  container: {},
  radioRow: {
    marginBottom: 10,
  },
});
