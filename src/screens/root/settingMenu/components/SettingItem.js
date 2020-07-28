import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomIcon from '../../../../components/CustomIcon';
import { BaseStyles } from '../../../../constants/BaseStyles';
import Colors from '../../../../constants/Colors';
import { IconType } from '../../../../constants/Icon';
import Layout, { normalize } from '../../../../constants/Layout';

const SettingItem = ({
  title = '',
  titleStyle = [],
  icon = { name: '', type: IconType.FONTAWESOME, color: Colors.tintColor },
  style = [],
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      style={[BaseStyles.baseContainer, styles.mBottom, ...style]}
      activeOpacity={0.8}
      onPress={onPress}>
      <View style={styles.item}>
        <CustomIcon
          name={icon.name}
          type={icon.type}
          size={normalize(24)}
          focused
          other={icon.other}
          custom={{ color: icon.color }}
        />
        <Text style={[styles.titleItem, ...titleStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  item: {
    width: Layout.window.width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleItem: {
    marginLeft: 16,
  },
  mBottom: {
    marginTop: 10,
    borderRadius: 0,
  },
});
